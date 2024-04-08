---
icon: bianjiwenjian
date: 2023-09-28
category:
  - project
order: 2
excerpt: <p></p>
editLink: false
---
# Uni框架仿写网易云音乐小程序及H5app

### 1. 基本元素

view text image button scroll-view

### 2. 生命周期

#### 2.1 app.vue中

```javascript
onLaunch: function() {}, 
onShow: function() {},
onHide: function() {}
```

#### 2.2 page页面中

```vue
onLoad() {}
```

### 3. 自定义导航栏

#### 3.1 pages.json中配置

```json
"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationStyle": "custom"  //自定义导航栏，建导航栏组件
			}
		}
	    ,{
            "path" : "pages/list/list",
            "style" :                                                                              
            {
                "navigationBarTitleText": "",
                "enablePullDownRefresh": false
            }
      
        }
    ],
```

### 4. 路由跳转

#### 4.1 musichead组件中

```javascript
methods:{
			handleToBack(){
				uni.navigateBack()  //返回上一页
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index' //跳转至指定页
				})
			}
		}
```

#### 4.2 路由跳转传参与接受

传参：

```javascript
methods: {
			handleToList(listId){
				uni.navigateTo({
					url:'/pages/list/list?listId='+listId
				})
			}
		}
```

接受：

```vue
onLoad(option) {
			console.log(option.listId)
		}
```

#### 4.3 路由的产生

根据pages文件夹里的内容自动产生路由，同时需要在pages.json中注册pages

### 5. 请求响应

#### 5.1 封装api.js

```javascript
import {baseUrl} from './config.js'

export function topList(){
	return new Promise(function(reslove, reject){
		uni.request({     //uni提供的专门请求api
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			data:{},
			success: (res) => {
				let result = res.data.list;
				result.length = 4;
				reslove(result)
			},
			fail: () => {
			},
			complete: () => {
	
			}
		})
	})
}
```

#### 5.2 使用

```javascript
onLoad() {
			topList().then((res)=>{
				if(res.length){
					console.log(res)
					this.topList = res;
				}
			})
		},
```

### 6. 点击事件

```javascript
<view class="index-item" v-for="(item, index) in topList" :key="index" @tap="handleToList(item.id)"></view>
```

### 7. 组件传参

#### 7.1 首页使用自定义组件

```javascript
<musichead title="网易云音乐" :icon="false"></musichead>
```

#### 7.2 musichead组件获取参数

```javascript
<template>
	<view class="music-head" :style="{color:color}">
		<view class="music-head-icon" v-if="icon" > //直接使用
			<text class="iconfont icon-xiangzuojiantou" @tap="handleToBack"></text> | <text class="iconfont icon-shouye" @tap="handleToHome"></text>
		</view>
		{{ title }} //直接使用
	</view>
</template>

<script>
	export default {
		name:"musichead",
		props:['title', 'icon', 'color'],  //获取参数
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>
```

### 8. 指定页面编译

pages.json中设置运行时的直接显示页面

```json
"condition": {
		"current": 0,
		"list": [
			{
				"name": "list",
				"path": "pages/list/list",
				"query": "listId=19723756"
			}
		]
	},
```

### 9. 条件编译

某些小程序才有的功能，如分享功能，h5没有，可进行条件编译

```javascript
	<!-- #ifdef MP-WEIXIN -->  //此地方以内的功能仅出现在微信小程序中，h5不会有
	<button class="list-share" open-type="share">  //open-type=>分享按键
	    <text class="iconfont icon-fenxiang"></text>
		分享给微信好友
	</button>
	<!-- #endif -->
```

### 10.多余文字的隐藏

通过css实现。

```javascript
<view class="list-music-song">
		<view>{{item.name}}</view>
		<view>
		<image v-if="privileges[index].flag > 60 && privileges[index] < 70" src="../../static/dujia.png" mode=""></image>
		<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image>
		{{item.ar[0].name}} - {{item.al.name}}
		</view>
		</view>
```

```css
.list-music-song view:nth-child(1){
	font-size: 28rpx;
	color: black;
	width: 70vw;  //设置显示宽度,将屏幕分为100份,一份为1vw
	white-space: nowrap; //设置如何处理元素中的空白,连续空白符会被合并,不换行
	overflow: hidden; //元素溢出时所需的行为,隐藏
	text-overflow: ellipsis; //如何提示用户存在隐藏的溢出内容。其形式可以是裁剪、显示一个省略号（“…”）或显示一个自定义字符串。
}
.list-music-song view:nth-child(2){
	font-size: 20rpx;
	align-items: center;
	width: 70vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
```

### 11.全局过滤器

