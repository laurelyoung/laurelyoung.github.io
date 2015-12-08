---
layout: post
title: 使用jekyll撰写GitHub博客
tags: [github, blog]
categories: [github, blog]
---



## 1. 创建文章的文件

发表一篇新的文章，需要在`_posts`文件夹中创建一个新的文件，文件名需要遵循下面的格式：

	yyyy-MM-dd-how-to-writer-a-blog.md
	yyyy-MM-dd-how-to-writer-a-blog.html
	
## 2. 引用图片和其他资源

	在文章中引用一张图片
	图片标题]({{ post.url }}/assets/one.jpg)

	在文章插入一条链接
	[link](http://www.baidu.com)


## 3. 使用Liquid模板语言创建文章列表

代码如下：

``` html
<ul>
{% for post in site.posts %}
	<li>
		<a href="{{ post.url }}">{{ post.title }}</a>
	</li>
{% endfor %}
</ul>
```
