// 个人信息数据 - 请替换为您的真实信息

export const profileData = {
  // 基础信息
  name: "张琪（kiakizhang）",
  title: "产品经理 / AI 探索者",
  bio: "真诚、生命力、探索",
  
  // 个人标签
  tags: [
    { label: "AI产品经理", color: "blue" },
    { label: "idea实践者", color: "purple" },
    { label: "终身学习者", color: "green" },
    { label: "纯文科生vibe-coding", color: "orange" },
    { label: "自媒体博主", color: "pink" },
    { label: "个人工作室负责人", color: "yellow" },
  ],
  
  // 核心优势
  strengths: [
    {
      title: "C端产品应用解决方案",
      description: "理解用户需求，提供符合预算并解决商业/业务痛点的解决方案",
    },
    {
      title: "B端HR领域产品策划",
      description: "半年鹅厂HR人事系统、SSC智能问询（AI）工作经历",
    },
    {
      title: "AI workflow&Agent",
      description: "过往经验：RAG、multi-agent、memory、COT、badcase沉淀及反哺训练、异常处理机制、兜底机制、评价标准等，推动产品持续迭代优化",
    },
    {
      title: "商业模式研究",
      description: "点石创校优秀营员、和君校友，有产业、金融、资本思维基础，具备良好的商业思维与洞察力、行动力",
    },
    {
      title: "AI社交与陪伴",
      description: "社交'钩子'，多轮对话、上下文记忆、prompt等",
    },
    {
      title: "多边探索与实践",
      description: "团队游戏创作中、电商agent制作中，欢迎交流",
    },
  ],

  
  // 职业历程
  career: [
    {
      company: "腾讯",
      role: "产品策划",
      period: "2025.7- 2026.1",
      description: "提升HR领域问询、入职、质检、人事系统等平台的AI应用能力，产品调研、B端设计、数据权限，产出高保真与prd",
      logo: "/company-placeholder.png",
    },
    {
      company: "武汉微派",
      role: "AI产品经理",
      period: "2024.4-2024.6",
      description: "推动社交陪伴类产品上线，通过模型微调做真人语音房陪聊，涉及情感陪伴、社交对话等方面",
      logo: "/company-placeholder.png",
    }
  ],
  
  // 荣誉成就
  achievements: [
    {
      title: "三创跨境电商国赛一等奖",
      year: "2025",
      description: "数据分析、跨境电商、营销",
      icon: "📜",
    },
    {
      title: "Datawhale优秀营员",
      year: "2024",
      description: "为AI开源社区作出持续贡献",
      icon: "🎤",
    },   
    {
      title: "和君校友",
      year: "2024",
      description: "产业、战略、金融、资本知识基础",
      icon: "🎓",
    },
    {
      title: "点石CEO训练营优秀营员",
      year: "2023",
      description: "更棒的批判性思维与商业化思考",
      icon: "🏆",
    },
  ],
  
  /// 活动经历
activities: [
  {
    title: "AI creators",
    type: "参与",
    date: "2025.11",
    description: "参与AI产品工作坊，一下午将idea0-1落地",
    image: "/personal-portfolio/AI%20creators.jpg",  // 空格用 %20
  },
  {
    title: "wteam AI创客节",
    type: "参与",
    date: "2025.8",
    description: "了解并体验更多有趣的AI产品，学习AI原生pm思维",
    image: "/personal-portfolio/创客节.jpg",
  },
  {
    title: "看到100个优秀的世界",
    type: "组织并演讲",
    date: "2025.4",
    description: "在社群组织创业及就业分享讨论，吸引100+人",
    image: "/personal-portfolio/演讲.jpg",
  },
  {
    title: "荣耀GT销售精英奖",
    type: "领奖并演讲",
    date: "2025.3",
    description: "创意人气奖+招聘直通卡",
    image: "/personal-portfolio/荣耀.jpg",
  },
  {
    title: "LET'S VISION",
    type: "参与",
    date: "2025.3",
    description: "了解苹果VRXR生态下，有趣的idea和产品",
    image: "/personal-portfolio/visionpro.jpg",
  },
],

  
  // AI 思考
  aiThoughts: [
    {
      title: "AI 不会取代产品经理，但会改变产品经理的工作方式",
      content: "AI 是工具，产品经理的核心价值在于理解人性、洞察需求。AI 能帮助我们更高效地验证想法，但创造性思维和同理心仍是不可替代的。",
    },
    {
      title: "从功能设计到体验设计的转变",
      content: "AI 时代的产品设计不再是简单的功能堆砌，而是如何让 AI 能力自然地融入用户的使用场景，创造无感知但有价值的体验。",
    },
    {
      title: "AI Agent价值在TOB，TOC要建立垂直领域数据护城河",
      content: "持续构建护城河-做自己的模型-吸收更多用户数据-优化模型-给用户带来更强的体验",
    },
  ],
  
// 社交媒体
socialMedia: [
  {
    platform: "微信",
    icon: "wechat",
    qrCode: "/personal-portfolio/weixin.jpg",
    description: "欢迎微信交流",
  },
  {
    platform: "公众号",
    icon: "wechat-official",
    qrCode: "/personal-portfolio/公众号.jpg",
    description: "记录日常活动及思考",
  },
  {
    platform: "播客",
    icon: "podcast",
    qrCode: "/personal-portfolio/boke.jpg",
    description: "收听我的播客节目",
  },
  {
    platform: "B站",
    icon: "bilibili",
    qrCode: "/personal-portfolio/bilibili.jpg",
    description: "欢迎 B 站账号",
  },
  {
    platform: "CSDN",
    icon: "csdn",
    qrCode: "/personal-portfolio/CSDN.jpg",
    description: "访问 CSDN 博客",
  },
],
};
