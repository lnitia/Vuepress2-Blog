---
icon: http
date: 2024-01-23
category:
  - 计算机网络
tag:
  - HTTP
  - 基础
order: 1
excerpt: <p>《图解HTTP》阅读总结</p>
editLink: false
---
# HTTP协议基础

## 1 Web及网络基础

Web 使用一种名为HTTP（HyperText Transfer Protocol，超文本传输协议） 的协议作为规范，完成从客户端到服务器端等一系列运作流程。可以说，Web 是建立在HTTP 协议上通信的。

WWW（World Wide Web，万维网），是Web 浏览器当年用来浏览超文本的客户端应用程序时的名称。现在则用来表示这一系列的集合，也可简称为Web。

### 1.1 TCP/IP

通常使用的网络（包括互联网）是在TCP/IP 协议族的基础上运作的。而HTTP 属于它内部的一个子集。

TCP/IP 协议族按层次分别分为以下4 层：

1. 应用层：决定了向用户提供应用服务时通信的活动。
   TCP/IP 协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和 DNS（Domain Name System，域名系统）服务就是其中两类。HTTP 协议也处于该层。
2. 传输层：对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。
   在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）
3. 网络层：用来处理在网络上流动的数据包。数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（传输路线）到达对方计算机，并把数据包传送给对方。
4. 数据链路层：用来处理连接网络的硬件部分。包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在链路层的作用范围之内。

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123165845.png)

### 1.2 IP协议

IP（Internet Protocol）网际协议位于网络层

IP 协议的作用是把各种数据包传送给对方。而要保证确实传送到对方那里，则需要满足各类条件。其中两个重要的条件是IP地址和MAC地址（Media Access Control Address）。

* IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定地址。IP 地址可以和MAC 地址进行配对。IP 地址可变换，但MAC地址基本上不会更改。
* IP 间的通信依赖MAC 地址。在网络上，通信的双方在同一局域网（LAN）内的情况是很少的，通常是经过多台计算机和网络设备中转才能连接到对方。而在进行中转时，会利用下一站中转设备的MAC 地址来搜索下一个中转目标。这时，会采用ARP 协议（Address Resolution Protocol）。ARP 是一种用以解析地址的协议，根据通信方的IP 地址就可以反查出对应的MAC 地址。

### 1.3 TCP协议

TCP 位于传输层，提供可靠的字节流服务

字节流服务（Byte Stream Service）是指，为了方便传输，将大块数据分割成以报文段（segment）为单位的数据包进行管理。可靠指能够确认数据最终是否送达到对方。

为保证通信的可靠性，采用**三次握手（three-way handshaking）策略**

1. 发送端首先发送一个带SYN（synchronize）标志的数据包给对方
2. 接收端收到后，回传一个带有SYN/ACK 标志的数据包以示传达确认信息
3. 最后，发送端再回传一个带ACK（acknowledgement）标志的数据包，代表“握手”结束

若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发送相同的数据包。

### 1.4 DNS服务

DNS（Domain Name System）服务是位于应用层的协议。它提供域名到IP地址之间的解析服务。

流程：发送端发送域名给DNS，DNS返回对应ip地址，发送端接收到后再对该ip地址发送访问请求

### 1.5 URI和URL

* URI（Uniform Resource Identifier，统一资源标识符），是由某个协议方案表示的资源的定位标识符。协议方案是指访问资源所使用的协议类型名称。
  采用HTTP 协议时， 协议方案就是http。除此之外， 还有ftp、mailto、telnet、file 等。标准的URI 协议方案有30 种左右，由隶属于国际互联网资源管理的非营利社团ICANN（Internet Corporation for Assigned Names and Numbers， 互联网名称与数字地址分配机构） 的IANA（Internet Assigned Numbers Authority，互联网号码分配局）管理颁布。
* URL（Uniform Resource Locator，统一资源定位符），是使用Web 浏览器等访问Web 页面时需要输入的网页地址。

URI 用字符串标识某一互联网资源，而URL 表示资源的地点（互联网上所处的位置）。可见URL 是URI 的子集。

#### URI格式

表示指定的URI，可以使用涵盖全部必要信息的绝对URI、绝对URL或相对URL

绝对URI 的格式：

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123174833.png)

> RFC（Request for Comments，征求修正意见书）：用来制定HTTP 协议技术标准的文档
>
> 基本上客户端和服务器端都会以RFC 为标准来实现HTTP 协议。但也存在某些应用程序因客户端或服务器端的不同，而未遵照RFC 标准，反而将自成一套的“标准”扩展的情况。

## 2 简单的HTTP

在两台计算机之间使用HTTP 协议通信时，在一条通信线路上必定有一端是客户端，另一端则是服务器端。

请求访问文本或图像等资源的一端称为客户端，而提供资源响应的一端称为服务器端。

### 2.1 请求和响应报文

1. 客户端发送请求

请求报文由请求方法、请求URI、协议版本、可选的请求首部字段和内容实体构成

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123180448.png)

2. 服务器将请求内容的处理结果以响应的形式返回

响应报文基本上由协议版本、状态码（status code，表示请求成功或失败的数字代码）、用以解释状态码的原因短语、可选的响应首部字段以及实体主体构成

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123180557.png)

### 2.2 无状态协议

HTTP 是一种不保存状态，即无状态（stateless）协议。HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在HTTP 这个级别，协议对于发送过的请求或响应都不做持久化处理。

因此引入了Cookie 技术，用于状态管理

### 2.3 HTTP方法

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/1706011053332.png)

其中LINK 和UNLINK 已被HTTP/1.1 废弃，不再支持。

#### GET 获取资源

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123193712.png)

#### POST 传输实体主体

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123194042.png)

#### PUT 传输文件

在请求报文的主体中包含文件内容，然后保存到请求URI 指定的位置

但是，鉴于HTTP/1.1 的PUT 方法自身不带验证机制，任何人都可以上传文件, 存在安全性问题，因此一般的Web 网站不使用该方法。若配合Web 应用程序的验证机制，或架构设计采用REST（REpresentational State Transfer，表征状态转移）标准的同类Web 网站，就可能会开放使用PUT 方法。

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123194540.png)

#### HEAD 获得报文首部

HEAD 方法和GET 方法一样，只是不返回报文主体部分。用于确认URI 的有效性及资源更新的日期时间等

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123194744.png)

#### DELETE 删除文件

