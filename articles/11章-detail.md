## 11-1 图书详情页简介
## 11-2 DetailBook 组件开发


clip? 

```css
.book-author {
    margin-top: 10px;
    font-size: 16px;
    line-height: 18px;
    max-height: 36px;
    overflow: hidden;
    color: #333;
    text-overflow: clip;
  }
```


## 11-3 图书详情 API 对接

参数使用 对象 方式传入，可以学习

```javascript
bookContents({ fileName }).then(response => {
	this.contents = response.data.data
})


fly.get(url, params).then(response => {
	console.log(response)
	if (response && response.data && response.data.error_code === 0) {
	  resolve(response)
	} else {
	  if (showError) {
	    const msg = (response && response.data && response.data.msg) || '请求失败'
	    mpvue.showToast({
	      title: msg,
	      duration: 2000
	    })
	  }
	  reject(response)
	}
})
```

## 11-4 DetailStat 组件开发

```<van-rate> ``` 组件的使用

左右 50% 布局，为何这样写？

```css
.detail-stat {
    display: flex;
    padding: 10px 15px;

    .detail-stat-l {
      flex: 0 0 50%;
      width: 50%;
	}
	
	.detail-stat-r {
      flex: 0 0 50%;
      width: 50%;
	}
}
```

flex 布局不是1：1

是剩余部分，1:1 瓜分

想要的效果：
开始时候平分秋色
屏幕变宽后，也还是 一人一半。


如果只定义 flex: 0 0 50%; 也不行		
6p, 试了试，左边 191， 右边 209	
6, 172.5 和 198





## 11-5 图书评分组件开发和评分 API 对接
## 11-6 图书目录组件开发和目录 API 对接

根据等级，自动设置 marginLeft

```css
<div
class="detail-contents-label"
:style="{marginLeft: (15 * item.level) + 'px'}"
>
```

一定要注意，使用之前的代码是不可以的！

这样 DetailContents 组件根本不会显示！！！

要么使用 computed， 要么使用 watch

因为 contents 的长度，会从 0  变为 14

父组件在 mounted 中，才能拿到 contents 长度

此时子组件，已经 mounted 完毕。



```JavaScript
<div class="detail-contents-wrapper" v-if="contents">

export default {
    props: {
      contents: Array
    },
    methods: {
      readBook(nav) {
        this.$emit('readBook', nav)
      }
    },
    computed: {
      isShow: function () {
        console.log('isShow', this.contents && this.contents.length)
        return this.contents && this.contents.length
      }
    }
  }
```

      
## 11-7 书架状态 API + 加入书架 API 对接

如何 1：1

不确定宽度的元素：	
子元素宽度都为100%

```css
.detail-bottom {
    display: flex;
    .detail-btn-wrapper {
      flex: 1;
      
      .detail-btn-shelf {
	      width: 100%;
	    }
	
	    .detail-btn-remove {
	      width: 100%;
	    }
    }
  }
```

## 11-8 移出书架 API 对接
## 11-9 本章总结
