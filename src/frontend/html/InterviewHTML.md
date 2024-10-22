---
icon: html5
date: 2024-03-04
category:
  - 前端
  - html5
tag:
  - 基础
order: 2
excerpt: <p>html常见问题汇总</p>
editLink: false
---
# HTML常见问题汇总

## 1. html全局属性

- class :为元素设置类标识
- data-* : 为元素增加自定义属性
- draggable : 设置元素是否可拖拽
- id : 元素 id ，文档内唯一
- lang : 元素内容的的语言
- style : 行内 css 样式
- title : 元素相关的建议信息

## 2. 从浏览器地址栏输入 `url`到显示页面的步骤

- 浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
- 服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
- 浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
- 载入解析到的资源文件，渲染页面，完成。

第一次：获取url => DNS解析获取ip => tcp建立连接（三次握手） => 发送请求 => 接收返回的数据 => 解析数据 => 渲染场景（构建dom树、下载资源、构造cssom树、执行js脚本）=> 显示页面

第二次：解析的ip存在本地 => 读取浏览器缓存

https://www.baidu.com

url：统一资源定位符

https：加密的传输协议（http与tcp间加了层ssl安全层）

www：万维网/服务器

baidu.com：域名

## 3. cookie和web storage

cookie：用于**存储用户信息标识**，放在请求中，在客户端与服务端传递。

webStorage：浏览器本地存储，包括localStorage和sessionStorage

indexedDB：浏览器非关系数据库

区别：

**存储量：** cookie-4kb，webStorage-5M左右（字符串），indexDB-更大（更多类型）

**过期时间：** cookie若有过期时间，到了才过期，若没过期时间，关闭窗口才过期；sessionStorage关闭窗口过期；localStorage不主动删除不过期；indexedDB不主动删除不过期

**作用域**：cookie和localstorage是所有同源（协议、域名、端口一致）窗口共享，sessionstorage是同一个浏览器窗口共享，不同窗口有独立的sessionStorage，不共享，跳转的页面可以共享。

**安全性：** cookie不安全，不设置httponly容易受到跨站请求伪造；但对于容易受到跨站脚本攻击的网站，用webstorage也不安全。