HTTP/1.1 的DELETE 方法本身和PUT 方法一样不带验证机制

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123195010.png)

#### OPTIONS 询问支持的方法

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123195104.png)

#### TRACE 追踪路径

#### CONNECT 要求用隧道协议连接代理

CONNECT 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP 通信。主要使用SSL（Secure Sockets Layer，安全套接层）和TLS（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输。

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123195600.png)

### 2.4 持久连接

1. HTTP 协议的初始版本中，每进行一次HTTP 通信就要断开一次TCP 连接，即 建立TCP连接—HTTP请求响应—断开TCP连接
2. HTTP/1.1 和一部分的HTTP/1.0有持久连接（HTTP Persistent Connections，也称为HTTP keep-alive 或 HTTP connection reuse）的方法。持久连接的特点是，只要任意一端没有明确提出断开连接，则保持TCP 连接状态
3. 持久连接的好处在于减少了TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载。另外，减少开销的那部分时间，使HTTP 请求和响应能够更早地结束，这样Web 页面的显示速度也就相应提高了
4. 在HTTP/1.1 中，所有的连接默认都是持久连接，但在HTTP/1.0 内并未标准化

### 2.5 管线化

从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求，做到同时并行发送多个请求

### 2.6 使用Cookie的状态管理

Cookie 技术通过在请求和响应报文中写入Cookie 信息来控制客户端的状态。

1. 客户端发送请求
2. 服务器生成Cookie并在响应中添加后返回，Cookie 会根据响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie
3. 当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入Cookie 值后发送出去
4. 服务器端发现客户端发送过来的Cookie 后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123201443.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123201500.png)

## 3 HTTP报文

### 3.1 报文结构

![img](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123201855.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240123202053.png)

### 3.2 编码

HTTP 在传输数据时可以按照数据原貌直接传输，但也可以在传输过程中通过编码提升传输速率

#### 报文主体和实体主体的差异

* 报文（ message）是HTTP 通信中的基本单位，由8 位组字节流（octet sequence，其中octet 为8 个比特）组成
* 实体（ entity）作为请求或响应的有效载荷数据（补充项）被传输，其内容由实体首部和实体主体组成

HTTP 报文的主体用于传输请求或响应的实体主体
通常，报文主体等于实体主体。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异

#### 内容编码

HTTP协议中的内容编码功能指明应用在实体内容上的编码格式，并保持实体信息原样压缩。内容编码后的实体由客户端接收并负责解码

常用的内容编码有以下几种：

* gzip（GNU zip）
* compress（UNIX系统的标准压缩）
* deflate（zlib）
* identity（不进行编码）

#### 分块传输编码

在传输大容量数据时，通过把数据分割成多块，能够让浏览器逐步显示页面。这种把实体主体分块的功能称为分块传输编码（Chunked Transfer Coding）

#### 多部分对象集合

MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件扩展）机制，允许邮件处理文本、图片、视频等多个不同类型的数据。在MIME 扩展中会使用一种称为多部分对象集合（Multipart）的方法，来容纳多份不同类型的数据

HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体，通常是在图片或文本文件等上传时使用

多部分对象集合包含的对象如下：

* `multipart/form-data`：在Web 表单文件上传时使用
* `multipart/byteranges`：状态码206（Partial Content，部分内容）响应报文包含了多个范围的内容时使用

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124111140.png)

* 在HTTP 报文中使用多部分对象集合时，需要在首部字段里加上 `Content-type`
* 使用 `boundary` 字符串来划分多部分对象集合指明的各类实体。在 `boundary` 字符串指定的各个实体的起始行之前插入“--”标记（例如：--AaB03x），而在多部分对象集合对应的字符串的最后插入“--”标记（例如：--AaB03x--）作为结束

#### 范围请求

为了解决下载过程中网络中断就必须重头开始的问题，需要一种可恢复的机制，即能从之前下载中断处恢复下载

* 范围请求（Range Request）：指定下载的实体范围发送的请求。通过首部字段 `Range` 来指定资源的byte 范围
* 针对范围请求，响应会返回状态码为206 Partial Content 的响应报文
* 对于多重范围的范围请求，响应会在首部字段Content-Type标明multipart/byteranges 后返回响应报文
* 如果服务器端无法响应范围请求，则会返回状态码200 OK 和完整的实体内容

#### 内容协商

同一个Web 网站有可能存在着多份相同内容的页面。比如英语版和中文版的Web 页面，它们内容上虽相同，但使用的语言却不同

内容协商（Content Negotiation）机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的基准

判断的基准包含在请求报文中的以下首部字段：

* `Accept`
* `Accept-Charset`
* `Accept-Encoding`
* `Accept-Language`
* `Content-Language`

内容协商技术有三种类型：

* 服务器驱动协商（Server-driven Negotiation）
  由服务器端进行内容协商。以请求的首部字段为参考，在服务器端自动处理。但对用户来说，以浏览器发送的信息作为判定的依据，并不一定能筛选出最优内容。
* 客户端驱动协商（Agent-driven Negotiation）
  由客户端进行内容协商的方式。用户从浏览器显示的可选项列表中手动选择。还可以利用JavaScript 脚本在Web 页面上自动进行上述选择。比如按OS 的类型或浏览器类型，自行切换成PC 版页面或手机版页面。
* 透明协商（Transparent Negotiation）
  是服务器驱动和客户端驱动的结合体，是由服务器端和客户端各自进行内容协商的一种方法。

## 4 HTTP状态码

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124140043.png)

### 4.1 1XX 处理中

#### 100 Continue

客户端可以继续请求。通常在客户端已发送请求的初始部分后使用，表示服务器已接收请求的初步部分，客户端应继续发送其余部分。

#### 101 Switching Protocols

服务器正在切换到客户端请求的协议。这在客户端请求更改协议（如从 HTTP/1.1 切换到 HTTP/2）时使用。

### 4.2 2XX 成功

#### 200 OK

请求被正常处理

#### 201 Created

请求成功且服务器已创建了新的资源。通常在 POST 或 PUT 请求后返回，表示新资源已成功创建

#### 204 No Content

代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体

一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用

#### 206 Partial Content

表示客户端进行了范围请求，而服务器成功执行了这部分的GET 请求

响应报文中包含由 `Content-Range `指定范围的实体内容

### 4.2 3XX 重定向

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求

#### 301 Moved Permanently

永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI

#### 302 Found

临时性重定向。该状态码表示请求的资源已被分配了新的URI，希望用户（本次）能使用新的URI 访问

