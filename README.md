
# MdJs：Markdown + JavaScript 的轻量级文档工具

<div style="text-align: center;">
  <a href="README.md">中文</a>
  <a href="README-en-US.md">English</a>
</div>

## 简介

`MdJs` 是一个结合了 Markdown 和 JavaScript 的轻量级文档工具，旨在帮助用户以简洁、高效的方式编写和展示文档内容。它通过扩展 Markdown 的功能，支持更灵活的链接路径、侧边栏导航以及部分 HTML 标签，从而增强文档的可读性和交互性。

## 功能特点

### 1. **灵活的链接路径**

- **链接到文件**：支持使用相对路径链接到 `docs` 目录下的文件，支持省略 `.md` 后缀。
  - 示例：`[链接到文件](1/这里就是一级目录.md)` 或 `[链接到文件](1/这里就是一级目录)`
- **自动解析**：链接路径基于 `docs` 目录，确保文档结构清晰。

### 2. **侧边栏导航**

- 侧边栏的导航结构由 `sidebar.md` 文件定义，支持多级目录导航。
- 示例：
  ```markdown
  - [首页](aboutme.md)
  - [一级目录](1/这里就是一级目录.md)
  - [二级目录](1/2/这里就是二级目录.md)
  ```

### 3. **支持部分 HTML 标签**

- **字体颜色**：使用 `<font color="...">...</font>` 标签可以改变文本颜色。
  - 示例：`<font color="red">红色文本</font>` 会显示为 <font color="red">红色文本</font>
- **换行**：使用 `<br>` 标签可以在文本中强制换行。

### 4. **兼容性**

- `MdJs` 基于 Markdown 语法，支持基本语法和扩展语法。
- 支持通过 HTML 标签实现一些 Markdown 本身不支持的功能，同时保持文档的简洁性。

## 使用方法

1. **安装**
   - [GitHub下载](https://github.com/xtnmoe/MdJs/archive/refs/heads/main.zip)

2. **配置**
   - 在 `sidebar.md` 中定义侧边栏导航结构。
   - 使用标准 Markdown 语法编写文档内容。

## 示例

以下是一个简单的 `sidebar.md` 示例：

```markdown
- [首页](aboutme.md)
- [一级目录](1/这里就是一级目录.md)
- [二级目录](1/2/这里就是二级目录.md)
```

文档内容示例：

```markdown
# 欢迎使用 MdJs

这是一个使用 `MdJs` 编写的文档示例。

<font color="red">这是一个红色文本示例。</font><br>
这是一个换行示例。
```

## 注意事项

- **链接路径**：确保链接路径基于 `docs` 目录，避免路径错误。
- **文件名唯一性**：如果省略 `.md` 后缀，请确保文件名在同一目录下是唯一的。
- **HTML 标签使用**：尽量优先使用标准 Markdown 语法，避免过度依赖 HTML 标签。

## 适用场景

`MdJs` 适用于以下场景：
- 个人博客或文档网站
- 项目文档管理
- 知识库构建

## 开源许可

`MdJs` 采用 [MIT License](LICENSE)，欢迎使用。

---
