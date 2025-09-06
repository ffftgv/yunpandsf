# Cloud Drive

一个基于Cloudflare Worker和R2的云盘项目，支持多R2存储，功能包括：

- 创建文件夹和文件
- 编辑文件内容
- 上传、下载和删除文件
- 支持简体中文界面

## 项目结构

- `frontend/`：前端代码，使用React构建。
- `backend/`：后端代码，使用Cloudflare Worker实现。

## 快速开始

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 部署到Cloudflare：
   ```bash
   npm run deploy
   ```