#### 303 See Other

表示由于请求对应的资源存在着另一个URI，应使用GET方法定向获取请求的资源

303 状态码和302 Found 状态码有着相同的功能，但303 状态码明确表示客户端应当采用GET 方法获取资源，这点与302 状态码有区别

> 当301、302、303 响应状态码返回时，几乎所有的浏览器都会把POST 改成GET，并删除请求报文内的主体，之后请求会自动再次发送。
> 301、302 标准是禁止将POST 方法改变成GET 方法的，但实际使用时大家都会这么做。

#### 304 Not Modified

（用于缓存(HTTP caching)，告诉客户端回应未被修改，因此客户端可以继续使用回应的相同缓存版本）

表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况

> 附带条件的请求是指采用GET 方法的请求报文中包含 `If-Match`，`If-Modified-Since`，`If-None-Match`，`If-Range`，`If-Unmodified-Since`中任一首部。

304 状态码返回时，不包含任何响应的主体部分

304 虽然被划分在3XX 类别中，但是和重定向没有关系

#### 307 Temporary Redirect

临时重定向。该状态码与302 Found 有相同的含义

### 4.3 4XX 客户端错误

#### 400 Bad Request

表示请求报文中存在语法错误

当错误发生时，需修改请求的内容后再次发送请求

浏览器会像200 OK 一样对待该状态码

#### 401 Unauthorized

表示发送的请求需要有通过HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息。若之前已进行过1次请求，则表示用户认证失败

返回含有401 的响应必须包含一个适用于被请求资源的 `WWW-Authenticate`首部用以质询（challenge）用户信息。当浏览器初次接收到401 响应，会弹出认证用的对话窗口

#### 403 Forbidden

表明对请求资源的访问被服务器拒绝了

未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发送源IP地址试图访问）等列举的情况都可能是发生403 的原因

#### 404 Not Found

表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用

### 4.4 5XX 服务器错误

#### 500 Internal Server Error

表明服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug或某些临时的故障

#### **501 Not Implemented **

服务器不支持请求的功能。这表示服务器尚未实现请求的方法。

#### 503 Service Unavailable

表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求

如果事先得知解除以上状况需要的时间，最好写入 `Retry-After `首部字段再返回给客户端

## 5 Web服务器

### 5.1 用单台虚拟主机实现多个域名

虚拟主机（Virtual Host，又称虚拟服务器）功能：HTTP/1.1 规范允许一台HTTP 服务器搭建多个Web 站点。比如，提供Web 托管服务（Web Hosting Service）的供应商，可以用一台服务器为多位客户服务，也可以以每位客户持有的域名运行各自不同的网站。

在相同的IP 地址下，由于虚拟主机可以寄存多个不同主机名和域名的Web 网站，因此在发送HTTP 请求时，必须在Host 首部内完整指
定主机名或域名的URI。

### 5.2 通信数据转发程序

HTTP 通信时，除客户端和服务器以外，还有一些用于通信数据转发的应用程序，例如代理、网关和隧道

#### 代理

代理是一种有转发功能的应用程序，它接收由客户端发送的请求并转发给服务器，同时也接收服务器返回的响应并转发给客户端

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124163600.png)

* 使用代理服务器的理由：利用缓存技术减少网络带宽的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要目的等
* 代理有多种使用方法，按两种基准分类。一种是是否使用缓存，另一种是是否会修改报文

  * 缓存代理
    代理转发响应时，缓存代理（Caching Proxy）会预先将资源的副本（缓存）保存在代理服务器上。当代理再次接收到对相同资源的请求时，就可以不从源服务器那里获取资源，而是将之前缓存的资源作为响应返回。
  * 透明代理
    转发请求或响应时，不对报文做任何加工的代理类型被称为透明代理（Transparent Proxy）。反之，对报文内容进行加工的代理被称为非透明代理。

#### 网关

网关是转发其他服务器（非HTTP服务器）通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器一样对请求进行处理

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124164227.png)

* 网关能使通信线路上的服务器提供非HTTP 协议服务。比如，网关可以连接数据库，使用SQL 语句查询数据
* 利用网关能提高通信的安全性，因为可以在客户端与网关之间的通信线路上加密以确保连接的安全

#### 隧道

隧道是在相隔甚远的客户端和服务器两者之间进行中转，使用SSL等加密手段，保持双方安全通信连接的应用程序

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124164817.png)

* 隧道的目的是确保客户端能与服务器进行安全的通信
* 隧道本身不会去解析HTTP 请求。也就是说，请求保持原样中转给之后的服务器
* 隧道会在通信双方断开连接时结束

### 5.3 缓存

* 缓存是指代理服务器或客户端本地磁盘内保存的资源副本
* 利用缓存可减少对源服务器的访问，因此也就节省了通信流量和通信时间
* 缓存服务器是代理服务器的一种，并归类在缓存代理类型中

#### 缓存的有效性

* 存在 源服务器资源更新、客户端的要求、缓存的有效期 等因素，需向源服务器确认资源的有效性
* 若判断缓存失效，缓存服务器将会再次从源服务器上获取“新”资源

#### 客户端的缓存

* 缓存不仅可以存在于缓存服务器内，还可以存在客户端浏览器中。以Internet Explorer 程序为例，把客户端缓存称为临时网络文件（Temporary Internet File）
* 浏览器缓存如果有效，则可以直接从本地磁盘内读取

> 在HTTP 出现之前的协议
>
> FTP（ File Transfer Protocol）
> 传输文件时使用的协议。该协议历史久远，可追溯到1973 年前后，比TCP/IP 协议族的出现还要早。虽然它在1995 年被HTTP 的流量（Traffic）超越，但时至今日，仍被广泛沿用
>
> NNTP（ Network News Transfer Protocol）
> 用于NetNews 电子会议室内传送消息的协议。在1986 年前后出现，属于比较古老的一类协议。现在，利用Web 交换信息已成主流，所以该协议已经不怎么使用了
>
> Archie
> 搜索anonymous FTP 公开的文件信息的协议。1990 年前后出现，已不常使用
>
> WAIS（Wide Area Information Servers）
> 以关键词检索多个数据库使用的协议。1991 年前后出现，已被HTTP 协议替代
>
> Gopher
> 查找与互联网连接的计算机内信息的协议。1991 年前后出现，已被HTTP 协议替代

## 6 HTTP首部

