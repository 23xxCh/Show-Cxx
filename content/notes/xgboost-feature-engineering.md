---
title: "XGBoost特征工程与调参笔记"
date: "2026-05-25"
tags: ["XGBoost", "特征工程", "机器学习"]
published: true
---

XGBoost 在结构化数据任务上依然具有极强竞争力。特征工程的质量往往比调参更重要，本文整理了工业时序预测场景下的实战经验。

## 时序特征提取

滑动窗口是最常用的时序特征构造方法，提取统计量捕捉趋势和波动：

```python
import pandas as pd
import numpy as np

def build_window_features(df, col, windows=[7, 14, 30]):
    for w in windows:
        df[f'{col}_mean_{w}'] = df[col].rolling(w).mean()
        df[f'{col}_std_{w}'] = df[col].rolling(w).std()
        df[f'{col}_max_{w}'] = df[col].rolling(w).max()
        df[f'{col}_min_{w}'] = df[col].rolling(w).min()
        # 趋势特征：当前值与窗口均值的差
        df[f'{col}_trend_{w}'] = df[col] - df[f'{col}_mean_{w}']
    return df
```

额外建议提取差分特征 `diff_1`、`diff_7`（日环比、周同比）以及时间分量（星期、月份、是否节假日）。

## 频域特征

FFT 可以捕捉周期性模式，适合有明显周期的工业数据：

```python
def extract_fft_features(series, n_components=5):
    fft_vals = np.fft.fft(series.values)
    fft_abs = np.abs(fft_vals)[:len(fft_vals)//2]
    # 取前 n 个主频率分量
    top_idx = np.argsort(fft_abs)[-n_components:][::-1]
    features = {
        'fft_freq': top_idx.tolist(),
        'fft_magnitude': fft_abs[top_idx].tolist(),
        'fft_energy': float(np.sum(fft_abs**2))
    }
    return features
```

## XGBoost 关键参数

| 参数 | 含义 | 建议范围 |
|------|------|----------|
| `max_depth` | 树最大深度 | 3-10，越大越容易过拟合 |
| `learning_rate` | 学习率 | 0.01-0.3，与 n_estimators 配合 |
| `n_estimators` | 树的数量 | 100-2000，配合早停使用 |
| `subsample` | 行采样比例 | 0.6-1.0，防过拟合 |
| `colsample_bytree` | 列采样比例 | 0.6-1.0，防过拟合 |
| `min_child_weight` | 叶节点最小样本权重 | 1-10 |

## 调参流程

推荐分三步迭代：

1. **学习曲线**：固定参数，逐步增加 n_estimators，观察 train/val 指标分离点确定最佳树数量
2. **网格搜索**：用 `GridSearchCV` 或 `Optuna` 搜索 max_depth、learning_rate、subsample 组合
3. **早停**：设置 `early_stopping_rounds=50`，在验证集上自动停止训练

```python
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit

model = xgb.XGBRegressor(
    max_depth=6,
    learning_rate=0.05,
    n_estimators=1000,
    subsample=0.8,
    colsample_bytree=0.8,
    early_stopping_rounds=50
)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=50)
```

## 评估指标

- **RMSE**：均方根误差，对大误差敏感，适合异常值重要的场景
- **MAE**：平均绝对误差，更稳健
- **R2**：决定系数，1 为完美拟合
- **MAPE**：平均绝对百分比误差，适合跨量级比较，但真实值为 0 时无定义

## 常见坑

- **时序数据泄露**：禁止用未来数据做特征，train/val 划分必须按时间顺序
- **类别不平衡**：二分类任务设置 `scale_pos_weight` 或用 SMOTE
- **缺失值处理**：XGBoost 原生支持缺失值，但特征工程中 `rolling()` 产生的 NaN 需用 `fillna` 或 `bfill` 处理
- **特征重要性偏差**：`feature_importance='weight'` 偏向高基数特征，建议用 `gain` 或 SHAP 值
