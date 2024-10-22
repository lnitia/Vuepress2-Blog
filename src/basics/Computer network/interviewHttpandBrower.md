---
icon: http
date: 2024-03-18
category:
  - 计算机网络
tag:
  - HTTP
  - 基础
order: 3
excerpt: <p>http、tcp、浏览器基础知识汇总</p>
editLink: false
---
# http、tcp、浏览器基础知识汇总

## 1. HTTP

HTTP（**超⽂本传输协议**）是⽤于从WWW服务器传输超⽂本到本地浏览器的传输协议。

HTTP客户端发起⼀个请求，建⽴⼀个到服务器指定端⼝（默认是80端⼝）的TCP（拓展三次握⼿四次挥⼿、七层架构）连接。

应用：获取旧数据，或者只想获取一次数据供应用程序使用。

### 1.1 **HTTP报文结构**

请求报文：请求行（GET /home HTTP/1.1）+请求头+空行+请求体

响应报文：响应行（HTTP/1.1 200 OK）+响应头+空行+响应体

### 1.2 HTTP状态码

1xx：信息状态码，表示请求正在进行

2xx：请求成功200

3xx：客户端请求资源发生变动，需要用新的url请求，即重定向。301永久重定向，302临时重定向。

4xx：客户端发送的报文发生问题。400 bad request发送的报文有问题，403 forbidden 服务器禁止访问资源， 404 请求资源服务器找不到

5xx：服务器端出问题。500 服务器内部错误

### 1.3 HTTP请求方式

head：获取资源元信息

option：查看服务器的性能，比如说服务器支持的请求方式

- 非简单请求中，浏览器必须先使用**OPTIONS请求进行一个预检请求**（preflight request）来获取B服务**是否允许跨域请求**，服务进行确认之后，才会发起真正的HTTP请求。
- 在预检请求的返回中，**服务器端也可以通知客户端，是否需要携带身份凭证**（包括 Cookies 和 HTTP 认证相关数据）。

connect：建立连接隧道，用于代理服务器

trace：追踪请求-响应的传输路径

get、post、put、delete

### 1.4 HTTP处理大文件传输

1. **范围请求(请求指定的部分)** =>实现视频快进，断点续传

采取了 **范围请求** 的解决方案，允许客户端仅仅请求一个资源的一部分。

**请求头**中加上字段**Range：bytes=x-y**

```js
// 单段数据 
Range: bytes=0-9 
// 多段数据 
Range: bytes=0-9, 30-39
```

- 0-499表示从开始到第 499 个字节。
- 500- 表示从第 500 字节到文件终点。
- -100表示文件的最后100个字节。

2. **数据压缩（缩小文件本身大小）**

   文件格式压缩（无损（gif、png、webp）、有损（jpeg、webp））

   端到端压缩（压缩算法gzip、br。浏览器发送 `Accept-Encoding` 首部，其中包含有它所支持的压缩算法，以及各自的优先级，服务器则从中选择一种，使用该算法对响应的消息主体进行压缩，并且发送 `Content-Encoding` 首部来告知浏览器它选择了哪一种算法）
3. **分块传输（把文件分成多个小块分批次传输）**

   客户端请求带上**Transfer-Encoding: chunked**，服务器通过分块传输编码响应（每个分块包含两个部分，**长度头和数据块**，中间以回车换行分开）

   - 将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；
   - 初始化一个分片上传任务，返回本次分片上传唯一标识；
   - 按照一定的策略（串行或并行）发送各个分片数据块；
   - 发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件。
4. **前端上传时对文件进行切片**

   利用 ` Blob.prototype.slice` 方法。文件的 slice 方法可以返回 `原文件的某个切片`。请求后端（服务端）时要带上**分片序号和大小**

   服务端创建conf文件用来记录分块位置，conf文件长度为总分片数，每上传一个分块即向conf文件中写入一个127，那么没上传的位置就是默认的0,已上传的就是Byte.MAX_VALUE 127（这步是实现断点续传和秒传的核心步骤）

   服务器按照请求数据中给的分片序号和每片分块大小（分片大小是固定且一样的）算出开始位置，与读取到的文件片段数据，写入文件。

   切片是否上传成功的判断可以在服务的处理也可以在前端保留已上传切片的信息。通过localStorage记录切片上传的信息或者每次在上传切片前向后台询问该切片是否已经上传。

   文件的实时上传进度可以通过XMLHttpRequest的upload.onprogress去处理，也可以通过websocket去实时监听。

   所有切片都上传成功时，发起合并请求，让所有的切片合并成一个大文件

   ```js
   createFileChunk(file, size = SIZE) {
   +     const fileChunkList = [];
   +      let cur = 0;
   +      while (cur < file.size) {
   +        fileChunkList.push({
               index: i,
               filename: file?.name,
               file:sample(file,start,end),
             });
   +        cur += size;
   +      }
   +      return fileChunkList;
   +    },
   ```

