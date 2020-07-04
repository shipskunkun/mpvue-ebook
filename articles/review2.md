## review2

1. 记得的疑难点

		Global，错误处理	
		骨架屏
		图片预加载
		
		hoomBook 组件，一行放2个卡片，一行放4个卡片，一行放3个卡片，这种怎么做
		 :row="1"
        :col="3"
        mode="col"
        
        验证可以抽出来做 behavior
        登陆可以抽出来为一个页面组件，Auth

2. utils
	
	封装get
		
		基于fly, 类似于基于http 的请求
		返回的是 promise 对象
		
		
	定义const对象集
	

3. base.scss

	
		@mixin ellipse {
		  overflow: hidden;
		  white-space: nowrap;
		  text-overflow: ellipsis;
		}
		
		@mixin center {
		  display: flex;
		  justify-content: center;
		  align-items: center;
		}
4. 错误处理

	  
	 全局 store 存储，通过vuex 改变 state.error
	  	
		
	Global 是一个容器组件，它最主要的有以下两点：

		获取 vuex 中的 error 状态，如果 error 状态不为 null，则显示 error 中的信息
		如果 error 状态为 null，则显示 slot 插槽，这部分就是我们自己的组件内容了

	优化现有组件
	
		将现有组件外层套上 Global 组件即可，这里以 list 组件为例：
	
		<template>
		  <Global>
		    <div class="list">
		      <SearchTable :data="data"/>
		    </div>
		  </Global>
		</template>
		
	错误分为 vue 级别错误，应用级捕获错误	
	
	vue 级别，请求错误之类的
		
		rank({ openId, fileName, rank: this.rateValue })
          .then(response => {
            if (handleError(response)) {
              showToast(response.data.msg, true)
              this.init()
            }
          })
		
	全局异常捕获，main.js
		
		mpvue.onError((err) => onError(err, app))	
	都是向 store  发通知
		
5. [微信小程序异常处理](http://www.youbaobao.xyz/mpvue-docs/guide/dev/error.html)

	1. 微信小程序处理异常主要有两种方法：
	
		通过 app.js 中添加 onError 捕获异常；
		通过 wx.onError API 捕获异常。
	
	2. mpvue 处理异常的方法主要是自定义 errorHandler 方法实现，mpvue 中仍然能够使用微信小程序的两种异常捕获方法；
	3. 如果异常发生的位置在小程序构造器以外，可以采用 try catch 的方式手动捕获异常，这种方法对 mpvue 同样适用。

## 页面

1. index

		 把用户信息本地存储起来
		 setStorageSync('userInfo', userInfo)
		 
		 把用户的 openId 存储起来
		 getStorageSync('openId')	
		
2. search

3. list 页面

		调用的 setNavigationBarTitle 干嘛的？
4. read
	
		<web-view :src="url"></web-view>		
		
## 组件

1. searchBar 


		后面有 van-icon 从哪里冒出来的？
	
2. homeCard
	
		使用了 有赞的 dialog
		import Dialog from 'vant-weapp/dist/dialog/dialog'
		
3. imageView

		如何占位？
		当正在 加载状态 或者 错误状态显示， v-show="isLoading || error"
		监听 src 参数
		监听 onload， onError 事件，改变 loading  和 error 状态
		
4. homeBook

	摆放逻辑？
	
		如何横着摆放，竖着摆放
		几行，几列
		每行摆几个
		
		
		
		
	接受参数：
		
		col
		row
		mode: row (默认)
		
		
	col 的作用：通过flex 设置这一行几列 
	
		:style="{ flex: '0 0 ' + (100/col) + '%'}"
		
	mode 作用：通过flex-direction
	
		:style="{ flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row' }"
	
	mode 三种值
		
		category， row， col
		
	compute bookData
	
		1. 首先会截取 row * col 个需要的数据
		const _bookData = data.slice(0, row * col)
		
		2. 传过来是一个 length = 6 的数组，bookData
		变化成 3 *2， 也就是 [[1,2],[3,4],[5,6]]
		
	
	点击，换一批的逻辑？
	
		没逻辑，重新发请求
		随机打乱，这部分逻辑应该是后端解决的
	