**易用性**：cookie需要封装setCookie函数，拼接cookie字符串(’名=内容；expire=时间戳‘），然后使用document.cookie=cookie字符串。webStorage有方便的api，setItem。

**应用**：cookie适合用于会话状态管理（登陆状态、记住密码、购物车）、权限验证；localStorage适合储存不变的数据，长期登录；sessionStorage适合敏感数据，单页面用的多。

补充：localForage——智能存储方案，封装indexedDB的异步操作api。优雅降级indexedDB -> WebSQL -> localStorage

### 3.1 localStorage如何实现不同源窗口的共享

1. 域名映射：把不同域名映射为同一个服务器ip
2. 浏览器postMessage api

   ```js
   // 发送消息到目标窗口
   window.postMessage(
     { key: "token", value: "1233211234567" },
     "https://liangzai.com"
   );

   // 接受
   window.addEventListener("message", function (event) {
     if (event.origin === "https://sourcedomain.com") {
       // 存储数据到 LocalStorage
       localStorage.setItem(event.data.key, event.data.value);
     }
   });
   ```

## 4.内联元素span和块级元素div的区别

**内联元素**：span em q label strong a input

**块级元素**：div p img section form nav ul li

**空元素**：br hr link meta

- 内联元素不独占一行，只占用自身需要的空间，不能修改其高度、宽度、上下边距
- 块级元素独占一行，大小可设置，未设置宽度默认为父元素宽度

所以，span元素宽度取决于内容宽度，设置其宽度无效，div元素默认占满一行

## 5.如何让浏览器支持小于12px的字体

css中设置字体

```css
  transform：scale(0.5);
 -webkit-transform:(0.5)
```

进行整体缩放

**扩展transform**

transform(scale, translate, rotate, skew) => 缩放 位移 旋转 倾斜

## 6. Html元素与标签的区别

html元素由开始标签、内容、结束标签组成。

标签指由尖括号包起来的对象，用于标记html元素

## 7. 语义html

语义 HTML 是一种编码风格

加粗 b => strong

斜体 i => em

## 8. html标签语义

`<header>`：用于定义文档的标题。

`<nav>`：定义了导航链接

`<section>` : 用于定义文档中的一个单元

`<article>`：用于定义独立的、自包含的文章

`<aside>`：用于定义内容之外的内容

`<footer>`：用于定义文档的页脚

## 9. **`<!DOCTYPE html>` 标签是否为 `HTML` 标签**

`<!DOCTYPE html>` 声明不是 `HTML` 标签。`<!DOCTYPE>`声明叫做文件类型定义（DTD），声明的作用为了**告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。**

`<!DOCTYPE>`声明必须在 HTML 文档的第一行。

浏览器渲染页面的两种模式：标准模式和怪异（混杂）模式

## 10. html、xml和xhtml的区别

- `HTML`：超文本标记语言
- `XML`：可扩展标记语言
- `XHTML`：可扩展超文本标记语言

XHTML是XML重写了HTML的规范，比HTML更加严格。

1. XHTML中所有的标记都必须有一个相应的**结束标签**；
2. XHTML所有标签的元素和属性的名字都必须使用**小写**；
3. 所有的XML标记都必须**合理嵌套**；
4. 所有的属性都必须用引号“”括起来；
5. 把所有<和&**特殊符号用编码**表示；
6. 给所有属性附一个值；
7. 不要在注释内容中使用“--”；
8. 图片必须使用说明文字。

## 11. 图像地图

一张图片不同区域增加不同的链接，通常的做法是使用图像地图也称图像热点。

```html
<img src="devpoint.jpg" border="0" usemap="#devmap" alt="devpoint" />

<map name="devmap" id="devmap">
    <area shape="circle" coords="180,139,14" href="about.html" alt="about" />
    <area
        shape="circle"
        coords="129,161,10"
        href="contact.html"
        alt="contact"
    />
    <area shape="rect" coords="0,0,110,260" href="home.html" alt="home" />
</map>
```

## 12. 超链接和锚点的区别

`<a>`中，带有 `href` 属性的称作超链接，把没有 `href` 属性只有 `name` 属性的称作锚点

命名锚点通常用于页面定位，超链接用于页面间的跳转。

## 13. html5离线存储

为了避免重复加载页面或者在无网络的情况下正常展现内容，可以采用离线存储，其中一种方案就是使用 `manifest` 。

在页面头部加入 `manifest`属性，如下：

```xml
<html manifest="cache.manifest">
```

然后在 `cache.manifest`文件中编写离线存储的资源规则，代码如下：

```js
CACHE MANIFEST
# 2021-06-26 14:01 V0.1.2.42634241855282310056  hash 以便做版本控制
# 默认部分，显式缓存这些文件

CACHE:
#需要缓存的列表，如字体、图片、脚本、css
./assets/images/favicons/32x32.png
./assets/fonts/VideoJS.eot
./assets/fonts/VideoJS.svg
./assets/fonts/VideoJS.ttf
./assets/fonts/VideoJS.woff

# 启动页资源
./index.html

NETWORK:
#不需要缓存的
*

FALLBACK:
#访问缓存失败后，备用访问的资源，第一个是访问源，第二个是替换文件 *.html /offline.html
```

## 14. iframe

`iframe`是嵌入式框架, 是html标签, 是一个内联元素, `iframe` 元素会创建包含另外一个文档的内联框架（即行内框架) 。通常可以使用iframe**内嵌网页**，跨域ajax通讯的实现，微前端，**广告嵌入**等。

```html
<iframe src="home.html"></iframe>
```

**优点**

- 用于加载速度较慢的内容（比如广告）
- 能让脚本实现并行下载
- 可以实现跨子域通信

**缺点**

- iframe会阻塞主页面的onload事件
- 无法被一些搜索引擎识别
- 会产生很多页面，难以管理

## 15. 定位方式position

如果两个相邻元素都在其上设置外边距，并且两个外边距接触，则两个外边距中的较大者保留，较小的一个消失——这叫**外边距折叠**

