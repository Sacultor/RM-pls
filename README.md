# RM-pls
1. 项目愿景
RM-pls 是一个 AI 原生的文档自动化 Agent。它旨在解决开发者“重代码、轻文档”的痛点，通过 Trae 的全局上下文能力，深度理解代码逻辑，一键生成实用的README.md。

2. 核心功能需求 (MVP)
Context Scan: 扫描当前 Workspace，识别编程语言、核心框架（如 React, Solidity, Verilog, Gin 等）。

Hardcore Highlight: 拒绝废话，必须从代码逻辑中提取 3 个硬核技术亮点（例如：高并发处理、硬件逻辑优化、加密算法实现）。

Auto-Mermaid: 自动生成项目架构的 Mermaid 流程图。

One-Click Hackerize: 按钮触发，输出带有动态徽章（Shields.io）和标准黑客松模板的 Markdown。

Live Preview: 在侧边栏实时预览生成的 Markdown 效果。

3. 技术栈要求
Frontend: React + Tailwind CSS (用于极简暗黑风 UI)。

Markdown Engine: react-markdown + remark-gfm。

Diagrams: mermaid 渲染支持。

Theme: 字节 Trae 风格（深灰/紫色调，极简线条）。

4. 核心 Prompt 逻辑 (核心指令)
当用户点击“生成”时，调用以下 System Prompt 逻辑：

Plaintext
Role: Top-tier Open Source Architect & Hackathon Judge.
Task: Analyze the codebase and generate a high-impact README.md.
Sections Required:
1. Project Name & Catchy Tagline.
2. Badges (Build, License, Tech Stack).
3. "The Alpha" (Top 3 technical breakthroughs in this repo).
4. Mermaid Architecture Diagram (Graph TD).
5. Quick Start (Auto-detected env & commands).
Tone: Concise, technical, and "Hacker-centric".
5. UI 布局规范 (Sidebar Webview)
Header: "ReadMe First" 标题 + 极简 Logo。

Control Area: * Style 下拉框 (Hacker / Academic / ByteDance)。

Primary Button: "Generate & Wrap My Project"。

Main View: 实时渲染的 Markdown 预览区域，支持滚动。

Footer: "Copy to Clipboard" 按钮。

6. 开发者特别注记 (For Trae Builder)
请优先读取 package.json 或 go.mod 来确定环境。

如果检测到 .v 或 .sv 文件，请在 README 中加入 "Hardware Logic Design" 模块。

生成过程需要有 Loading 动画，体现 AI 在“思考”和“扫描”。