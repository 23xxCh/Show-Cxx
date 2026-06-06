export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string | '至今'
  location?: string
  description: string[]
}

export interface Education {
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  courses?: string[]
  details?: string[]
}

export interface ProjectExperience {
  name: string
  role: string
  period?: string
  summary: string
  highlights: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  assetUrl?: string
}

export interface ResumeData {
  name: string
  title: string
  phone: string
  email: string
  github: string
  website: string
  location: string
  graduation: string
  summary: string
  jobTargets: string[]
  strengths: string[]
  skills: { [category: string]: string[] }
  projectExperiences: ProjectExperience[]
  workExperiences: WorkExperience[]
  education: Education[]
  awards: string[]
}

export const resumeData: ResumeData = {
  name: '陈熙贤',
  title: '智能制造工程 / AI 应用 / ROS 开发方向实习生',
  phone: '13790613670',
  email: '23xxchen@stu.edu.cn',
  github: 'https://github.com/23xxCh',
  website: 'https://show-cxx.pages.dev/',
  location: '汕头 / 东莞 / 广州 / 深圳',
  graduation: '2027 届',
  summary:
    '汕头大学智能制造工程专业本科生，面向 2027 届实习求职，关注智能制造、工业 AI、数字孪生、机器人与 AI 应用落地。具备机械结构设计、工业数据分析、AI Agent 开发与 ROS2 项目实践经验，能够在制造场景中结合软件、硬件与工程流程推进问题分析和原型实现。',
  jobTargets: [
    '智能制造工程师',
    '前沿部署工程师',
    '机械工程师',
    '机械结构工程师',
    'AI 应用工程师',
    'ROS 开发工程师',
  ],
  strengths: [
    '机械设计与 AI 开发双栈交叉，能在结构、数据和软件之间快速切换。',
    '自驱力强，能够围绕一个方向持续拆解问题、补足资料并推进落地。',
    '外向且协作意识强，愿意主动沟通需求、同步进展，适合项目制与跨团队配合。',
    '对工业 AI、数字孪生和制造业智能化保持长期兴趣，项目选择与求职方向一致。',
  ],
  skills: {
    '机械设计 / 制造': ['SolidWorks', 'CREO', 'UG 建模', 'AutoCAD', 'Moldex 模流分析', '产品结构基础', '模具基础认知'],
    'AI / 智能体': ['Claude Code', 'Codex', 'LangChain', 'RAG', 'AI Agent 开发', 'Prompt Engineering', 'LLM API'],
    '机器人 / 嵌入式': ['ROS2', 'ESP32', '嵌入式开发基础', '传感器集成', 'PLC 基础', 'TIA Portal / 博途了解'],
    '工业数据 / 算法': ['Python', 'MATLAB', 'XGBoost', '时序分析', '数据建模', '机器学习基础'],
    '视觉 / 电子': ['YOLO', 'OpenCV', '机器视觉原理', '嘉立创 PCB 画板'],
    '工程协作 / 办公': ['Office', 'GitHub', '文档整理', '英语四级 462 分'],
  },
  projectExperiences: [
    {
      name: 'OpenClaw 工业 AI Agent',
      role: '项目设计与开发',
      summary:
        '围绕工业知识检索、任务拆解和工具调用场景，持续搭建面向制造业的 AI Agent 原型，作为个人在工业 AI 与智能体方向的核心实践。',
      highlights: [
        '面向工业场景拆分知识问答、任务规划和自动化执行需求，设计 RAG + Tool Use + 多 Agent 协作方案。',
        '结合本地项目与工程资料组织知识底座，提升技术文档检索和复杂任务分解的可操作性。',
        '在持续迭代中沉淀出对工业 AI 落地方式的理解，为后续部署工程、知识助手和现场应用打基础。',
      ],
      techStack: ['Python', 'LangChain', 'RAG', 'LLM', 'Multi-Agent'],
    },
    {
      name: '基于 ROS2 的氢气检测小车',
      role: '课程 / 竞赛项目成员',
      period: '挑战杯相关项目',
      summary:
        '面向氢气检测场景完成 ROS2 小车项目实践，关注移动平台、传感器协同与任务执行流程。',
      highlights: [
        '围绕检测任务梳理小车系统所需的移动、感知和执行模块，完成 ROS2 方向的项目实践。',
        '在项目推进中接触机器人通信、节点组织和场景任务设计，补足智能制造与机器人结合的工程理解。',
        '项目与挑战杯一等奖课题方向关联，体现了将检测需求转化为工程原型的能力。',
      ],
      techStack: ['ROS2', 'Python', 'C++', '传感器集成'],
      assetUrl: 'E:\\WORKS\\H2检测\\挑战杯省赛提交\\1.申报书0325.pdf',
    },
    {
      name: '小智 AI 与 ESP32 对话机器人',
      role: 'AI Agent / 嵌入式方向实践',
      summary:
        '基于小智 AI 与 ESP32 系列硬件完成对话机器人方向探索，把语音交互、LLM 能力与设备控制结合到同一系统中。',
      highlights: [
        '围绕唤醒、语音识别、模型交互、语音播报和设备控制链路理解嵌入式 AI 对话系统架构。',
        '把 AI 能力从纯软件交互扩展到硬件终端，强化了自己在 AI 应用落地与智能硬件结合上的认识。',
        '该项目支撑了个人对 AI 玩具、机器人交互与边缘侧应用的持续兴趣。',
      ],
      techStack: ['ESP32', '语音交互', 'LLM', '嵌入式'],
    },
    {
      name: '智能装备健康管理系统（IEHM）',
      role: '项目设计与实现',
      summary:
        '针对工业设备健康管理场景，完成从多设备时序数据模拟到剩余寿命预测和故障诊断展示的一体化原型。',
      highlights: [
        '构建 CNC、织机和机械臂等设备的模拟数据场景，面向预测性维护任务组织数据分析流程。',
        '使用 XGBoost 进行剩余寿命预测，并结合大模型生成故障诊断报告，形成数据分析 + AI 解释的组合方案。',
        '以工业风看板和数字孪生展示思路呈现结果，强化了个人对工业 AI 可视化与业务表达的理解。',
      ],
      techStack: ['Python', 'XGBoost', 'FastAPI', 'WebSocket', '数字孪生'],
      githubUrl: 'https://github.com/23xxCh/auto-prediction',
    },
    {
      name: 'MES 数字孪生产线系统',
      role: 'Web 数字孪生方向实践',
      summary:
        '围绕工厂产线可视化与实时状态表达，探索 Web 端数字孪生系统设计，贴合个人对制造业数字化的长期兴趣。',
      highlights: [
        '从产线视角组织设备、工位、状态与数据流的映射关系，形成数字孪生系统的前端表达思路。',
        '结合 Three.js、React 和实时通信设计交互方向，补足自己对工业可视化系统架构的理解。',
        '该项目与智能制造岗位需求高度相关，可作为工业软件与部署类岗位的作品支撑。',
      ],
      techStack: ['React', 'Three.js', 'Zustand', 'WebSocket'],
      githubUrl: 'https://github.com/23xxCh/MES-digital-twins',
    },
    {
      name: '汽车数据分析与建模预测',
      role: '课程项目',
      summary:
        '围绕汽车数据完成分析、建模与预测练习，提升了自己在数据清洗、特征理解和结果表达方面的基础能力。',
      highlights: [
        '针对车辆相关数据完成分析与建模流程练习，形成从问题定义到预测输出的完整闭环。',
        '在项目中强化了机器学习建模、结果解释和面向业务场景讲清结论的能力。',
      ],
      techStack: ['Python', '数据分析', '机器学习'],
      githubUrl: 'https://github.com/23xxCh/Car-anasys',
    },
  ],
  workExperiences: [
    {
      company: '伟易达（东莞）电子产品有限公司',
      position: '机械结构实习生',
      startDate: '2025-07',
      endDate: '2025-08',
      location: '东莞',
      description: [
        '在暑期实习中围绕玩具电子产品结构开发与量产流程进行学习，重点了解产线协作、结构设计与模具基础知识。',
        '结合 CREO 建模训练，熟悉从结构思路到工程表达的基础过程，补足课堂之外对企业研发流程的认识。',
        '通过接触生产现场与模具相关内容，形成了对机械结构岗位工作场景、跨部门配合方式和制造约束的更直观理解。',
      ],
    },
  ],
  education: [
    {
      school: '汕头大学',
      degree: '本科',
      major: '智能制造工程',
      startDate: '2023-09',
      endDate: '2027-06',
      courses: ['精益生产', '先进制造', '机器人技术', '信号与系统', '产品设计', '机器学习', '嵌入式', '机器视觉原理'],
      details: ['2027 届', '申请智能制造、机械结构、工业 AI、ROS 开发等方向实习岗位'],
    },
  ],
  awards: [
    '挑战杯广东省省赛一等奖《一鉴钟氢》：基于光声衰荡光谱的氢气检测技术。',
    '全国大学英语四级（CET-4）462 分。',
  ],
}