`position` 属性用于指定一个元素在文档中的定位方式。

- `static`： 默认值，没有定位，指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置，此属性下 `top`、`right`、`bottom`、`left` 和 `z-index` 属性无效。
- `relative` 相对定位：元素先放置在未添加定位时的位置，在**不改变页面布局的前提下**调整元素位置（**此时会在此元素未添加定位时所在位置留下空白**）。`position:relative` 对 `table-row`、`table-column`、`table-cell`、`table-caption` 元素无效。（**相对于自身原来的位置**）
- `absolute` 绝对定位：生成绝对定位的元素，元素会**被移出正常文档流**，并不为元素预留空间，通过指定元素**相对于最近的非 `static` 定位祖先元素的偏移**，来确定元素位置。绝对定位的元素可以设置外边距（`margins`），**且不会与其他边距合并**。
- `fixed` 固定定位：生成绝对定位的元素，元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素**相对于屏幕视口**（viewport）的位置来指定元素位置，元素的位置在**屏幕滚动时不会改变**
- `sticky` 元素根据正常文档流进行定位，相对它的最近滚动祖先和最近块级祖先

## 16. z-index

z-index 属性指定元素的堆栈顺序

利用z-index，可以改变元素相互覆盖的顺序。

- z-index 仅能在定位元素上奏效（position属性值设置除默认值static以外的元素，包括relative，absolute，fixed样式）
- `z-index的比较基本是在同一层级，也就是拥有同一个父元素。如果是不同层级的比较，则需要依靠z-index的比重大小决定，和层叠上下文有关系。`
- `z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面`

## 17. title和h1

`title` 为页面标题，可以包含 `h1` 的标题，一般面对的是搜索引擎和浏览器标签。

`h1` 为大标题，一般用作文章的标题

## 18. **`display:none`和 `visibility:hidden`的区别**

- `display:none`：被隐藏的对象不会占用任何物理空间，不会影响其他元素的布局
- `visibility:hidden`：使对象在网页上不可见，但是会在网页上占用物理空间，通俗来说就是看不见但摸得到。
- `visibility`具有继承性，给父元素设置 `visibility:hidden，`子元素也会继承这个属性；但是如果重新给子元素设置 `visibility: visible`,则子元素又会显示出来
- `visibility: hidden`不会影响计数器的计数，即隐藏第二个之后为134，而 `display:none`为123
- 设置 `visibility: hidden`不会回流只会重绘，设置 `display:none`会回流

## 19. 回流和重绘

**回流必将引起重绘，重绘不一定会引起回流。（单个元素改变-重绘，渲染树改变-回流）**

**回流**，当渲染树中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除**可见**的 `DOM`元素
- 激活 `CSS`伪类（例如：`:hover`）
- 查询某些属性或调用某些方法

**重绘**，当页面中元素样式的改变并**不影响它在文档流中的位置**时（例如：`color`、`background-color`、`visibility`等），浏览器会将新样式赋值给元素并重新绘制它的过程。

**性能影响**

回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。现代浏览器会对频繁的回流或重绘操作进行优化：

浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的**任务数量或者时间间隔**达到一个阈值的，浏览器就会将**队列清空，进行一次批处理**，这样可以把**多次回流和重绘变成一次**。

**如何避免**

**CSS**

- 避免使用 `table`布局。
- 尽可能在 `DOM`树的最末端改变 `class`。
- 避免设置多层内联样式。
- 将动画效果应用到 `position`属性为 `absolute`或 `fixed`的元素上。
- 避免使用 `CSS`表达式（例如：`calc()`）。

**JavaScript**

- 避免频繁操作样式，最好一次性重写 `style`属性，或者将样式列表定义为 `class`并一次性更改 `class`属性。
- 避免频繁操作 `DOM`，创建一个 `documentFragment`，在它上面应用所有 `DOM操作`，最后再把它添加到文档中。
- 也可以先为元素设置 `display: none`，操作结束后再把它显示出来。因为 `display`属性为 `none`的元素不在 `DOM`树中，进行的 `DOM`操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## 20. meta标签

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些 `name`作为大家使用的共识，开发者还可以自定义name。