### 6.1 HTTP首部字段

首部字段结构：`首部字段名: 字段值, 字段值`

#### HTTP 首部字段类型

根据实际用途被分为以下4 种类型：

1. 通用首部字段（General Header Fields）
   请求报文和响应报文两方都会使用的首部
2. 请求首部字段（Request Header Fields）
   从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息
3. 响应首部字段（Response Header Fields）
   从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加内容，也会要求客户端附加额外的内容信息
4. 实体首部字段（Entity Header Fields）
   针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更新时间等与实体有关的信息

#### End-to-end 首部和Hop-by-hop 首部

HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分成2种类型：

1. 端到端首部（End-to-end Header）
   分在此类别中的首部会转发给请求/ 响应对应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发
2. 逐跳首部（Hop-by-hop Header）
   分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再转发。HTTP/1.1 和之后版本中，如果要使用hop-by-hop 首部，需提供Connection 首部字段。

   HTTP/1.1 中的逐跳首部字段：（除这8 个首部字段之外，其他所有字段都属于端到端首部）

   * `Connection`
   * `Keep-Alive`
   * `Proxy-Authenticate`
   * `Proxy-Authorization`
   * `Trailer`
   * `TE`
   * `Transfer-Encoding`
   * `Upgrade`

### 6.2　HTTP/1.1 通用首部字段

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124173449.png)

#### 01 Cache-Control

* 操作缓存的工作机制

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124193352.png)

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124193420.png)

#### 02 Connection

* 控制不再转发给代理的首部字段

  `Connection: 不再转发的首部字段名`
* 管理持久连接

  `Connection: close` HTTP/1.1 版本的默认连接都是持久连接，当服务器端想明确断开连接时， 则指定Connection 首部字段的值为Close

  `Connection: Keep-Alive` HTTP/1.1 之前的HTTP 版本的默认连接都是非持久连接，如果想在旧版本的HTTP 协议上维持持续连接，则需要指定Connection首部字段的值为Keep-Alive

#### 03 Data

* 表明创建HTTP 报文的日期和时间

  输出格式：`Date: Tue, 03 Jul 2012 04:40:59 GMT`

#### 04 Pragma

* Pragma 是HTTP/1.1 之前版本的历史遗留字段，仅作为与HTTP/1.0的向后兼容而定义
  规范定义的形式唯一：`Pragma: no-cache`
  该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源

#### 05 Trailer

* 事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在HTTP/1.1 版本分块传输编码时

  `Trailer: 首部字段`

#### 06 Transfer-Encoding

* 规定传输报文主体时采用的编码方式（HTTP/1.1 的传输编码方式仅对分块传输编码有效）

  `Transfer-Encoding: chunked`

#### 07 Upgrade

* 用于检测HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议
  `Upgrade: TLS/1.0 `
  `Connection: Upgrade`
  * Upgrade 首部字段产生作用的Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段Upgrade 时，还需要额外指定 `Connection: Upgrade`
  * 对于附有首部字段Upgrade 的请求， 服务器可用 `101 Switching Protocols `状态码作为响应返回

#### 08 Via

* 追踪客户端与服务器之间的请求和响应报文的传输路径

  报文经过代理或网关时，会先在首部字段Via 中附加该服务器的信息，然后再进行转发

  还可避免请求回环的发生

#### 09 Warning

* 告知用户一些与缓存相关的问题的警告

  `Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])`

### 6.3 HTTP/1.1 请求首部字段

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124175434.png)

#### 01 Accept

* 通知服务器用户代理能够处理的媒体类型及媒体类型的相对优先级
  eg：`Accept: text/plain; q=0.3, text/html`

  可以使用q（范围0~1）来额外表示权重值，用分号进行分隔。当服务器提供多种内容时，将会首先返回权重值最高的媒体类型

> 媒体类型示例：
> 文本文件
> text/html, text/plain, text/css ...
> application/xhtml+xml, application/xml ...
> 图片文件
> image/jpeg, image/gif, image/png ...
> 视频文件
> video/mpeg, video/quicktime ...
> 应用程序使用的二进制文件
> application/octet-stream, application/zip ...

#### 02 Accept-Charset

* 通知服务器用户代理支持的字符集及字符集的相对优先顺序，应用于内容协商机制的服务器驱动协商
  eg：`Accept-Charset: iso-8859-5, unicode-1-1;q=0.8`

#### 03 Accept-Encoding

* 告知服务器用户代理支持的内容编码及内容编码的优先级顺序

  可一次性指定多种内容编码，也可使用星号（*）作为通配符指定任意的编码格式

#### 04 Accept-Language

* 告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级
  eg：`Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3`

#### 05 Authorization

* 用来告知服务器用户代理的认证信息（证书值）

#### 06 Expect

* 告知服务器期望出现的某种特定行为

  `Expect: 100-continue`

  客户端可以利用该首部字段，写明所期望的扩展，但HTTP/1.1规范只定义了 `100-continue`

  因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 `417 Expectation Failed`

#### 07 From

* 告知服务器使用用户代理的用户的电子邮件地址

#### 08 Host

* 告知服务器请求的资源所处的互联网主机名和端口号

> Host 首部字段在HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段

#### 09 If-Match

If-xxx 样式的请求首部字段都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求

* 告知服务器匹配资源所用的实体标记（ETag）值

  服务器会比对 `If-Match`的字段值和资源的ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 `412 Precondition Failed `

  可以使用星号（*）指定 `If-Match` 的字段值，此时，服务器将会忽略ETag 的值，只要资源存在就处理请求

#### 10 If-Modified-Since

* 告知服务器若 `If-Modified-Since `字段值早于资源的更新时间，则希望能处理该请求。而在指定 `If-Modified-Since` 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 `304 Not Modified` 的响应

`If-Modified-Since` 用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 `Last-Modified` 来确定

#### 11 If-None-Match

* 和首部字段 `If-Match` 作用相反。用于指定 `If-None-Match` 字段值的实体标记（ETag）值与请求资源的ETag 不一致时，它就告知服务器处理该请求

在GET 或HEAD 方法中使用首部字段 `If-None-Match` 可获取最新的资源

#### 12 If-Range

* 告知服务器若指定的 `If-Range`字段值（ETag 值或者时间）和请求资源的ETag 值或时间相一致时，则作为范围请求处理。反之，则返回全体资源

#### 13 If-Unmodified-Since

