export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string | '至今'
  description: string[]
}

export interface Education {
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
}

export interface ResumeData {
  name: string
  title: string
  phone: string
  email: string
  github: string
  location: string
  summary: string
  skills: { [category: string]: string[] }
  workExperiences: WorkExperience[]
  education: Education[]
  awards: string[]
}

export const resumeData: ResumeData = {
  name: '陈熙贤',
  title: '智能制造工程师 / AI应用工程师',
  phone: '13790613670',
  email: '23xxchen@stu.edu.cn',
  github: 'https://github.com/23xxCh',
  location: '汕头 / 东莞 / 广州 / 深圳',
  summary: '汕头大学智能制造工程专业学生，2027年毕业。具备扎实的机械设计与AI开发能力，熟练使用SolidWorks/CREO进行结构设计，有丰富的AI Agent开发经验和ROS2机器人项目实践。挑战杯广东省一等奖获得者，自驱力强，善于跨领域协作。',
  skills: {
    '机械设计': ['SolidWorks', 'CREO', 'UG建模', 'AutoCAD', 'Moldex模流分析'],
    'AI / 编程': ['Python', 'Claude Code', 'Codex', 'AI Agent开发', '机器学习', '机器视觉'],
    '机器人 / 嵌入式': ['ROS2', 'ESP32', '嵌入式开发', 'PLC（博途）'],
    '仿真 / 分析': ['MATLAB', '信号与系统', '数据分析与建模'],
    '其他': ['Office办公软件', '英语四级（462分）', 'PCB画板（嘉立创）', '伏图软件'],
  },
  workExperiences: [
    {
      company: '伟易达（东莞）电子产品有限公司',
      position: '机械结构实习生',
      startDate: '2026-07',
      endDate: '2026-08',
      description: [
        '了解玩具电子产品生产产线流程',
        '学习CREO建模与模具设计知识',
        '参与产品结构设计与优化',
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
    },
  ],
  awards: [
    '挑战杯广东省省赛一等奖 —— "一鉴钟氢"（基于光声衰荡光谱的氢气检测技术）',
  ],
}
