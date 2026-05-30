---
title: "YOLOv8工业部署备忘"
date: "2026-05-22"
tags: ["YOLOv8", "机器视觉", "部署"]
published: true
---

YOLOv8 由 Ultralytics 维护，是当前工业视觉检测的主流选择。本文覆盖从选型到部署的完整流程。

## 模型选型对比

根据算力和精度需求选择合适的模型变体：

| 模型 | 参数量 | mAP@50-95 | 推理速度 (ms) | 适用场景 |
|------|--------|-----------|---------------|----------|
| YOLOv8n | 3.2M | 37.3 | 1.2 | 边缘设备、实时检测 |
| YOLOv8s | 11.2M | 44.9 | 2.3 | 嵌入式部署 |
| YOLOv8m | 25.9M | 50.2 | 5.5 | 平衡型 |
| YOLOv8l | 43.7M | 52.9 | 9.1 | 高精度场景 |
| YOLOv8x | 68.2M | 53.9 | 13.8 | 最高精度 |

## 训练命令

基础训练使用 `yolo detect train`，支持断点续训、数据增强等参数：

```bash
yolo detect train \
    data=data.yaml \
    model=yolov8m.pt \
    epochs=300 \
    imgsz=640 \
    batch=16 \
    patience=50 \
    augment=True \
    project=runs/detect \
    name=my_model
```

## 数据集格式

YOLO 格式为每个图像对应一个 `.txt` 标注文件，每行一个目标：

```
class_id  x_center  y_center  width  height
0         0.5       0.4       0.3    0.6
1         0.2       0.7       0.15   0.25
```

坐标归一化到 [0, 1]，`data.yaml` 定义类别映射：

```yaml
train: ./train/images
val: ./val/images
nc: 2
names: ['defect', 'normal']
```

## 推理代码模板

```python
from ultralytics import YOLO

model = YOLO("best.pt")
results = model.predict(
    source="test_images/",
    conf=0.5,
    iou=0.45,
    save=True
)

for r in results:
    boxes = r.boxes
    for box in boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        print(f"类别: {cls}, 置信度: {conf:.2f}, 位置: {x1:.0f},{y1:.0f},{x2:.0f},{y2:.0f}")
```

## 导出格式

不同部署平台需要不同格式：

```python
# ONNX — 通用格式，适合 OpenCV / ONNX Runtime
model.export(format="onnx", imgsz=640, simplify=True)

# TensorRT — NVIDIA GPU 加速
model.export(format="engine", half=True, workspace=4)

# OpenVINO — Intel 平台优化
model.export(format="openvino", half=True)
```

## 常见问题

**过拟合**：增加数据量、使用 Mosaic/MixUp 增强、降低模型复杂度、添加 dropout。观察 train/val loss 曲线，val loss 上升即为过拟合信号。

**小目标检测**：使用更高分辨率输入（1280）、采用 Tiling 切片策略、在数据集中增加小目标样本比例。

**数据增强**：YOLOv8 默认启用 Mosaic、MixUp、HSV 色彩扰动。工业场景慎用几何变换（旋转/翻转），避免改变缺陷方向特征。