常用的meta标签：

（1）`charset`，用来描述HTML文档的编码类型：

```html
<meta charset="UTF-8" >
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

其中，content 参数有以下几种：

- width viewport ：宽度(数值/device-width)
- height viewport ：高度(数值/device-height)
- initial-scale ：初始缩放比例
- maximum-scale ：最大缩放比例
- minimum-scale ：最小缩放比例
- user-scalable ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，content 参数有以下几种：

- all：文件将被检索，且页面上的链接可以被查询；
- none：文件将不被检索，且页面上的链接不可以被查询；
- index：文件将被检索；
- follow：页面上的链接可以被查询；
- noindex：文件将不被检索；
- nofollow：页面上的链接不可以被查询。

## 21. script标签中defer和async的区别

如果没有defer或async属性，**浏览器会立即加载并执行相应的脚本**。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就**阻塞了后续文档的加载**。

即，**defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析**

**区别**：

- 多个带async属性的标签，不能保证加载的顺序；
- 多个带**defer属性的标签，按照加载顺序执行**
- async属性，表示后续文档的加载和执行与js脚本的**加载和执行是并行进行**的，即异步执行；当然js执行时，html的解析会停止
- defer属性，加载后续文档的过程和js脚本的**加载(此时仅加载不执行)是并行进行**的(异步)，**js脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。**

如果script标签同时具备async和defer => 效果和async是一样的

**以上均针对script放在head的时候**，**也可以把script标签放到body之后去写**，这样，可**不写async和defer**也能防止script标签阻塞html解析。

## 22. 标签上title属性与alt属性的区别

- `alt`是为了在图片**未能正常显示时给予文字说明**。且长度必须少于100个英文字符或者用户必，即保证替换文字尽可能的短。
- `title`属性为设置该属性的元素提供建议性的信息。使用 `title`属性提供非本质的额外信息。通常是**鼠标滑动到元素上是显示**。

## 23. input与textarea的区别

- **input是单行文本框，不会换行**。通过size属性指定显示字符的长度，注意：当使用css限定了宽高，那么size属性就不再起作用。value属性指定初始值，Maxlength属性指定文本框可以输入的最长长度。可以通过width和height设置宽高，但是也不会增加行数。
- **textarea 是多行文本输入框**，文本区中可容纳无限数量的文本，无value属性，其中的文本的默认字体是等宽字体，可以通过 cols 和 rows 属性来规定 textarea 的尺寸，不过更好的办法是使用 CSS 的 height 和 width 属性。

**用div模拟textarea**

```html
<style>
  .textarea{
    min-height: 100px;
    border: 1px solid #a0b3d6; 
    width: 300px;
    font-size: 14px;
    max-height: 300px;
    overflow-y: auto;
  }
</style>
 
<body>
  <!--在div标签里面加入contenteditable=“true”--> 
  <div class="textarea" contenteditable="true">

  </div>
</body>
```

## 24. head 标签有什么作用，其中什么标签必不可少

标签中的元素可以引用脚本 `<script>`、指示浏览器在哪里找到样式表 `link`、提供元信息 `<link>`等。描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置 `<meta>`以及和其他文档的关系等。

其中 `<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

## 25. 浏览器乱码的原因是什么？如何解决？

**乱码原因**

- 网页源代码是 `gbk`的编码，而内容中的中文字是 `utf-8`编码的，这样浏览器打开即会出现 `html`乱码，反之也会出现乱码；
- `html`网页编码是 `gbk`，而程序从数据库中调出呈现是 `utf-8`编码的内容也会造成编码乱码；
- 浏览器不能自动检测网页编码，造成网页乱码。

解决方案

- 使用软件编辑器去编辑HTML网页的内容
- 如果网页设置的编码是gbk，数据库中的是utf-8，这时候就需要前后统一 一下编码
- 如果浏览器浏览时候出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

## 26. src与href有什么区别

- **src**是 `source`的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；(替换当前元素)

  可引入外部资源,代替元素本身内容,暂停其他资源下载
