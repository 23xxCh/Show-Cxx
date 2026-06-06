---
title: "OpenClaw工业AI Agent项目设计与实现"
date: "2026-05-20"
excerpt: "围绕工业知识检索与任务执行场景，完成AI Agent系统设计，包含RAG、工具调用和多智能体协作。"
tags: ["工业AI", "LangChain", "RAG", "多智能体系统", "工业应用"]
published: true
---

## 项目背景

### 工业场景为什么需要 AI Agent

在工厂里工作过一段时间的人都知道一个痛点：**信息获取效率极低。**

一个典型的工厂场景是这样的：产线上出了一个异常，工程师需要翻阅设备手册、查询历史维修记录、查阅工艺参数标准、联系供应商技术支持……这一套流程下来，可能半天时间就过去了。

传统的做法是搭一个 ChatBot，把 FAQ 喂进去，用户问什么就匹配什么。但工业场景的问题在于——**问题的复杂度远超 FAQ 能覆盖的范围。**

```text
传统ChatBot：
  用户："设备报警了怎么办？"
  Bot："请检查以下步骤：1. 重启 2. 检查电源 3. 联系维修"
  → 这种回答在工业场景里基本没用

AI Agent：
  用户："3号注塑机出现E-003报警"
  Agent → 查询设备手册 → 发现是液压压力异常
  Agent → 调取历史记录 → 发现上周有类似案例，是油滤堵塞
  Agent → 生成解决方案 → 包含具体步骤和所需备件清单
  → 这才是工程师真正需要的
```

区别在于：Agent 不只是"回答问题"，而是**理解上下文、调用工具、整合信息、生成可执行方案**。

### OpenClaw 的定位

OpenClaw 的定位是**工业领域的 AI Agent 平台**，目标是：

1. 能够理解工业领域的专业术语和上下文
2. 能够检索和整合多种来源的知识
3. 能够调用外部工具完成具体任务
4. 能够在多 Agent 协作中完成复杂任务

## 整体架构

OpenClaw 的架构分为四层：

```text
┌─────────────────────────────────────────────┐
│              User Interface                  │
│         (Web / API / 嵌入式界面)             │
├─────────────────────────────────────────────┤
│           Agent Orchestrator                 │
│    (LangChain 编排 + 多Agent调度)            │
├─────────────────────────────────────────────┤
│              Tool Layer                      │
│  (数据库查询 / 文件检索 / 计算模块 / 外部API) │
├─────────────────────────────────────────────┤
│            Knowledge Base                    │
│    (向量数据库 + 文档索引 + 结构化数据)       │
└─────────────────────────────────────────────┘
```

### 数据流描述

整个系统的数据流可以描述为：

1. **用户输入** → 自然语言问题（如"3号设备最近一周的异常记录"）
2. **意图识别** → Orchestrator 分析用户意图，决定调用哪些 Agent
3. **知识检索** → 从 Knowledge Base 中检索相关文档和数据
4. **工具调用** → 通过 Tool Layer 查询实时数据库、调用计算模块
5. **信息整合** → 将检索结果和工具返回值整合为上下文
6. **生成回答** → 基于整合后的上下文生成结构化回答

关键设计原则是**每一层都是可插拔的**。知识库可以换不同的向量数据库，工具层可以动态注册新工具，Agent 编排策略也可以灵活调整。

## RAG知识检索实现

### 文档切分策略

工业文档的格式非常多样——PDF 手册、Excel 参数表、Word 工艺文件、甚至扫描的图片。切分策略需要针对不同格式做适配。

我们采用了**混合切分策略**：

```text
切分优先级：
1. 按标题层级切分（保留章节结构）
2. 按段落切分（保持语义完整性）
3. 按固定长度切分（兜底方案，chunk_size=512）

特殊处理：
- 表格数据：单独提取，保留行列结构
- 图片：OCR 提取文字 + 图片描述
- 公式：转换为文字描述
```

### Embedding 模型选择

在中文工业场景下，我们测试了多个 Embedding 模型：

| 模型 | 维度 | 中文语义相似度 | 推理速度 |
|------|------|---------------|---------|
| text2vec-base-chinese | 768 | 0.78 | 快 |
| BAAI/bge-large-zh | 1024 | 0.85 | 中等 |
| m3e-large | 768 | 0.82 | 中等 |

最终选择了 **BAAI/bge-large-zh**，在中文语义理解上有明显优势，推理速度也可以接受。

### 向量数据库设计

```python
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-large-zh")
vectorstore = Chroma(persist_directory="./data", embedding_function=embeddings)
qa_chain = RetrievalQA.from_chain_type(
    llm=chat_model,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    chain_type="stuff"
)
```

这里有几个关键参数需要注意：

- `k=3` 是经过实验验证的最优值。k 太大会引入噪声，k 太小会丢失关键信息
- `chain_type="stuff"` 适合短文档场景。如果上下文较长，需要考虑 `"map_reduce"` 或 `"refine"` 策略
- Chroma 的 `persist_directory` 用于持久化，避免每次重启都重新构建索引

## Tool Use 机制

Agent 的核心能力之一是**调用外部工具**。在 OpenClaw 中，我们定义了三类核心工具：

### 工具定义示例