### 1.5 HTTP表单数据提交

一般采用post请求，数据放在请求体中。

**编码类型content-type**

1. **application/x-www-form-urlencoded**

- 其中的数据会被编码成以 & 分隔的键值对
- 字符以URL编码方式编码。

  ```js
  // 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
  "a%3D1%26b%3D2"
  ```

2. **multipart/form-data（对于图片等文件的上传）**

- 每一个表单元素都是独立的资源表述。
- 请求头中的 Content-Type 字段会包含 boundary ，且 boundary 的值有浏览器默认指定。例: Content-Type: multipart/form-data;boundary=---- WebkitFormBoundaryRRJKeWfHPGrS4LKe 。
- 数据会分为多个部分，每两个部分之间通过分隔符来分隔，每部分表述均有 HTTP 头部描述子包体，如 Content-Type ，在最后的分隔符会加上 -- 表示结束。

  ```js
  Content-Disposition: form-data;name="data1";
  Content-Type: text/plain
  data1
  ----WebkitFormBoundaryRRJKeWfHPGrS4LKe
  Content-Disposition: form-data;name="data2";
  Content-Type: text/plain
  data2
  ----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
  ```

### 1.6 HTTP代理

即代理服务器作用

1. 负载均衡：客户端的请求只会先到达代理服务器，代理服务器可以拿到这个请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。
2. 保障安全：利用**心跳机制**监控后台的服务器，一旦发现故障机就将其踢出集群。对非法 IP 限流。
3. 缓存代理：将内容缓存到代理服务器，使得客户端可以直接从代理服务器获得而不用到源服务器那里。

**除了强缓存、协商缓存，为什么会有缓存代理？**

- 现象：每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。
- 解决方式：让代理服务器接管一部分的服务端HTTP缓存，客户端缓存过期后就近到代理缓存中获取，代理缓存过期了才请求源服务器

### 1.7 HTTP常见请求头和响应头

**请求头：**

- Accept： 浏览器支持的 MIME 媒体类型, 比如 text/html,application/json,image/webp,/ 等
- Accept-Encoding: 声明浏览器支持的编码类型，gzip, deflate
- Accept-Language: 客户端接受的语言格式,比如 zh-CN
- Connection: keep-alive , 开启HTTP持久连接
- Host：服务器的域名
- Origin：告诉服务器请求从哪里发起的，仅包括协议和域名。 CORS跨域请求中可以看到response有对应的header，Access-Control-Allow-Origin
- Referer：告诉服务器该网页是从哪个页面链接过来的，其用于所有类型的请求，并且包括：协议+域名+查询参数； **（很多抢购服务会用这个做限制，必须通过某个入口进来才有效）**
- User-Agent: 服务器通过这个请求头判断用户的软件的应用类型、**操作系统**、**软件开发商以及版本号、浏览器内核信息**等； 风控系统、反作弊系统、反爬虫系统等基本会采集这类信息做参考
- Cookie: 表示服务端给客户端传的http请求状态,也是多个key=value形式组合，比如登录后的令牌等
- Content-Type： HTTP请求提交的内容类型，一般只有**post提交时才需要设置**，比如文件上传，表单提交等

**响应头：**

- Allow: 服务器支持哪些请求方法
- Content-Length: 响应体的字节长度
- Content-Type: 响应体的MIME类型
- Content-Encoding: 设置数据使用的编码类型
- Date: 设置消息发送的日期和时间
- Expires: 设置响应体的过期时间,一个GMT时间，表示该缓存的有效时间
- cache-control: Expires的作用一致，都是指明当前资源的有效期, 控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据,优先级高于Expires,控制粒度更细，如max-age=240，即4分钟
- Location：表示客户应当到哪里去获取资源，一般同时设置状态代码为3xx
- Server: 服务器名称
- Transfer-Encoding：chunked 表示输出的内容长度不能确定，静态网页一般没，基本出现在动态网页里面
- Access-Control-Allow-Origin: 定哪些站点可以参与跨站资源共享
- access-control-allow-credentials: 告知浏览器是否可以将对请求的响应暴露给前端 JavaScript 代码。
- access-control-allow-methods：服务器允许的请求方式