```javascript
//过滤数字=>万、亿
Vue.filter('formatCount', function(value){ 
	if( value >= 10000 && value <= 100000000) {
		value/=1000
		return value.toFixed(1)+'万'
	}else if(value > 100000000){
		value/=100000000
		return value.toFixed(1)+'亿'
	}else{
		return value
	}
})
//过滤时间戳=>时间
Vue.filter('formatTime', function(value){
	var date = new Date(value)
	return date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日"
})
```

### 12.播放转动特效

```javascript
<view class="detail-play" @tap="changePlay">
	<image :src="songdetail.al.picUrl" mode="" :class="{'detail-play-run': isRolation}"></image>
	<text class="iconfont " :class="iconPlay"></text>
	<view class=""></view>
</view>
```

```javascript
data() {
	return {
		songdetail: {
			al: {
				picUrl: ""
			    }
		},
		isRolation: true,
	}
```

```css
.detail-play image {
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}

	.detail-play .detail-play-run {
		animation-play-state: running;
	}

	@keyframes move {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

```

### 13.歌词滚动

```javascript
<view class="detail-lyric">
	<view class="detail-lyric-wrap" :style="{transform:'translateY('+ -(lyricIndex-1)*82 +'rpx)'}">
	    <view class="detail-lyric-item" v-for="(item, index) in songLyric" :key="index"
							:class="{active : lyricIndex == index}">{{ item.lyric }}             </view>
	</view>
</view>
```

```javascript
data() {
			return {
				songLyric: [],
				lyricIndex: 0,
			}
		},
methods: {
			formatTimeToSec(time) {
				let arr = time.split(":")
				return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(1)
			},
            //开启定时器，监听当前播放的歌词对应的id
			listenLyricIndex() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					for (var i = 0; i < this.songLyric.length; i++) {
                         //如果当前播放时间大于最后一句时间，this.lyricIndex = this.songLyric.length - 1;
						if (this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1].time) {
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
                        //如果当前播放时间在两句歌词（i，i+1）之间，this.lyricIndex = i
						if (this.bgAudioManager.currentTime > this.songLyric[i].time && this.bgAudioManager.currentTime < this.songLyric[i + 1].time) {
							this.lyricIndex = i
						}
					}
				}, 500)
			},
```

```css
	.detail-lyric {
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: #6f6e73;
	}

	.detail-lyric-wrap {} //y方向移动（lyricIndex-1）*每行行高

	.detail-lyric-item {
		height: 82rpx;
	}

	.detail-lyric-item.active {
		color: white;
	}
```

### 14.歌词数据的处理

```javascript
if (res[3][1].statusCode == '200') {
						var result = []
						var lyric = res[3][1].data.lrc.lyric
						lyric.replace(/\[([^\]]+)\]([^\[]+)/g, ($0, $1, $2) => {
							result.push({
								"time": this.formatTimeToSec($1),
								"lyric": $2
							})
						})
						this.songLyric = result
					}
```

```javascript
formatTimeToSec(time) {
				let arr = time.split(":")
				return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(1)
			},
```

### 15.音乐播放

微信-H5

```javascript
if (res[4][1].statusCode == '200') {
						this.songUrl = res[4][1].data.data[0].url

						// #ifdef MP-WEIXIN
						this.bgAudioManager = uni.getBackgroundAudioManager()
						this.bgAudioManager.title = this.songdetail.name
						// #endif

						// #ifdef H5
                        // 防止H5端同时播放多首音乐
						if (!this.bgAudioManager) {
							this.bgAudioManager = uni.createInnerAudioContext()
							console.log(this.bgAudioManager)
						}
						this.iconPlay = "icon-bofang"
						this.isRolation = false
						// #endif

						this.bgAudioManager.src = this.songUrl || ""
						this.listenLyricIndex()

                        //播放时回调
						this.bgAudioManager.onPlay(() => {
							this.iconPlay = "icon-zanting"
							this.isRolation = true
							this.listenLyricIndex()
						});
                        //停止时回调
						this.bgAudioManager.onPause(() => {
							this.iconPlay = "icon-bofang"
							this.isRolation = false
							clearInterval(this.timer)
						});
                        //播放完，放下一首
						this.bgAudioManager.onEnded(() => {
							this.getMusic(this.$store.state.nextId)
						})
					}
```

```javascript
        // H5端退回上一页，取消播放
        onUnload() {
			clearInterval(this.timer)

			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		onHide() {
			clearInterval(this.timer)
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
```

pages.json:

```json
"requiredBackgroundModes": ["audio"], //允许微信后台播放
```

### 16.播放下一首

需要拿到播放列表中当前歌曲的下一首id，并保存在变量中，采用vuex

