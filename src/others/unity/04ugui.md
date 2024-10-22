---
icon: list
date: 2023-07-16
category:
  - unity
tag:
  - Unity UI
  - MRTK
order: 4
excerpt: <p>unity中的ui控件使用简介，包含部分MRTK控件</p>
editLink: false
---
# Unity UI控件

## canvas

* 画布 (Canvas) 是应该容纳所有 UI 元素的区域。画布是一种带有画布组件的游戏对象，所有 UI 元素都必须是此类画布的子项
* 画布中的 UI 元素按照它们在 Hierarchy 中显示的顺序绘制（即排列在上面的先绘制，排列在下面的会挡住之前绘制的内容）

#### render mode（渲染模式）

Screen Space - Overlay：此渲染模式将 UI 元素放置于在场景之上渲染的屏幕上。调整屏幕大小或更改分辨率，则画布将自动更改大小来适应

Screen Space - Camera：在此模式下，画布放置在指定摄像机前面的给定距离处，UI 元素由此摄像机渲染，摄像机设置会影响 UI 的外观

World Space：将 UI 视为场景中的平面对象进行渲染（MRTK canvas只支持使用这种模式，并且会在运行时自动分配event camera，不能提前添加）

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127145639.png)

### canvas scaler（画布缩放器）

* Dynamic Pixels Per Unit：用于 UI 中动态创建的位图（如文本）的每单位像素量
* Reference Pixels Per Unit：如果精灵（sprite）具有此“Pixels Per Unit”设置，则精灵中的每个像素将覆盖世界中的一个单位。如果“Reference Pixels Per Unit”设置为 1，则精灵中的“Pixels Per Unit”设置将按原样使用

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127145652.png)

### canvas renderer（画布渲染器）

用于渲染画布中包含的图形 UI 对象

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127145707.png)

### canvasutility（script）

使canvas在MRTK中使用的帮助类

### Graphic Raycaster

挂在 Canvas 下用来检测 UI 输入事件的射线发射器

* ignore reversed graphic：忽略逆转图形，即只在正面时生效，背面时不生效

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127145809.png)

## 可视组件

### text（文本）

### image（图像）

* Source Image：表示要显示的图像的纹理（必须作为精灵(sprite)导入→在图片的texture type中更改）
* image type：

  * simple：原图拉伸

    preserve aspect：长宽比固定
  * sliced：九宫格模式，即只有九宫格中间部分会被拉伸，边框不拉伸（设置九宫格：图片的sprite editor）

    fill center：是否显示九宫格中间部分
  * tiled：平铺，不拉伸
  * filed：填充，相比simple多一个动画显示效果

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150152.png)

### rect mask 2D fast（script）（遮罩控件）

与mask类似

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150209.png)

## 交互组件

### 均有基类

#### interactible

是否接受输入，若为false，则transition也禁用

#### transition（过渡）

* none：无过渡效果
* color tint：根据当前状态更改颜色

  * Target Graphic：用于交互组件的图形
  * Normal Color：控件的正常颜色
  * Highlighted Color：控件突出显示时的颜色
  * Pressed Color：控件按下时的颜色
  * Disabled Color：控件禁用时的颜色
  * Color Multiplier：将每个过渡的着色颜色乘以其值。由此可以创建大于 1 的颜色，从而使基色小于白色（或小于完整 Alpha）的图形元素上的颜色（或 Alpha 通道）变亮
  * Fade Duration：从一个状态淡入淡出到另一个状态所需的时间（以秒为单位）
* sprite swap：根据当前状态显示不同精灵
* animation：动画

#### navigation（导航）

* None：无导航
* Horizontal：水平导航
* Vertical：垂直导航
* Automatic：自动导航
* Explicit：在此模式下，可显式指定不同箭头键将控件导航到的位置
* Visualize：直观显示在场景窗口中设置的导航

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150511.png)

### scrollbar（滚动条）

属性：

* Handle Rect：用于控件滑动“控制柄”部分的图形
* Direction：拖动控制柄时滚动条值增加的方向。选项包括 Left To Right、Right To Left、Bottom To Top 和 Top To Bottom
* Value：滚动条的初始位置值，范围为 0.0 到 1.0
* Size：控制柄在滚动条内的比例大小，范围为 0.0 到 1.0
* Number Of Steps：滚动条允许的不同滚动位置的数量

事件：

* on value changed：当用户拖动控制柄时响应，滚动条的当前值可作为 float 参数传递给事件函数

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150544.png)

### Scroll Rect（滚动矩形）

属性：

* Content：这是对需要滚动的 UI 元素（例如大型图像）的矩形变换的引用
* Horizontal：启用水平滚动
* Vertical：启用垂直滚动
* Movement Type：Unrestricted、Elastic 或 Clamped。使用 Elastic 或 Clamped 可强制内容保持在滚动矩形的边界内。Elastic 模式在内容到达滚动矩形边缘时弹回内容

  Elasticity：弹性模式中使用的反弹量
