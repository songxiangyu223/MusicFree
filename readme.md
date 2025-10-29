<div align="center">

# MusicFree

**插件化、定制化、无广告的免费音乐播放器**

[![GitHub Stars](https://img.shields.io/github/stars/maotoumao/MusicFree?style=flat-square&logo=github)](https://github.com/maotoumao/MusicFree)
[![GitHub Forks](https://img.shields.io/github/forks/maotoumao/MusicFree?style=flat-square&logo=github)](https://github.com/maotoumao/MusicFree)
[![GitHub License](https://img.shields.io/github/license/maotoumao/MusicFree?style=flat-square)](LICENSE)
[![GitHub Downloads](https://img.shields.io/github/downloads/maotoumao/MusicFree/total?style=flat-square&logo=github)](https://github.com/maotoumao/MusicFree/releases)
[![GitHub Issues](https://img.shields.io/github/issues/maotoumao/MusicFree?style=flat-square&logo=github)](https://github.com/maotoumao/MusicFree/issues)
[![Version](https://img.shields.io/github/package-json/v/maotoumao/MusicFree?style=flat-square)](package.json)

[简体中文](readme.md) | [English](README_EN.md)

[官方文档](https://musicfree.catcat.work) · [问题反馈](https://github.com/maotoumao/MusicFree/issues) · [更新日志](changelog.md)

</div>



---

## 📖 简介

MusicFree 是一款**插件化**、**定制化**、**无广告**的免费音乐播放器。软件本身是一个播放器框架，所有音源均通过插件提供，为用户提供最大的自由度和可扩展性。

### 支持平台

- 📱 **Android 7.0+**
- 🎨 **Harmony OS**
- 💻 **桌面版**: [MusicFreeDesktop](https://github.com/maotoumao/MusicFreeDesktop) (支持 Windows / macOS / Linux)

### 快速开始

- 📥 [下载安装包](#-下载地址)
- 📚 [查看使用文档](https://musicfree.catcat.work)
- 🔌 [插件安装教程](#-插件)
- 💬 [加入社区讨论](#-交流社区)

> [!WARNING]
> 
> **重要声明**
> 
> - 本项目完全开源免费，**如遇收费版请直接举报**
> - 应用市场（小米/华为/vivo等）的 MusicFree 为**假冒软件**，与本项目无关
> - **速悦音乐**基于本项目二次开发但**未遵守开源协议**，与本项目无关
> - 软件的第三方插件及其数据与本软件无关，请合法使用
> - 示例插件仓库**已过滤所有 VIP、付费歌曲**，不提供破解功能
> - 本软件官方信息仅发布在 **GitHub** 和公众号**「一只猫头猫」**


## 📜 开源协议

本项目基于 [AGPL 3.0](LICENSE) 协议开源。使用本项目代码时请遵守以下规定：

1. ✅ **保留代码出处**: 打包或二次分发时必须注明来源 `https://github.com/maotoumao/MusicFree`
2. ❌ **禁止商业用途**: 请勿将本项目用于任何商业目的
3. 📝 **协议变更**: 如有变更将在 GitHub 仓库更新，不另行通知
4. ⚖️ **合法使用**: 请遵守当地法律法规，合理合法使用本项目

---

---

## ✨ 核心特性

### 🔌 插件化架构

MusicFree 本身只是一个播放器框架，**不内置任何音源**。所有功能通过插件实现，用户可自由选择和定制。

**插件能力：**

- 🔍 **搜索**: 支持音乐、专辑、歌手、歌单搜索
- ▶️ **播放**: 在线音乐播放
- 💿 **专辑**: 查看专辑详情及歌曲列表
- 👤 **歌手**: 查看歌手信息及作品
- 📥 **导入**: 批量导入单曲、歌单
- 📝 **歌词**: 获取同步歌词
- 💬 **评论**: 查看歌曲评论区（v0.4.0+）

### 🎨 高度定制化

- 🌗 **主题**: 浅色/深色模式，支持跟随系统
- 🖼️ **背景**: 自定义背景图片、模糊度、透明度
- 🎵 **歌词**: 支持桌面歌词、歌词翻译、进度调整
- 📱 **界面**: 多种布局样式可选
- 🆓 **无广告**: 永久免费，无任何广告

### 🔒 隐私保护

- 💾 **本地存储**: 所有数据存储在本地，不上传云端
- 🚫 **无追踪**: 不收集任何用户信息和使用数据
- 🔐 **开源透明**: 代码完全开源，可自行审查

### 🎵 播放功能

- 📄 **歌词**: 支持歌词搜索、关联、翻译
- 🎚️ **音质**: 多种音质选择
- ⏩ **倍速**: 支持倍速播放
- 🔀 **播放模式**: 顺序/随机/单曲循环
- ⏱️ **定时关闭**: 支持定时停止播放
- 📦 **本地音乐**: 支持导入本地音乐文件
- ☁️ **WebDAV**: 支持 WebDAV 云端备份与播放

---

## 🔌 插件系统

### 插件简介

插件是一个符合 MusicFree 插件协议的 **CommonJS** 模块。开发者只需关注业务逻辑，分页、缓存等由框架统一处理。

- 📚 **开发文档**: [插件开发指南](https://musicfree.catcat.work/plugin/introduction.html)
- 📦 **示例仓库**: [MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)
- 🛠️ **插件协议**: CommonJS 模块，支持用户变量配置

> [!WARNING]
> 
> **插件使用须知**
> 
> - ⚠️ 请自行鉴别第三方插件的安全性，不要安装来路不明的插件
> - 📝 插件产生的数据与本软件无关，请合法使用并及时删除版权数据
> - 🚫 本软件不提供任何破解功能，建议搭建个人音乐库使用

### 📥 插件安装

#### 方式一：从网络安装（推荐）

1. 打开 MusicFree → **侧边栏** → **设置** → **插件设置**
2. 选择**从网络安装插件**
3. 输入插件源地址：

```
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json
```

或 GitHub 地址：

```
https://raw.githubusercontent.com/maotoumao/MusicFreePlugins/master/plugins.json
```

#### 方式二：本地安装

1. 下载 `.js` 插件文件到手机
2. 打开 MusicFree → **侧边栏** → **设置** → **插件设置**
3. 选择**安装本地插件**，选择下载的 `.js` 文件

#### 插件管理

- 🔄 **更新插件**: 插件设置 → 批量更新
- ⚙️ **插件配置**: 支持用户变量，可配置个人音乐源
- 🔀 **插件排序**: 可调整插件顺序，影响搜索结果排序
- 🎛️ **插件开关**: 控制插件在搜索、榜单中的显示

#### 相关链接

- 📖 [插件使用教程](https://musicfree.catcat.work/usage/mobile/install-plugin.html)
- 🔧 [插件开发文档](https://musicfree.catcat.work/plugin/introduction.html)
- 📦 [示例插件仓库](https://github.com/maotoumao/MusicFreePlugins)

---

## 📦 下载安装

### 下载地址

| 平台 | 链接 | 说明 |
|------|------|------|
| 🐙 GitHub | [Releases](https://github.com/maotoumao/MusicFree/releases) | 国际用户推荐 |
| 🦊 Gitee | [Releases](https://gitee.com/maotoumao/MusicFree/releases) | 国内用户推荐 |
| 💬 公众号 | 回复 `MusicFree` | 获取下载链接 |

### 系统要求

- **Android**: Android 7.0 (API 24) 及以上
- **Harmony OS**: 支持 Android 兼容模式的设备

### 安装说明

1. 下载对应架构的 APK 文件（推荐下载 `universal` 通用版）
2. 允许安装未知来源应用
3. 安装并打开 MusicFree
4. [安装插件](#-插件系统)开始使用

> [!TIP]
> 如遇下载速度慢，建议使用 Gitee 或公众号获取下载链接

---

## 💬 交流社区

### 常见问题

遇到问题请先查看 [常见问题解答](https://musicfree.catcat.work/qa/common.html)

### 交流渠道

| 平台 | 链接 | 说明 |
|------|------|------|
| 💬 QQ 群 | [683467814](https://jq.qq.com/?_wv=1027&k=upVpi2k3) | 技术交流群（非答疑群）|
| 📺 QQ 频道 | [点击加入](https://pd.qq.com/s/cyxnf0jj1) | 官方 QQ 频道 |
| 📮 公众号 | 一只猫头猫 | 关注获取最新动态 |
| 🐛 Issues | [GitHub Issues](https://github.com/maotoumao/MusicFree/issues) | Bug 反馈与功能建议 |
| 💡 Discussions | [GitHub Discussions](https://github.com/maotoumao/MusicFree/discussions) | 功能讨论与交流 |

<div align="center">

### 关注公众号

<img src="./src/assets/imgs/wechat_channel.jpg" width="200" alt="微信公众号">

**「一只猫头猫」**

获取最新更新 · 插件推荐 · 使用技巧

</div>

---

## 🤝 参与贡献

欢迎各种形式的贡献！

### 反馈问题

- 🐛 **Bug 反馈**: [提交 Issue](https://github.com/maotoumao/MusicFree/issues/new)
- 💡 **功能建议**: [发起讨论](https://github.com/maotoumao/MusicFree/discussions/new)
- 📮 **其他反馈**: 公众号后台留言

### 贡献代码

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 开发插件

- 📚 阅读 [插件开发文档](https://musicfree.catcat.work/plugin/introduction.html)
- 🔧 参考 [示例插件](https://github.com/maotoumao/MusicFreePlugins)
- 📤 提交到插件仓库供大家使用

---

## 💖 支持项目

如果这个项目对你有帮助，欢迎通过以下方式支持：

- ⭐ **Star** 本项目，让更多人发现
- 🔗 **分享** 给需要的朋友
- 📱 **关注** 公众号「一只猫头猫」获取最新资讯
- 📺 **关注** B 站 [@不想睡觉猫头猫](https://space.bilibili.com/12866223)
- 🐛 **反馈** 问题和建议
- 🔌 **开发** 插件丰富生态

### 致谢

感谢所有贡献者和支持者！

特别感谢以下媒体的推荐：

- [果核剥壳](https://mp.weixin.qq.com/s/F6hMbLv_a-Ty0fPA_0P0Rg)
- [小棉袄](https://mp.weixin.qq.com/s/Fqe3o7vcTw0KDKoB-gsQfg)

---

## 📝 更新日志

查看 [更新日志](changelog.md) 了解版本更新详情。

### 最新版本 v0.5.1 (2025.4.4)

- 🔧 修复插件开关点击无效的问题
- 🔧 修复开屏图片消失的问题
- ✨ 增加新建歌单名称的长度限制
- ✨ 优化插件安装失败的提示样式

[查看完整更新日志](changelog.md)

---

## 📸 应用截图

> [!NOTE]
> 以下截图仅为界面展示，软件本身不提供音源，实际内容取决于安装的插件。

<div align="center">

### 主界面

<img src="./.imgs/main.jpg" width="250" alt="主界面">

### 播放界面

<img src="./.imgs/song-cover.jpg" width="250" alt="播放页"> <img src="./.imgs/song-lrc.jpg" width="250" alt="歌词页">

### 歌单与搜索

<img src="./.imgs/song-sheet.jpg" width="250" alt="歌单页"> <img src="./.imgs/search-in-sheet.jpg" width="250" alt="歌单检索">

### 设置界面

<img src="./.imgs/basic-setting.jpg" width="250" alt="基础设置"> <img src="./.imgs/theme-setting.jpg" width="250" alt="主题设置">

### 详情页面

<img src="./.imgs/artist-detail.jpg" width="250" alt="作者信息">

</div>

---

## 📄 许可证

本项目基于 [AGPL-3.0](LICENSE) 许可证开源。

```
Copyright (C) 2024 猫头猫

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
```

---

<div align="center">

**⚠️ 免责声明**

本项目仅供学习交流使用，请勿用于商业用途。

请在遵守当地法律法规的前提下使用本软件。

使用本软件产生的任何问题由使用者自行承担，与开发者无关。

---

**Made with ❤️ by [猫头猫](https://github.com/maotoumao)**

如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！

</div>
