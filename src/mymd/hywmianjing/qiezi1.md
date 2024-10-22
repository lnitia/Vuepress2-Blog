---
icon: list
date: 2024-07-18
category:
  - 面经
order: 8
excerpt: <p>茄子科技一面</p>
editLink: false
article: false
---
# 茄子科技一面

## 1. 青岛项目的亮点

## 2. 前端新技术有哪些了解

webview，

## 3. express和nodejs相关知识

// 1. 导入验证表单数据的中间件

const expressJoi = require('@escook/express-joi')

## 4. 周报登录模块如何实现

1. 登录无账号=>注册
2. 登录成功=>token放入cookie/localstorage，持久化
3. 请求拦截时判断有无token，没有跳回登陆界面
4. 密码加密处理

## 5. 登录持久化如何实现

1. cookie
2. localstorage
3. 对密码进行加密
4. 请求拦截时获取登录信息，有就直接放入，登录持久化

## 6. token被别人拿到，如何解决

1. 对token进行加密

   加密后的token被其他人得到以后，需要使用密钥进行解密后才能使用
2. 验证token对应的ip地址

   每次请求可以将token和请求的对应的ip地址或设备id保存起来，放到数据库或者redis缓存中，如果后面请求token对应的ip地址或设备id不一样，则视为非法请求
3. 采用https

   HTTPS对请求进行加密和认证，减少其他用户抓取到token的可能性
4. token+时间戳+请求url合并加盐签名

   就算token被盗了，也只能在有限的时间内有效
