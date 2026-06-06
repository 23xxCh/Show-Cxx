export type ProjectCategory =
  | 'fullstack'
  | 'ai'
  | 'robotics'
  | 'mechanical'
  | 'data'
  | 'other'

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  category: ProjectCategory
  liveUrl?: string
  githubUrl?: string
  image?: string
  featured: boolean
  sourceLabel?: string
  sourceNote?: string
}

export const projects: Project[] = [
  {
    id: 'openclaw-industrial-agent',
    title: 'OpenClaw 工业 AI Agent',
    description:
      '面向制造业知识检索、任务规划和工具调用场景持续迭代的工业 AI Agent 原型，聚焦 RAG、Tool Use 与多 Agent 协作。',
    techStack: ['Python', 'LangChain', 'RAG', 'LLM', 'Multi-Agent'],
    category: 'ai',
    featured: true,
    sourceLabel: '本地原型',
    sourceNote: '已作为个人工业 AI 主线项目持续迭代，当前以本地工程形态推进。',
  },
  {
    id: 'mes-digital-twins',
    title: 'MES 数字孪生产线系统',
    description:
      '围绕工厂产线可视化和实时状态表达构建的 Web 数字孪生项目，聚焦设备、工位和生产流的在线映射。',
    techStack: ['React', 'Three.js', 'Zustand', 'WebSocket', '数字孪生'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/MES-digital-twins',
    featured: true,
    sourceLabel: '公开仓库',
    sourceNote: '与数字孪生、工业软件和部署类岗位高度相关。',
  },
  {
    id: 'auto-prediction',
    title: '智能装备健康管理系统（IEHM）',
    description:
      '面向预测性维护场景，模拟多设备时序数据，使用 XGBoost 预测剩余寿命，并结合大模型生成故障诊断报告与工业风看板。',
    techStack: ['Python', 'XGBoost', 'FastAPI', 'WebSocket', 'LLM'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh/auto-prediction',
    featured: true,
    sourceLabel: '公开仓库',
    sourceNote: '兼具工业数据分析、算法建模与结果展示能力。',
  },
  {
    id: 'yolo-detect',
    title: '纺织布面缺陷视觉检测',
    description:
      '面向纺织布面质检的视觉检测原型，支持多类缺陷识别，并结合 LLM 生成结构化检测说明。',
    techStack: ['YOLOv8', 'Python', 'OpenCV', '机器视觉', 'MiniMax LLM'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh/YOLO-detect',
    featured: true,
    sourceLabel: '公开仓库',
    sourceNote: '体现机器视觉与 AI 报告生成的组合能力。',
  },
  {
    id: 'xiaozhi-ai-robot',
    title: '小智 AI 与 ESP32 对话机器人',
    description:
      '围绕唤醒、语音识别、LLM 交互、语音播报与设备控制链路搭建的嵌入式对话机器人方向实践。',
    techStack: ['ESP32', '语音交互', 'LLM', '嵌入式', 'MCP'],
    category: 'robotics',
    featured: true,
    sourceLabel: '本地项目',
    sourceNote: '主要用于验证 AI 能力在硬件终端上的落地方式。',
  },
  {
    id: 'ros2-hydrogen-car',
    title: 'ROS2 氢气检测小车',
    description:
      '基于 ROS2 的检测小车课程 / 竞赛项目，围绕移动平台、传感器协同和任务执行完成机器人方向实践。',
    techStack: ['ROS2', 'Python', 'C++', '传感器集成'],
    category: 'robotics',
    featured: true,
    sourceLabel: '课程 / 竞赛项目',
    sourceNote: '与挑战杯相关项目方向关联，可补充机器人和检测场景经历。',
  },
  {
    id: 'typescript-system',
    title: '个人全栈创作空间',
    description:
      '基于 Next.js 和 TypeScript 的个人网站，整合博客、笔记、作品集、简历、搜索、主题切换与 RSS Feed。',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/Show-Cxx',
    liveUrl: 'https://show-cxx.pages.dev/',
    featured: false,
    sourceLabel: '公开仓库 + 在线站点',
    sourceNote: '当前在线简历与作品集承载页。',
  },
  {
    id: 'industrial-knowledge-assistant',
    title: '工业知识助手',
    description:
      '基于 RAG 的制造业知识问答系统，支持技术文档检索、语义召回和面向工程场景的智能问答。',
    techStack: ['Vue', 'Python', 'RAG', 'LLM'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh/industrial-knowledge-assistant',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'industrial-ai-copilot',
    title: 'Industrial AI Copilot',
    description:
      '服务智能制造场景的 AI 助手原型，关注工艺参数查询、技术文档理解与工程场景辅助决策。',
    techStack: ['Python', 'FastAPI', 'RAG', 'Docker', 'K8s'],
    category: 'ai',
    featured: false,
    sourceLabel: '本地原型',
    sourceNote: '偏向工业文档与知识助手方向。',
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer Skill',
    description:
      '面向 Claude Code 的提示词优化技能，围绕结构化约束设计提升模型输出稳定性和任务执行质量。',
    techStack: ['Python', 'Prompt Engineering', 'Claude Code'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh/-prompt-engineer-SKILL',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'moldex3d-mcp',
    title: 'Moldex3D MCP Server & Skill',
    description:
      '让 AI Agent 调用 Moldex3D 进行模流分析的 MCP 服务与技能组合，连接 CAE 与智能体工作流。',
    techStack: ['Python', 'MCP', 'Moldex3D', 'CAE'],
    category: 'mechanical',
    githubUrl: 'https://github.com/23xxCh/moldex3d-mcp-skill',
    featured: false,
    sourceLabel: '公开仓库',
    sourceNote: '机械设计与 AI 工具链结合的代表项目。',
  },
  {
    id: 'agv-example',
    title: 'AGV 小车学习项目',
    description:
      '围绕 AGV 底盘控制和基础路径规划展开的练习项目，用于打牢移动机器人方向的工程基础。',
    techStack: ['C++', 'AGV', '路径规划'],
    category: 'robotics',
    githubUrl: 'https://github.com/23xxCh/AGV-example',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'oee-monitor',
    title: 'OEE 监控与智能排产系统',
    description:
      '结合 OEE 设备效率监控和 OR-Tools 排产策略的工业分析平台，用于产线调度与效率改进。',
    techStack: ['Python', 'OR-Tools', 'OEE', '智能排产'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh/OEE-monitor-scheduling',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'car-analysis',
    title: '汽车数据分析与建模预测',
    description:
      '围绕汽车数据完成分析、建模与预测练习，用数据驱动方式理解产品特征和结果表达。',
    techStack: ['Python', '数据分析', '机器学习'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh/Car-anasys',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'r-system-job',
    title: 'R 语言求职市场数据分析',
    description:
      '使用 R 语言分析智能制造相关岗位招聘数据，关注应届生求职方向与技能需求变化。',
    techStack: ['R', '数据分析', '可视化'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh/R-system-job',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'for-teacher',
    title: '研究生报告管理系统',
    description:
      '面向导师端的 Web 应用，支持学生上传报告、文档检索、AI 摘要评审与进度跟踪。',
    techStack: ['TypeScript', 'Web', 'AI', '文档管理'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/For-Teacher',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'java-system',
    title: '多人协作在线看板',
    description:
      '基于 Java 的多人任务看板系统，用于协作管理、任务状态追踪与基础流程协调。',
    techStack: ['Java', '协作系统'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/JAVA-system',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'digital-system',
    title: '数字系统课程项目集合',
    description:
      '围绕数字系统课程与工程实践整理的项目集合，用于补充课程型技术积累。',
    techStack: ['Python', '数字系统'],
    category: 'fullstack',
    githubUrl: 'https://github.com/23xxCh/digital-system',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'bridge-static-analysis',
    title: '桥梁静力学分析',
    description:
      '基于伏图软件完成桥梁静力学分析练习，强化受力分析、建模理解与工程结果表达。',
    techStack: ['结构分析', '课程项目'],
    category: 'mechanical',
    featured: false,
    sourceLabel: '课程项目',
  },
  {
    id: 'pcb-design',
    title: '嘉立创 PCB 画板实践',
    description:
      '围绕电子硬件方向完成 PCB 画板练习，补充智能硬件与嵌入式相关工程基础。',
    techStack: ['PCB', '嘉立创EDA', '硬件基础'],
    category: 'mechanical',
    featured: false,
    sourceLabel: '课程 / 个人实践',
  },
  {
    id: 'claude-code-portable',
    title: 'Claude Code Portable',
    description:
      '面向工厂设备调试场景的便携工具集，尝试引入 AI 能力辅助 PLC / CNC 现场排障。',
    techStack: ['Batchfile', 'PLC', 'DeepSeek API'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh/claude-code-portable',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'cli-wps',
    title: 'AI Agent 操作 WPS 的命令行工具',
    description:
      '通过 COM 自动化控制 WPS Writer、Calc 与 Impress 的 CLI 工具，方便 Agent 执行办公流程。',
    techStack: ['Python', 'COM 自动化', 'WPS'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh/cli-wps',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'superoffice',
    title: 'AI Office Automation Skills',
    description:
      '面向办公自动化场景的 AI 技能集合，用于提高文档处理与流程执行效率。',
    techStack: ['Python', 'AI', '办公自动化'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh/superoffice',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'superpaper',
    title: 'Academic Research Skills',
    description:
      '面向学术研究流程的技能集合，覆盖 research、write、review、revise 等环节。',
    techStack: ['Python', 'NLP', '文本处理'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh/superpaper',
    featured: false,
    sourceLabel: '公开仓库',
  },
  {
    id: 'ai-toy',
    title: 'AI 玩具开发探索',
    description:
      '围绕 AI 玩具原型、交互体验与硬件联动展开的探索项目集合，连接实习经历与个人兴趣方向。',
    techStack: ['Python', 'AI', '硬件交互'],
    category: 'other',
    githubUrl: 'https://github.com/23xxCh/AI-TOY',
    featured: false,
    sourceLabel: '公开仓库',
  },
]
