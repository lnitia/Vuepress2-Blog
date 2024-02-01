---
icon: duoren
date: 2023-12-04
category:
  - HoloLens
tag:
  - 多用户
  - 音视频通信
order: 2
excerpt: <p>实现方案总结：HoloLens与pc端的音视频通信、实时数据传输，HoloLens设备间连接，HoloLens第三视角查看</p>
editLink: false
---
# HoloLens通信

### 与pc端音视频通信

官方的解决方案：

1. 后台系统：可接收HoloLens端音视频，原理：Azure媒体服务
2. Dynamic 365 Remote Assist：通过Microsoft Teams互联，可标注，原理：Azure通信服务+Azure Spatial Anchors

方案：

1. webRTC连接：MixedReality-WebRTC   [https://github.com/microsoft/MixedReality-WebRTC](https://github.com/microsoft/MixedReality-WebRTC)
   插件：webRTC Video Chat
2. 开源SDK：UnityChatSDK（仿dynamic365功能、付费）[https://github.com/ShanguUncle/UnityChatSDK/blob/master/README.zh.md](https://github.com/ShanguUncle/UnityChatSDK/blob/master/README.zh.md)
3. DataMesh One

### 实时数据传输

hololens→电脑：

1. 网络连接
2. TCP/IP、UDP或者**WebSocket**等协议进行通信
3. hololens中的数据以**网络数据包**的形式传输，电脑接收数据并处理

数据→hololens：

1. 远程服务器与应用连接：将数据存储在远程服务器上，应用程序**通过网络连接到服务器来获取数据** 。应用程序可以定期或根据需要从服务器下载新数据，并在 HoloLens 中使用。
2. 实时数据同步：使用 **WebSocket** 或类似的实时通信技术，建立 HoloLens 和服务器之间的连接，以便在网页上更新数据时，能够即时地传输到 HoloLens 应用中。
3. Web API 与 Unity 通信：在 Unity 中，可以使用 **UnityWebRequest** 或类似的功能与 Web API 进行通信，从而在 HoloLens 应用中通过 **HTTP 请求获取最新的数据** 。
4. Asset Bundle 动态加载：将数据打包成 **Asset Bundle** ，存储在远程服务器上，然后在运行时动态加载这些 Bundle 到 HoloLens 应用程序中。

### HoloLens设备间连接

PUN连接：[https://learn.microsoft.com/zh-cn/windows/mixed-reality/develop/unity/tutorials/mr-learning-sharing-01](https://learn.microsoft.com/zh-cn/windows/mixed-reality/develop/unity/tutorials/mr-learning-sharing-01)

### 第三视角查看

官方方案：

基于Azure Kinect（传感器）的云服务

其他方案：

Spectator-view连接 → vuforia SDK实现图片识别定位 → ARcore实现空间同步

网络：lcp网络套接字（**Socket**异步套接字**网络开发**）or UNET，hololens间同步锚点，手机连接扫码
