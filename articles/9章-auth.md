[课程官网](http://www.youbaobao.xyz/mpvue-docs/guide/)
## 9-1 首页API对接

```javascript
const {
    data: {
      hotSearch: {
        keyword
      },
      shelf,
      banner,
      recommend,
      freeRead,
      hotBook,
      category,
      shelfCount
    }
  } = response.data
  this.hotSearch = keyword
  this.banner = banner
```
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。         
```
      
## 9-2 搜索和图书卡片组件数据对接
## 9-3 图书推荐组件数据对接
## 9-4 API请求异常捕获方法
## 9-5 图书推荐组件“换一批”功能实现

只是每次重新调用接口而已。。。


如何实现，图片重新请求，有占位符？

流程：  
 请求新图片，监听到图书组件数据变化  
 图片组件 src 变化，为什么要在 nextTick 中将图片加载设置为 true?	
	
	nextTick 不是 dom 上的数据更新后么？
	
  	我自己测试了一下，去掉 $nextTick是可以显示  占位图片
  	
  	有没有 nextTick 都可以，占位符图片都能显示出来

```javascript
watch: {
  src(newValue, preValue) {
    if (newValue && newValue.length > 0 && newValue !== preValue) {
      this.$nextTick(() => {
        this.isLoading = true
        this.error = false
      })
    }
  }
}
```

## 9-6 用户授权流程讲解

这个项目中，将 openId 缓存起来  
通过 wx.login 获取 code		
然后使用 后端的接口，拿到 open_id		
我之前的项目中是存到 app.globalData.open_id		

```javascript
wx.login({
    success: function (res1) {
      var code = res1.code;
      server.login(code).then((res)=>{
          app.globalData.open_id = res.data.Js_auth.openid;
        })
        ...
      }
   })
```
## 9-7 权限校验流程开发


我没看懂，getSetting 方法？接受三个参数？


之前相册小程序思路：  
思路：
代码收录在 demos 中
  
+ 如果没授权过，显示点击按钮
+ 点击后，授权同意后，跳转逻辑
+ 授权过，直接跳转逻辑



```html
<view  wx:if="{{isShow}}">
	<button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
	<view wx:else>请升级微信版本</view>
</view>
```

```javascript
Page({
  data: {
    isShow: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.getSetting();    
  },
  getSetting() {
    let that = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log('用户已经授权过')
          that.setData({
            isShow: false
          })
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              console.log('执行跳转页面')
            }
          })
        }
        else {
          console.log('用户未授权过')
          that.setData({
            isShow: true
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    this.getSetting();
  }
})
```


这里的有什么不同？


+ step1:
	
	获取 authSetting, 成功，执行成功回调，失败执行失败回调
+ step2
	
	获取 mpvue.getUserInfo，成功，执行成功回调，失败执行失败回调 

+ step3
	
	从缓存中拿到 openId，拿不到，重新发请求拿
	getUserOpenId， 先使用 mp.login 拿到 code, 然后向后端发送请求 拿到 open_id，并缓存起来
	用openId 和 userInfo 获取首页数据 getHomeData


## 9-8 用户权限组件开发
## 9-9 获取用户信息
## 9-10 获取用户 OpenID
## 9-11 用户注册

为啥要做 用户注册？
register(openId, userInfo)

...res 的方式，传对象

[参数]( https://www.youbaobao.xyz/mpvue-docs/api/)  
avatarUrl, nickname ...


```javascript
export function register(openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}
```

## 9-12 Loading 交互开发


可以支持，是否有 mask	
是否显示透明蒙层，防止触摸穿透

```javascript
export function showLoading(title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}
```


## 9-13 本章总结
