# MusicFree

![GitHub Repo stars](https://img.shields.io/github/stars/maotoumao/MusicFree) 
![GitHub forks](https://img.shields.io/github/forks/maotoumao/MusicFree)
![star](https://gitcode.com/maotoumao/MusicFree/star/badge.svg)

![GitHub License](https://img.shields.io/github/license/maotoumao/MusicFree)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/maotoumao/MusicFree/total)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/maotoumao/MusicFree)
![GitHub package.json version](https://img.shields.io/github/package-json/v/maotoumao/MusicFree)



## 简介

一个插件化、定制化、无广告的免费音乐播放器。

**支持平台：**
- 📱 Android 
- 🎨 Harmony OS
- 💻 桌面版：[MusicFreeDesktop](https://github.com/maotoumao/MusicFreeDesktop)

**当前版本：** v0.5.1

如果需要了解后续进展可以关注公众号↓；如果有问题可以在 issue 区或者公众号直接留言反馈。

![微信公众号](./src/assets/imgs/wechat_channel.jpg)

软件下载方式、插件使用说明、插件开发文档可去站点 [https://musicfree.catcat.work](https://musicfree.catcat.work) 查看。

> [!NOTE]
> - 如果你在其他的平台看到收费版/无广告版/破解版，都是假的，本来就是开源项目，**遇到收费版请直接举报**；
> - 软件首先是自用，顺带分享出来希望可以帮助到有需要的人；是业余作品，会尽量保持维护，不过每天能写的时间有限（半小时左右），目测会有很长一段时间处于不稳定测试版本，且更新频率不定，请谨慎使用；
> - 软件的第三方插件、及其所产生的数据与本软件无关，请合理合法使用，可能产生的版权数据请及时删除。
> - **请不要以 VIP/破解版为噱头进行宣传**，示例仓库基于互联网公开接口封装，并**过滤掉所有 VIP、试听、付费歌曲**，且示例仓库以后也**不会提供具备破解功能的插件**；
> - 本软件的相关信息**只会主动投放在 Git 仓库以及公众号“一只猫头猫”中**，如果希望写文章介绍本软件请自便，但还烦请**如实陈述，涉及到示例仓库请给插件源打个码**，不要给软件增加一些不实的功能（尽管我也想有）；描述冲突的地方以本仓库为准。


## 项目使用约定：
本项目基于 AGPL 3.0 协议开源，使用此项目时请遵守开源协议。  
除此外，希望你在使用代码时已经了解以下额外说明：

1. 打包、二次分发 **请保留代码出处**：https://github.com/maotoumao/MusicFree
2. 请不要用于商业用途，合法合规使用代码；
3. 如果开源协议变更，将在此 Github 仓库更新，不另行通知。

> [!CAUTION]
> 👎 小米/华为/vivo等<ins>应用市场的 MusicFree </ins>和本软件无关，**是套用本软件名称和 Logo 的广告软件**。
>
> 👎 速悦音乐基于本软件二次开发，改动点仅仅是内置插件、修改一些 UI 以及引流，**并未遵守本项目的开源协议，且拒绝沟通**。

---

## ✨ 特性

### 🔌 插件化架构
本软件仅仅是一个播放器，本身**并不集成**任何平台的任何音源，所有的搜索、播放、歌单导入等功能全部基于**插件**实现。

**插件支持的功能：**
- 🔍 搜索（音乐、专辑、作者）
- ▶️ 在线播放
- 💿 查看专辑详情
- 👤 查看作者详细信息
- 📥 导入单曲、导入歌单
- 📝 获取歌词

### 🎨 定制化 & 无广告
- 支持浅色/深色模式
- 支持自定义背景
- 基于 AGPL 协议开源，永久免费
- 无任何广告

### 🔒 隐私保护
所有的数据都存储在本地，本软件不会收集你的任何个人信息。

### 📄 歌词关联
支持歌词关联功能，可以将多首歌的歌词关联起来（如 A→B→C），实现歌词共享。

## 🔌 插件

### 插件简介

插件本质上是一个满足插件协议的 **CommonJS** 模块。开发者只需要关心输入输出逻辑，分页、缓存等全都交给 MusicFree 控制。

**插件开发文档：** [https://musicfree.catcat.work/plugin/introduction.html](https://musicfree.catcat.work/plugin/introduction.html)

**⚠️ 使用须知：**

- 如果你是使用第三方下载的插件，那么请自行鉴别插件的安全性（基本上看下没有奇怪的网络请求什么的就好了；自己写的最安全，*不要安装来路不明的东西*），防止恶意代码破坏。因为第三方恶意插件导致的可能的损失与本软件无关。

- 插件使用过程中可能会产生某些和本软件无关的版权数据，插件、以及插件产生的任何数据与本软件无关，请使用者自行斟酌，及时删除数据，本软件不提倡也不会提供任何破解行为，你可以搭建自己的离线音乐仓库使用。

### 📥 插件使用

**安装方式：**
1. 打开应用 → 侧边栏 → 设置 → 插件设置
2. 支持安装本地插件（.js 文件）和从网络安装插件（.json 描述文件）
3. 示例插件仓库：[MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)

**快速安装：**

从网络安装插件，输入以下地址：
```
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json
```

**详细教程：**
- 📖 图文教程：[MusicFree 插件使用指南](https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483875&idx=1&sn=aedf8bb909540634d927de7fd2b4b8b1&chksm=c1a390c4f6d419d233908bb781d418c6b9fd2ca82e9e93291e7c93b8ead3c50ca5ae39668212#rd)
- 🌐 官方文档：[https://musicfree.catcat.work/usage/mobile/install-plugin.html](https://musicfree.catcat.work/usage/mobile/install-plugin.html)

## 📦 下载地址

- **GitHub Releases:** [https://github.com/maotoumao/MusicFree/releases](https://github.com/maotoumao/MusicFree/releases)
- **Gitee Releases:** [https://gitee.com/maotoumao/MusicFree/releases](https://gitee.com/maotoumao/MusicFree/releases)
- **公众号：** 回复「MusicFree」获取下载链接

## 🛠️ 开发者指南

如果你希望参与 MusicFree 的开发或基于此项目进行二次开发，可以参考以下指南。

### 环境准备

开发 MusicFree 需要准备以下环境：

**基础要求：**
- Node.js >= 18
- Git

**Android 开发：**
- JDK（支持 Android 构建）
- Android SDK 和 NDK
- Android Studio（推荐）

**iOS 开发：**
- macOS 系统
- Xcode
- CocoaPods

**推荐工具：**
- VS Code / WebStorm
- Android Studio
- React Native Debugger

### 快速开始

#### 1. 克隆仓库

```bash
git clone https://github.com/maotoumao/MusicFree.git
cd MusicFree
```

#### 2. 安装依赖

```bash
npm install
# 或者使用 yarn
yarn install
```

iOS 还需要安装 Pod 依赖：

```bash
cd ios && pod install && cd ..
```

#### 3. 连接设备或模拟器

**Android：**
- 连接真机并开启 USB 调试
- 或启动 Android 模拟器
- 使用木木模拟器可运行：`npm run connect-mumu`

**iOS：**
- 启动 iOS 模拟器
- 或连接真机并配置开发证书

#### 4. 启动开发服务器

```bash
npm run start
```

#### 5. 运行应用

在新的终端窗口中运行：

```bash
# Android
npm run android

# iOS
npm run ios
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run start` | 启动 Metro 开发服务器 |
| `npm run android` | 启动 Android 应用 |
| `npm run ios` | 启动 iOS 应用 |
| `npm run lint` | 运行 ESLint 代码检查并自动修复 |
| `npm run build-android` | 构建 Android 发布包（APK） |
| `npm run generate-assets` | 生成静态资源 |
| `npm run connect-mumu` | 连接木木模拟器 (localhost:7555) |
| `npm run clean` | 清理 Android 构建缓存 |
| `npm test` | 运行测试 |

### 项目结构

```
MusicFree/
├── src/
│   ├── components/      # 通用 UI 组件库
│   ├── pages/          # 应用页面组件
│   ├── core/           # 核心业务逻辑
│   │   ├── trackPlayer/    # 音频播放器
│   │   ├── musicSheet/     # 歌单管理
│   │   ├── pluginManager/  # 插件管理系统
│   │   ├── config.ts       # 配置管理
│   │   └── theme.ts        # 主题系统
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数库
│   ├── constants/      # 常量和配置
│   ├── hooks/          # 自定义 React Hooks
│   └── service/        # 服务接口
├── android/            # Android 原生代码和配置
├── ios/                # iOS 原生代码和配置
├── generator/          # 资源生成脚本
└── release/            # 发布相关配置
```

### 开发注意事项

- **代码规范：** 提交代码前会通过 Husky + Lint Staged 自动运行 ESLint 检查，请确保代码符合规范
- **最低版本：** 自 v0.5.0 起，Android 最低支持版本为 7.0
- **插件化架构：** 所有音源功能通过插件实现，主程序不包含任何音源
- **插件开发：** 插件需遵循 CommonJS 模块规范，详见 [插件开发文档](https://musicfree.catcat.work/plugin/introduction.html)
- **开源协议：** 本项目基于 AGPL 3.0 协议，二次开发需遵守协议要求

### 技术栈

**核心框架：**
- React Native 0.76.5
- React 18.3.1
- TypeScript 5.3.3

**状态管理与存储：**
- Jotai 2.9.1 - 状态管理
- React Native MMKV 2.12.2 - 高性能本地存储
- AsyncStorage 1.23.1 - 异步存储

**路由与导航：**
- React Navigation 6.x - 导航框架
- React Native Gesture Handler - 手势处理

**音频播放：**
- React Native Track Player 4.1.1 - 音频播放核心

**网络请求：**
- Axios 1.7.4 - HTTP 客户端

**UI 组件库：**
- @shopify/flash-list 1.7.1 - 高性能列表
- React Native SVG 15.8.0 - SVG 支持
- React Native Linear Gradient - 渐变效果
- React Native Reanimated 3.16.6 - 动画库

**工具库：**
- dayjs - 日期处理
- cheerio - HTML 解析
- crypto-js - 加密工具
- nanoid - ID 生成

**构建工具：**
- Metro - JavaScript 打包
- Babel - 代码转译
- Gradle - Android 构建
- Expo 52.0.0 - 部分模块支持

## ❓ Q&A

**常见问题：** [MusicFree 使用 Q&A](https://musicfree.catcat.work/qa/common.html)

**交流渠道：**
- 💬 技术交流 QQ 群：[683467814](https://jq.qq.com/?_wv=1027&k=upVpi2k3)（技术交流，非答疑群）
- 📺 QQ 频道：[点击加入](https://pd.qq.com/s/cyxnf0jj1)

## 🚧 反馈 & 建议

欢迎通过以下方式提出需求或反馈问题：
- 📮 公众号后台留言
- 🐛 提交 [Issue](https://github.com/maotoumao/MusicFree/issues)
- 💡 在 [Discussions](https://github.com/maotoumao/MusicFree/discussions) 开启话题

## 💖 支持项目

如果你喜欢这个项目，欢迎通过以下方式支持：

1. ⭐ Star 这个项目，分享给身边的朋友
2. 📱 关注公众号「一只猫头猫」获取最新信息
3. 📺 关注 B 站 [不想睡觉猫头猫](https://space.bilibili.com/12866223)

![微信公众号](./src/assets/imgs/wechat_channel.jpg)

### 📣 媒体推荐

感谢以下媒体的推荐：
- [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

## 📝 更新日志

详见 [ChangeLog](./changelog.md)

---
本项目仅供学习参考使用，基于 AGPL3.0 协议开源；请在符合法律法规的情况下合理使用本项目，禁止用于商业目的使用。

## 📸 应用截图

> **注意：** 以下截图仅为 UI 样例，软件内部不提供任何音源，不代表实际使用时表现如下图。

#### 主界面

![主界面](./.imgs/main.jpg)

#### 侧边栏

- 基础设置
  ![基础设置](./.imgs/basic-setting.jpg)

- 主题设置
  ![主题设置](./.imgs/theme-setting.jpg)

#### 音乐相关

- 歌单页
  ![歌单页](./.imgs/song-sheet.jpg)

- 歌单内检索
  ![歌单内检索](./.imgs/search-in-sheet.jpg)

- 播放页
  ![播放页](./.imgs/song-cover.jpg)

- 歌词页
  ![歌词页](./.imgs/song-lrc.jpg)


#### 搜索相关

- 作者信息
  ![专辑信息](./.imgs/artist-detail.jpg)
