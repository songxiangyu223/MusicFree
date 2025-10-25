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

**支持平台：**
- 📱 **Android** (Android 7.0+)
- 🎨 **Harmony OS**
- 💻 **桌面版**：[MusicFreeDesktop](https://github.com/maotoumao/MusicFreeDesktop)

**技术栈：**
- React Native 0.76.5
- TypeScript
- React Navigation
- 插件系统基于 CommonJS

**当前版本：** v0.5.1  
**更新时间：** 2025年4月4日

如果需要了解后续进展可以关注公众号↓；如果有问题可以在 issue 区或者公众号直接留言反馈。

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" width="200" alt="微信公众号">
</p>

软件下载方式、插件使用说明、插件开发文档可去站点 [https://musicfree.catcat.work](https://musicfree.catcat.work) 查看。

> [!NOTE]
> - 如果你在其他的平台看到收费版/无广告版/破解版，都是假的，本来就是开源项目，**遇到收费版请直接举报**；
> - 软件首先是自用，顺带分享出来希望可以帮助到有需要的人；是业余作品，会尽量保持维护，不过每天能写的时间有限（半小时左右），目测会有很长一段时间处于不稳定测试版本，且更新频率不定，请谨慎使用；
> - 软件的第三方插件、及其所产生的数据与本软件无关，请合理合法使用，可能产生的版权数据请及时删除。
> - **请不要以 VIP/破解版为噱头进行宣传**，示例仓库基于互联网公开接口封装，并**过滤掉所有 VIP、试听、付费歌曲**，且示例仓库以后也**不会提供具备破解功能的插件**；
> - 本软件的相关信息**只会主动投放在 Git 仓库以及公众号“一只猫头猫”中**，如果希望写文章介绍本软件请自便，但还烦请**如实陈述，涉及到示例仓库请给插件源打个码**，不要给软件增加一些不实的功能（尽管我也想有）；描述冲突的地方以本仓库为准。


## 📜 项目使用约定

本项目基于 **AGPL 3.0** 协议开源，使用此项目时请遵守开源协议。  
除此外，希望你在使用代码时已经了解以下额外说明：

1. 打包、二次分发 **请保留代码出处**：https://github.com/maotoumao/MusicFree
2. 请不要用于商业用途，合法合规使用代码；
3. 如果开源协议变更，将在此 Github 仓库更新，不另行通知。

> [!CAUTION]
> 👎 小米/华为/vivo等<ins>应用市场的 MusicFree </ins>和本软件无关，**是套用本软件名称和 Logo 的广告软件**。
>
> 👎 速悦音乐基于本软件二次开发，改动点仅仅是内置插件、修改一些 UI 以及引流，**并未遵守本项目的开源协议，且拒绝沟通**。

---

## ✨ 核心特性

### 🔌 插件化架构
本软件仅仅是一个播放器框架，本身**并不集成**任何平台的任何音源，所有的搜索、播放、歌单导入等功能全部基于**插件**实现。

**插件支持的功能：**
- 🔍 **搜索功能**：音乐、专辑、作者、歌单
- ▶️ **在线播放**：支持多种音质、m3u8 流媒体
- 💿 **专辑详情**：查看专辑信息和曲目列表
- 👤 **作者信息**：查看作者详细信息和作品
- 📥 **导入功能**：导入单曲、导入歌单
- 📝 **歌词支持**：获取在线歌词、本地歌词
- 🏆 **榜单功能**：查看各平台音乐榜单
- 💬 **评论功能**：查看歌曲评论区（v0.4.0+）

### 🎨 定制化 & 无广告
- 🌓 **主题系统**：支持浅色/深色模式，跟随系统设置
- 🖼️ **自定义背景**：支持自定义背景图片、透明度、模糊度
- 🎵 **桌面歌词**：支持桌面悬浮歌词（需授权悬浮窗权限）
- 💯 **完全免费**：基于 AGPL 协议开源，永久免费
- 🚫 **零广告**：无任何广告

### 🔒 隐私保护
- 📦 **本地存储**：所有数据存储在本地，不上传任何信息
- 🔐 **隐私优先**：不收集任何个人信息
- ☁️ **WebDAV 备份**：支持 WebDAV 备份与同步（可选）

### 🎼 高级功能
- 📄 **歌词功能**：歌词关联、歌词翻译、歌词搜索、歌词大小调整
- ⚡ **播放控制**：倍速播放、定时关闭、播放模式切换
- 🎚️ **音质选择**：支持多音质切换和下载
- 📥 **本地音乐**：支持导入本地音乐（mp3/flac/wav/m4a/aac/ogg）
- 🔄 **自动换源**：音源失效时自动切换其他源
- 📊 **播放记录**：记录播放历史，支持批量管理

## 🔌 插件系统

### 💡 插件简介

插件本质上是一个满足插件协议的 **CommonJS** 模块。开发者只需要关心输入输出逻辑，分页、缓存等全都交给 MusicFree 控制。

**📚 插件开发文档：** [https://musicfree.catcat.work/plugin/introduction.html](https://musicfree.catcat.work/plugin/introduction.html)

### ⚠️ 使用须知

- **安全性**：如果你使用第三方下载的插件，请自行鉴别插件的安全性（基本上看下没有奇怪的网络请求什么的就好了；自己写的最安全，*不要安装来路不明的东西*），防止恶意代码破坏。因为第三方恶意插件导致的可能的损失与本软件无关。

- **版权说明**：插件使用过程中可能会产生某些和本软件无关的版权数据，插件、以及插件产生的任何数据与本软件无关，请使用者自行斟酌，及时删除数据，本软件不提倡也不会提供任何破解行为，你可以搭建自己的离线音乐仓库使用。

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

## 📦 下载安装

### 下载地址

- 🌐 **GitHub Releases:** [https://github.com/maotoumao/MusicFree/releases](https://github.com/maotoumao/MusicFree/releases)
- 🌐 **Gitee Releases:** [https://gitee.com/maotoumao/MusicFree/releases](https://gitee.com/maotoumao/MusicFree/releases)
- 💬 **公众号：** 关注「一只猫头猫」回复「MusicFree」获取下载链接

### 系统要求

- **Android：** Android 7.0 及以上版本
- **Harmony OS：** 支持
- **注意：** v0.5.0 及以上版本仅支持 Android 7.0+，低版本设备请使用旧版本

## ❓ 帮助与支持

### 常见问题

📖 **常见问题文档：** [MusicFree 使用 Q&A](https://musicfree.catcat.work/qa/common.html)

### 交流渠道

- 💬 **QQ 交流群：** [683467814](https://jq.qq.com/?_wv=1027&k=upVpi2k3)（技术交流，非答疑群）
- 📺 **QQ 频道：** [点击加入](https://pd.qq.com/s/cyxnf0jj1)
- 🐛 **问题反馈：** [GitHub Issues](https://github.com/maotoumao/MusicFree/issues)
- 💡 **功能建议：** [GitHub Discussions](https://github.com/maotoumao/MusicFree/discussions)

## 🚧 反馈与建议

欢迎通过以下方式提出需求或反馈问题：

- 📮 **公众号留言**：公众号「一只猫头猫」后台留言
- 🐛 **Bug 反馈**：提交 [GitHub Issue](https://github.com/maotoumao/MusicFree/issues)
- 💡 **功能建议**：在 [GitHub Discussions](https://github.com/maotoumao/MusicFree/discussions) 开启话题
- 💬 **社区交流**：加入 QQ 群或 QQ 频道

## 💖 支持项目

如果你喜欢这个项目，欢迎通过以下方式支持：

1. ⭐ **Star 项目**：给这个项目点个 Star，分享给身边的朋友
2. 📱 **关注公众号**：关注公众号「一只猫头猫」获取最新信息
3. 📺 **关注 B 站**：关注 B 站 [不想睡觉猫头猫](https://space.bilibili.com/12866223)
4. 🔌 **贡献插件**：开发并分享你的插件
5. 🐛 **参与开发**：提交 PR 帮助改进项目

<p align="center">
  <img src="./src/assets/imgs/wechat_channel.jpg" width="200" alt="微信公众号">
</p>

### 📣 媒体推荐

感谢以下媒体的推荐与支持：
- 🥜 [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- 🧥 [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

## 🛠️ 开发相关

### 技术栈

- **框架：** React Native 0.76.5
- **语言：** TypeScript
- **导航：** React Navigation
- **状态管理：** Jotai
- **音频播放：** react-native-track-player
- **存储：** MMKV

### 本地开发

```bash
# 安装依赖
yarn install

# 运行 Android
yarn android

# 运行 iOS
yarn ios

# 启动开发服务器
yarn start
```

### 构建发布

```bash
# Android 构建
yarn build-android
```

## 📝 更新日志

详见 [ChangeLog](./changelog.md)

---

## ⚖️ 免责声明

本项目仅供**学习参考**使用，基于 **AGPL 3.0** 协议开源；请在符合法律法规的情况下合理使用本项目，**禁止用于商业目的**使用。

**版权说明：** 软件本身不提供任何音源，所有音源均来自第三方插件。插件及其产生的任何数据与本软件无关，请使用者自行斟酌，及时删除可能产生的版权数据。

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
