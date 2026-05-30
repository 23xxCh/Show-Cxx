export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  category: 'fullstack' | 'ai' | 'robotics' | 'mechanical' | 'data' | 'other'
  liveUrl?: string
  githubUrl?: string
  image?: string
  featured: boolean
}

export const projects: Project[] = [
  // ===== AI Agent / 大模型 =====
  {
    id: 'openclaw-industrial-agent',
    title: 'OpenClaw 工业 AI Agent',
    description: '基于大语言模型的工业智能体，具备知识检索、任务规划和自动化执行能力。支持多Agent协作、Tool Use、RAG知识库。',
    techStack: ['Python', 'LangChain', 'LLM', 'AI Agent', 'RAG'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'industrial-ai-copilot',
    title: 'Industrial AI Copilot',
    description: '面向智能制造场景的AI辅助工具，帮助工程师快速查询工艺参数和技术文档。含FastAPI后端、Docker部署、K8s编排。',
    techStack: ['Python', 'FastAPI', 'LLM', 'RAG', 'Docker', 'K8s'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'industrial-knowledge-assistant',
    title: '工业知识助手',
    description: '工业领域知识问答系统，基于RAG架构实现技术文档检索与智能问答。',
    techStack: ['Python', 'RAG', '向量数据库', 'LLM'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'mutiagent-argue',
    title: '多智能体辩论系统',
    description: '多Agent协作辩论框架，实现多个AI智能体围绕议题进行观点交锋与总结。',
    techStack: ['Python', 'Multi-Agent', 'LLM', 'Prompt Engineering'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer Skill',
    description: 'Claude Code技能：通过结构化提问优化Prompt，提升LLM输出质量。',
    techStack: ['Python', 'Prompt Engineering', 'Claude Code'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'llm-wiki',
    title: 'LLM WIKI',
    description: '大语言模型知识库，整理LLM核心概念、架构、训练方法与应用场景。',
    techStack: ['LLM', '知识管理'],
    category: 'ai',
    featured: false,
  },

  // ===== 机器视觉 =====
  {
    id: 'yolo-detect',
    title: '纺织布面缺陷视觉检测',
    description: '为汕头纺织业（祥发网厂）构建的布面缺陷视觉检测原型，支持破洞、污渍、断经、色差4类缺陷实时检测，集成MiniMax LLM生成结构化缺陷报告。',
    techStack: ['YOLOv8', 'Python', 'OpenCV', 'MiniMax LLM', '机器视觉'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'visual-detect',
    title: '工业表面缺陷检测系统',
    description: '基于YOLOv8的工业表面缺陷检测系统，支持多种缺陷类型的实时检测与分类。',
    techStack: ['YOLOv8', 'Python', 'OpenCV', '工业视觉'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'ocr-skill',
    title: 'OCR文字识别技能',
    description: 'OCR文字识别工具，支持图片文字提取与结构化处理。',
    techStack: ['Python', 'OCR', '图像处理'],
    category: 'ai',
    featured: false,
  },

  // ===== 机器人 / 嵌入式 =====
  {
    id: 'xiaozhi-ai-robot',
    title: '小智AI对话机器人',
    description: '基于小智AI与ESP32的智能对话机器人，实现语音交互与云端推理。含完整架构文档与代码注释。',
    techStack: ['ESP32', 'Python', 'AI', '嵌入式', '语音交互'],
    category: 'robotics',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'ros2-hydrogen-car',
    title: 'ROS2 氢气检测小车',
    description: '课程项目：基于ROS2的自主移动氢气检测小车，集成传感器与路径规划。',
    techStack: ['ROS2', 'Python', 'C++', '嵌入式'],
    category: 'robotics',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },

  // ===== 工业 / 数据分析 =====
  {
    id: 'auto-prediction',
    title: '智能装备健康管理系统',
    description: '工业设备预测性维护平台，模拟3台设备传感器时序数据，训练XGBoost模型预测剩余使用寿命（RUL），通过大模型API生成故障诊断报告，工业级HMI数字孪生看板。评分 8.9/10。',
    techStack: ['Python', 'XGBoost', '时序分析', 'LLM', '数字孪生'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'demand-forecast',
    title: '智能需求预测系统',
    description: 'SKU级需求预测 + 安全库存计算 + 库存水位模拟，支持Prophet/XGBoost/移动平均三种方法对比。',
    techStack: ['Python', 'Prophet', 'XGBoost', '数据分析'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'spc-quality-alert',
    title: 'SPC质量预警系统',
    description: '基于统计过程控制的质量预警系统，实现X-bar R控制图、Cpk过程能力计算、异常趋势预警。',
    techStack: ['Python', 'SPC', '统计分析', '质量控制'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'oee-monitor',
    title: 'OEE监控与智能排产系统',
    description: '工业级OEE（设备综合效率）监控平台 + OR-Tools智能排产，对标舍弗勒精益生产需求。',
    techStack: ['Python', 'OR-Tools', 'OEE', '智能排产'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'ecommerce-analysis',
    title: '电商销售数据分析平台',
    description: '完整数据分析平台：数据库 + ETL + API + 可视化看板 + 调度 + Docker部署。含Grafana监控。',
    techStack: ['Python', 'ETL', 'Grafana', 'Docker', '数据分析'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'car-analysis',
    title: '新能源汽车产品分析',
    description: '对210款中国新能源汽车进行数据驱动的产品优化分析，使用机器学习与遗传算法。',
    techStack: ['Python', 'Scikit-learn', '遗传算法', '数据分析'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },

  // ===== 全栈开发 =====
  {
    id: 'typescript-system',
    title: '个人全栈创作空间',
    description: 'Next.js 15 + TypeScript全栈项目，集成博客、笔记、作品集、简历、全局搜索、深色模式、RSS Feed。',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/Show-Cxx',
    liveUrl: 'https://show-cxx.pages.dev',
    featured: false,
  },
  {
    id: 'for-teacher',
    title: '研究生报告管理系统',
    description: '导师端Web应用：学生上传报告（文档、数据、图片、代码），导师AI摘要评审、搜索、进度跟踪。',
    techStack: ['Web', 'AI', '文档管理'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },

  // ===== 创意工具 =====
  {
    id: 'supervideo',
    title: 'AI视频剪辑系统',
    description: '全自动流水线 + 辅助创作工具，实现AI驱动的视频剪辑。',
    techStack: ['Python', 'AI', '视频处理'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'superpaper',
    title: '学术论文去AI味引擎',
    description: '扫描与修复学术论文中的AI生成痕迹，提升论文自然度。',
    techStack: ['Python', 'NLP', '文本处理'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'tts',
    title: 'TTS语音合成',
    description: '文本转语音工具，支持多语言与情感语调。',
    techStack: ['Python', 'TTS', '语音合成'],
    category: 'other',
    featured: false,
  },

  // ===== 其他 =====
  {
    id: 'c-cleaner',
    title: 'C-Cleaner 磁盘清理',
    description: 'Claude Code Skill：Windows磁盘清理与系统优化工具。',
    techStack: ['Python', '系统工具'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: '24h-skill',
    title: '24-H-SKILL 自动化开发',
    description: '24小时自动化开发迭代技能，让AI不知疲倦地为想法工作。',
    techStack: ['Claude Code', '自动化'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
]
