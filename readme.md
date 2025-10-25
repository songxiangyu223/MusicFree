# MusicFree

<p align="center">
  <img src="https://img.shields.io/github/stars/maotoumao/MusicFree?style=flat-square" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/maotoumao/MusicFree?style=flat-square" alt="GitHub forks" />
  <img src="https://img.shields.io/github/license/maotoumao/MusicFree?style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/downloads/maotoumao/MusicFree/total?style=flat-square" alt="Downloads" />
  <img src="https://img.shields.io/github/v/release/maotoumao/MusicFree?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/github/issues/maotoumao/MusicFree?style=flat-square" alt="Issues" />
</p>



## 📖 简介

一个**插件化**、**定制化**、**无广告**的免费音乐播放器。

### 🌐 支持平台

- 📱 **Android** (Android 7.0+)
- 🎨 **Harmony OS**
- 💻 **桌面版**：[MusicFreeDesktop](https://github.com/maotoumao/MusicFreeDesktop)

### 📦 当前版本

**v0.5.1** | 发布日期：2025.4.4

### 🛠️ 技术栈

- React Native 0.76.5
- TypeScript
- Expo 52.0.0
- React Native Track Player

### 📢 获取最新信息

- 📱 **微信公众号**：「一只猫头猫」（扫描下方二维码）
- 🌐 **官方网站**：[https://musicfree.catcat.work](https://musicfree.catcat.work)
- 📝 **问题反馈**：Issue 区或公众号留言

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" alt="微信公众号" width="200" />
</p>

---

## ⚠️ 重要声明

> [!WARNING]
> 
> ### 🚫 虚假版本警告
> 
> - 如果你在**其他平台**看到收费版/无广告版/破解版，都是**假的**！本项目是开源项目，**遇到收费版请直接举报**
> - **小米/华为/vivo 等应用市场的 MusicFree** 和本软件无关，是**套用本软件名称和 Logo 的广告软件**
> - **速悦音乐**基于本软件二次开发，**未遵守开源协议且拒绝沟通**
>
> ### 📝 使用说明
> 
> - 本软件是**业余作品**，会尽量保持维护，更新频率不定
> - 第三方插件及其数据与本软件无关，请**合理合法使用**
> - **不提倡也不会提供任何破解行为**，示例仓库**过滤掉所有 VIP、试听、付费歌曲**
> - 官方信息**仅在 GitHub 仓库和公众号「一只猫头猫」**发布
>
> ### 📜 版权说明
> 
> - 如需转载介绍请**如实陈述**，涉及示例仓库请给插件源打码
> - 可能产生的版权数据请**及时删除**


---

## 📜 开源协议

本项目基于 **AGPL 3.0** 协议开源，使用此项目时请遵守开源协议。

### 使用约定

1. ✅ 打包、二次分发**请保留代码出处**：https://github.com/maotoumao/MusicFree
2. ✅ **禁止用于商业用途**，合法合规使用代码
3. ✅ 开源协议变更将在 GitHub 仓库更新，不另行通知

---

## ✨ 核心特性

### 🔌 插件化架构

本软件是一个**纯净的播放器**，本身**不集成任何音源**。所有搜索、播放、歌单导入等功能全部基于**插件**实现。

**插件支持的功能：**

| 功能 | 说明 |
|------|------|
| 🔍 **搜索** | 支持搜索音乐、专辑、作者、歌单 |
| ▶️ **在线播放** | 支持多种音质、m3u8 格式 |
| 💿 **专辑详情** | 查看专辑完整信息 |
| 👤 **作者信息** | 查看作者详细资料 |
| 📥 **导入功能** | 支持导入单曲、歌单 |
| 📝 **歌词** | 获取在线歌词、支持歌词搜索 |
| 💬 **评论** | 查看音乐评论区（需插件支持） |
| 🎵 **榜单** | 获取热门榜单 |

### 🎨 定制化 & 无广告

- ✨ 支持**浅色/深色模式**，可跟随系统设置
- 🖼️ 支持**自定义背景**（图片、模糊度、透明度）
- 🎵 支持**桌面歌词**（需授予悬浮窗权限）
- 🎨 **完全无广告**，基于 AGPL 协议开源
- 💯 **永久免费**

### 🔒 隐私保护

- 📦 所有数据**本地存储**
- 🚫 **不收集任何个人信息**
- ☁️ 支持 **WebDAV 备份**

### 🎵 丰富功能

- 📄 **歌词关联**：多首歌可以共享歌词（A→B→C）
- 🔄 **自动换源**：音源失效时自动切换其他源
- ⏱️ **倍速播放**：支持调节播放速度
- ⏰ **定时关闭**：支持定时停止播放
- 📥 **本地音乐**：支持导入和播放本地文件
- 💾 **历史记录**：记录播放历史
- 🔍 **歌单内搜索**：快速查找歌单内歌曲

## 🔌 插件系统

### 📝 插件简介

插件本质上是一个满足插件协议的 **CommonJS** 模块。

- 🎯 开发者只需关心**输入输出逻辑**
- ⚙️ 分页、缓存等由 **MusicFree 自动处理**
- 📚 **插件开发文档**：[https://musicfree.catcat.work/plugin/introduction.html](https://musicfree.catcat.work/plugin/introduction.html)

### ⚠️ 使用须知

> [!CAUTION]
> 
> - 🔐 请自行鉴别**第三方插件的安全性**（检查网络请求等）
> - 🚫 **不要安装来路不明的插件**，自己编写的最安全
> - 📜 插件产生的数据与本软件无关，请**合理合法使用**
> - ⚖️ 因第三方恶意插件导致的损失**与本软件无关**

### 📥 插件安装

#### 安装步骤

1. 打开应用 → **侧边栏** → **设置** → **插件设置**
2. 选择安装方式：
   - 📁 **本地插件**：安装 `.js` 文件
   - 🌐 **网络插件**：通过 `.json` 描述文件安装

#### ⚡ 快速安装

**示例插件仓库**：[MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)

从网络安装插件，输入以下地址：

```
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json
```

#### 📚 详细教程

- 📖 [MusicFree 插件使用指南](https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483875&idx=1&sn=aedf8bb909540634d927de7fd2b4b8b1&chksm=c1a390c4f6d419d233908bb781d418c6b9fd2ca82e9e93291e7c93b8ead3c50ca5ae39668212#rd)
- 🌐 [官方文档](https://musicfree.catcat.work/usage/mobile/install-plugin.html)

## 📦 下载安装

### 下载地址

| 平台 | 链接 |
|------|------|
| 🐙 **GitHub** | [Releases](https://github.com/maotoumao/MusicFree/releases) |
| 🟠 **Gitee** | [Releases](https://gitee.com/maotoumao/MusicFree/releases) |
| 💬 **公众号** | 回复「MusicFree」获取下载链接 |

### 系统要求

- 📱 **Android 7.0+**（低于此版本请勿升级到 v0.5.0+）
- 🎨 **Harmony OS**

## ❓ 帮助与支持

### 📖 常见问题

查看常见问题解答：[MusicFree 使用 Q&A](https://musicfree.catcat.work/qa/common.html)

### 💬 交流社区

| 平台 | 说明 | 链接 |
|------|------|------|
| 💬 **QQ 群** | 技术交流（非答疑群） | [683467814](https://jq.qq.com/?_wv=1027&k=upVpi2k3) |
| 📺 **QQ 频道** | 官方频道 | [点击加入](https://pd.qq.com/s/cyxnf0jj1) |

### 🚧 反馈 & 建议

欢迎通过以下方式提出需求或反馈问题：

| 方式 | 说明 |
|------|------|
| 📮 **公众号** | 后台留言 |
| 🐛 **Issue** | [提交 Issue](https://github.com/maotoumao/MusicFree/issues) |
| 💡 **Discussions** | [开启话题](https://github.com/maotoumao/MusicFree/discussions) |

---

## 💖 支持项目

如果你喜欢这个项目，欢迎通过以下方式支持：

### 🌟 给予支持

1. ⭐ **Star** 这个项目，分享给身边的朋友
2. 📱 关注公众号「**一只猫头猫**」获取最新信息
3. 📺 关注 B 站 [**不想睡觉猫头猫**](https://space.bilibili.com/12866223)

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" alt="微信公众号" width="200" />
</p>

### 📣 媒体推荐

感谢以下媒体的推荐：

- 🥜 [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- 🧥 [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

---

## 📝 更新日志

详见 [ChangeLog](./changelog.md)

最新版本 **v0.5.1** (2025.4.4) 更新内容：
- ✅ 修复插件开关点击无效的问题
- ✅ 修复开屏图片消失的问题
- ✅ 增加新建歌单名称的长度限制
- ✅ 优化插件安装失败的提示样式

---

## 📄 免责声明

本项目仅供**学习参考使用**，基于 **AGPL 3.0** 协议开源。

- ⚖️ 请在符合**法律法规**的情况下合理使用本项目
- 🚫 **禁止用于商业目的**
- 📜 使用本项目即代表您同意并遵守相关协议

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