* 和首部字段 `If-Modified-Since`的作用相反。作用的是告知服务器，指定的请求资源只有在字段值内指定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 `412 Precondition Failed `作为响应返回

#### 14 Max-Forwards

* 通过TRACE 方法或OPTIONS 方法， 发送包含首部字段 `Max-Forwards` 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，`Max-Forwards `的值减1 后重新赋值。当服务器接收到Max-Forwards 值为0 的请求时，则不再进行转发，而是直接返回响应

#### 15 Proxy-Authorization

* 接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段 `Proxy-Authorization` 的请求，以告知服务器认证所需要的信息

#### 16 Range

* 告知服务器资源的指定范围
  eg：`Range: bytes=5001-10000`

#### 17 Referer

* 告知服务器请求的原始资源的URI

#### 18 TE

* 告知服务器客户端能够处理响应的传输编码方式及相对优先级
  eg：`TE: gzip, deflate;q=0.5`

  和首部字段Accept-Encoding 的功能很相像，但是用于传输编码

#### 19 User-Agent

* 将创建请求的浏览器和用户代理名称等信息传达给服务器

### 6.4 HTTP/1.1 响应首部字段

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124175800.png)

#### 01 Accept-Ranges

* 告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源

  可指定的字段值有两种，可处理范围请求时指定其为bytes：`Accept-Ranges: bytes`，反之则指定其为none

#### 02 Age

* 告知客户端源服务器在多久前创建了响应。字段值的单位为秒，`Age: 600 `即10分钟前

  若创建该响应的服务器是缓存服务器，Age 值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段Age

#### 03 ETag

* 用于告知客户端实体标识。它是一种可将资源以字符串形式做唯一性标识的方式

  服务器会为每份资源分配对应的ETag 值。当资源更新时，ETag 值也需要更新

> 强ETag 值和弱Tag 值
>
> 强ETag 值：不论实体发生多么细微的变化都会改变其值
>
> 弱ETag 值：只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变ETag 值，并在字段值最开始处附加W/

#### 04 Location

* 将响应接收方引导至某个与请求URI位置不同的资源

  基本上，该字段会配合 `3xx ：Redirection` 的响应，提供重定向的URI

#### 05 Proxy-Authenticate

* 把由代理服务器所要求的认证信息发送给客户端

#### 06 Retry-After

* 告知客户端应该在多久之后再次发送请求。主要配合状态码 `503 Service Unavailable` 响应，或 `3xx Redirect` 响应一起使用

  字段值可以指定为具体的日期时间，也可以是创建响应后的秒数

#### 07 Server

* 告知客户端当前服务器上安装的HTTP 服务器应用程序的信息
  eg：`Server: Apache/2.2.6 (Unix) PHP/5.2.5`

#### 08 Vary

* 对缓存进行控制，源服务器会向代理服务器传达关于本地缓存使用方法的命令

#### 09 WWW-Authenticate

* 用于HTTP 访问认证。它会告知客户端适用于访问请求URI 所指定资源的认证方案（`Basic `或是 `Digest`）和带参数提示的质询（challenge）

  状态码 `401 Unauthorized `响应中，肯定带有首部字段 `WWW-Authenticate`

### 6.5 HTTP/1.1 实体首部字段

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124175820.png)

#### 01 Allow

* 用于通知客户端能够支持Request-URI 指定资源的所有HTTP 方法

  当服务器接收到不支持的HTTP 方法时，会以状态码 `405 Method Not Allowed` 作为响应返回。同时，还会把所有能支持的HTTP 方法写入首部字段 `Allow` 后返回

#### 02 Content-Encoding

* 告知客户端服务器对实体的主体部分选用的内容编码方式
  eg：`Content-Encoding: gzip`

#### 03 Content-Language

* 告知客户端，实体主体使用的自然语言
  eg：`Content-Language: zh-CN`

#### 04 Content-Length

* 表明了实体主体部分的大小（单位是字节）
  eg：`Content-Length: 15000`

  对实体主体进行内容编码传输时，不能再使用 `Content-Length `首部字段

#### 05 Content-Location

* 给出与报文主体部分相对应的URI。和首部字段 `Location` 不同，`Content-Location` 表示的是报文主体返回资源对应的URI

#### 06 Content-MD5

* 是一串由MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达

  1）对报文主体执行MD5 算法获得的128 位二进制数，再通过Base64编码后将结果写入Content-MD5 字段值。由于HTTP 首部无法记录二进制值，所以要通过Base64 编码处理。2）为确保报文的有效性，作为接收方的客户端会对报文主体再执行一次相同的MD5 算法。计算出的值与字段值作比较后，即可判断出报文主体的准确性。

  这种方法无法检测出 内容上的偶发性改变 和 恶意篡改

#### 07 Content-Range

* 针对范围请求，返回响应时使用的首部字段 `Content-Range`，能告知客户端作为响应返回的实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小
  eg：`Content-Range: bytes 5001-10000/10000`

#### 08 Content-Type

* 说明实体主体内对象的媒体类型。和首部字段 `Accept` 一样，字段值用 `type/subtype` 形式赋值
  eg：`Content-Type: text/html; charset=UTF-8`

#### 09 Expires

* 将资源失效的日期告知客户端

  缓存服务器在接收到含有首部字段 `Expires` 的响应后，会以缓存来应答请求，在 `Expires` 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源

#### 10 Last-Modified

* 指明资源最终修改的时间

  一般来说，这个值就是Request-URI 指定资源被修改的时间

### 6.6 为Cookie服务的首部字段

Cookie没有被编入标准化HTTP/1.1 的RFC2616 中，但在Web 网站方面得到了广泛的应用

Cookie 的工作机制是用户识别及状态管理。Web 网站为了管理用户的状态会通过Web 浏览器，把一些数据临时写入用户的计算机内。当用户访问该Web 网站时， 可通过通信方式取回之前发放的Cookie。

#### 01 Set-Cookie

* 当服务器准备开始管理客户端的状态时，会事先告知Cookie信息。属于响应首部字段
  eg：`Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; ⇒ path=/; domain=.hackr.jp;`

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240124214312.png)

#### 02 Cookie

* 告知服务器，当客户端想获得HTTP 状态管理支持时，就会在请求中包含从服务器接收到的Cookie。属于请求首部字段
  eg：`Cookie: status=enable`

### 6.7 其他首部字段

HTTP 首部字段是可以自行扩展的。所以在Web 服务器和浏览器的应用上，会出现各种非标准的首部字段

