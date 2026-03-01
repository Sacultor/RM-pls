# RM-pls 开发环境设置指南

## 前置要求

在开始开发之前，请确保您的系统已安装以下软件：

### 1. Node.js (必需)
RM-pls 需要 Node.js 运行环境和 npm 包管理器。

**安装方法：**

#### macOS:
```bash
# 方法1: 使用 Homebrew (推荐)
brew install node

# 方法2: 从官网下载安装包
# 访问 https://nodejs.org/ 下载 LTS 版本
```

#### 验证安装:
```bash
node --version  # 应该显示 v18.x 或更高版本
npm --version   # 应该显示 9.x 或更高版本
```

### 2. VS Code 或 Trae IDE (必需)
用于开发和测试扩展。

## 安装步骤

### 1. 安装主项目依赖
```bash
cd /Users/xxzero/RM\ pls/RM-pls
npm install
```

### 2. 安装 Webview 前端依赖
```bash
cd webview
npm install
```

### 3. 构建项目
```bash
# 在项目根目录
npm run compile

# 构建 webview
cd webview
npm run build
```

## 开发调试

### 1. 在 VS Code/Trae 中打开项目
```bash
code /Users/xxzero/RM\ pls/RM-pls
# 或
trae /Users/xxzero/RM\ pls/RM-pls
```

### 2. 启动调试
- 按 `F5` 启动扩展开发主机
- 或在调试面板中选择 "Run Extension" 并点击运行

### 3. 测试扩展
- 在扩展开发主机中，点击侧边栏的 "ReadMe First" 图标
- 应该能看到扩展的侧边栏界面

## 项目结构

```
rm-pls/
├── src/                    # 扩展源代码
│   ├── extension.ts        # 扩展入口
│   ├── sidebarProvider.ts  # 侧边栏提供者
│   ├── scanner/            # 项目扫描器
│   ├── generator/          # README生成器
│   └── utils/              # 工具函数
├── webview/                # Webview前端
│   ├── src/
│   │   ├── main.tsx        # React入口
│   │   ├── App.tsx         # 主组件
│   │   └── components/     # React组件
│   └── package.json
├── assets/                 # 静态资源
├── .vscode/                # VS Code配置
│   ├── launch.json         # 调试配置
│   └── tasks.json          # 任务配置
├── package.json            # 扩展配置
├── tsconfig.json           # TypeScript配置
└── webpack.config.js       # Webpack配置
```

## 常见问题

### Q: npm install 失败
**A:** 检查网络连接，或使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
```

### Q: 构建失败
**A:** 确保所有依赖都已正确安装：
```bash
rm -rf node_modules
npm install
```

### Q: 扩展无法激活
**A:** 检查 `package.json` 中的 `activationEvents` 配置是否正确。

## 下一步

安装完成后，您可以：

1. **实现核心功能**：开发项目扫描器和README生成器
2. **完善UI**：优化Webview界面和交互
3. **集成AI**：调用Trae的AI能力生成高质量README
4. **测试**：在不同类型的项目中测试扩展功能

## 技术支持

如遇问题，请检查：
- Node.js 版本是否 >= 18
- npm 版本是否 >= 9
- VS Code/Trae 版本是否最新
