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
  {
    id: 'openclaw-industrial-agent',
    title: 'OpenClaw 工业 AI Agent',
    description: '基于大语言模型的工业智能体，具备知识检索、任务规划和自动化执行能力。',
    techStack: ['Python', 'LLM', 'AI Agent', 'RAG'],
    category: 'ai',
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
  {
    id: 'xiaozhi-ai-robot',
    title: '小智AI对话机器人',
    description: '基于小智AI与ESP32的智能对话机器人，实现语音交互与云端推理。',
    techStack: ['ESP32', 'Python', 'AI', '嵌入式'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'car-data-analysis',
    title: '汽车数据分析与预测',
    description: '对汽车数据进行清洗、分析与建模，使用机器学习算法进行销量预测。',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'MATLAB'],
    category: 'data',
    githubUrl: 'https://github.com/23xxCh',
    featured: false,
  },
  {
    id: 'bridge-analysis',
    title: '桥梁静力学分析',
    description: '使用伏图软件进行桥梁结构的静力学仿真分析，验证结构安全性。',
    techStack: ['伏图软件', '结构分析'],
    category: 'mechanical',
    featured: false,
  },
  {
    id: 'industrial-copilot',
    title: 'Industrial AI Copilot',
    description: '面向智能制造场景的AI辅助工具，帮助工程师快速查询工艺参数和技术文档。',
    techStack: ['Python', 'LLM', 'RAG', 'FastAPI'],
    category: 'ai',
    githubUrl: 'https://github.com/23xxCh',
    featured: true,
  },
  {
    id: 'pcb-design',
    title: '嘉立创PCB电路板设计',
    description: '独立完成PCB原理图绘制与Layout，通过嘉立创打样验证。',
    techStack: ['嘉立创EDA', 'PCB设计'],
    category: 'other',
    featured: false,
  },
  {
    id: 'plc-program',
    title: 'PLC控制程序',
    description: '使用博途软件编写PLC梯形图程序，实现自动化控制逻辑。',
    techStack: ['博途', 'PLC', '梯形图'],
    category: 'mechanical',
    featured: false,
  },
]