1. `X-Frame-Options`：属于HTTP 响应首部，用于控制网站内容在其他Web 网站的Frame 标签内的显示问题
2. `X-XSS-Protection`：属于HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器XSS 防护机制的开关
3. `DNT`：属于HTTP 请求首部，其中DNT 是Do Not Track的简称，意为拒绝个人信息被收集，是表示拒绝被精准广告追踪的一种方法
4. `P3P`：属于HTTP 响应首部，通过利用P3P（The Platform for Privacy Preferences，在线隐私偏好平台）技术，可以让Web 网站上的个人隐私变成一种仅供程序可理解的形式，以达到保护用户隐私的目的

## 7 HTTPS

### 7.1 HTTP的缺点

HTTP 的主要不足如下：

1. 通信使用明文（不加密），内容可能会被窃听

   通信加密：
   HTTP 协议中没有加密机制，但可以通过和SSL（Secure Socket Layer，安全套接层）或TLS（Transport Layer Security，安全层传输协议）的组合使用，加密HTTP 的通信内容。用SSL 建立安全通信线路之后，就可以在这条线路上进行HTTP通信了。与SSL 组合使用的HTTP 被称为HTTPS（HTTP Secure，超文本传输安全协议）或HTTP over SSL

   内容加密：将报文主体内容进行加密处理
2. 不验证通信方的身份，因此有可能遭遇伪装

   通过SSL中的证书来证明通信方
3. 无法证明报文的完整性，所以有可能已遭篡改

   应用层发送数据时会附加一种叫做MAC（Message Authentication Code）的报文摘要。MAC 能够查知报文是否遭到篡改，从而保护报文的完整性

### 7.2 HTTP+ 加密+ 认证+ 完整性保护=HTTPS

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240125102753.png)

#### 公开密钥加密

SSL 采用一种叫做公开密钥加密（Public-key cryptography）的加密处理方式

* 共享密钥加密：加密和解密同用一个密钥的方式（Common key crypto system），也被叫做对称密钥加密。但难以安全转发密钥
* 公开密钥加密：使用一对非对称的密钥。一把叫做私有密钥（private key），另一把叫做公开密钥（public key）。发送密文的一方使用对方的公开密钥进行加密处理，对方收到被加密的信息后，再使用自己的私有密钥进行解密

HTTPS 采用共享密钥加密和公开密钥加密两者并用的混合加密机制：在交换密钥环节使用公开密钥加密方式，之后的建立通信交换报文阶段则使用共享密钥加密方式

#### 证书

为证明公开密钥正确性，可以使用由数字证书认证机构（CA，Certificate Authority）和其相关机关颁发的公开密钥证书

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240125104238.png)

EV SSL 证书（Extended Validation SSL Certificate）：可确认对方服务器背后运营的组织是否真实存在

客户端证书：进行客户端认证，证明服务器正在通信的对方始终是预料之内的客户端

#### HTTPS安全通信步骤

1. 客户端通过发送 `Client Hello` 报文开始SSL 通信。报文中包含客户端支持的SSL 的指定版本、加密组件（Cipher Suite）列表（所使用的加密算法及密钥长度等）
2. 服务器可进行SSL 通信时，会以 `Server Hello `报文作为应答。和客户端一样，在报文中包含SSL 版本以及加密组件。服务器的加密组件内容是从接收到的客户端加密组件内筛选出来的
3. 之后服务器发送 `Certificate` 报文。报文中包含公开密钥证书
4. 最后服务器发送 `Server Hello Done` 报文通知客户端，最初阶段的SSL 握手协商部分结束
5. SSL 第一次握手结束之后，客户端以 `Client Key Exchange`报文作为回应。报文中包含通信加密中使用的一种被称为Pre-master secret 的随机密码串。该报文已用步骤3 中的公开密钥进行加密
6. 接着客户端继续发送 `Change Cipher Spec` 报文。该报文会提示服务器，在此报文之后的通信会采用Pre-master secret密钥加密
7. 客户端发送 `Finished` 报文。该报文包含连接至今全部报文的整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确解密该报文作为判定标准
8. 服务器同样发送 `Change Cipher Spec` 报文
9. 服务器同样发送 `Finished` 报文
10. 服务器和客户端的 `Finished` 报文交换完毕之后，SSL 连接就算建立完成。从此处开始进行应用层协议的通信，即发送HTTP 请求
11. 应用层协议通信，即发送HTTP 响应
12. 最后由客户端断开连接。断开连接时，发送 `close_notify`报文。这步之后再发送 `TCP FIN `报文来关闭与TCP的通信

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240125110239.png)

## 8 身份认证

HTTP/1.1 使用的认证方式如下：

1. BASIC认证（基本认证）：采用Base64 编码方式将用户ID 及密码直接明文发送给服务器进行验证
2. DIGEST认证（摘要认证）：使用质询/ 响应的方式（challenge/response），一方会先发送认证要求给另一方，接着使用从另一方那接收到的质询码计算生成响应码，最后将响应码返回给对方进行认证
3. SSL客户端认证：客户端把客户端证书信息以 `Client Certificate` 报文方式发送给服务器，服务器验证通过后方可领取证书内客户端的公开密钥，然后开始HTTPS 加密通信
   双因素认证（Two-factor authentication）：SSL 客户端认证不会仅依靠证书完成认证，一般会和基于表单认证组合使用。第一个认证因素的SSL 客户端证书用来认证客户端计算机，另一个认证因素的密码则用来确定这是用户本人的行为
4. FormBase认证（基于表单认证）：客户端向服务器上的Web 应用程序发送登录信息（Credential），按登录信息的验证结果认证。认证多半为基于表单认证
5. Windows 统一认证（Keberos 认证、NTLM 认证）

## 9 基于HTTP的功能追加协议

### 9.1 SPDY

旨在解决HTTP 的性能瓶颈，缩短Web 页面的加载时间

#### HTTP/1.1 的瓶颈

HTTP协议限制更新内容的实时显示。使用HTTP 协议探知服务器上是否有内容更新，就必须频繁地从客户端到服务器端进行确认；如果服务器上没有内容更新，那么就会产生徒劳的通信

1. 一条连接上只可发送一个请求
2. 请求只能从客户端开始。客户端不可以接收除响应以外的指令
3. 请求/响应首部未经压缩就发送。首部信息越多延迟越大
4. 发送冗长的首部。每次互相发送相同的首部造成的浪费较多
5. 可任意选择数据压缩格式。非强制压缩发送

