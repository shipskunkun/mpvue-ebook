## 8-1 首页搜索组件样式开发


1. 视频4：00, 在mpvue 中，写了 searchBar(搜索组件)， 并且 在首页文件中引入使用了，为什么在小程序控制台中，点击 wxml 查看， 并没有被替换成相应的 dom？

	原因：需要 npm run dev


2. 如何使用vant-icon 组件？

这是 vue 的, 还是小程序端的？


通过 初始化话命令 在src 目录下，生成的文件夹中，默认有 app.json

	结构如下：  
	如果想引入什么插件，直接在这个文件夹下写。
	
	```
	{
	  "pages": [
	    "pages/index/main",
	    ...
	  ],
	  "usingComponents": {
	    "van-button": "vant-weapp/dist/button/index",
	    ...
	  },
	  "window": {
	    "backgroundTextStyle": "light",
	    "navigationBarBackgroundColor": "#fff",
	    "navigationBarTitleText": "小慕读书",
	    "navigationBarTextStyle": "black"
	  }
	}
	```

## 8-2  search 组件开发


注意，vue input 原生方法和属性， 我几乎都忘了， input 事件，监听输入动作
focus 属性，是否聚焦，disabled 属性 (html)  
confirm 虚拟键盘，在手机上可以实现


哪些是小程序 input 提供的方法?		
focus， 获取焦点	
disabled， 是否禁用	
bindinput， 键盘输入时触发	
bindfocus， 输入框聚焦时触发		
bindconfirm，点击完成按钮时触发		

change 和 input 区别	
input事件：在输入框输入的时候回实时响应并触发	
change事件：change事件在input失去焦点才会考虑触发	


```html
<input
    :placeholder="hotSearch || ''"
    :disabled="disabled"
    :focus="focus"
    v-model="searchWord"
    @input="onChange"
    @confirm="onConfirm"
    confirm-type="search"  //小程序属性，设置键盘右下角按钮的文字 ，搜索 
>
```


自己的感想：如果没有需要用到很多组件的时候，最好直接使用小程序原生框架，Vue语法和小程序语法容易搞混，还有很多新的技术栈，没必要

 

## 8-3 search 优化

1. 进入首页，searchBar 的 focus 应该设置为 true
2. 小程序可以通过，placeholder-style，指定 placeholder 的样式
3. 我们为什么要将 disabled true, 我们希望点击跳转到新页面
4. 获取 onChange(e) 打印e

```html
<input
    class="search-bar-input"
    :focus="focus"
    :disabled="disabled"
    :maxlength="limit"
    :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
    v-model="searchWord"
    @input="onChange"
    confirm-type="search"
    @confirm="onConfirm"
    placeholder-style="color: #ADB4BE;font-size: 15px"
  />
```

```
// 打印 e, 出来 e, mp 属性中拿到 value
onChange(e) {
	const { value } = e.mp.detail
	this.$emit('onChange', value)
}
```

## 8-4 图片组件基础开发

目的：提供图片，预加载，懒加载。

预加载：提前找一张占位符图片



```html
<img
  :class="round ? 'round image' : 'image'"
  :style="{ height }"  // 是 { height: height} 的缩写
  :src="src"
  :mode="mode"  //默认widthFix, 宽度不变，高度自动变化，宽高比不变（宽度自适应

  :lazy-load="lazyLoad" //图片懒加载，在即将进入一定范围（上下三屏）时才开始加载
  @load="onLoad"
  @error="onError"
  v-show="!isLoading && !error"
/>
```

注意点：
	父元素宽度100%  
	自身宽度，100%    
	
## 8-6 图书卡片组件开发(上)
 	
 	为什么，写了 1px = 2rpx
 	
## 8-7 图书卡片组件开发(下)

css 换行

```css
.shelf {
    width: 11px;
    font-size: 11px;
    word-break: break-word;
    word-break: keep-all; //不会换行
    color: #fff;
    opacity: .8;
 }
 
 
 .book-wrapper {
	  flex: 1;
	  display: flex;
	  justify-content: space-around; //记住这个
	  .book-img-wrapper {
	    width: 72px;
	    height: 101px;
	  }
	}
```

## 8-8 Dialog 组件调用方法

```javascript
"usingComponents": {
    "van-dialog": "vant-weapp/dist/dialog/index"
  }


import Dialog from 'vant-weapp/dist/dialog/dialog'

Dialog.confirm({
  title: '反馈',
  message: '您是否确认提交反馈信息？',
  confirmButtonText: '是',
  cancelButtonText: '否'
}).then(() => {
  console.log('点击是之后的事件')
}).catch(() => {
  console.log('点击否之后的事件')
})
```


## 8-9 Banner组件开发

自定义 内联 style

```html
<div
  class="bg-img"
  :style="{backgroundImage: bgImage}"
>
```

## 8-10 推荐组件基础功能开发

这个组件有点东西	
可以自定义，

	title	标题栏	(空)
	data	图书列表	[]
	btnText	按钮文本	(空)
	row	行数	0
	col	列数	1
	mode	显示模式，row - 按行显示，col - 按列显示，category - 分类显示	row
	showTitle	是否显示标题	true
	showBtn	是否显示按钮	true
	linearBg	是否显示背景	false
	method	onMoreClick	点击更多按钮事件	-
	onBookClick	图书点击事件


> 学习到的：  
	
1. 对于项目中所有用到的常量，使用 const 文件集中管理   
然后引入和使用
		
	```javascript
	export const HOME_BOOK_MODE = {
	  ROW: 'row',
	  COL: 'col',
	  CATEGORY: 'category'
	}
		
	import { HOME_BOOK_MODE, CATEGORY } from '@/utils/const'
		
	mode: {
		type: String,
		default: HOME_BOOK_MODE.ROW
	}
	``` 

2. 解构赋值，所有项目中能用到解构赋值的，全用！

	```javascript
	let obj = { first: 'hello', last: 'world' };
	let { first: f, last: l } = obj;
	
	function example() {
	  return {
	    foo: 1,
	    bar: 2
	  };
	}
	let { foo, bar } = example();
	
	
	解构赋值对提取 JSON 对象中的数据，尤其有用。
	
	let jsonData = {
	  id: 42,
	  status: "OK",
	  data: [867, 5309]
	};
	
	let { id, status, data: number } = jsonData;
	```


	项目中的：	
	只要右边对象有的属性，全部赋值给左边
	
	```javascript
	const { data, row, col } = this
	```
 

## 8-11 推荐组件图书样式开发（上）
## 8-12 推荐组件图书样式开发（下）
## 8-13 推荐组件分类样式开发



## 8-14 实用的开发小技巧

如何关闭 sitemap 错误提示

project.config.json 文件中

```javascript
setting: {
	...
	checkSiteMap: false
}
```

## 8-15 课程源码使用方法介绍

 