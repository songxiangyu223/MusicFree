# MusicFree

![GitHub Repo stars](https://img.shields.io/github/stars/maotoumao/MusicFree) 
![GitHub forks](https://img.shields.io/github/forks/maotoumao/MusicFree)
![star](https://gitcode.com/maotoumao/MusicFree/star/badge.svg)

![GitHub License](https://img.shields.io/github/license/maotoumao/MusicFree)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/maotoumao/MusicFree/total)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/maotoumao/MusicFree)
![GitHub package.json version](https://img.shields.io/github/package-json/v/maotoumao/MusicFree)



## 📖 简介

一个**插件化**、**定制化**、**无广告**的免费音乐播放器。

> 🎯 通过插件扩展音源，自定义你的音乐世界

**支持平台：**
- 📱 Android (7.0+)
- 🎨 Harmony OS
- 💻 桌面版：[MusicFreeDesktop](https://github.com/maotoumao/MusicFreeDesktop)

**当前版本：** v0.5.1 (2025.4.4)

**技术栈：**
- ⚛️ React Native 0.76.5
- 📦 TypeScript
- 🎵 React Native Track Player
- 💾 MMKV 本地存储

如果需要了解后续进展可以关注公众号↓；如果有问题可以在 issue 区或者公众号直接留言反馈。

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" alt="微信公众号" width="300">
</p>

软件下载方式、插件使用说明、插件开发文档可去站点 [https://musicfree.catcat.work](https://musicfree.catcat.work) 查看。

> [!NOTE]
> **重要声明**
> - ✅ 本软件**完全免费开源**，如果你在其他平台看到收费版/无广告版/破解版，都是假的，**遇到收费版请直接举报**
> - 🔧 软件首先是自用，顺带分享出来希望可以帮助到有需要的人；是业余作品，会尽量保持维护，更新频率不定，请谨慎使用
> - 📜 软件的第三方插件及其所产生的数据与本软件无关，请合理合法使用，可能产生的版权数据请及时删除
> - 🚫 **请不要以 VIP/破解版为噱头进行宣传**，示例仓库基于互联网公开接口封装，并**过滤掉所有 VIP、试听、付费歌曲**
> - 📢 本软件的相关信息**只会主动投放在 GitHub/Gitee 仓库以及公众号"一只猫头猫"中**


## 📋 项目使用约定

本项目基于 **AGPL 3.0** 协议开源，使用此项目时请遵守开源协议。

除此外，希望你在使用代码时已经了解以下额外说明：

1. 📦 打包、二次分发 **请保留代码出处**：https://github.com/maotoumao/MusicFree
2. ⚖️ 请不要用于商业用途，合法合规使用代码
3. 📝 如果开源协议变更，将在此 GitHub 仓库更新，不另行通知

> [!CAUTION]
> 👎 小米/华为/vivo等<ins>应用市场的 MusicFree </ins>和本软件无关，**是套用本软件名称和 Logo 的广告软件**。
>
> 👎 速悦音乐基于本软件二次开发，改动点仅仅是内置插件、修改一些 UI 以及引流，**并未遵守本项目的开源协议，且拒绝沟通**。

---

## ✨ 特性

### 🔌 插件化架构

本软件仅仅是一个播放器，本身**并不集成**任何平台的任何音源，所有的搜索、播放、歌单导入等功能全部基于**插件**实现。

**插件支持的功能：**
- 🔍 **搜索** - 音乐、专辑、作者、歌单
- ▶️ **在线播放** - 多音质支持、自动换源
- 💿 **专辑详情** - 查看专辑信息及曲目列表
- 👤 **作者信息** - 查看歌手详细信息及作品
- 📥 **歌单导入** - 批量导入单曲、导入歌单
- 📝 **歌词获取** - 支持歌词搜索、翻译、关联
- 💬 **评论功能** - 查看音乐评论区（v0.4.0+）

### 🎨 定制化 & 无广告

- 🌓 **主题模式** - 浅色/深色/跟随系统
- 🖼️ **自定义背景** - 自定义背景图片、模糊度、透明度
- 🎵 **播放设置** - 倍速播放、音质选择、自动换源
- 💯 **完全免费** - 基于 AGPL 3.0 协议开源，永久免费
- 🚫 **零广告** - 无任何广告打扰

### 🔒 隐私保护

- 📱 **本地存储** - 所有数据都存储在本地
- 🔐 **零数据收集** - 不会收集你的任何个人信息
- ☁️ **Webdav 支持** - 可选使用 Webdav 进行备份（v0.2.0+）

### 🎶 强大功能

- 📄 **歌词功能** - 歌词搜索、翻译、关联、桌面歌词
- 📥 **本地音乐** - 支持导入本地音乐文件（mp3/flac/wav/m4a/ogg/aac）
- 💾 **备份恢复** - 支持本地备份、Webdav 云端备份
- 📊 **播放历史** - 自动记录播放历史
- ⏰ **定时关闭** - 支持定时关闭功能

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

从网络安装插件，输入以下地址之一：

```bash
# Gitee（推荐国内用户）
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json

# GitHub
https://raw.githubusercontent.com/maotoumao/MusicFreePlugins/master/plugins.json
```

**详细教程：**
- 📖 图文教程：[MusicFree 插件使用指南](https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483875&idx=1&sn=aedf8bb909540634d927de7fd2b4b8b1&chksm=c1a390c4f6d419d233908bb781d418c6b9fd2ca82e9e93291e7c93b8ead3c50ca5ae39668212#rd)
- 🌐 官方文档：[https://musicfree.catcat.work/usage/mobile/install-plugin.html](https://musicfree.catcat.work/usage/mobile/install-plugin.html)

## 📦 下载地址

> ⚠️ **最低系统要求：Android 7.0+**（v0.5.0 及以上版本）

- 📥 **GitHub Releases:** [https://github.com/maotoumao/MusicFree/releases](https://github.com/maotoumao/MusicFree/releases)
- 📥 **Gitee Releases:** [https://gitee.com/maotoumao/MusicFree/releases](https://gitee.com/maotoumao/MusicFree/releases)
- 💬 **公众号：** 回复「MusicFree」获取下载链接

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

1. ⭐ **Star** 这个项目，分享给身边的朋友
2. 🐛 **提交 Issue** 反馈问题或建议
3. 🔧 **贡献代码** 提交 Pull Request
4. 📱 **关注公众号**「一只猫头猫」获取最新信息
5. 📺 **关注 B 站** [不想睡觉猫头猫](https://space.bilibili.com/12866223)

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" alt="微信公众号" width="300">
</p>

### 📣 媒体推荐

感谢以下媒体的推荐：
- [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=maotoumao/MusicFree&type=Date)](https://star-history.com/#maotoumao/MusicFree&Date)

## 📝 更新日志

详见 [ChangeLog](./changelog.md)

---

## 🔧 开发相关

### 环境要求

- Node.js >= 18
- React Native 开发环境
- Android Studio（Android 开发）
- Xcode（iOS 开发，仅 macOS）

### 快速开始

```bash
# 安装依赖
yarn install

# 启动 Metro
yarn start

# 运行 Android
yarn android

# 运行 iOS（仅 macOS）
yarn ios

# 构建 Android Release
yarn build-android
```

### 项目结构

```
MusicFree/
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── constants/     # 常量定义
│   ├── core/          # 核心功能模块
│   ├── hooks/         # 自定义 Hooks
│   ├── pages/         # 页面组件
│   ├── service/       # 服务层
│   ├── types/         # TypeScript 类型定义
│   └── utils/         # 工具函数
├── android/           # Android 原生代码
├── ios/               # iOS 原生代码
└── generator/         # 资源生成脚本
```

---

<p align="center">
  <sub>本项目仅供学习参考使用，基于 AGPL 3.0 协议开源</sub><br>
  <sub>请在符合法律法规的情况下合理使用本项目，禁止用于商业用途</sub>
</p>

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
