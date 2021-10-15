# 课程同步源码

## 源码说明

同学们好，本源码是与课程视频内容同步的源码，课程配套的官网请访问：[http://www.youbaobao.xyz/mpvue-docs/guide/dev/home.html](http://www.youbaobao.xyz/mpvue-docs/guide/dev/home.html)

## 使用方法

我们可以通过`git tag`快速定位到课程章节对应的源码，具体方法如下：

```bash
$ git tag -n
v0.0.1          8-3
v0.0.2          8-5
v0.0.3          8-7
v0.0.4          8-8
v0.0.5          8-11
```

如我们希望快速切换到8-3节对应的视频，只需要找到该小节对应的版本号，那么通过以下指令创建新分支进行二次开发和学习：
```bash
$ git checkout -b v0.0.1 v0.0.1
Switched to a new branch 'v0.0.1'
```
