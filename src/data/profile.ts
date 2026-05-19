// 个人信息数据 - 请替换为您的真实信息

export type CareerItem = {
  company: string;
  role: string;
  period: string;
  description?: string;
  logo?: string;
  // 结构化信息（可选）
  subline?: string;
  techStack?: string;
  highlights?: string[];
};

export type SocialAction =
  | { type: "copy"; value: string; toast?: string }
  | { type: "link"; url: string };

export type SocialMediaItem = {
  platform: string;
  icon: string;
  qrCode: string;
  description: string;
  action?: SocialAction;
};

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
      company: "梦马智能｜海外百万级AI社交产品",
      role: "AI策略产品",
      period: "2026.3-至今",
      // 结构化信息（用于更清晰呈现）
      subline: "洞察与解构用户需求｜抽象产品方案｜A/B思维｜AI优化提效",
      techStack: "模型Prompt工程与能力评估",
      highlights: [
        "0-1搭建舆情监控平台：沉淀运营监控SOP，做数据抓取与看板，提升运营效率",
        "内容治理闭环：优化审核流程，提效12倍；规划产品机制并推动持续迭代",
        "Prompt专项：提示词调优与效果评估，多轮测试归因；推进提示词缓存、token压缩，基于线上数据持续迭代稳定性",
        "海外本地化与增长：跟进东南亚支付本地化；制定测试/ASO策略；建立多地区用户反馈与bug闭环",
      ],
      // 结构化展示时不再额外输出长段落（保留字段以兼容旧逻辑）
      description: "",
      logo: "/company-placeholder.png",
    },
    {
      company: "腾讯",
      role: "产品策划",
      period: "2025.7- 2026.1",
      subline: "AI问询/坐席/质检｜大模型平台接入｜数据权限｜质检标签&阈值",
      techStack: "意图/召回/生成链路｜质检标签&阈值｜分级流转｜后台权限风控",
      highlights: [
        "HR智能问询助手“小T”：0-1结合 mcp 方案拓展问询场景，提升员工自助效率",
        "AI坐席质检：解决质检重复劳动与人工成本高问题，增速提效",
        "带上红围脖：输出入职相关交互设计与PRD，协同研发与运营推进落地",
        "数据治理：参与IT系统升级与流程梳理，形成数据链路/接口规范，交付多份报表需求对接",
        "探索AI辅助产品工作流与Agent能力落地，形成可复用方法论",
      ],
      description: "",
      logo: "/company-placeholder.png",
    },
    {
      company: "武汉微派",
      role: "AI产品经理",
      period: "2024.4-2024.6",
      subline: "ToC社交陪伴｜真人语音房｜Prompt策略｜RAG/Query｜异常兜底",
      techStack: "A/B实验｜Badcase闭环｜对话策略与节奏设计",
      highlights: [
        "模型链路与体验优化：梳理引导步骤与复杂策略，建立评估标准并推进迭代",
        "Prompt调优与测试：设计提示词框架，多轮测试与AB验证，评估最优模型效果",
        "效果建设与增强：搭建RAG/Query方案，结合场景化精调，提升对话质量与留存表现",
        "基于线上反馈与Badcase沉淀持续迭代，完善异常兜底与对话策略",
      ],
      description: "",
      logo: "/company-placeholder.png",
    }
  ],
  
  // 荣誉成就
  achievements: [
    {
      title: "华中师范大学优秀毕业生",
      year: "2026",
      description: "以优秀成绩在学校结业",
      icon: "🎓",
    },
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
    title: "Datawhale 黑客松必备技直播",
    type: "参与并直播",
    date: "2026.4",
    description: "参与 Datawhale 黑客松经验分享直播",
    image: "/personal-portfolio/hackathon.jpg",
  },
  {
    title: "AI creators",
    type: "参与",
    date: "2025.11",
    description: "参与AI产品工作坊，一下午将idea0-1落地",
    image: "/personal-portfolio/AI-creators.jpg",  
  },
  {
    title: "wteam AI创客节",
    type: "参与",
    date: "2025.8",
    description: "了解并体验更多有趣的AI产品，学习AI原生pm思维",
    image: "/personal-portfolio/ckj.jpg",
  },
  {
    title: "看到100个优秀的世界",
    type: "组织并演讲",
    date: "2025.4",
    description: "在社群组织创业及就业分享讨论，吸引100+人",
    image: "/personal-portfolio/speech.jpg",
  },
  {
    title: "荣耀GT销售精英奖",
    type: "领奖并演讲",
    date: "2025.3",
    description: "创意人气奖+招聘直通卡",
    image: "/personal-portfolio/ry.jpg",
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
    qrCode: "/personal-portfolio/vx.jpg",
    description: "欢迎微信交流",
    action: {
      type: "copy",
      value: "qy1934253206",
      toast: "已复制微信号",
    },
  },
  {
    platform: "公众号",
    icon: "wechat-official",
    qrCode: "/personal-portfolio/gzh.jpg",
    description: "温尘桂音",
    action: {
      type: "copy",
      value: "温尘桂音",
      toast: "已复制公众号",
    },
  },
  {
    platform: "播客",
    icon: "podcast",
    qrCode: "/personal-portfolio/boke.jpg",
    description: "收听我的播客节目",
    action: {
      type: "link",
      url: "https://www.xiaoyuzhoufm.com/episode/6941450c4c65abaff34afc1c",
    },
  },
  {
    platform: "B站",
    icon: "bilibili",
    qrCode: "/personal-portfolio/bilibili.jpg",
    description: "欢迎 B 站账号",
    action: {
      type: "link",
      url: "https://b23.tv/so6CPb1",
    },
  },
  {
    platform: "CSDN",
    icon: "csdn",
    qrCode: "/personal-portfolio/CSDN.jpg",
    description: "访问 CSDN 博客",
    action: {
      type: "link",
      url: "https://blog.csdn.net/liecheyuan_?spm=1000.2115.3001.5343",
    },
  },
],
};
