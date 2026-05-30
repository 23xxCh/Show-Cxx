---
title: "LangChain核心概念速查"
date: "2026-05-20"
tags: ["LangChain", "AI Agent", "速查"]
published: true
---

LangChain 是构建 LLM 应用的主流框架，核心抽象覆盖了从基础调用到智能体编排的完整链路。以下为各模块速查。

## LLM / ChatModel — 基础调用

ChatModel 是当前主流调用方式，统一处理文本和多模态输入。OpenAI、Anthropic、本地模型均通过同一接口调用。

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-4o", temperature=0)
response = llm.invoke([HumanMessage(content="什么是RAG？")])
print(response.content)
```

## PromptTemplate — 提示词模板

PromptTemplate 实现提示词参数化，支持变量替换和 few-shot 示例注入，避免硬编码 prompt。

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}专家"),
    ("human", "请解释{topic}")
])
chain = prompt | llm
result = chain.invoke({"role": "机器学习", "topic": "梯度下降"})
```

## Chain — 链式调用

Chain 将多个组件串联为处理管道。LLMChain 用于简单调用，RetrievalQA 用于检索增强生成（RAG）。

```python
from langchain.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
    chain_type="stuff"
)
answer = qa_chain.invoke("项目使用了哪些技术栈？")
```

## Agent / AgentExecutor — 智能体

Agent 能根据任务动态选择工具和推理路径。AgentExecutor 负责循环调用直到任务完成。

```python
from langchain.agents import create_openai_tools_agent, AgentExecutor

agent = create_openai_tools_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
result = executor.invoke({"input": "查询今天的天气并总结"})
```

## Tool — 工具定义

Tool 为 Agent 提供外部能力，可以是 API 调用、数据库查询或任意 Python 函数。

```python
from langchain_core.tools import tool

@tool
def search_docs(query: str) -> str:
    """搜索内部文档数据库"""
    # 实际检索逻辑
    return f"找到关于 {query} 的文档 3 篇"
```

## Memory — 会话记忆

Memory 管理对话历史，三种常见模式：BufferMemory（全量缓存）、SummaryMemory（摘要压缩）、VectorMemory（向量检索）。

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)
memory.save_context(
    {"input": "你好"},
    {"output": "你好！有什么可以帮助你的？"}
)
```

## Retriever / VectorStore — 检索与向量存储

VectorStore 存储文档向量，Retriever 提供相似度检索接口。常见组合：Chroma + embedding 模型用于本地开发，Milvus/Pinecone 用于生产环境。

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

vector_store = Chroma.from_documents(docs, OpenAIEmbeddings())
retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 5})
results = retriever.invoke("部署流程是什么？")
```
