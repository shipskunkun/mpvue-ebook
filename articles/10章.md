##10-1 搜索页面简介

点击搜索，跳转到 search 页面	
这个 path 怎么填？好像没有专门的 router 页面	
需要写，page.json 中的配置信息

```javascript
this.$router.push({
  path: '/pages/search/main',
  query: {
    hotSearch: this.hotSearch
  }
})
```
        
        
##10-2 Search 页面创建+Tag 组件开发
##10-3 TagGroup 组件开发


flex-flow 属性	
justify-content 有哪些值

```css
.tag-group {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-flow: row wrap;
      padding: 4px 10px 0 10px;
  }
``` 
 
tagGroup 显示的条件：
	
搜索结果为空 && hotSearchArray.length > 0 


##10-4 搜索分类组件开发

SearchItem


##10-5 图书列表组件开发

SearchTable

##10-6 综合搜索列表组件开发

SearchList	

category 是变量， 所以 :titile	
Category 是字符串，所以不用加 : 	

```html
<SearchItem
  icon="apps-o"
  :title="category"
  sub-title="Category"
  @onClick="showList(category, 'category')"
  v-if="category"
/>
```
    

##10-7 搜索模块组件集成

1. 默认搜索词，从 路由 query 中拿到
	
	```javascript
	this.$router.push({
      path: '/pages/search/main',
      query: {
        hotSearch: this.hotSearch
      }
    })
    
   mounted() {   
		this.hotSearchKeyword = this.$route.query.hotSearch
	}
	```
	
	
2. 小程序页面的生命周期，可以添加在mpvue 中
	
	onPageScroll	
		
		滑动，失去焦点
		
	onReachBottom， 可以是用 ...， 也可以使用 concat
	
		const { book } = response.data.data
		  if (book && book.length > 0) {
		    this.searchList.book.push(...book)
		  } else {
		    showToast('没有更多数据了')
		  }
3. 搜索框
	
	onChange， change 换成  input 可以么？	
		
		实际上这里的 onchange 就是 oninput
			
	onClear， 点击清楚，查询结果清空		
	onConfirm	，enter 键执行
		
		 1. 判断是否有搜索关键词
         	// 如果没有，则获取热门搜索词，通过热门搜索词发起请求
         	
        2. 如果有，就用搜索关键词发起请求
        3. 将搜索结果写入历史搜索
        4. 将搜索框失去焦点

4. 点击历史tag 
	
		搜索框内容 = tag值
		this.$refs.searchBar.setValue(text)
		调用 search 接口
		
5. 为什么可以通过 setValue 设置值？什么原理？
	
		说明：vm.$refs 一个对象，持有已注册过 ref 的所有子组件（或HTML元素）
		使用：在 HTML元素 中，添加ref属性，然后在JS中通过vm.$refs.属性来获取
		注意：如果获取的是一个子组件，那么通过ref就能获取到子组件中的data和methods

##10-8 搜索模块 API 对接
##10-9 热门搜索 API 对接
##10-10 搜索框按键搜索功能开发
##10-11 历史搜索和热搜更新功能开发
##10-12 触底自动刷新功能开发
##10-13 本章总结
