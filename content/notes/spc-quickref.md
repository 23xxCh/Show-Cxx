---
title: "SPC统计过程控制速查"
date: "2026-05-26"
tags: ["SPC", "质量控制", "统计分析"]
published: true
---

SPC（Statistical Process Control）是工业质量管控的基础工具，通过控制图实时监控过程稳定性。以下为常用速查内容。

## 控制图类型选择决策树

选择控制图取决于数据类型和子组大小：

- **连续型数据（计量值）**
  - 子组大小 n=2~9：X-bar R 图
  - 子组大小 n>=10：X-bar S 图
  - 单值数据 n=1：I-MR 图（个体值-移动极差）
- **离散型数据（计数值）**
  - 不合格品率：p 图
  - 不合格品数：np 图
  - 缺陷数：c 图
  - 单位缺陷数：u 图

## X-bar R 控制图公式

X-bar 图监控过程均值，R 图监控过程离散程度：

```
X-bar 图:
  CL = X_double_bar (所有子组均值的均值)
  UCL = X_double_bar + A2 * R_bar
  LCL = X_double_bar - A2 * R_bar

R 图:
  CL = R_bar (所有子组极差的均值)
  UCL = D4 * R_bar
  LCL = D3 * R_bar
```

A2、D3、D4 为常数，取决于子组大小 n（n=5 时 A2=0.577, D3=0, D4=2.114）。

## 过程能力指数

| 指标 | 含义 | 适用场景 |
|------|------|----------|
| Cp | 过程精密度（规格宽度/过程波动） | 衡量潜在能力，不考虑中心偏移 |
| Cpk | 过程能力指数（考虑偏移） | 稳态过程评估 |
| Pp | 过程性能指数（整体标准差） | 衡量实际表现，含特殊原因变异 |
| Ppk | 过程性能指数（整体+偏移） | 用于 PPAP 等认证场景 |

Cpk >= 1.33 为基本合格，Cpk >= 1.67 为良好，Cpk >= 2.0 为优秀。

## 8 条判异准则（Western Electric Rules）

1. 1 个点超出 3 sigma 控制限
2. 连续 9 个点在中心线同一侧
3. 连续 6 个点递增或递减（趋势）
4. 连续 14 个点交替上下波动
5. 连续 3 个点中有 2 个在 2 sigma 以外
6. 连续 5 个点中有 4 个在 1 sigma 以外
7. 连续 15 个点在 1 sigma 以内（分层异常）
8. 连续 8 个点在 1 sigma 以外（混合异常）

## Python 实现模板

```python
import numpy as np
import matplotlib.pyplot as plt

def xbar_r_chart(data, subgroup_size=5):
    """data: 一维数组, subgroup_size: 子组大小"""
    n = subgroup_size
    subgroups = data.reshape(-1, n)
    
    x_bar = subgroups.mean(axis=1)
    r = subgroups.max(axis=1) - subgroups.mean(axis=1)
    
    x_double_bar = x_bar.mean()
    r_bar = r.mean()
    
    # 常数表 (n=5)
    A2, D3, D4 = 0.577, 0, 2.114
    
    # X-bar 图控制限
    ucl_x = x_double_bar + A2 * r_bar
    lcl_x = x_double_bar - A2 * r_bar
    
    # R 图控制限
    ucl_r = D4 * r_bar
    lcl_r = D3 * r_bar
    
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))
    
    # X-bar 图
    ax1.plot(x_bar, 'o-', markersize=4)
    ax1.axhline(ucl_x, color='r', linestyle='--', label='UCL')
    ax1.axhline(x_double_bar, color='g', linestyle='-', label='CL')
    ax1.axhline(lcl_x, color='r', linestyle='--', label='LCL')
    ax1.set_title('X-bar Control Chart')
    ax1.legend()
    
    # R 图
    ax2.plot(r, 's-', markersize=4)
    ax2.axhline(ucl_r, color='r', linestyle='--', label='UCL')
    ax2.axhline(r_bar, color='g', linestyle='-', label='CL')
    ax2.axhline(lcl_r, color='r', linestyle='--', label='LCL')
    ax2.set_title('R Control Chart')
    ax2.legend()
    
    plt.tight_layout()
    plt.show()
```
