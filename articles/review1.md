# 小慕读书



## 1.项目简介

一款在线浏览图片 小程序

+ 


## 2. 主要工作和疑难点汇总

### 2.1 主要工作

1. 封装error 处理
2. mpvueRouterPatch
3. 骨架屏




### 2.3 疑难点汇总

小程序中如何做骨架图？
小程序如何处理异常？
vue如何处理异常？
图片组件如何实现懒加载预加载？
为什么要用fly? 
      		

##3. 业务逻辑梳理
### 3.1 项目哪几个page组成？有几个组件？  
	
| 7个page  | 5大组件夹 |
|  ----  | ----  |
| categoryList  | |
| detail |  |
| index | 首页 |
| list |  |
| read  |  |
| search |  |
| shelf |   |
| 组件： |  —————————— |
| base |  |
| detail |  DetailBook	DetailStat	DetailRate DetailContents DetailBottom	 |
| home |  |
| search | |
| shelf | |
	

##4. 业务逻辑梳理
### 4.1 首页 

#### 4.1.1 searchBar 组件
	
1. 为啥要初始默认 disabled	？  
2. 接受的参数， hotSearch 是什么东西   
3. 如何使用 <van-icon> 组件？

4. e.mp.vaule 是什么东西?


```javascript
onChange(e) {
	const { value } = e.mp.detail
	this.$emit('onChange', value)
},
```

#### 4.1.2 homeCard 组件

1. imageView 是什么东西？

	```javascript
	<ImageView
	    :src="avatar"
	    round
	    height="100%"
	    mode="scaleToFill"
	  />
	```
2. van-dialog 是什么东西？r如何引入第三方组件库？

	<van-dialog id="van-dialog"></van-dialog>

3. 自适应怎么做的？

	在 dpr = 2 的情况下，写72px， 就展示 72 宽度
4. 换行怎么搞?

	.shelf {
	    width: 11px;
	    font-size: 11px;
	    word-break: break-word;
	    color: #fff;
	    opacity: .8;
	  }


5. imageView 图片组件
	
	如何做预加载？
	当状态是 loading 或者 error 的时候，显示备用图片
	
	如何改变图片状态？
	给图片绑定 onLoad 或者 onError 事件
		
		Image 对象的事件句柄

		onabort	当用户放弃图像的装载时调用的事件句柄。
		onerror	在装载图像的过程中发生错误时调用的事件句柄。
		onload		当图像装载完毕时调用的事件句柄。
		
	lazy-load 和 mode 有什么作用？
	

#### 4.1.3 HomeBook 组件

1. 如何自定义，高宽，显示？
2. 一行，2个图片如何显示
	一行，3个图片如何显示
	一行，4个图片如何显示
3. 点击换一批，如何实现？

#### 4.1.4 首页做了什么

getSetting('userInfor',()=> {})

结构赋值，在获取数据的时候用的比较多

为什么获取 openId 后要 register


getUserInfo 是一个 promise 对象？？  
为什么可以接受两个函数为参数？



### 4.2 用户授权

Auth

### 4.3 搜索开发 search

TagGroup

searchList


1. 在 vue 中可以使用小程序的方法？

	onReachBottom?
	onPageScroll
	
	我要再看看小程序的 api
	
	
2. $refs 获取 数据？

	this.$refs.searchBar.getValue()

	this.$refs.searchBar.setValue(keyword)
	
3. 流程？
	
	在 mounted 中 获取 hotSearch
	
	从路由中，拿到热搜关键词？？ hotSearchKeyword
	
	从缓存中拿到，历史搜索记录
	
4. 触发搜索的条件？

	清空搜索, onClear
	
	实时改变，onChange
	
	点击确定，onConfirm
	
	点击历史tag
	
	
5. 随机函数
	
	换一批算法？
	

### 4.4 图书详情  detail

	DetailBook	
	DetailStat	
	DetailRate	
		vant-rate 
		
	DetailContents	
	DetailBottom		
		vant-button

### 4.5 书架  shelf

ShelfUserInfo
ShelfList

1. 流程
	
	onShow 
	
	获取，阅读天数，阅读几本书，


### 4.6 图书列表  categoryList
hoomBook 组件

### 4.7 分类列表 list
SearchTable

### 4.8 阅读器 read

Web-view ?












### 4.9 异常捕获




## 5. api 梳理