- 而**href**是 `Hypertext Reference`的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接。

  表示超链接,不会代替本身内容,不会暂停其他资源下载

即

- src代表的是网站的一部分，没有会对网站的使用造成影响
- href代表网站的附属资源，没有不会对网站的核心逻辑和结构造成影响
- css属于网站的附属资源，不影响网站核心逻辑和结构,引入使用href

## 27. 如何对网站的文件和资源进行优化

- 文件合并（目的是**合并请求**,减少http请求中的网络延迟,丢包等问题）；
- 文件压缩 （目的是直接**减少文件下载的体积**,如对渲染无意义的字符,代码，gizp压缩需要的js和css文件；）；
- 使用缓存；(**不重复加载相同的资源**,当文件更新,可通过更新页面中引用的资源链接地址，让浏览器主动放弃缓存，加载新资源.)
- 使用cdn托管大静态资源；(CDN是一组**分布在多个不同地理位置的 Web 服务器**,让用户离服务器更近，从而缩短请求时间)
- 反向链接，网站外链接优化；
- meta标签优化（title, description, keywords）,heading标签的优化,alt优化
- 图片优化: 延迟加载(**出现在视图后才加载**), 响应式图片,降低图片质量,调整图片大小
- 减少dom操作避免回流

## 28. 为什么利用多个域名来存储网站资源会更有效

- `CDN`缓存更加方便；
- 突破浏览器并发限制；
- 节约 `cookie`宽带；
- 节约主域名的连接数，优化页面下响应速度；
- 防止不必要的安全问题；

## 29. 对比一下cookie和session

cookie保存在客户端，session保存在服务器端

**cookie**

- 没有设置cookie的过期时间，**cookie被保存在内存中**，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie(session cookie,保存了sessionId)
- 设置了cookie的过期时间，**cookie被保存在硬盘中**，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。
- cookie是以文本的方式保存在客户端，每次请求时都带上它。
- cookie只能保存字符串类型，以文本的方式, 数据不能超过4kb

**session**

- 服务器收到请求, 检查客户端请求中是否包含sessionid, 有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。
- 通常使用cookie方式存储sessionid到客户端
- 禁用了 Cookies，服务器仍会将 sessionId 以 cookie 的方式发送给浏览器，但是，浏览器不再保存这个cookie (即sessionId) 了.如果想要继续使用 session，需要采用 `URL 重写` 的方式来实现
- session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象

**缺点：**

cookie：

（1）大小受限

（2）用户可以操作（禁用）cookie，使功能受限

（3）安全性较低

（4）有些状态不可能保存在客户端。

（5）每次访问都要传送cookie给服务器，浪费带宽。

（6）cookie数据有路径（path）的概念，可以限制cookie只属于某个路径下。

session：

（1）Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。

（2）依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全。

（3）创建Session变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用session变量将会导致代码不可读而且不好维护。

## 30. h5新特性

### 30.1 语义化标签

**前端的语义化**

- 在没有css的美化下,也能很好的呈现内容
- 用户体验好,如title alt的内容等
- 有利于SEO(搜索引擎建立良好沟通,便于爬虫获取更多信息)
- 方便其他设备解析(屏幕阅读器 盲人阅读器)
- 便于团队开发与维护

**写html需要注意什么**

- 尽可能少用无语义标签div span等,语义不明显时,尽量使用p(他有上下间距,对兼容特殊终端有利)
- 不适用纯样式标签b、font、u等，改用css
- 使用表格时，标题用caption，表头用thead，主体用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td
- 表单域要用filedset标签包起来，并用legend标签说明表单用途
- 每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

**h5新增的语义标签**

1. header元素

header元素代表“网页“和”section”的页眉。作为整个页面或者内容块的标题，没有限制header元素的个数

2. footer元素

footer元素代表“网页”或“section”的页脚，通常含有该页面的一些基本信息，例如：文档创作者的姓名、文档的版权信息、使用条款的链接、联系信息等等。

3. hgroup元素

hgroup元素代表“网页”或“section”的标题，当元素有多个层级时，该元素可以**将h1到h6元素放在其内**，譬如文章的主标题和副标题的组合。