1. 创建store文件夹中的index.js

   ```javascript
   import Vue from 'vue'
   import Vuex from 'vuex'

   Vue.use(Vuex)  ////全局注册vuex

   export default new Vuex.Store({
   	state:{
   		topListIds: [],
   		nextId :''
   	},
   	mutations: {
   		init_toplistids(state, payload){  //初始化id列表
   			state.topListIds = payload;
   		},
   		next_id(state, payload){  //通过当前id找到下一首歌的id
   			for(var i = 0; i<state.topListIds.length; i++){
   				if(state.topListIds[i].id == payload){
   					state.nextId = state.topListIds[i+1].id
   				}
   			}
   		}
   	}
   })
   ```
2. 在main.js中全局应用store文件夹中的index.js

   ```javascript
   import store from 'store/index.js'

   const app = new Vue({
       ...App,
   	store
   })
   app.$mount()
   ```
3. 在list.vue界面中获取播放列表的请求中，将播放列表存入store中的toplistids中

   ```javascript
   list(option.listId).then((res)=>{

   				if(res[1].data.code == '200'){
   					this.playlist = res[1].data.playlist
   					this.privileges = res[1].data.privileges
   					this.$store.commit('init_toplistids', res[1].data.playlist.trackIds)  //将播放列表存入store中的toplistids中
   					this.isloading = !this.isloading
   					uni.hideLoading()
   				}
   			})
   ```
4. 在进入播放界面detail.vue的getMusic()中调用store中查找下一id的方法

   ```javascript
   getMusic(songId) {
   				this.$store.commit('next_id', songId)
   				//调用store中查找下一id的方法，并将返回的值存入store的nextid中
   				return Promise.all([getSongDetail(songId), getSimiSong(songId), getComment(songId, 0), getLyric(songId),getSongUrl(songId)]).then((res) => {
   					if (res[0][1].statusCode == '200') {
   						this.songdetail = res[0][1].data.songs[0]
   					}
   					if (res[1][1].statusCode == '200') {
   						this.simiSong = res[1][1].data.songs
   					}
   					if (res[2][1].statusCode == '200') {
   						this.comment = res[2][1].data.hotComments
   					}
   					if (res[3][1].statusCode == '200') {...}
   					if (res[4][1].statusCode == '200') {
   						this.songUrl = res[4][1].data.data[0].url
   						// #ifdef MP-WEIXIN
   						this.bgAudioManager = uni.getBackgroundAudioManager()
   						this.bgAudioManager.title = this.songdetail.name
   						// #endif
   						// #ifdef H5
   						if (!this.bgAudioManager) {
   							this.bgAudioManager = uni.createInnerAudioContext()
   							console.log(this.bgAudioManager)
   						}
   						this.iconPlay = "icon-bofang"
   						this.isRolation = false
   						// #endif
   						this.bgAudioManager.src = this.songUrl || ""
   						this.listenLyricIndex()
   						this.bgAudioManager.onPlay(() => {
   							this.iconPlay = "icon-zanting"
   							this.isRolation = true
   							this.listenLyricIndex()
   						});
   						this.bgAudioManager.onPause(() => {
   							this.iconPlay = "icon-bofang"
   							this.isRolation = false
   							clearInterval(this.timer)
   						});
   						this.bgAudioManager.onEnded(() => {
   							this.getMusic(this.$store.state.nextId)
   							//当前歌曲播放结束后，调用store中nextid变量，播放下一首
   						})
   					}
   					this.isloading=!this.isloading
   					uni.hideLoading()
   				})
   			}
   ```

### 17.一个页面有多个请求时

```javascript
// 采用Promise.all
getMusic(songId) {
				this.$store.commit('next_id', songId)
				return Promise.all([getSongDetail(songId), getSimiSong(songId), getComment(songId, 0), getLyric(songId),getSongUrl(songId)]).then((res) => {
					console.log(res)
					if (res[0][1].statusCode == '200') {
						this.songdetail = res[0][1].data.songs[0]
					}
					if (res[1][1].statusCode == '200') {
						this.simiSong = res[1][1].data.songs
					}
					if (res[2][1].statusCode == '200') {
						this.comment = res[2][1].data.hotComments
					}
					if (res[3][1].statusCode == '200') {
						。。。
					}
					if (res[4][1].statusCode == '200') {
						。。。
					}
					this.isloading=!this.isloading
					uni.hideLoading()
				})
```

### 18.搜索历史记录