## 2. URL和跨域

### 2.1 URL基础

URL：统一资源标识符

结构：协议名（http://）+主机名(www.baidu.com)+端口号（:80默认就不加）+请求路径（/home）+查询参数（？key=value）+资源定位瞄点（#fragment）

URL编码：URL只能使用ascii。因此引入编码机制，将所有非ascii码字符和界定符转为十六进制字节值，然后在前面加个%

### 2.2 跨域

同源策略：浏览器遵循的，必须协议、主机、端口相同才同源，非同源，跨域请求的响应会被浏览器拦截

解决方案：

#### 2.2.1 cors（跨域资源共享）

1. 简单请求（get、post、head）

- 前端：withCredentials：true // 允许跨域发送cookie
- 后端：Access-control-allow-origin：前端的origin字段里的值 // 决定浏览器是否拦截这个响应；

  Access-control-allow-credentials：true // 允许跨域发送cookie

2. 非简单请求（预检请求options、cors请求）

- 预检请求：

```js
OPTIONS / HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT // 列出 CORS 请求用到哪个HTTP方法
Access-Control-Request-Headers: X-Custom-Header // 指定 CORS 请求将要加上什么请求头
```

在预检请求的响应返回后，如果请求**不满足响应头的条件**，则触发 XMLHttpRequest 的 onerror 方法， 当然后面真正的CORS请求也不会发出去了。

- cors请求：

  它和简单请求的情况是 一样的。浏览器自动加上 Origin 字段，服务端响应头返回Access-Control-Allow-Origin。

#### 2.2.2 JSONP

原理：通过 `<script>` 的src 填上目标地址从而发出 GET 请求，实现跨域请求并拿到响应。

JSONP 最大的优势在于**兼容性好**，IE 低版本不能使用 CORS 但可以使用 JSONP，缺点也 很明显，请求方法单一，**只支持 GET 请求**。

#### 2.2.3 nginx（反向代理服务器）

正向代理：帮助客户端访问客户端自己访问不到的服务器，然后将结果返回给客户端。client=>proxy(vpn)=>server(google)

反向代理：拿到客户端的请求，将请求转发给合适的其他服务器。帮其它的服务器拿到请求。client=>proxy(nginx)=>server(google)

原理：客户端（client.com）<=> nginx（client.com）<=> 服务器（server.com）

#### 2.2.4 前端代理服务器

proxy，仅在开发阶段起作用

## 3. get和post区别

1. 用途：get一般用于向服务器请求获取数据，post是向服务端发送数据
2. 数据：get数据在url上携带，post是放在body中
3. 编码：get只能用url编码，post不限
4. 底层：get发送一个tcp包，http header 和 data 一并发送出去，post发送2个tcp包，先发送header，再发送data。
5. 书签历史：get可以被缓存，可以回退不受影响，作为书签，历史记录，post不能被缓存和书签历史记录，回退需要重新发送数据

## 4. http1.0、1.1、2.0、3.0、https的区别

1. http1.0：规定浏览器和服务器保持短链接。服务器处理完成以后立即断开TCP连接。

   **缺点：** 不能复用连接，可能会阻塞。
2. http1.1：可长连接（增加Connection字段，通过设置**Keep-Alive**保持HTTP连接不断卡），增加缓存处理，请求管道化（“并行”传输），

   **缺点：** 服务器按照请求顺序依次返回结果，阻塞问题没有解决。
3. http2.0：

   **多路复用实现真并行**，在一个TCP上进行任意数量的HTTP请求。而这个强大的功能基于“二级制分帧”（应用层和传输层之间）的特性。**头部压缩**，使用encoder来减少需要传输的header大小。**支持服务器推送资源**，无需客户端需求。

   **缺点：**在出现**丢包**的情况下，整个TCP都要开始等待重传，导致后面的所有数据都被阻塞。
4. http3.0：**QUIC协议（基于UDP）**，**多路复用，更好的移动端表现**（quic通过id识别链接，tcp基于ip连接），**向前纠正机制**（每个数据包除了它本身的内容之外还包括了其他数据包的数据，因此少量的丢包可以通过其他包的冗余数据直接组装而无需重传。）
5. https：HTTP 的安全版，即 HTTP 下加入 **SSL** 层，对传输的**数据进行加密**。可**认证用户和服务器**确保数据发送正确。**SEO（搜素引擎优化）更好**。

   **缺点：**握手费时，缓存效率不如http，ssl证书需要绑定ip，使得**ip不能绑定多个域名**。

