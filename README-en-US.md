### MdJs: A Lightweight Documentation Tool Combining Markdown and JavaScript

<div style="text-align: center;">
  <a href="README.md">中文</a>
  <a href="README-en-US.md">English</a>
</div>

#### Introduction

`MdJs` is a lightweight documentation tool that combines Markdown and JavaScript, designed to help users write and present documentation content in a concise and efficient manner. By extending the functionality of Markdown, it supports more flexible link paths, sidebar navigation, and some HTML tags, thereby enhancing the readability and interactivity of documents.

#### Features

**1. Flexible Link Paths**

- **链接到文件**：支持使用相对路径链接到 `docs` 目录下的文件，支持省略 `.md` 后缀。
  - 示例：`[链接到文件](1/这里就是一级目录.md)` 或 `[链接到文件](1/这里就是一级目录)`
- **自动解析**：链接路径基于 `docs` 目录，确保文档结构清晰。


**2. Sidebar Navigation**

- The sidebar navigation structure is defined by the `sidebar.md` file, supporting multi-level directory navigation.
- Example:
   ```markdown
  - [首页](aboutme.md)
  - [一级目录](1/这里就是一级目录.md)
  - [二级目录](1/2/这里就是二级目录.md)
  ```

**3. Support for Some HTML Tags**

- **Font Color**: Using the `<font color="...">...</font>` tag can change the text color.
  - Example: `<font color="red">Red Text</font>` will display as <font color="red">Red Text</font>
- **Line Break**: Using the `<br>` tag can force a line break in the text.

**4. Compatibility**

- `MdJs` is based on Markdown syntax, supporting both basic and extended syntax.
- It supports using HTML tags to achieve some functions not supported by Markdown itself, while maintaining the simplicity of the document.

#### Usage

**1. Installation**

   - [Download from GitHub](https://github.com/xtnmoe/MdJs/archive/refs/heads/main.zip) (Note: If the link does not work, please check the validity of the URL and try again.)

**2. Configuration**

   - Define the sidebar navigation structure in `sidebar.md`.
   - Write document content using standard Markdown syntax.

#### Example

Here is a simple example of `sidebar.md`:

```markdown
- [首页](aboutme.md)
- [一级目录](1/这里就是一级目录.md)
- [二级目录](1/2/这里就是二级目录.md)
```

Example of document content:

```markdown
# Welcome to MdJs

This is a documentation example written using `MdJs`.

<font color="red">This is a red text example.</font><br>
This is a line break example.
```

#### Precautions

- **Link Paths**: Ensure that link paths are based on the `docs` directory to avoid path errors.
- **File Name Uniqueness**: If the `.md` suffix is omitted, ensure that the file name is unique within the same directory.
- **HTML Tag Usage**: Prefer to use standard Markdown syntax whenever possible, and avoid over-reliance on HTML tags.

#### Applicable Scenarios

`MdJs` is suitable for the following scenarios:

- Personal blogs or documentation websites
- Project documentation management
- Knowledge base construction

#### Open Source License

`MdJs` is licensed under the [MIT License](LICENSE), and its use is encouraged.