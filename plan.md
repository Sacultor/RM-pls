# RM-pls Demo 实施计划

## 项目概述
实现一个Trae插件（VS Code扩展），能够扫描项目代码，自动生成高质量的README.md文档。

## 技术架构

### 核心技术栈
- **扩展框架**: VS Code Extension API
- **前端**: React + TypeScript + Tailwind CSS
- **Markdown渲染**: react-markdown + remark-gfm + mermaid
- **构建工具**: webpack / esbuild
- **包管理**: npm

### 项目结构
```
rm-pls/
├── package.json                 # 扩展配置和依赖
├── tsconfig.json               # TypeScript配置
├── webpack.config.js           # 构建配置
├── src/
│   ├── extension.ts            # 扩展入口
│   ├── sidebarProvider.ts      # 侧边栏Webview提供者
│   ├── scanner/
│   │   ├── projectScanner.ts   # 项目扫描器
│   │   ├── fileAnalyzer.ts     # 文件分析器
│   │   └── techDetector.ts     # 技术栈检测器
│   ├── generator/
│   │   ├── readmeGenerator.ts  # README生成器
│   │   ├── badgeGenerator.ts   # 徽章生成器
│   │   └── mermaidGenerator.ts # Mermaid图表生成器
│   └── utils/
│       ├── fileUtils.ts        # 文件工具函数
│       └── promptBuilder.ts    # Prompt构建器
├── webview/
│   ├── index.html              # Webview HTML入口
│   ├── src/
│   │   ├── main.tsx            # React入口
│   │   ├── App.tsx             # 主组件
│   │   ├── components/
│   │   │   ├── Header.tsx      # 头部组件
│   │   │   ├── ControlArea.tsx # 控制区域
│   │   │   ├── Preview.tsx     # 预览区域
│   │   │   └── Footer.tsx      # 底部组件
│   │   └── styles/
│   │       └── index.css       # Tailwind样式
│   └── package.json            # Webview依赖
└── assets/
    └── logo.svg                # Logo图标
```

## 实施清单

### 阶段一：项目初始化（Day 1）

#### 1. 创建项目基础结构
- 创建项目根目录和子目录结构
- 初始化npm项目（package.json）
- 配置TypeScript（tsconfig.json）
- 配置webpack构建脚本

#### 2. 配置VS Code扩展
- 设置package.json中的扩展元数据
- 配置activationEvents和contributes
- 定义commands和views
- 配置侧边栏视图

#### 3. 搭建开发环境
- 安装必要的开发依赖
- 配置调试脚本（.vscode/launch.json）
- 设置构建和打包脚本

### 阶段二：核心功能实现（Day 2-3）

#### 4. 实现项目扫描器
- 创建projectScanner.ts
- 实现工作区文件扫描逻辑
- 识别项目根目录
- 过滤不需要的文件和目录（node_modules, .git等）

#### 5. 实现技术栈检测器
- 创建techDetector.ts
- 检测package.json、go.mod、Cargo.toml等配置文件
- 识别编程语言和框架
- 检测特殊文件类型（.v, .sv等硬件描述文件）

#### 6. 实现文件分析器
- 创建fileAnalyzer.ts
- 解析关键代码文件
- 提取函数、类、接口等关键结构
- 识别技术亮点关键词

#### 7. 实现README生成器
- 创建readmeGenerator.ts
- 设计README模板结构
- 实现内容填充逻辑
- 支持多种风格（Hacker、Academic、ByteDance）

#### 8. 实现徽章生成器
- 创建badgeGenerator.ts
- 集成Shields.io API
- 根据项目信息生成动态徽章
- 支持自定义徽章样式

#### 9. 实现Mermaid图表生成器
- 创建mermaidGenerator.ts
- 分析项目文件依赖关系
- 生成Mermaid流程图语法
- 支持多种图表类型

### 阶段三：UI开发（Day 4-5）

#### 10. 创建Webview基础结构
- 创建webview/index.html
- 配置React入口（main.tsx）
- 设置Tailwind CSS
- 配置webview构建流程

#### 11. 实现侧边栏提供者
- 创建sidebarProvider.ts
- 实现WebviewViewProvider接口
- 处理扩展与Webview的通信
- 实现消息传递机制

#### 12. 开发React组件
- 实现Header组件（标题+Logo）
- 实现ControlArea组件（风格选择+生成按钮）
- 实现Preview组件（Markdown实时预览）
- 实现Footer组件（复制按钮）

#### 13. 实现Markdown渲染
- 集成react-markdown和remark-gfm
- 配置Mermaid渲染支持
- 实现代码高亮
- 处理图片和链接

#### 14. 实现UI交互逻辑
- 实现生成按钮点击事件
- 实现Loading动画效果
- 实现复制到剪贴板功能
- 实现风格切换功能

### 阶段四：AI集成（Day 6）

#### 15. 设计Prompt构建器
- 创建promptBuilder.ts
- 根据扫描结果构建上下文
- 设计System Prompt模板
- 支持不同风格的Prompt变体