解决方法：

1. Ajax（Asynchronous JavaScript and XML， 异步JavaScript 与XML技术）

   是一种有效利用JavaScript 和DOM（Document Object Model，文档对象模型）的操作，以达到局部Web 页面替换加载的异步通信手段

   Ajax 的核心技术是名为XMLHttpRequest 的API，通过JavaScript脚本语言的调用就能和服务器进行HTTP 通信。借由这种手段，就能从已加载完毕的Web 页面上发起请求，只更新局部页面

   但利用Ajax 实时地从服务器获取内容，有可能会导致大量请求产生
2. Comet

   一旦服务器端有内容更新了，Comet 不会让请求等待，而是直接给客户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端推送（Server Push）的功能

   内容上虽然可以做到实时更新，但为了保留响应，一次连接的持续时间也变长了，为了维持连接会消耗更多的资源

Ajax 和Comet 等提高易用性的技术，一定程度上使HTTP 得到了改善，但没有解决HTTP 协议本身的限制

#### SPDY 的设计与功能

SPDY 没有完全改写HTTP 协议，而是在TCP/IP 的应用层与运输层之间通过新加会话层的形式运作

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240125120140.png)

使用SPDY 后，HTTP 协议额外获得以下功能：

1. 多路复用流
   通过单一的TCP 连接，可以无限制处理多个HTTP 请求。所有请求的处理都在一条TCP 连接上完成，因此TCP 的处理效率得到提高
2. 赋予请求优先级
   SPDY 不仅可以无限制地并发处理请求，还可以给请求逐个分配优先级顺序。主要是为了在发送多个请求时，解决因带宽低而导致响应变慢的问题
3. 压缩HTTP 首部
   压缩HTTP 请求和响应的首部，减少通信产生的数据包数量和发送的字节数
4. 推送功能
   支持服务器主动向客户端推送数据的功能。服务器可直接发送数据，而不必等待客户端的请求
5. 服务器提示功能
   服务器可以主动提示客户端请求所需的资源。由于在客户端发现资源之前就可以获知资源的存在，因此在资源已缓存等情况下，可以避免发送不必要的请求

### 9.2 WebSocket

利用Ajax 和Comet 技术进行通信可以提升Web 的浏览速度。但通信若使用HTTP 协议，就无法彻底解决瓶颈问题。WebSocket网络技术正是为解决这些问题而实现的一套新协议及API

WebSocket即Web 浏览器与Web 服务器之间的全双工通信标准。

* 一旦Web 服务器与客户端之间建立起WebSocket 协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送JSON、XML、HTML 或图片等任意格式的数据
* 由于是建立在HTTP 基础上的协议，因此连接的发起方仍是客户端，而一旦确立WebSocket 通信连接，不论服务器还是客户端，任意一方都可直接向对方发送报文

WebSocket 协议的主要特点：

1. 推送功能
   支持由服务器向客户端推送数据的推送功能。这样，服务器可直接发送数据，而不必等待客户端的请求
2. 减少通信量
   只要建立起WebSocket 连接，就希望一直保持连接状态。和HTTP相比，每次连接时的总开销减少，而且由于WebSocket 的首部信息很小，通信量也相应减少了

WebSocket 通信实现：

* 在HTTP 连接建立之后，需要完成一次“握手”（Handshaking）

