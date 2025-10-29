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

**当前版本：** v0.5.1 (2025.4.4)

**技术栈：**
- React Native 0.76.5
- TypeScript
- Jotai (状态管理)
- React Navigation (路由导航)
- MMKV (数据持久化)

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
- 🔍 搜索（音乐、专辑、作者、歌单）
- ▶️ 在线播放（支持多种音质）
- 💿 查看专辑详情
- 👤 查看作者详细信息
- 📥 导入单曲、导入歌单、查看榜单
- 📝 获取歌词（支持歌词翻译）
- 💬 评论区（支持查看音乐评论）

### 🎵 播放功能
- 🎼 支持本地音乐播放（mp3/flac/wav/m4a/ogg/aac）
- 🎚️ 多种音质选择
- ⚡ 倍速播放
- 🔄 自动换源（播放失败时自动切换源）
- 📻 多种播放模式（顺序/随机/单曲循环）
- 📱 桌面歌词显示
- ⏰ 定时关闭
- 🔊 播放被打断时的处理选项

### 📚 歌单管理
- 📁 支持创建/编辑/排序歌单（单个歌单支持10000+首歌曲）
- 💾 Webdav 云备份与同步
- 📥 批量导入/导出歌单
- 🔍 歌单内搜索
- ⭐ 收藏歌单功能
- 📜 播放历史记录

### 🎨 定制化 & 无广告
- 🌓 支持浅色/深色模式，可跟随系统
- 🖼️ 支持自定义背景（可调节模糊度、透明度）
- 🎨 主题色自适应专辑封面
- 📱 适配横屏设备
- 💰 基于 AGPL 3.0 协议开源，永久免费
- 🚫 无任何广告

### 🔒 隐私保护
所有的数据都存储在本地，本软件不会收集你的任何个人信息。

### 📄 歌词功能
- 📝 歌词搜索与关联
- 🌐 歌词翻译显示
- 🔧 歌词进度调整
- 📏 歌词大小调整
- 🎯 自动搜索歌词
- 📖 支持读取本地 lrc 文件和内嵌歌词

## 🔌 插件

### 📚 插件简介

插件本质上是一个满足插件协议的 **CommonJS** 模块。开发者只需要关心输入输出逻辑，分页、缓存等全都交给 MusicFree 控制。

**📚 插件开发文档：** [https://musicfree.catcat.work/plugin/introduction.html](https://musicfree.catcat.work/plugin/introduction.html)

**💻 插件示例仓库：** [MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)

> [!WARNING]
> **使用须知：**
>
> - 插件本质上是 JavaScript 代码，请自行鉴别插件的安全性，**不要安装来路不明的插件**
> - 插件使用过程中可能会产生某些和本软件无关的版权数据，请使用者自行斟酌，及时删除数据
> - 本软件不提倡也不会提供任何破解行为

### 📥 插件安装

**快速安装（推荐）：**

1. 打开应用 → 侧边栏 → 设置 → 插件设置
2. 选择"从网络安装"
3. 输入以下地址：

```
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json
```

**其他安装方式：**
- 📱 从本地安装：安装 .js 插件文件
- 🌐 从网络安装：安装 .json 描述文件
- 🔄 插件订阅：订阅后可一键更新

**📚 详细教程：**
- 📝 图文教程：[MusicFree 插件使用指南](https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483875&idx=1&sn=aedf8bb909540634d927de7fd2b4b8b1&chksm=c1a390c4f6d419d233908bb781d418c6b9fd2ca82e9e93291e7c93b8ead3c50ca5ae39668212#rd)
- 🌐 官方文档：[https://musicfree.catcat.work/usage/mobile/install-plugin.html](https://musicfree.catcat.work/usage/mobile/install-plugin.html)

## 📦 下载地址

> [!IMPORTANT]
> **系统要求：** Android 7.0 及以上版本

- **GitHub Releases:** [https://github.com/maotoumao/MusicFree/releases](https://github.com/maotoumao/MusicFree/releases)
- **Gitee Releases:** [https://gitee.com/maotoumao/MusicFree/releases](https://gitee.com/maotoumao/MusicFree/releases)
- **公众号：** 回复「MusicFree」获取下载链接
- **百度网盘：** 链接见最新版本发布说明

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

## 🤝 贡献指南

欢迎参与项目贡献！你可以通过以下方式参与：

- 🐛 提交 Bug 报告
- 💡 提出新功能建议
- 🔧 提交代码改进
- 📝 完善文档
- 🔌 开发插件

**开发相关：**
- Node.js >= 18
- 运行 `yarn install` 安装依赖
- 运行 `yarn android` 启动 Android 开发环境

## 💖 支持项目

如果你喜欢这个项目，欢迎通过以下方式支持：

1. ⭐ Star 这个项目，分享给身边的朋友
2. 📱 关注公众号「一只猫头猫」获取最新信息
3. 📺 关注 B 站 [不想睡觉猫头猫](https://space.bilibili.com/12866223)
4. 🔌 开发并分享你的插件
5. 📖 帮助完善文档

![微信公众号](./src/assets/imgs/wechat_channel.jpg)

### 📣 媒体推荐

感谢以下媒体的推荐：
- [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

## 📝 更新日志

**最新版本 v0.5.1 (2025.4.4):**
- 修复插件开关点击无效的问题
- 修复开屏图片消失的问题
- 增加新建歌单名称的长度限制
- 优化插件安装失败的提示样式

完整更新日志详见 [ChangeLog](./changelog.md)

---

## 📜 开源协议

本项目基于 [GNU AGPL 3.0](./LICENSE) 协议开源

**使用须知：**
- ✅ 个人学习和使用
- ✅ 二次开发（需保留出处并开源）
- ❌ 商业用途
- ❌ 用于违反法律法规的行为

本项目仅供学习参考使用，请在符合法律法规的情况下合理使用本项目。

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