## 5. tcp、udp的区别

（1）**TCP 可靠**， **面向连接**，不会丢失数据因此适合**大数据量的交换**，且按序到达。**UDP无需建立连接**，尽最大努力交付，即**不保证可靠**交付。

（3）TCP 是面向字节流，UDP 面向报文，并且网络出现拥塞不会使得发送速率降低（因此会**出现丢包**，对实时的应用比如 IP 电话和视频会议等）。

（4）TCP 只能是 **1 对 1 的**，UDP 支持 1 对 1,**1 对多。**

（5）TCP 的首部较大为 20 字节，而 UDP 只有 8 字节。

（6）TCP传输慢，UDP传输快，更安全。

（7）**TCP适合对⽹络通信质量有要求，如浏览器、文件传输。UDP适合对⽹络通信质量要求不高，要求⽹络通讯速度尽量的快，如语音视频通话。**

## 6. tcp

### 6.1 tcp与http

**TCP是底层通讯协议**，定义的是数据传输和连接⽅式的规范。

**HTTP是应⽤层协议**，定义的是传输数据的内容的规范 （七层架构模型）

**tcp可靠传输原因: 收到请求响应确认, 超时重传, 拥塞控制, 数据校验(校验和), 数据分段**

HTTP协议中的数据是利⽤TCP协议传输的

### 6.2 tcp三次握手

防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

- 第一次握手： 客户端向服务器端发送报文，证明客户端的发送能力正常
- 第二次握手：服务器端接收到报文并向客户端发送报文，证明服务器端的接收能力、发送能力正常
- 第三次握手：客户端向服务器发送报文，证明客户端的接收能力正常，连接建立成功