4. nav元素

代表页面的**导航链接**区域。用于定义页面的主要导航部分。

5. aside元素

被包含在**article元素中**作为主要内容的**附属信息部分**，其中的内容可以是与当前文章有关的相关资料、标签、名词解释等。

6. article元素

article代表一个在文档，页面或者网站中**自成一体**的内容

7. mark元素

高亮文本标签

8. progress元素

用来显示一项任务的完成进度。

```html
<progress value="70" max="100">70 %</progress>
```

9. adress元素

个人或者某个组织的联系信息等等

```html
<address>
  <a href="mailto:jim@rock.com">mjj67890@163.com</a><br>
  <a href="tel:+13115552368">(311) 555-2368</a>
</address>
```

### 30.2 增强型表单

### 30.3 视频和音频

```js
<!-- poster:视频封面图片地址 -->
<video id="my-video" class="video-js vjs-big-play-centered" controls="controls" poster="">
     <source src="/videoSource/getVideo/${videoId}" type='video/mp4'>
          <p class="vjs-no-js">
               你的浏览器貌似不支持 %>_<%
               <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
</video>

<!-- 实测使用 controlsList="nodownload"关闭下载-->

  <video width="100%" height="270px" controls autoplay id="videoId" style="margin-top: 2px;"  controlsList="nodownload">
            <source  :src="videoUrl" type="video/mp4">
        </video>
```

### 30.4 Canvas绘图

Canvas是画布，通过Javascript来绘制2D图形，是逐**像素**进行渲染的。其位置发生改变，就会重新进行绘制。

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

### 30.5 SVG绘图

SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

### 30.6 地理定位 Geolocation

### 30.7 拖放API（地图上的拖拉，拖拉上传文件）

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素时触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

### 30.8 Web Worker

在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可响应。

web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

用途：懒加载、文本分析、流媒体数据处理、canvas图形绘制、图像处理

### 30.9 Web Storage

见3节

### 30.10 WebSocket

即时通讯

1. 初始化WebSocket对象

```js
// http协议时：
that.ws = new WebSocket(`ws://www.test.com/send_message/${id}-${name}`);

