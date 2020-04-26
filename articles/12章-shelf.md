## 12-1 图书列表页面开发 + 列表 API 对接

```javascript
showList(text, key) {
    this.$router.push({
      path: '/pages/list/main',
      query: {
        text, key, title: text
      }
    })
  }
   
 const { key, text } = this.$route.query
  
```
 
     
## 12-2 图书列表标题动态切换+图书详情页跳转

设置头文字内容

```javascript
export function setNavigationBarTitle(title) {
  mpvue.setNavigationBarTitle({ title })
}

```

有些组件的点击事件不必传到 父组件中

比如，list 页面 有个 searchTable 组件

点击 searchTable 跳转到 detail 页面

这个行为不一样要向外传输，但是还向父组件保留 click 接口，如果有需要，父组件可以写


```javascript
onClick(book) {
    this.$router.push({
      path: '/pages/detail/main',
      query: {
        fileName: book.fileName
      }
    })
    this.$emit('onClick', book)
  }

```

## 12-3 图书列表触底自动刷新功能开发
## 12-4 分类列表页面开发 + 分类 API 对接

categoryList 页面

## 12-5 分类列表跳转图书列表功能开发

这里出现 了 12-2中，在子组件中跳转不合适的情况

首页，有HomeBook 组件，点击会跳转到二级页面

但是跳转到不同页面，

所以不能在 HomeBook 中，统一跳到 detail 页面

因为 分类模块，会跳转到 list 页面

小程序中页面，虽然返回，但是没有销毁	
所以，每次进入，要重置搜索条件	

```javascript
mounted() {
  this.page = 1
  this.getSearchList()
  
},
```



## 12-6 阅读器页面开发

主要通过 web-view 进行阅读


## 12-7 书架页面开发
## 12-8 书架用户面板组件开发

我始终没搞懂，flex: 0 0 33.33% 

为什么要和 width 搭配使用？

```css
.shelf-list-inner {
  display: flex;
  flex-flow: row wrap;

  .shelf-book {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: 20px 12.5px 0 12.5px;
    box-sizing: border-box;
  }
}

```

## 12-9 书架列表组件开发


为什么要添加个 {}
默认有个 + 的图片

```javascript
bookShelf({ openId }).then(response => {
    this.shelfList = response.data.data
    this.shelfList.push({})
 })
```  
      
## 12-10 mounted 和 onShow 的区别


mounted 只会调用一次







