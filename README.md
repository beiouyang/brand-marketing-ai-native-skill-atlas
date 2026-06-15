# 品牌与营销 AI-Native Framwork

这是一个可交互网站草案，用于集合公司内部 Skill / Agent / Design Wiki / 知识库。

## 目录结构

```text
brand-marketing-ai-native-framework/
  index.html
  styles.css
  data.js
  app.js
  data/
    brain-data.json
    README.md
  scripts/
    sync-data.mjs
  assets/
  content/
    user-layer/
      module.md
      skills/
    application-layer/
      module.md
      skills/
        brand-domain/
        marketing-domain/
        interaction-domain/
        multimedia-domain/
    rule-layer/
      module.md
      skills/
        before-design/
        during-design/
        after-design/
    atomic-layer/
      module.md
      skills/
        brand-guidelines/
        marketing-components/
        case-assets/
        design-principles/
```

## 分层

- 用户层：主标题、副标题、全局搜索、Hints、算法甜甜圈视觉核心。
- 应用层：业务场景提效 Skill / Agent，分品牌域、营销域、互动域、多媒体内容域。
- 规则层：通用设计工作流，分设计前、设计中、设计后。
- 原子层：Design Wiki / 知识库，包括品牌规范、营销组件、案例资产、设计原则。

## 运行

可直接打开 `index.html`，也可以在当前目录起一个静态服务：

```bash
python3 -m http.server 4173
```

## 数据维护

后续批量替换或修改 Skill 卡片 / 弹窗内容时，优先修改 `data/brain-data.json`，再运行：

```bash
/Users/ouyangbei3/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/sync-data.mjs
```

同步脚本会校验必填字段，生成页面运行时使用的 `data.js`，并同步更新 `content/` 下对应的 Skill / Wiki README 索引说明。