```javascript
<scroll-view scroll-y="true" >
				<view class="search-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)" @input="handleToSuggest"></input>
    //@confirm => 回车触发； @input => 输入事件，内容改变触发
					<text class="iconfont icon-guanbi" @tap="handleToClose" v-show="searchWord"></text>
				</view>
				<block v-if="searchIndex == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont icon-lajitong" @tap="clear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item, index) in searchHistory" :key="index" @tap="handleToWord(item)">{{ item }}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">
							热搜榜
						</view>
						<view class="search-hot-item" v-for="(item, index) in searchHot" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{ index+1 }}</view>
							<view class="search-hot-word">
								{{ item.searchWord }}<image :src="item.iconUrl" mode="aspectFit"></image>
								<view>{{ item.content }}</view>
							</view>
							<text class="search-hot-count">{{ item.score }}</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchIndex == 2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item, index) in searchList" @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{ item.name }}</view>
								<view>{{ item.ar[0].name}} - {{ item.al.name }}</view>
							</view>
							<text class="iconfont icon-bofang"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchIndex == 3">
                    <view class="search-suggest">
						<view class="search-suggest-head">
							搜索"{{searchWord}}"
						</view>
						<view class="search-suggest-item" v-for="(item, index) in searchSuggest" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont icon-fangdajing"></text>
							{{ item.keyword }}
						</view>
					</view>
				</block>
```

```javascript
	data() {
			return {
				searchHot:[],
				searchWord:"",
				searchHistory:[],
				searchIndex: 1,
				searchList: [],
				searchSuggest:[]
			}
		},
		methods: {
		    //输入框输入的关键词并搜索
			handleToWord(word){
				this.searchWord = word
				this.handleToSearch(this.searchWord)
			},
			//搜索结果功能
			handleToSearch(word){
				if(!word){
					return
				}
				//放在历史记录最前面
				this.searchHistory.unshift(word)  
				//去重
				this.searchHistory = [...new Set(this.searchHistory)] 
				//限制历史记录个数
				if(this.searchHistory.length > 10 ){ 
					this.searchHistory.length = 10
				}
				//持久化储存
				uni.setStorage({ 
					key:'history',
					data:this.searchHistory
				})
				this.getSearchList(word)
			},
			//清空历史记录
			clear(){
				uni.removeStorage({  
					key:'history',
					success: () => {
						this.searchHistory = []
					}
				})
			},
			//获取搜索结果并显示页面
			getSearchList(word){ 
				getSearch(word).then(res => {
					if( res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs;
						this.searchIndex = 2 //显示搜索结果页面
					}
				})
			},
			handleToDetail(songId){
				uni.navigateTo({
					url:'/pages/detail/detail?songId='+songId
				})
			},
			//取消搜索
			handleToClose(){
				this.searchWord = ''
				this.searchIndex = 1
			},
			//监视输入框内容，获取相关搜索内容并显示，优化：节流防抖
			handleToSuggest(ev){
				let value = ev.detail.value //监视输入框的值
				console.log(value)
				if(!value){
					this.searchIndex = 1
					return
				}
				getSearchSuggest(value).then(res => {
					console.log(res)
					if(res[1].data.code == '200'){
						this.searchSuggest = res[1].data.result.allMatch
						this.searchIndex = 3
					}
				})
			}
		},
		onLoad() {
			getHotSearch().then( res => {
				 if(res[1].data.code == '200'){
					 this.searchHot = res[1].data.data
				 }
			})
			uni.getStorage({
				key:'history',
				success: (res) => {
					this.searchHistory = res.data
				}
			})
		}
```

### 19.CSS Tips

```css
        list-head-text view:nth-child(2){}/* 获取第二个view子元素*/

        display: flex;/*弹性布局*/
        justify-content: center;     /* 居中排列 */
        justify-content: space-between;  /* 均匀排列每个元素，首元素放置于起点，末元素放置于终点 */
        justify-content: space-around;  /* 均匀排列每个元素，每个元素周围分配相同的空间 */
        justify-content: space-evenly;  /* 均匀排列每个元素，每个元素之间的间隔相等 */
        flex: 1; /*弹性项目如何增大或缩小以适应其弹性容器中可用的空间*/
		align-items: center; /*在 Flexbox 中，它控制十字轴上项目的对齐方式*/
		flex-wrap: wrap; /*指定 flex 元素单行显示还是多行显示。*/

		text-align: center; /*行内内容（例如文字）如何相对它的块父元素对齐。text-align 并不控制块元素自己的对齐，只控制它的行内内容的对齐。*/
		border-radius: 40rpx;
		overflow: hidden; /*元素溢出时所需的行为*/
		position: relative; /*父组件*/
		position: absolute; /*子组件，相对于父组件布局*/
		line-height: 74rpx; /*设置多行元素的空间量，如多行文本的间距*/
		white-space: nowrap; /* 设置如何处理元素中的空白,连续空白符会被合并,不换行 */
        overflow: hidden;  /* 元素溢出时所需的行为,隐藏 */
        text-overflow: ellipsis; /* 如何提示用户存在隐藏的溢出内容。其形式可以是裁剪、显示一个省略号（“…”）或显示一个自定义字符串。 */
        background: url(~@/static/needle.png); /*背景图片*/
```
