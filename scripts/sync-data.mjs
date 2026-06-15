import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "data", "brain-data.json");
const outputPath = path.join(root, "data.js");
const wikiReadmePaths = {
  "Design Wiki": path.join("content", "atomic-layer", "skills", "brand-guidelines", "README.md"),
  "知识库": path.join("content", "atomic-layer", "skills", "case-assets", "README.md"),
  "品牌决策规则": path.join("content", "atomic-layer", "skills", "design-principles", "README.md"),
  "品牌规范": path.join("content", "atomic-layer", "skills", "brand-guidelines", "README.md"),
  "营销组件": path.join("content", "atomic-layer", "skills", "marketing-components", "README.md"),
  "案例资产": path.join("content", "atomic-layer", "skills", "case-assets", "README.md"),
  "设计原则": path.join("content", "atomic-layer", "skills", "design-principles", "README.md")
};

const requiredItemFields = [
  "id",
  "tag",
  "name",
  "desc",
  "status",
  "statusType",
  "impact",
  "downloads",
  "capability",
  "hints"
];

function assertString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function validateGroup(group, groupPath) {
  assertString(group.id, `${groupPath}.id`);
  assertString(group.title, `${groupPath}.title`);
  assertString(group.summary, `${groupPath}.summary`);
  if (!Array.isArray(group.items)) {
    throw new Error(`${groupPath}.items must be an array`);
  }

  group.items.forEach((item, itemIndex) => {
    const itemPath = `${groupPath}.items[${itemIndex}]`;
    requiredItemFields.forEach((field) => {
      if (!(field in item)) throw new Error(`${itemPath}.${field} is required`);
    });
    assertString(item.id, `${itemPath}.id`);
    assertString(item.name, `${itemPath}.name`);
    assertString(item.statusType, `${itemPath}.statusType`);
    if (!Number.isFinite(item.downloads)) {
      throw new Error(`${itemPath}.downloads must be a number`);
    }
    if (item.externalLink) {
      assertString(item.externalLink.label, `${itemPath}.externalLink.label`);
      assertString(item.externalLink.url, `${itemPath}.externalLink.url`);
    }
    if (item.downloadLink) {
      assertString(item.downloadLink, `${itemPath}.downloadLink`);
    }
    if (item.downloadLabel) {
      assertString(item.downloadLabel, `${itemPath}.downloadLabel`);
    }
    if (item.downloadEnabled !== undefined && typeof item.downloadEnabled !== "boolean") {
      throw new Error(`${itemPath}.downloadEnabled must be a boolean`);
    }
    if (item.downloadNote) {
      assertString(item.downloadNote, `${itemPath}.downloadNote`);
    }
    if (item.mediaImage) {
      assertString(item.mediaImage.src, `${itemPath}.mediaImage.src`);
      assertString(item.mediaImage.alt, `${itemPath}.mediaImage.alt`);
    }
  });
}

function validateData(data) {
  ["application", "execution", "rules", "wiki"].forEach((key) => {
    if (!Array.isArray(data[key])) throw new Error(`${key} must be an array`);
  });

  data.application.forEach((group, index) => validateGroup(group, `application[${index}]`));
  data.execution.forEach((group, index) => validateGroup(group, `execution[${index}]`));
  data.rules.forEach((group, index) => validateGroup(group, `rules[${index}]`));

  data.wiki.forEach((item, index) => {
    assertString(item.title, `wiki[${index}].title`);
    assertString(item.desc, `wiki[${index}].desc`);
    if (item.tag) assertString(item.tag, `wiki[${index}].tag`);
    if (!Array.isArray(item.entries)) throw new Error(`wiki[${index}].entries must be an array`);
    item.entries.forEach((entry, entryIndex) => {
      if (!Array.isArray(entry) || entry.length < 2) {
        throw new Error(`wiki[${index}].entries[${entryIndex}] must be [name, type]`);
      }
      assertString(entry[0], `wiki[${index}].entries[${entryIndex}][0]`);
      assertString(entry[1], `wiki[${index}].entries[${entryIndex}][1]`);
    });
  });
}

function generatedNote() {
  return "> 自动同步：本文件由 `data/brain-data.json` 生成，请运行 `scripts/sync-data.mjs` 更新。";
}

function stripOrderPrefix(title) {
  return title.replace(/^\d+\.\s*/, "");
}

async function writeGeneratedMarkdown(relativePath, content) {
  const targetPath = path.join(root, relativePath);
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${content.trimEnd()}\n`, "utf8");
  return targetPath;
}

function skillReadme(group, title) {
  const items = group.items.map((item) => `- ${item.name}`).join("\n");
  return `# ${title} Skills

${generatedNote()}

当前网站已索引（${group.items.length}）：

${items}
`;
}

function wikiReadme(item) {
  const entries = item.entries.map((entry) => `- ${entry[0]}（${entry[1]}）`).join("\n");
  return `# ${item.title}知识库

${generatedNote()}

${item.desc}

当前网站已索引（${item.entries.length}）：

${entries}
`;
}

async function syncReadmes(data) {
  const written = [];

  for (const group of data.application) {
    written.push(await writeGeneratedMarkdown(
      path.join("content", "application-layer", "skills", group.id, "README.md"),
      skillReadme(group, group.title)
    ));
  }

  for (const group of data.execution) {
    written.push(await writeGeneratedMarkdown(
      path.join("content", "execution-layer", "skills", group.id, "README.md"),
      skillReadme(group, group.title)
    ));
  }

  for (const group of data.rules) {
    written.push(await writeGeneratedMarkdown(
      path.join("content", "rule-layer", "skills", group.id, "README.md"),
      skillReadme(group, stripOrderPrefix(group.title))
    ));
  }

  for (const item of data.wiki) {
    const relativePath = wikiReadmePaths[item.title];
    if (!relativePath) {
      throw new Error(`No README path mapping for wiki title: ${item.title}`);
    }
    written.push(await writeGeneratedMarkdown(relativePath, wikiReadme(item)));
  }

  return written;
}

const raw = await readFile(sourcePath, "utf8");
const data = JSON.parse(raw);
validateData(data);

const output = `window.BRAIN_DATA = ${JSON.stringify(data, null, 2)};\n`;
await writeFile(outputPath, output, "utf8");
const readmes = await syncReadmes(data);
console.log(`Synced ${path.relative(root, sourcePath)} -> ${path.relative(root, outputPath)}`);
console.log(`Synced ${readmes.length} content README files`);