```python
from langchain.tools import Tool

def query_device_data(query: str) -> str:
    """查询设备实时数据和历史记录"""
    # 连接工业数据库，查询设备状态
    device_id = extract_device_id(query)
    data = industrial_db.query(device_id, time_range="last_7_days")
    return format_device_data(data)

def search_maintenance_manual(query: str) -> str:
    """检索设备维护手册和故障排除指南"""
    results = vectorstore.similarity_search(query, k=3)
    return "\n".join([doc.page_content for doc in results])

def calculate_parameter(parameter: str, conditions: dict) -> str:
    """根据工艺参数和条件进行计算"""
    # 调用工艺计算模块
    result = engineering_calculator.compute(parameter, conditions)
    return f"{parameter} 的计算结果为: {result}"

# 注册工具
tools = [
    Tool(
        name="DeviceDataQuery",
        func=query_device_data,
        description="用于查询设备的实时数据、历史记录和报警信息。输入设备编号或名称。"
    ),
    Tool(
        name="MaintenanceManual",
        func=search_maintenance_manual,
        description="用于检索设备维护手册、故障排除指南和操作规程。输入关键词或问题描述。"
    ),
    Tool(
        name="ParameterCalculator",
        func=calculate_parameter,
        description="用于计算工艺参数。输入参数名称和相关条件。"
    )
]
```

### 工具选择逻辑

Agent 在接收到用户请求后，需要判断应该调用哪些工具。这个过程通过 **LLM 的推理能力** 来实现：

```text
用户："4号注塑机的液压油温偏高，需要检查什么？"

Agent 推理过程：
1. "液压油温偏高" → 需要查设备手册了解正常范围 → 调用 MaintenanceManual
2. "4号注塑机" → 需要查当前温度数据 → 调用 DeviceDataQuery
3. 两者结合 → 生成检查建议
```

## 多Agent协作

当任务复杂度超过单个 Agent 的处理能力时，就需要多 Agent 协作。OpenClaw 采用了**三层 Agent 架构**：

### 规划Agent（Planner）

```text
职责：
- 接收用户请求
- 分析任务复杂度
- 决定是否需要多Agent协作
- 制定执行计划
```

### 执行Agent（Executor）

```text
职责：
- 按照计划调用工具
- 执行具体的检索、查询、计算任务
- 将结果返回给规划Agent
```

### 审查Agent（Reviewer）

```text
职责：
- 检查执行结果的完整性和准确性
- 判断是否需要补充信息
- 生成最终的结构化回答
```

### 协作流程

```text
用户请求
    │
    ▼
Planner 分析任务 → 制定计划
    │
    ├── Agent A：检索设备手册
    ├── Agent B：查询历史数据
    └── Agent C：计算参数阈值
    │
    ▼
Reviewer 审查结果 → 整合输出
    │
    ▼
结构化回答返回用户
```

## 遇到的坑

### RAG召回率低时的调优

最开始上线的时候，RAG 的召回率只有 60% 左右，很多相关文档检索不到。经过排查，发现主要原因有三个：

**问题一：chunk size 不合理**

最初设置的 chunk_size=256，对于工业文档来说太小了。很多工艺参数和说明分散在不同段落中，切得太碎会导致语义断裂。

```text
调优过程：
chunk_size=256 → 召回率 60% → 语义断裂严重
chunk_size=512 → 召回率 75% → 基本可用
chunk_size=1024 → 召回率 82% → 效果最好
但 chunk_size 过大 → 检索速度下降，内存占用增加
最终选择 768 作为平衡点
```

**问题二：纯向量检索不够**

工业文档中有很多**精确匹配**的需求（如设备型号、参数编号），纯向量检索对这类查询的效果不好。

解决方案是引入 **Hybrid Search**（混合检索）：

```python
from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

# BM25 关键词检索
bm25_retriever = BM25Retriever.from_documents(documents)
bm25_retriever.k = 3

# 向量语义检索
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 混合检索，权重 0.3:0.7
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.3, 0.7]
)
```

引入 Hybrid Search 后，召回率从 82% 提升到了 **91%**。

### Agent幻觉控制

LLM 有一个天然的问题：**它会编造不存在的信息。** 在工业场景下，这是非常危险的。

我们通过以下措施来控制幻觉：

```text
1. 严格约束 System Prompt：
   "你只能基于提供的参考资料回答问题。
    如果参考资料中没有相关信息，请明确说明'未找到相关资料'。
    不要推测或编造任何信息。"

2. 强制引用来源：
   每条回答必须标注信息来源（文档名称、页码、数据库表名）

3. 置信度评估：
   Agent 在生成回答时同时输出置信度评分
   低于阈值的回答需要人工确认
```

## 下一步

OpenClaw 目前还处于 MVP 阶段，下一步计划包括：

- **Industrial AI Copilot 整合** — 将 Agent 能力嵌入到现有的工业软件中（如 MES、ERP），让工程师在日常工作界面中直接使用 AI 能力
- **多模态输入** — 支持工程师拍照上传异常现象，结合视觉模型进行分析
- **自学习机制** — 记录用户的反馈和修正，持续优化检索和回答质量

工业 AI Agent 是一个值得长期投入的方向。工厂的数字化转型才刚刚开始，而 AI Agent 会是这个转型过程中的关键推动力。