#### 16. 集成Trae AI能力
- 调用Trae提供的AI API
- 实现流式响应处理
- 处理AI生成的内容
- 实现错误处理和重试机制

### 阶段五：测试与优化（Day 7）

#### 17. 功能测试
- 测试项目扫描功能
- 测试README生成功能
- 测试UI交互功能
- 测试不同项目类型

#### 18. 性能优化
- 优化文件扫描性能
- 优化Markdown渲染性能
- 实现懒加载和虚拟滚动
- 减少不必要的重渲染

#### 19. 用户体验优化
- 优化Loading动画
- 添加错误提示
- 优化响应速度
- 完善交互反馈

### 阶段六：打包与发布（Day 8）

#### 20. 打包扩展
- 配置生产环境构建
- 打包扩展为.vsix文件
- 测试打包后的扩展
- 准备发布说明

#### 21. 发布准备
- 编写用户文档
- 准备演示视频
- 创建GitHub仓库
- 发布到VS Code Marketplace或Trae插件市场

## 关键技术实现细节

### 1. 项目扫描逻辑
```typescript
// 扫描工作区，识别关键文件
async function scanProject(workspaceFolder: string): Promise<ProjectInfo> {
  // 1. 读取package.json或go.mod等配置文件
  // 2. 识别项目类型和技术栈
  // 3. 扫描源代码目录结构
  // 4. 提取关键文件和依赖关系
  // 5. 返回项目信息对象
}
```

### 2. 技术亮点提取
```typescript
// 从代码中提取技术亮点
function extractHighlights(files: CodeFile[]): TechHighlight[] {
  // 1. 搜索关键词（algorithm, optimization, security等）
  // 2. 分析函数复杂度和重要性
  // 3. 识别设计模式
  // 4. 返回前3个最硬核的技术亮点
}
```

### 3. Mermaid图表生成
```typescript
// 生成项目架构图
function generateMermaidDiagram(structure: ProjectStructure): string {
  // 1. 分析文件依赖关系
  // 2. 构建节点和边
  // 3. 生成Mermaid语法
  // 4. 返回流程图代码
}
```

### 4. Webview通信机制
```typescript
// 扩展与Webview的双向通信
class SidebarProvider implements WebviewViewProvider {
  // 扩展 -> Webview
  private postMessage(message: any): void {
    this._view?.webview.postMessage(message);
  }
  
  // Webview -> 扩展
  private handleMessage(message: any): void {
    switch(message.command) {
      case 'generate':
        this.generateReadme();
        break;
      case 'copy':
        this.copyToClipboard();
        break;
    }
  }
}
```

## MVP功能范围

### 必须实现
1. ✅ 项目扫描（识别技术栈）
2. ✅ README生成（基础模板）
3. ✅ 侧边栏UI（基本交互）
4. ✅ Markdown预览（实时渲染）
5. ✅ 复制功能（一键复制）

### 可选功能
1. ⚪ 多风格支持（Hacker/Academic/ByteDance）
2. ⚪ Mermaid图表生成
3. ⚪ Shields.io徽章生成
4. ⚪ 硬核技术亮点提取
5. ⚪ AI智能生成

## 技术风险与应对

### 风险1：文件扫描性能问题
- **应对**: 使用异步扫描，限制扫描深度，忽略大型依赖目录

### 风险2：AI生成质量不稳定
- **应对**: 设计高质量的Prompt模板，提供丰富的上下文信息

### 风险3：Webview性能瓶颈
- **应对**: 使用虚拟滚动，优化Markdown渲染，减少不必要的更新

### 风险4：不同项目类型适配
- **应对**: 设计可扩展的分析器架构，支持插件式扩展

## 开发时间估算

| 阶段 | 工作量 | 时间 |
|------|--------|------|
| 项目初始化 | 基础搭建 | 1天 |
| 核心功能 | 扫描+生成 | 2天 |
| UI开发 | Webview+组件 | 2天 |
| AI集成 | Prompt+API | 1天 |
| 测试优化 | 调试+优化 | 1天 |
| 打包发布 | 构建+发布 | 1天 |
| **总计** | | **8天** |

## 成功标准

### 功能完整性
- ✅ 能够扫描至少3种不同类型的项目（Node.js, Go, Rust）
- ✅ 生成的README包含项目名称、描述、安装指南
- ✅ UI响应流畅，无明显卡顿

### 用户体验
- ✅ 从点击生成到显示预览不超过5秒
- ✅ 生成的README格式规范，可读性强
- ✅ 错误提示清晰，用户能理解问题所在

### 代码质量
- ✅ TypeScript类型完整，无any类型滥用
- ✅ 代码结构清晰，模块职责明确
- ✅ 关键功能有注释说明

## 下一步行动

1. **立即开始**: 创建项目基础结构
2. **优先实现**: 项目扫描器和基础UI
3. **快速迭代**: 先实现MVP，再逐步完善
4. **持续测试**: 每完成一个模块立即测试

---

**注意**: 这是一个Demo实现计划，重点是快速验证核心功能可行性。后续可以根据用户反馈和技术积累，逐步实现更高级的功能。