* Inertia：如果设置 Inertia，则拖动指针再松开时内容将继续移动。如果未设置 Inertia，则只有进行拖动时内容才移动Deceleration Rate：设置 Inertia 的情况下，减速率 (Deceleration Rate) 决定了内容停止移动的速度。速率为 0 将立即停止移动。值为 1 表示移动永不减速
* Scroll Sensitivity：对滚轮和触控板滚动事件的敏感性
* Viewport：对作为内容矩形变换父项的视口矩形变换的引用
* Horizontal Scrollbar：对水平滚动条元素的引用（可选）
* Vertical Scrollbar：对垂直滚动条元素的引用（可选）

  Visibility：滚动条是否应在不需要时自动隐藏以及（可选）是否还展开视口

  Spacing：滚动条与视口之间的空间

事件：

* On Value Changed：滚动矩形的滚动位置发生变化时调用，可将当前滚动位置作为 Vector2 类型动态参数发送

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150802.png)

## 布局

#### rect transform（矩形变换）

[https://docs.unity.cn/cn/2020.3/Manual/UIBasicLayout.html](https://docs.unity.cn/cn/2020.3/Manual/UIBasicLayout.html)

* Pos (X, Y, Z)：矩形轴心点相对于锚点的位置。轴心点是矩形旋转所围绕的位置
* Width/Height：矩形的宽度和高度
* Left, Top, Right, Bottom：矩形边缘相对于锚点的位置。可视为由锚点定义的矩形内的填充。当锚点分离时将取代 Pos 和 Width/Height 显示。要访问这些选项，请单击 RectTransform 组件左上方的 Anchor Presets 方框
* Anchors：矩形左下角和右上角的锚点
  Min：矩形左下角的锚点，定义为父矩形大小的一个比例。0,0 相当于锚定到父项的左下角，而 1,1 相当于锚定到父项的右上角
  Max：矩形右上角的锚点，定义为父矩形大小的一个比例。0,0 相当于锚定到父项的左下角，而 1,1 相当于锚定到父项的右上角
* Pivot：矩形旋转围绕的轴心点的位置，定义为矩形本身大小的一个比例。0,0 相当于左下角，而 1,1 相当于右上角
* Rotation：对象围绕其轴心点沿 X、Y 和 Z 轴的旋转角度（以度为单位）
* Scale：在 X、Y 和 Z 维度中应用于对象的缩放因子
* Blueprint Mode：编辑 RectTransform，就好像它们没有旋转和缩放一样。这也会启用贴靠
* Raw Edit Mode：启用此属性后，编辑轴心和锚点值不会反向调整矩形的位置和大小来使矩形保持在同一个位置

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127150946.png)

### Content Size Fitter（内容大小适配器）

* Horizontal Fit：如何控制宽度
  Unconstrained：不根据布局元素伸展宽度

  Min Size：根据布局元素的最小宽度来伸展宽度

  Preferred Size：根据布局元素的偏好宽度来伸展宽度
* Vertical Fit：如何控制高度

  Unconstrained：不根据布局元素伸展高度

  Min Size：根据布局元素的最小高度来伸展高度

  Preferred Size：根据布局元素的偏好高度来伸展高度

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151234.png)

### Grid Layout Group（网格布局组）

* Padding：布局组边缘内的填充
* Cell Size：要用于组内每个布局元素的大小
* Spacing：布局元素之间的间距
* Start Corner：第一个元素所在的角
* Start Axis：沿哪个主轴放置元素。Horizontal 将在填充整行后才开始新行。Vertical 将在填充整列后才开始新列
* Child Alignment：用于布局元素的对齐方式（如果这些元素未填满可用空间）
* Constraint：将网格约束为固定数量的行或列以便支持自动布局系统

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151311.png)

### Vertical Layout Group（垂直布局组）

* padding：布局组边缘内的填充
* Spacing：布局元素之间的间距
* Child Alignment：子布局元素的对齐方式

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151338.png)

## UI组合使用

### canvas父物体控件

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151416.png)

### 键盘输入子物体控件

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151424.png)

### HoloLens2点击按钮控件

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151432.png)

PhysicalPressEventRouter作用：将PressableButton的事件路由到Interactable，允许通过物理触摸调用Interactable的OnPointerClicked方法

### scroll view（滚动视窗）：scroll rect + scrollbar

滚动视窗中的重要元素包括视窗viewport、滚动内容content以及可选的一个或两个滚动条scrollbar

* 根游戏对象scroll view具有滚动矩形scroll rect组件
* 视窗viewport具有遮罩mask组件。视窗可以是根游戏对象，也可以是作为根的子项的单独游戏对象。如果使用自动隐藏的滚动条，则视窗viewport必须是子项。需要在滚动矩形scroll rect的 Viewport 属性中引用视窗矩形变换即viewport的rect transform
* 所有滚动内容必须是作为视窗viewport子项的单个内容游戏对象content的子项。需要在滚动矩形scroll rect的 Content 属性中引用内容矩形变换即content的rect transform
* 滚动条scrollbar（如果使用）是根游戏对象的子项

下图显示了视口是滚动视图根节点的子项的设置。使用 GameObject > UI > Scroll View 菜单选项时，默认情况下会采用此设置

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151503.png)

## 其他

### 字体

source font file：字体（可在C:\Windows\Fonts中选择 or [下载](https://www.fonts.net.cn/)）

character set：字库（缺少的字在字库中添加后更新即可）

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151530.png)

### hololens按钮

#### 更改图标icon

1. 创建IconSet：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240127151607.png)

2. 在IconSet中添加图标图片
