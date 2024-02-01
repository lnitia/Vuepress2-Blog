---
icon: debug
date: 2023-05-16
category:
  - Unity
  - 前端
tag:
  - webRTC
  - input system
  - 调试
order: 3
excerpt: <p>主要有碰撞体分离、使用物理层级分类、使用异步计算、分层次几种解决方案</p>
editLink: false
---
# **调试解决通过webRTC连接unity画面到前端时产生的问题**

### webRTC资料

webRTC codelab: [https://codelabs.developers.google.com/codelabs/webrtc-web#8](https://codelabs.developers.google.com/codelabs/webrtc-web#8)

Unity Render Streaming:

[https://docs.unity3d.com/Packages/com.unity.renderstreaming@3.1/manual/sample-browserinput.html](https://docs.unity3d.com/Packages/com.unity.renderstreaming@3.1/manual/sample-browserinput.html)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240109170918.png)

## 局域网内连接问题

**一、从含unity画面的模块跳转到其他模块后返回时需刷新两次才能重连成功**

* 1. 返回时报错：[impolite-Unity.RenderStreaming.PeerConnection] Failed to set remote offer sdp: The order of m-lines in subsequent offer doesn't match order from previous offer/answer.![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240109171228.png)
* 2. 第一次刷新后报错：[impolite-Unity.RenderStreaming.PeerConnection] Session error code: ERROR_CONTENT. Session error description: Failed to apply the description for m= section with mid='0': Failed to set SSL role for the transport..![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240109171417.png)
* 3. 其他报错：[impolite-Unity.RenderStreaming.PeerConnection] Failed to set remote answer sdp: Called in wrong state: stable![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240109171440.png)

**思路**：

1.检查offer sdp和answer sdp中m=xxx的顺序或数量是否一致

[https://blog.csdn.net/csdn_shen0221/article/details/120367420](https://blog.csdn.net/csdn_shen0221/article/details/120367420)

2.[https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/](https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/)

3.新建RTCPeerConnection给新增的连接对象

[https://stackoverflow.com/questions/66062565/failed-to-set-remote-answer-sdp-called-in-wrong-state-stable](https://stackoverflow.com/questions/66062565/failed-to-set-remote-answer-sdp-called-in-wrong-state-stable)

signalingState = stable：

There is no ongoing exchange of offer and answer underway. This may mean that the RTCPeerConnection object is new, in which case both the localDescription and remoteDescription are ; it may also mean that negotiation is complete and a connection has been established.

**查找到的具体问题**：

每次返回后会新建一个连接，但会在之前的连接中发送信息，导致与前面发送的m数量不匹配

**解决**：

在退出该页面时关闭连接

```tsx
useEffect(() => {
  initializeRenderer();//进入页面时执行
  return () => {
    videoPlayer?.stop();//退出页面时执行
  }
}, []);
```

---

**二、同一设备只有一个界面能交互，另外的界面暂停**

**问题**：

新开的界面的信息会发送到原界面的连接中导致出现第一种报错

**解决方法**：

1. broadcast模式：将原界面的连接断开 → 识别新旧界面id → 将每个页面的connectionid设置为不同的（websocket为public模式）
2. single模式：websocket设置为private模式，即每开一个网页打开一个新的unity界面
3. unity render streaming中web browser input更换为receiver

[https://github.com/Unity-Technologies/UnityRenderStreaming/tree/main/WebApp/client/public/receiver](https://github.com/Unity-Technologies/UnityRenderStreaming/tree/main/WebApp/client/public/receiver)

**三、前端点击事件传递不到unity**

打开unity的新版输入系统 input system package：

[https://docs.unity3d.com/Packages/com.unity.inputsystem@1.5/manual/Settings.html](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.5/manual/Settings.html)

## 平板连接问题

**一、连接问题**

1. 打开时会传输另外一个摄像机的画面
2. 在关闭ipad后重新打开页面点不动，刷新后会回到另外一个画面

* 解决：删除single connection中的partCam stream sender（另外一个占位摄像机）

**二、交互问题**

1. 下拉菜单点完马上就收起了

* 问题原因：触屏一次的状态变化为none-began-ended-ended-ended直到下一次触屏状态才会改变，但dropdown是在离开时打开或收起
* 思路：修改前端ended输入，只传第一个ended到unity
* 解决：关闭dropdown中的out on pointer exit设置，只有当鼠标选择下拉菜单中的选项或点击其他区域时才会收起

2. 三向箭头上附加的图点不出来

* 思路：添加触屏对象
* 解决：在对应脚本中添加touchscreen内容
* 存在问题：点击不灵敏 → 点击一次会读取多次began或者读取不到began：将判定改为状态为ended且坐标值与上一帧不相等时执行