// https协议时：
that.ws = new WebSocket(`wss://www.test.com/send_message/${id}-${name}`);
```

2. 与服务端建立连接触发

```js
that.ws.onopen = function () { console.log("与服务器成功建立连接")};
```

3. 服务端推送消息触发

```js
this.ws.onmessage =function (ev) { that.talking(ev.data); } 
talking（）{//处理数据}
```

4. 发生错误触发

```js
this.ws.onerror = function () { console.log("连接错误")};
```

5. 正常关闭触发

```js
this.ws.onclose = function () { console.log("连接关闭");};
```

6. 发送数据

```js
this.ws.send(JSON.stringify(json))
```

7. 关闭连接

```javascript
window.onbeforeunload =  ()=> {  
    that.ws.close();  
    console.log('谢谢光临1');  
    return ('谢谢光临2');//IE 谷歌浏览器提示（opera浏览器只有刷新时提示）
}
```

## 31. svg和canvas的区别

- canvas画图基于**像素点**，是位图，如果进行放大或缩小会**失真** ；svg基于图形，用html标签描绘形状，放大缩小不会失真
- **canvas需要在js中绘制 ；svg在html绘制**
- canvas支持颜色比svg多
- canvas无法对已经绘制的图像进行修改、操作 ；**svg可以获取到标签进行操作**

## 32. 状态码

1XX	Informational（信息性状态码） 接受的请求正在处理
2XX	Success（成功状态码） 请求正常处理完毕
3XX	Redirection（重定向状态码） 需要进行附加操作以完成请求
4XX	Client Error（客户端错误状态码）	服务器无法处理请求
5XX	Server Error（服务器错误状态码）	服务器处理请求出错

- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 404 - 请求的资源（网页等）不存在
- 500 - 内部服务器错误

## 33. http请求-restful api

**restful api的理解**

Representational State Transfer，简称REST，直译过来表现层状态转换。

RESTful风格的API 固然很好很规范，但大多数互联网公司并没有按照或者完全按照其规则来设计，因为REST是一种风格，而不是一种约束或规则，过于理想的RESTful API 会付出太多的成本。

**get和post区别**

1.get请求一般是去取获取数据（其实也可以提交，但常见的是获取数据）；
post请求一般是去提交数据。

2.get因为参数会放在url中，所以隐私性，安全性较差，请求的数据长度是有限制的，
不同的浏览器和服务器不同，一般限制在 2~8K 之间，更加常见的是 1k 以内；
post请求没有长度限制，请求数据是放在body中；

3.get请求刷新服务器或者回退没有影响，post请求回退时会重新提交数据请求。

4.get请求可以被缓存，post请求不会被缓存。

5.get请求会被保存在浏览器历史记录当中，post不会。get请求可以被收藏为书签，因为参数就在url中，但post不能。它的参数不在url中。

6.get请求只能进行url编码（appliacation-x-www-form-urlencoded）,post请求支持多种（multipart/form-data等）。

深入理解
1…GET 和 POST都是http请求方式， 底层都是 TCP/IP协议；通常GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包（但firefox是发送一个数据包），

2.对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200
（返回数据）表示成功；

而对于 POST，浏览器先发送 header，服务器响应 100， 浏览器再继续发送 data，服务器响应 200 （返回数据）。

## 34. 缓存

浏览器缓存主要分为强制缓存和协商缓存。

强制缓存：不会向服务器发起请求，直接从缓存中读取资源。

协商缓存：使用缓存前向服务器发送请求，服务器根据请求头判断。协商缓存可以解决强制缓存下，资源不更新的问题。

**缓存中header参数**

强制缓存

expires：response header（响应头）中的过期时间。在过期时间内再次加载资源，则触发强缓存。

cache-control：值设为max-age=300，指正常请求的5分钟内再请求，触发强缓存。

协商缓存

cache-control：-no-cache指不是用本地缓存，采用协商缓存。

此外还有字段

1. last-modify（资源最后修改时间），由服务器传给浏览器，第二次浏览器传给服务器进行判断资源是否修改。（有不足，一秒若改变多次，只会更新最后一次）
2. Etag指资源文件对应的hash值（服务器生成）

其他

cache：-no-store指不使用浏览器缓存

cache：-public指可以被所有用户缓存，除浏览器外，代理网关、代理服务器cdn等能。

cache：-private指只能被浏览器缓存

## 36. cookie可设置字段与编码

使用cookie的过程中，可以**设置的字段**有：

1. name：一个cookie的名称。
2. value：一个cookie的值。
3. domain：可以访问到此cookie的域名。
4. path：可以访问此cookie的页面路径。比如domain是abx.com,path是/test,那么只有/test路径下的页面可以读取此cookie。
5. expires/Max-Age：此cookie的超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和Session一起失效。当浏览器关闭（不是浏览器标签页，是整个浏览器）后，此cookie失效。
6. Size：此cookie的大小。
7. http：cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。
8. secure：设置是否只能通过https来传递此条cookie。

**cookie的编码方式**：encodeURI（）

## 37. 登录安全

1. **密码加密：** 对称加密（加密和解密用的是同一个方式，**MD5,DES算法**）、非对称加密（公钥+私钥，在 https 的加密中，加密传输的数据本身使用的是对称加密，加密对称秘钥时使用的非对称加密的公钥（服务器传给客户端），**RSA，ECC算法**）
2. **强密码策略**（大写、小写、字符、数字）
3. 使用**token令牌验证**（sessionid、token、jwt token）
4. **数字摘要**（对传送数据生成摘要并使用私钥进行加密的过程，防止数据包的字段被篡夺），**username+MD5(password)+token通过签名，得到一个字段checkCode**，发给服务端后进行对比判断
5. **验证码**：防止机器批量多次发送请求
6. **第三方登录授权**：微信登录验证码（申请appid、new wxLogin实例设置重定向网页，href设置样式等，成功后授权信息会在url后拼接）
7. 输入过滤、编码的操作，**防止xss、crsf攻击**
