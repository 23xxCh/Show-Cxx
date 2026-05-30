---
title: "AI Agent开发工具链"
date: "2026-05-28"
tags: ["AI Agent", "工具链", "开发环境"]
published: true
---

AI Agent 开发涉及 LLM 选型、记忆存储、框架集成、工具编排等多个环节。以下为 2026 年主流工具链速查。

## LLM API 对比

| 提供商 | 模型 | 上下文窗口 | 特点 |
|--------|------|------------|------|
| OpenAI | GPT-4o / o3 | 128K / 200K | 生态成熟，function calling 完善 |
| Anthropic | Claude Opus 4 / Sonnet 4 | 200K | 长文本理解强，安全对齐好 |
| 本地模型 | Qwen3 / Llama 4 / DeepSeek | 128K+ | 无 API 成本，隐私可控，需 GPU |

选择建议：生产环境优先考虑 API 稳定性和合规性；对延迟敏感或数据敏感场景使用本地模型。

## 向量数据库选型

| 数据库 | 类型 | 部署方式 | 适用场景 |
|--------|------|----------|----------|
| Chroma | 嵌入式 | pip install | 本地开发、快速原型 |
| FAISS | 库 | CPU/GPU | 大规模纯检索、学术研究 |
| Milvus | 分布式 | Docker/K8s | 生产环境、亿级向量 |
| Pinecone | 托管 | SaaS | 无运维、小团队快速上线 |
| pgvector | 插件 | PostgreSQL | 已有 PG 基础设施、混合查询 |

## Agent 框架对比

| 框架 | 核心特点 | 适用场景 |
|------|----------|----------|
| LangChain | 生态丰富、组件化 | 快速原型、RAG 应用 |
| LangGraph | 状态图驱动、支持循环 | 复杂工作流、多步推理 |
| AutoGen | 多 Agent 对话 | 协作任务、代码生成 |
| CrewAI | 角色扮演、团队协作 | 多角色分工、流程自动化 |

LangGraph 目前是构建生产级 Agent 的推荐选择，支持断点恢复和人机协作节点。

## 开发工具

**LangSmith**：Trace 可视化、评估数据集管理、性能监控。调试 Agent 调用链的首选工具。

**LangServe**：将 LangChain 链一键部署为 REST API，适合内部工具快速上线。

**其他工具**：
- PromptLayer / Helicone：Prompt 版本管理和 A/B 测试
- LiteLLM：统一 API 适配层，一个接口调用多个 LLM
- Instructor：结构化输出（JSON Schema）的最佳实践封装

## Prompt Engineering 技巧

| 技术 | 说明 | 适用场景 |
|------|------|----------|
| Few-shot | 提供示例引导输出格式 | 格式化输出、分类任务 |
| CoT (Chain-of-Thought) | 引导逐步推理 | 复杂逻辑推理 |
| ReAct | Reasoning + Acting 交替 | Agent 工具调用 |
| ToT (Tree-of-Thought) | 多路径搜索 | 开放性问题、规划 |

实际项目中通常组合使用，例如 ReAct + Few-shot 是 Agent 工具调用的经典搭配。

## 本地开发环境

**GPU 选择**：
- 入门：RTX 4060 Ti 16GB — 可跑 7B 全量、14B Q4 量化
- 进阶：RTX 4090 24GB — 可跑 14B 全量、70B Q4 量化
- 专业：A100 80GB / H100 — 支持 70B+ 全量推理和微调

**模型量化**：使用 GGUF 格式 + llama.cpp 运行，Q4_K_M 在质量和速度之间取得平衡。Ollama 简化了本地模型管理流程：

```bash
ollama pull qwen3:14b
ollama run qwen3:14b
```

**依赖管理**：推荐使用 `pyproject.toml` + `uv` 管理 Python 依赖，比 pip 快 10-100 倍，且支持锁定版本。