![](https://cdn.jsdelivr.net/gh/lnitia/MyPictures@main/blogpictures/20240126192639.png)

JavaScript 可调用“The WebSocket API”内提供的WebSocket 程序接口，以实现WebSocket 协议下全双工通信

### 9.3 HTTP/2.0

HTTP/2.0 在2014 年11 月实现标准化，目标是改善用户在使用Web 时的速度体验

改进内容：

1. 压缩
2. 多路复用
3. TSL义务化
4. 协商
5. 客户端拉曳（Client Pull）/服务器推送（Server Push）
6. 流量控制
7. WebSocket

### 9.4 WebDAV

WebDAV（Web-based Distributed Authoring and Versioning，基于万维网的分布式创作和版本控制）是一个可对Web 服务器上的内容直接进行文件复制、编辑等操作的分布式文件系统

除了创建、删除文件等基本功能，它还具备文件创建者管理、文件编辑过程中禁止其他用户内容覆盖的加锁功能，以及对文件内容修改的版本控制功能

## 10 Web攻击技术

在客户端即可篡改请求：在HTTP 请求报文内加载攻击代码，就能发起对Web 应用的攻击。通过URL 查询字段或表单、HTTP 首部、Cookie 等途径把攻击代码传入，若这时Web 应用存在安全漏洞，那内部信息就会遭到窃取，或被攻击者拿到管理权限

对Web 应用的攻击模式有两种：

1. 主动攻击

   攻击者通过直接访问Web 应用，把攻击代码传入。是直接针对服务器上的资源进行攻击。其中具有代表性的是SQL 注入攻击和OS 命令注入攻击
2. 被动攻击

   利用圈套策略执行攻击代码，即攻击者不直接对目标Web 应用访问发起攻击，而是诱使用户触发已设置好的陷阱，而陷阱会启动发送已嵌入攻击代码的HTTP 请求。具有代表性的攻击是跨站脚本攻击和跨站点请求伪造

### 10.1 因输出值转义不完全引发的安全漏洞

实施Web 应用的安全对策可大致分为以下两部分：

1. 客户端的验证
2. Web应用端（服务器端）的验证，包括 输入值验证 和 输出值转义

#### 跨站脚本攻击XSS

跨站脚本攻击（Cross-Site Scripting，XSS）是指通过存在安全漏洞的Web 网站注册用户的浏览器内运行非法的HTML 标签或JavaScript进行的一种攻击，属于被动攻击

跨站脚本攻击有可能造成以下影响：

1. 利用虚假输入表单骗取用户个人信息
2. 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求
3. 显示伪造的文章或图片

#### SQL注入攻击

SQL 注入（SQL Injection）是指针对Web 应用使用的数据库，通过运行非法的SQL 而产生的攻击

SQL 注入攻击有可能会造成以下影响：

1. 非法查看或篡改数据库内的数据：将SQL 语句改变成开发者意想不到的形式以达到破坏结构的攻击
2. 规避认证
3. 执行和数据库服务器业务关联的程序等

#### OS 命令注入攻击

OS 命令注入攻击（OS Command Injection）是指通过Web 应用，执行非法的操作系统命令达到攻击的目的

可以从Web 应用中通过Shell 来调用操作系统命令，让Windows 或Linux 操作系统的命令行启动程序。也就是说，通过OS 注入攻击可执行OS 上安装着的各种程序

#### HTTP 首部注入攻击

HTTP 首部注入攻击（HTTP Header Injection）是指攻击者通过在响应首部字段内插入换行，添加任意响应首部或主体的一种攻击。属于被动攻击

HTTP响应截断攻击（HTTP Response Splitting Attack）：将两个 `%0D%0A%0D%0A` 并排插入字符串后发送，利用这两个连续的换行就可作出HTTP 首部与主体分隔所需的空行，这样就能显示伪造的主体，达到攻击目的

HTTP 首部注入攻击有可能会造成以下一些影响：

1. 设置任何Cookie信息
2. 重定向至任意URL
3. 显示任意的主体（HTTP响应截断攻击）

#### 邮件首部注入攻击

邮件首部注入（Mail Header Injection）是指攻击者通过向邮件首部To 或Subject 内任意添加非法内容发起的攻击。利用存在安全漏洞的Web 网站，可对任意邮件地址发送广告邮件或病毒邮件

#### 目录遍历攻击

目录遍历（Directory Traversal）攻击是指对本无意公开的文件目录，通过非法截断其目录路径后，达成访问目的的一种攻击

#### 远程文件包含漏洞

远程文件包含漏洞（Remote File Inclusion）是指当部分脚本内容需要从其他文件读入时，攻击者利用指定外部服务器的URL 充当依赖文件，让脚本读取之后，就可运行任意脚本的一种攻击

### 10.2 因设置或设计上的缺陷引发的安全漏洞

#### 强制浏览

强制浏览（Forced Browsing）安全漏洞是指，从安置在Web 服务器的公开目录下的文件中，浏览那些原本非自愿公开的文件

强制浏览有可能会造成以下影响：

1. 泄露顾客的个人信息等重要情报
2. 泄露原本需要具有访问权限的用户才可查阅的信息内容
3. 泄露未外连到外界的文件

#### 不正确的错误消息处理

不正确的错误消息处理（Error Handling Vulnerability）的安全漏洞是指，Web 应用的错误信息内包含对攻击者有用的信息

与Web 应用有关的主要错误信息如下：

1. Web应用抛出的错误消息
2. 数据库等系统抛出的错误消息

Web 应用不必在用户的浏览画面上展现详细的错误消息。对攻击者来说，详细的错误消息有可能给他们下一次攻击以提示

#### 开放重定向

开放重定向（Open Redirect）是一种对指定的任意URL 作重定向跳转的功能。假如指定的重定向URL 到某个具有恶意的Web 网站，那么用户就会被诱导至那个Web网站

### 10.3 因会话管理疏忽引发的安全漏洞

#### 会话劫持

会话劫持（Session Hijack）是指攻击者通过某种手段拿到了用户的会话ID，并非法使用此会话ID 伪装成用户，达到攻击的目的

> 具备认证功能的Web 应用，使用会话ID 的会话管理机制，作为管理认证状态的主流方式。会话ID 中记录客户端的Cookie 等信息，服务器端将会话ID 与认证状态进行一对一匹配管理

攻击者可获得会话ID 的途径：

1. 通过非正规的生成方法推测会话ID
2. 通过窃听或XSS攻击盗取会话ID
3. 通过会话固定攻击（Session Fixation）强行获取会话ID

#### 会话固定攻击

对以窃取目标会话ID 为主动攻击手段的会话劫持而言，会话固定攻击（Session Fixation）会强制用户使用攻击者指定的会话ID，属于被动攻击

#### 跨站点请求伪造CSFR

跨站点请求伪造（Cross-Site Request Forgeries，CSRF）攻击是指攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信息或设定信息等某些状态更新，属于被动攻击

跨站点请求伪造有可能会造成以下影响：

1. 利用已通过认证的用户权限更新设定信息等
2. 利用已通过认证的用户权限购买商品
3. 利用已通过认证的用户权限在留言板上发表言论

### 10.4 其他安全漏洞

#### 密码破解

密码破解攻击（Password Cracking）即算出密码，突破认证。攻击不仅限于Web 应用，还包括其他的系统（如FTP 或SSH 等）

密码破解有以下两种手段：

1. 通过网络的密码试错：穷举法、字典攻击
2. 对已加密密码的破解（指攻击者入侵系统，已获得加密或散列处理的密码数据的情况）：通过穷举法·字典攻击进行类推、彩虹表、拿到密钥、加密算法的漏洞

除去突破认证的攻击手段，还有SQL 注入攻击逃避认证，跨站脚本攻击窃取密码信息等方法

#### 点击劫持

点击劫持（Clickjacking）是指利用透明的按钮或链接做成陷阱，覆盖在Web 页面之上。然后诱使用户在不知情的情况下，点击那个链接访问内容的一种攻击手段。这种行为又称为界面伪装（UI Redressing）

#### DoS 攻击

DoS 攻击（Denial of Service attack）是一种让运行中的服务呈停止状态的攻击。有时也叫做服务停止攻击或拒绝服务攻击。DoS 攻击的对象不仅限于Web 网站，还包括网络设备及服务器等

主要有以下两种DoS 攻击方式：

1. 集中利用访问请求造成资源过载，资源用尽的同时，服务也就呈停止状态
2. 通过攻击安全漏洞使服务停止

集中利用访问请求的DoS 攻击，单纯来讲就是发送大量的合法请求。服务器很难分辨何为正常请求，何为攻击请求，因此很难防止DoS 攻击

多台计算机发起的DoS 攻击称为DDoS 攻击（Distributed Denial of Service attack，分散式阻断服务攻击）。DDoS 攻击通常利用那些感染病毒的计算机作为攻击者的攻击跳板

#### 后门程序

后门程序（Backdoor）是指开发设置的隐藏入口，可不按正常步骤使用受限功能。利用后门程序就能够使用原本受限制的功能。

通常的后门程序分为以下3 种类型：

1. 开发阶段作为Debug调用的后门程序
2. 开发者为了自身利益植入的后门程序
3. 攻击者通过某种方法设置的后门程序

可通过监视进程和通信的状态发现被植入的后门程序。但设定在Web 应用中的后门程序，由于和正常使用时区别不大，通常很难发现