![img](https://pic4.zhimg.com/80/v2-3e96d058cc79c8db7d7ecad90ced7507_720w.webp)

### 6.3 tcp四次挥手

- **第一次挥手** 客户端发出连接释放报文，并且停止发送数据。
- **第二次挥手** 服务器端接收到连接释放报文后，发出确认报文
- **第三次挥手** 客户端接收到服务器端的确认请求后，等待服务器发送连接释放报文，服务器将最后的数据发送完毕后，就向客户端发送连接释放报文
- **第四次挥手** 客户端收到服务器的连接释放报文后，必须发出确认，服务器端接收到确认报文后，TCP连接就断开了。

  ![img](https://pic2.zhimg.com/80/v2-75cc9591e92108c1ead0787a4066d49d_720w.webp)

### 6.4 为什么是三次握手

三次通信是理论上的**最小值**。在不可靠信道上可靠地传输信息。

发送两次（客户端发送请求，服务端接收到发送确认请求），1. 不能保证服务端发送的，客户端能不能接收到。2. 由于网络慢了，超时而又发了一个请求，导致最终服务端接受2次，建立了两次连接。

为什么传回SYN：告诉发送端，我接收到的信息确实就是你发送的信号

传了SYN,为啥还要传ACK：保证接收方到发送方的通道。

### 6.5 为什么是四次挥手

其实就是：为什么在四次挥手的时候，服务端没有将SYN和ACK一起发送

tcp为全双工通信，客户端在结束它的发送后还能接收来自另一端数据的能力。同时服务端发送ack后还需要处理数据，待处理完才发送fin包。所以服务端的 ACK 和 FIN 一般都会分开发送。

三次：服务端没有数据处理也可以

## 7. WebSocket

WebSocket 是 HTML5 中的协议，浏览器和服务器只需要完成一次tcp连接，两者之间就直接可以创建**持久性的连接**， 并进行**双向数据传输**。**在单个TCP连接上进行全双工通信的协议。**

HTTP只能由客户端发给服务端，当服务端连续状态变化时，客户端只能通过轮询获取，服务端不能主动通知客户端。

**相同点：** 都是基于TCP，都是可靠性传输协议，都是应用层协议

**联系：** websocket在建立握手时，数据是通过http传输的，建立之后不再使用http协议，即用http建立通道，websocket通信。

应用：即时聊天通信、实时数据流的拉去推送、在线协同编辑、即时web应用程序。

## 8. 浏览器输入地址后的事情

1. 构建请求
2. 查找缓存，有，直接使用
3. dns解析域名
4. 三次握手建立tcp连接
5. 发送http请求（请求行、请求头、请求体）
6. 服务器处理，返回资源（响应行、响应头、响应体），四次挥手结束连接（看connection字段是否是keep-alive）
7. 客户端构建dom树、cssom树、样式计算、生成布局树并渲染

## 9. 缓存

通过c**ache-control**验证强缓存是否可用

- 如果强缓存可用，直接使用
- 否则进入协商缓存，即发送 HTTP 请求，服务器通过**请求头中的If-Modified-Since（Last-Modified）或者 If-None-Match（Etag）**字段检查资源是否更新

  - 若资源更新，返回资源和200状态码
  - 否则，返回304，告诉浏览器直接从缓存获取资源

### 9.1 强缓存

无需发送http请求，通过判断响应头的过期时间expires/cache-control：max-age

```js
Expires: Wed, 22 Nov 2019 08:41:00 GMT
Cache-Control:max-age=3600
```

### 9.2 协商缓存

强缓存失效后，浏览器在请求头中携带相应的 **缓存tag（Last-Modified 和 ETag）** 来向服务器发请求，由服务器根据这个tag，来 决定是否使用缓存。

**Last-Modified：**最后修改时间，服务器会在响应头中加上这个字段。服务器拿到**请求头中的 If-Modified-Since** 的字段后，其实会和这个服务器中 **Last-Modified** 对比。

**ETag：**服务器给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。服务器接收到请求头中的**If-None-Match**后，会跟服务器上该资源的**ETag**进行比对。

**对比：**

1. 精度：Etag>Last-Modified。last-modified存在编辑资源但内容没变，缓存失效，且last-modified感知单位为1s，1s内的改变不会修改
2. 性能：Last-Modified>Etag。last只记载修改时间，而Etag需要根据文件内容生成哈希值
3. 两者都可以时，优先Etag

### 9.3 浏览器缓存位置

- Service Worker 离线缓存
- Memory Cache 内存缓存
- Disk Cache 磁盘缓存
- Push Cache 推送缓存，用得较少

## 10. 浏览器存储

### 10.1 Cookie

功能：用于标识用户身份，并通过请求在客户端和服务端传送。储存sessionid。

大小：4kb

过期时间：有设置时，时间到过期，时间没到关闭浏览器也不会清除；没设置时间时，关闭浏览器过期

性能：无论需不需要，都会携带在请求头中，性能浪费

安全：容易遭受攻击，纯文本形式，易被截取，跨站请求攻击。httponly=false时可通过js获取

### 10.2 localStorage

功能：本地持久化储存

大小：5m左右

过期时间：主动删除才过期

安全：只存在于客户端

应用：存储内容稳定的资源，如logo、base64的照片

### 10.3 sessionStorage

功能：会话级存储

大小：5m左右

过期时间：浏览器窗口关闭时过期

安全：只存在于客户端

应用：表单信息维护、本地浏览记录

### 10.4 IndexedDB

功能：运行在浏览器中的**非关系型数据库**，为大型数据的存储提供了接口。

大小：5m量级，理论没有上限

## 11. 回流与重绘

### 11.1 回流

**当Layout Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。**

触发：dom几何尺寸变化（尺寸变化、节点删减移动、读写offset、scroll、client属性、getBoundingClientRect）

过程：从渲染dom树开始重新走一遍，开销大。生成dom树=>计算样式=> 生成布局树=>构建图层树=>绘制列表

### 11.2 重绘

触发：dom样式改变，不影响几何结构（**color、background-color、visibility**）

过程：计算样式=>绘制列表。回流一定重绘，重绘不一定回流。

## 12. 网络攻击

### 12.1 跨站脚本攻击XSS

定义：浏览器被恶意注入攻击脚本，从而窃取cookie、监听用户行为、产生浮窗广告

解决：对用户输入进行转码过滤，使用httponly，对输出进行编码

### 12.2 跨站请求伪造CSRF

定义：诱导用户点击链接，获取到用户登录状态，并恶意向服务器发送请求。

解决：使用token，验证来源站点referer、http头中自定义属性并验证

## 13. 浏览器渲染原理

构建dom树，样式计算，布局阶段，分层，绘制，分块，栅格化，合成，回流，重绘

### 13.1 构建dom树（**HTML 解析器**）

**将HTML内容转换为浏览器DOM树结构**。**HTML 文件字节流是无法直接被渲染引擎理解的**，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是 DOM。

DOM 是保存在内存中树状结构，可以通过 JavaScript 来查询或修改其内容

1. 转换token（将字节流转换为 Token）
2. **将 Token 解析为 DOM 节点**，**并将 DOM 节点添加到 DOM 树中**。

HTML 解析器维护了一个 **Token 栈结构**，该 Token 栈主要用来计算**节点之间的父子关系**，在第一个阶段中生成的 Token 会被按照顺序压到这个栈中。

### 13.2 样式计算（计算出 DOM 节点中每个元素的具体样式）

- 格式化样式表（CSS文本=>浏览器可以理解的结构CSSOM树）
- 标准化样式表（css属性值标准化，em=>px）
- 计算每个DOM节点具体样式（根据继承规则、层叠规则）

### 13.3 生成布局树和布局计算

计算出 DOM 树中**可见元素**的**几何位置**

DOM 树中所有不可见的节点都没有包含到布局树中

- 遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中
- 而不可见的节点会被布局树忽略掉，如 `head` 标签下面的全部内容，包含 `dispaly:none`元素也没有被包进布局树
- 根据布局树计算每个节点在屏幕的位置
- Web 页面中元素的布局是相对的，在页面元素位置、大小发生变化，往往会导致其他节点联动，需要**重新计算布局**，这时候的布局过程一般被称为**回流（Reflow）**

### 13.4 分层

对布局树分层生成图层（渲染层）树

为特定的节点生成专用的图层，以适应复杂的 3D 变换、页面滚动，或者使用 z-index 做 z 轴排序等。如果一个节点没有对应的层，那么这个节点就从属于父节点的图层。

浏览器自动创建新的渲染层的条件有两个，一个是**满足层叠上下文**

### 13.5 绘制

对每个渲染层进行绘制，本质上是一个像素填充的过程。这个过程也出现于回流或一些不影响布局的 CSS 修改引起的屏幕局部重画，这时候它被称为 **重绘（Repaint）**

### 13.6 分块

**将图层划分为图块**

然后合成线程会**按照视口附近的图块来优先生成位图**

有的页面你使用滚动条要滚动好久才能滚动到底部，但是通过视口，用户只能看到页面的很小一部分，所以在这种情况下，要绘制出所有图层内容的话，就会产生太大的开销，而且也没有必要

### 13.7 栅格化（图块转换为位图）

### 13.8 合成

满足某些特殊条件的渲染层，会被浏览器自动提升为合成层。（video、canvas元素、position：fixed、animation、transition）

根元素 document 是渲染层，不是合成层

当通过渲染流水线通过GPU生成一张图片之后，会将图片存储到**显卡的后缓冲区**，一旦显卡把合成的图像写到后缓冲区，系统就会让后缓冲区和前缓冲区互换；此时显示器会从前缓冲区中获取最新图片。一般情况下显示器的刷新频率是 60HZ，也就是每秒更新 60 张图片。

## 14. 分片并发上传与并发限制

```js
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.maxCount = limit;
    this.runCounts = 0;
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart(）
```

## 15. 性能指标

[https://juejin.cn/post/7107537105664327716]()

360、谷歌都有lighthouse进行测评，micro edge通过performance

- **首屏内容绘制（First Contentful Paint，FCP）**：浏览器从响应用户输入网络地址，在页面首次绘制文本，图片（包括背景图）、非白色的 canvas 或者SVG （1.8s以内）
- **速度指标（Speed Index，SI）**： 衡量页面加载期间内容以视觉方式显示的速度。 通俗的讲，就是网页从有东西到完全显示内容的可见填充速度。
- **可交互时间（Time to Interactive，TTI）**：网页第一次完全达到可交互状态的时间点。
- **最大内容绘制（Largest Contentful Paint，LCP)**：根据页面首次开始加载的时间点来报告**可视区域内**可见的最大图像或者文本块完成渲染的相对时间。（2.5s以内）
- **总阻塞时间（Total Blocking Time，TBT）**：页面被阻塞响应用户交互的总时间。
- **首次有效绘制（First Meaning Paint, FMP）**：可视区“内容”最大的可见元素开始出现在屏幕上的时间点

## 16. 内存泄漏

Google Chrome浏览器提供了非常强大的JS调试工具，Heap Profiling便是其中一个。Heap Profiling可以记录当前的堆内存（heap）快照，并生成对象的描述文件，该描述文件给出了当时JS运行所用到的所有对象，以及这些对象所占用的内存大小、引用的层级关系等等。

或者performance的memory选项

造成原因：

- 全局变量，只有当页面被关闭后才会被销毁。
- 未销毁的定时器和回调函数
- 滥用闭包
- dom元素引用后未取消
- Map数据类型的使用
