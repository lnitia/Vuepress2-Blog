---
icon: debug
date: 2023-06-08
category:
  - Unity
tag:
  - 碰撞
order: 2
excerpt: <p>主要有碰撞体分离、使用物理层级分类、使用异步计算、分层次几种解决方案</p>
editLink: false
---
# **解决mesh collider导致的hololens卡顿问题方法**

### 碰撞体分离

方法

unity官方提供VHACD以将复杂物体分成一组凸面体，参见[https://github.com/Unity-Technologies/VHACD](https://github.com/Unity-Technologies/VHACD)

插件Easy Collider Editor内含VHACD功能

测试结果

使用该功能可以将物体自动分成多个凸面体，可以用于不追求碰撞精度的场合，但在检测两零部件是否发生碰撞上不适用

## 使用物理层级

通过使用物理层级（Physics Layer）和物理层级过滤器，可以控制哪些物体之间进行碰撞检测。通过将不必要的物体排除在碰撞检测之外，可以减少计算量并提高性能。

（即将部件放在不同的layer中，用代码控制两layer间是否要发生碰撞）

## 使用异步计算

将复杂的碰撞检测操作放在异步线程中进行计算，以充分利用HoloLens的多线程处理能力，避免阻塞主线程。（使用Task.Run方法）

```csharp
//异步检测碰撞示例代码
using UnityEngine;
using System.Threading.Tasks;public class CollisionDetection : MonoBehaviour
{
    private void Start()
    {
        // 在异步线程中执行碰撞检测操作
        Task.Run(() =>
        {
            // 执行复杂的碰撞检测操作
            PerformComplexCollisionDetection();
        }).ContinueWith(task =>
        {
            // 异步线程完成后的回调
            if (task.IsFaulted)
            {
                Debug.LogError("碰撞检测操作出现错误：" + task.Exception);
            }
            else if (task.IsCompleted)
            {
                Debug.Log("碰撞检测操作已完成");
                // 处理异步线程的计算结果
                ProcessCollisionResults();
            }
        });
    }    private void PerformComplexCollisionDetection()
    {
        // 在这里执行复杂的碰撞检测操作
        // 例如，使用迭代、算法或数学计算进行高级碰撞检测
    }    private void ProcessCollisionResults()
    {
        // 处理碰撞检测操作的结果
        // 例如，根据检测到的碰撞进行相应的逻辑处理或触发事件
    }
}
```

## 分层级

broad phase（粗筛可能产生碰撞的碰撞对）→narrow phase（检测粗筛的碰撞对是否有真实的碰撞）

1）八叉树（物体会移动的情况下，有一种对八叉树结点进行编码的方法可以高效的进行结点调整）

2）层次包围盒BVH
