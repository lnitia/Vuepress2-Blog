---
icon: bianjiwenjian
date: 2023-07-17
category:
  - unity
tag:
  - MRTK
order: 3
excerpt: <p>MRTK在unity中的交互控件简介，基于unity内置的3D物理引擎实现</p>
editLink: false
---
# Unity&MRTK交互控件

## Box Collider盒状碰撞器

可修改中心和碰撞盒子的大小

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154029.png)

## Object Manipulater对象操控器

ObjectManipulator 脚本能够让对象变得可移动、可缩放和可旋转，这些操作可通过一只或两只手来实现。 添加 Object Manipulator 脚本时，系统会自动添加 Constraint Manager 脚本，因为前者依赖于后者。

可更改双手操作的范围：移动、旋转、放缩

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154037.png)

## NearlnteractionGrabbable

使用户能使用模拟手来触碰和抓取附近的对象

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154049.png)

## BoundsControl边界控件

前提是该对象添加了对象操控器组件

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154106.png)

配置：（资源：BoundingBoxResources.unitypackage）

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/1706341289975.png)

## GridObjectCollection网格对象集合

对象集合是一个脚本，用于帮助以预定义的 3 维形状为对象数组布局。 它支持各种表面样式，包括平面、圆柱体、球体和径向

* 网格对象集合
  可以在一组子对象上使用此类型的集合，以使用一些布局参数来组织它们。 网格对象收集可帮助快速创建控制面板或一组 Prefab 或对象
* 散点对象集合
  此类型的集合只是在半径内随机布局的一组子对象。 要运行随机化，请选择“更新集合”。 请任意多次运行更新，直到获得所需的结果
* 图块网格对象集合
  你可以利用这种类型的集合在基本网格布局中放置大小一致的游戏对象。 若要有条不紊地将游戏对象放置在场景中时，图块网格对象集合会很有帮助。 例如，你可能希望以固定间隔排列放置对象。 监视所有对象相对于其他对象的位置，然后放置它们，这是一项十分繁琐的工作。 你可以使用对象集合脚本来简化此任务，而不是手动执行此任务

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154140.png)

火星车配置“GridObjectCollection”组件值：

* 排序类型：按字母顺序
* 布局：水平
* 单元格宽度：0.25
* 到父项的距离：0.38

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154149.png)

按钮配置组件值：

* 排序类型：子顺序
* 布局：水平
* 单元格宽度：0.2
* 定位点：中部左对齐

选择“更新集合”以更新“Buttons”子对象的位置：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154211.png)

## 求解器

求解器使用预定义的算法计算对象的位置和方向。 求解器提供了各种行为，用于将对象附加到其他对象或系统。 例如，求解器可以是每次移动时显示的跟随对象（基于相机）。

MRTK 的求解器位于 MRTK SDK 文件夹中。 若要查看项目中可用的求解器，请在“项目”窗口中转到“包”>“混合现实工具包基础”>“SDK”。 然后选择“功能”>“实用工具”“求解器”>。

[求解器概述- MRTK 2 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/mixed-reality/mrtk-unity/mrtk2/features/ux-building-blocks/solvers/solver?view=mrtkunity-2022-05)

### DirectionalIndicator方向指示器（求解器）

添加到箭头形状的对象上来指示方向

自动添加SolverHandler脚本

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154222.png)

火星车配置“DirectionalIndicator”和“SolverHandler”组件：

* 验证“SolverHandler”组件的“跟踪目标类型”是否设置为“头部”。
* 通过将“RoverExplorer”从“层次结构”拖到“无(转换)”字段，将其分配给“DirectionalIndicator”组件的“方向目标”。
* 将“视图偏移”更改为“0.2”。

### Tap To Place点击以放置（求解器）

改变对象位置，将对象放置到网格平面上的任意位置

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154233.png)

添加“点击以放置(脚本)”组件。 按如下所示配置组件：

* 验证“SolverHandler”组件的“跟踪目标类型”是否设置为“头部”。
* 清除“使用默认表面法线偏移”，并确保“表面法线偏移”设置为 0。
* 选中“保持方向垂直”复选框。
* 从“磁性表面”>“元素 0”下拉列表中，清除除“空间感知”之外的所有选项。

在“检查器”窗口中查找“On Placing Started ()”事件。 选择“+”图标以添加新事件。

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154245.png)

配置事件：

* 通过将“RoverAssembly”对象从“层次结构”拖到“无(对象)”字段，将其指定为侦听器的“On Placing Started ()”事件。
* 从“无函数”下拉列表中，选择“TapToPlace”>float SurfaceNormalOffset”，以在触发事件时更新“SurfaceNormalOffset”属性值。
* 验证参数是否设置为“0”**。**

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154256.png)

* 在“检查器”窗口中，使用“层”下拉列表更改正方体(用作地面)的层设置， 只需包含“空间感知”层即可。

### SurfaceMagnetism表面磁性（求解器）

与taptoplace类似，区别为不使用点击作为开始和结束操作

### RadiaView（求解器）

跟随菜单自带

可更改跟随菜单相对于相机的位置范围等

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154310.png)

## FollowMeToggle

跟随菜单自带

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154319.png)

## Button Config Helper按钮配置帮助程序

可更改按钮的标签文本和图标

配置按钮的功能

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154331.png)

## Constraint Manager约束管理器

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154343.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154350.png)

## Interactable可交互

General-Selection Mode：

可用的选择模式如下：

BUTTON按钮：维度 = 1，简单的可单击可交互对象

TOGGLE切换：维度 = 2，可交互对象在打开/关闭状态之间交替

Multi Dimension多维度：维度>= 3，每次单击都会使当前维度级别 + 1。 适用于将按钮状态定义为列表等

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154359.png)

## Rigidbody刚体

* Mass：对象的质量（默认为千克）
* Drag：根据力移动对象时影响对象的空气阻力大小。0 表示没有空气阻力，无穷大使对象立即停止移动
* Angular Drag：根据扭矩旋转对象时影响对象的空气阻力大小。0 表示没有空气阻力。请注意，如果直接将对象的 Angular Drag 属性设置为无穷大，无法使对象停止旋转
* Use Gravity：如果启用此属性，则对象将受重力影响
* Is Kinematic：如果启用此选项，则对象将不会被物理引擎驱动，只能通过__变换 (Transform)__ 对其进行操作
* Constraints：对刚体运动的限制：
  Freeze Position：有选择地停止刚体沿世界 X、Y 和 Z 轴的移动
  Freeze Rotation：有选择地停止刚体围绕局部 X、Y 和 Z 轴旋转

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127154407.png)
