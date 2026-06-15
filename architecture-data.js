window.ARCHITECTURE_DATA = {
  layers: [
    {
      id: "demand-layer",
      eyebrow: "Demand Layer",
      title: "需求层 · 入口",
      summary: "结构化需求走自动化，开放式需求走人机共创",
      cards: [
        {
          id: "demand-structured",
          tag: "结构化",
          name: "结构化需求",
          desc: "模板 / 字段 / 验收标准明确，可直接进入工作流。",
          status: "L3 可委派",
          statusType: "applied",
          detail: "会场日更、尺寸延展、规范模块输出、资产归档等高频场景。输入契约包含渠道、尺寸、规范版本、截止时间、验收标准。",
          points: ["Brief 模板化", "字段必填校验", "验收标准前置", "默认 Copilot 先出稿"]
        },
        {
          id: "demand-open",
          tag: "开放式",
          name: "开放式需求",
          desc: "brief / 探索 / 方向稿，创意与判断占比高。",
          status: "L1/L2",
          statusType: "progress",
          detail: "主视觉探索、品牌叙事定调、新方向试错。人主导方向，Copilot 做发散与备选，禁止 L3 自治。",
          points: ["人定方向", "Copilot 发散", "永不自动终审", "探索产出齐套即可"]
        }
      ]
    },
    {
      id: "orchestration-layer",
      eyebrow: "Orchestration Layer",
      title: "编排层 · 调度中枢",
      summary: "决定谁做、怎么做、何时必须人审",
      cards: [
        {
          id: "orch-route",
          tag: "路由",
          name: "执行单元路由",
          desc: "需求类型 + 紧急度 + 规范成熟度 → 人 / Copilot / 协作。",
          status: "核心能力",
          statusType: "applied",
          detail: "编排层回答三个问题：派给谁？并行几路？卡点在哪一环必须人审？",
          points: ["人 / Copilot / 协作", "并行与依赖管理", "Mandatory Gates", "skill_policy 字段"]
        },
        {
          id: "orch-gates",
          tag: "卡点",
          name: "Mandatory Gates",
          desc: "高风险节点必须人类审批，Copilot 不可跳过。",
          status: "4 道关卡",
          statusType: "progress",
          detail: "G1 叙事定稿 · G2 主 KV 定稿 · G3 规范合规 · G4 对外发布。开放式子项禁止 L3 自治。",
          points: ["G1 叙事", "G2 主 KV", "G3 规范合规", "G4 对外发布"]
        },
        {
          id: "orch-fields",
          tag: "字段",
          name: "编排输出契约",
          desc: "每个任务绑定 mode、allowed_skills、arbiter、human_gate。",
          status: "可入看板",
          statusType: "research",
          detail: "编排结果可直接写入看板：执行单元、自治等级、依赖、截止、skill_policy、验证关卡。",
          points: ["skill_policy.mode", "allowed_skills", "human_gate", "fail_actions"]
        }
      ]
    },
    {
      id: "rule-layer-arch",
      eyebrow: "Rule Layer",
      title: "规则层 · 内核",
      summary: "Design Wiki + 知识库 + 品牌护栏，AI-native 的地基",
      cards: [
        {
          id: "rule-wiki",
          tag: "规范资产",
          name: "Design Wiki",
          desc: "色彩 / 字体 / 组件 / 会场模板 / App16.0 规范。",
          status: "地基",
          statusType: "applied",
          detail: "规范资产必须可执行，而非仅文档。Agent 引用的每一条规则都需标注版本与出处。",
          points: ["App16.0 规范", "营销设计系统", "Joy IP 应用逻辑", "版本可追溯"]
        },
        {
          id: "rule-knowledge",
          tag: "案例库",
          name: "知识库 / 反例",
          desc: "过审稿、被否稿及原因，提升审美与业务判断。",
          status: "持续沉淀",
          statusType: "progress",
          detail: "案例与反例帮助 Copilot 理解「什么好、什么不行」，降低返工率。",
          points: ["过审案例", "否稿原因", "决策记录", "回流质检层"]
        },
        {
          id: "rule-guardrail",
          tag: "护栏",
          name: "品牌决策规则",
          desc: "什么场景用哪套规范、什么必须人审、什么禁止 AI 自创。",
          status: "硬约束",
          statusType: "applied",
          detail: "规范类 Copilot 设为只读 Skill 库，禁止 adhoc。合规不能即兴。",
          points: ["场景路由规则", "例外特批流程", "禁止 adhoc 规范", "criteria_source"]
        }
      ]
    },
    {
      id: "capability-layer",
      eyebrow: "Capability Layer",
      title: "能力层 · 驱动",
      summary: "通用设计工作流 + Skill + 工具链",
      cards: [
        {
          id: "cap-workflow",
          tag: "工作流",
          name: "通用设计工作流",
          desc: "需求 → 草稿 → 评审 → 交付，固化可复用路径。",
          status: "可编排",
          statusType: "applied",
          detail: "工作流依赖规则层，不先堆 Skill 再补规范。创作工具与编排工具分开管理。",
          points: ["阶段节点", "输入输出契约", "验证契约绑定", "失败回退路径"]
        },
        {
          id: "cap-skill",
          tag: "Skill",
          name: "专家能力包",
          desc: "按主题拆分：App16.0 / 品牌 / 大促 / 互动 / AI 提效。",
          status: "Skill-first",
          statusType: "progress",
          detail: "Skill = 工作流 + 输入 + 输出 + 验证契约。没有验证契约的 Skill 不可 L3 委派。",
          points: ["主题化拆分", "验证契约必填", "组合优于 adhoc", "重复使用后升格"]
        },
        {
          id: "cap-tools",
          tag: "工具",
          name: "工具链",
          desc: "Figma / LibTV / 批处理 / 生成 / 资产导出。",
          status: "已授权",
          statusType: "applied",
          detail: "Copilot 在 Skill 框内调用已授权工具。接入未批准工具需走正式流程。",
          points: ["创作工具", "编排工具", "白名单机制", "Skill 内灵活变体"]
        }
      ]
    },
    {
      id: "execution-layer",
      eyebrow: "Execution Layer",
      title: "执行层 · 进程",
      summary: "人类设计师 + 虚拟专家 Copilot，按自治等级协作",
      cards: [
        {
          id: "exec-human",
          tag: "人类",
          name: "设计师 / Lead",
          desc: "开放式判断、终审、例外放行、方向定调。",
          status: "L1 主导",
          statusType: "applied",
          detail: "人类是主观与高风险任务的终审者。Copilot 可以当质检员，不能当立法者 + 法官。",
          points: ["叙事定调", "主 KV 选型", "G4 终审", "例外 override"]
        },
        {
          id: "exec-copilot",
          tag: "Copilot",
          name: "虚拟专家 Copilot",
          desc: "规范 / 大促 / 互动 / 工程化等主题专家。",
          status: "L2/L3",
          statusType: "progress",
          detail: "比「虚拟员工」更诚实：明确职责边界、输入契约、输出标准、升级条件。",
          points: ["主题专家", "Skill-first 执行", "sandbox adhoc", "预检报告输出"]
        },
        {
          id: "exec-levels",
          tag: "自治",
          name: "L1 → L2 → L3 渐进",
          desc: "L1 副驾驶 · L2 分工执行 · L3 可委派单元。",
          status: "分级授权",
          statusType: "research",
          detail: "L1：人主导 AI 起草。L2：AI 出 80% 人精修。L3：结构化需求直达 Agent，人只验收。",
          points: ["L1 副驾驶", "L2 协作", "L3 可委派", "规范类禁止 L3 终审"]
        }
      ]
    },
    {
      id: "qa-layer",
      eyebrow: "QA Loop",
      title: "质检闭环 · 进化",
      summary: "验收 → 度量 → 回流，让系统越用越 native",
      cards: [
        {
          id: "qa-check",
          tag: "验收",
          name: "结构化返工记录",
          desc: "过审 / 返工原因结构化，追溯至具体标准条目。",
          status: "必做",
          statusType: "applied",
          detail: "返工原因回流规则层与能力层。度量首稿通过率、人机工时比、规范偏离率。",
          points: ["返工原因标签", "标准条目追溯", "首稿通过率", "规范偏离率"]
        },
        {
          id: "qa-promote",
          tag: "升格",
          name: "Skill 升格机制",
          desc: "临时 Skill 重复 ≥3 次 → 发布 v1.0 正式 Skill。",
          status: "闭环",
          statusType: "progress",
          detail: "Copilot 即兴反哺能力层。adhoc 不再永久停留野路子。",
          points: ["adhoc → 正式", "重复 ≥3 次", "编排层发起", "此后禁止 adhoc"]
        },
        {
          id: "qa-feedback",
          tag: "回流",
          name: "编排校准",
          desc: "质检数据回流编排层，优化路由与人审策略。",
          status: "持续",
          statusType: "research",
          detail: "没有质检闭环，Wiki 和 Skill 会停在 v1.0，组织不会真正长出来。",
          points: ["路由优化", "人审策略", "Skill 迭代", "规则层更新"]
        }
      ]
    }
  ],

  governance: [
    {
      id: "gov-skill-first",
      tag: "Skill 策略",
      name: "Skill-first，临时扩展受控",
      desc: "P0 标准 Skill → P1 组合 → P2 sandbox adhoc（需授权）。",
      status: "默认路径",
      statusType: "applied",
      detail: "Copilot 默认只跑已定义 Skill。需要时做 Skill 组合。仅编排层授权、sandbox、人审下才允许临时自创 Skill。",
      points: [
        "P0 调用标准 Skill（默认）",
        "P1 Skill 组合（编排批准）",
        "P2 临时 Skill 草案（sandbox + 人审）",
        "规范类 Copilot 禁止 adhoc"
      ]
    },
    {
      id: "gov-validation",
      tag: "验证治理",
      name: "验证三权分立",
      desc: "规则层定底线 · 编排层定流程 · Skill 定检查项 · 人终审。",
      status: "硬约束",
      statusType: "applied",
      detail: "Copilot 执行验证、出预检报告，不可自定 pass/fail 阈值、不可跳过卡点、不可做高风险终审。",
      points: [
        "规则层：品牌护栏 / 验收模板",
        "编排层：关卡 + 审批人",
        "Skill：可执行 checks",
        "人类：主观与终审"
      ]
    },
    {
      id: "gov-contract",
      tag: "验证契约",
      name: "每个 Skill 必填验证契约",
      desc: "L-轻 / M-中 / H-重 / exploratory 四级。",
      status: "准入门槛",
      statusType: "progress",
      detail: "无验证契约的 Skill 不可 L3 委派。五级最小字段：criteria_source、checks、auto_pass、human_gate、fail_actions。",
      points: [
        "L-轻：归档 / wiki 同步",
        "M-中：渠道物料 / 矩阵延展",
        "H-重：规范 lint / 主 KV 预检",
        "exploratory：探索类永不自动终审"
      ]
    }
  ],

  caseStudy: {
    id: "app16-promo",
    title: "App16.0 品牌推广",
    reqId: "REQ-2026-0613-001",
    mode: "协作（Co-pilot First on 结构化子项）",
    owner: "品牌设计 Lead",
    duration: "10 工作日",
    summary: "叙事与主 KV 由人定调（L1/L2），渠道延展、规范校验、矩阵适配、wiki 同步交给专家 Copilot 先执行（L3），经 4 道卡点人审后发布。",
    parse: [
      { label: "需求类型", value: "混合型（主链路偏开放式，交付物偏结构化）" },
      { label: "规范成熟度", value: "高（App16.0 / 营销设计系统已有基线）" },
      { label: "默认路由", value: "协作模式（人定方向 + Copilot 执行延展）" },
      { label: "风险等级", value: "高（品牌对外露出，涉及主站级规范）" }
    ],
    tasks: [
      { id: "T1", name: "推广叙事框架", exec: "👤 Lead", level: "L1", gate: "G1", deps: "阻塞 T2/T3", days: "D3" },
      { id: "T2", name: "主视觉 KV", exec: "👤 视觉 + 🤖 推广 Copilot", level: "L2", gate: "G2", deps: "依赖 T1", days: "D7" },
      { id: "T3", name: "渠道物料包", exec: "🤖 推广 Copilot → 👤 设计师", level: "L3", gate: "—", deps: "依赖 T2 · 并行 T4", days: "D9" },
      { id: "T4", name: "规范合规预检", exec: "🤖 规范 Copilot → 👤 DS Owner", level: "L3", gate: "G3", deps: "依赖 T2 · 并行 T3", days: "D9" },
      { id: "T5", name: "矩阵 app 延展", exec: "🤖 规范 Copilot → 👤 设计师", level: "L3", gate: "—", deps: "依赖 T3", days: "D10" },
      { id: "T6", name: "资产归档 + Wiki 同步", exec: "🤖 工程化 Copilot → 👤 DS Owner", level: "L3", gate: "—", deps: "依赖 T3/T4", days: "D10" }
    ],
    phases: [
      { phase: "Phase 1 · D1–D3", items: ["A 叙事框架定稿（人）", "B 主 KV 探索稿（人+Copilot）"] },
      { phase: "Phase 2 · D4–D7", items: ["C 渠道物料批量化", "D 规范合规预检", "B 主 KV 终稿锁定"] },
      { phase: "Phase 3 · D8–D10", items: ["E 矩阵 app 延展", "F 资产归档 + Wiki 同步", "G4 对外发布终审"] }
    ],
    skillMap: [
      { task: "T1", skills: ["skill-app16-brand-brief"], policy: "standard", adhoc: false },
      { task: "T2", skills: ["skill-app16-brand-brief", "workflow-promo-kv-explore"], policy: "compose", adhoc: false },
      { task: "T3", skills: ["workflow-channel-asset-batch"], policy: "standard", adhoc: false },
      { task: "T4", skills: ["skill-design-system-lint"], policy: "standard", adhoc: false },
      { task: "T5", skills: ["workflow-matrix-app-extend"], policy: "standard", adhoc: false },
      { task: "T6", skills: ["workflow-wiki-asset-sync"], policy: "standard", adhoc: false }
    ]
  },

  roadmap: [
    { phase: "Phase 0", time: "1–2 月", title: "规则先行", items: ["Design Wiki 可执行子集", "3–5 类结构化需求模板"] },
    { phase: "Phase 1", time: "2–4 月", title: "单点 Copilot", items: ["选 1 个高重复场景", "1 工作流 + 1 Skill + 验收标准"] },
    { phase: "Phase 2", time: "4–6 月", title: "编排 + 度量", items: ["看板增加执行单元字段", "跟踪首稿通过率 / 节省工时"] },
    { phase: "Phase 3", time: "6–12 月", title: "多专家 Copilot 编组", items: ["按主题部署 Copilot", "结构化需求默认 Agent 初稿"] }
  ]
};
