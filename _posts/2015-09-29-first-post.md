---
layout: post
title: 第一篇文章
tags: [demo]
categories: [jekyll, blog]
---

<p>This is my first post.</p>

#jekyll启动方法

> $ jekyll serve <br>
> 一个开发服务器将会运行在 http://localhost:4000/

> $ jekyll serve --detach <br>
> 功能和`jekyll serve`命令相同，但是会脱离终端在后台运行。

> 如果你想关闭服务器，可以使用`kill -9 1234`命令，"1234" 是进程号（PID）。

> 如果你找不到进程号，那么就用`ps aux | grep jekyll`命令来查看，然后关闭服务器。[更多](http://unixhelp.ed.ac.uk/>shell/jobz5.html).

> $ jekyll serve --watch <br>
> 和`jekyll serve`相同，但是会查看变更并且自动再生成。


<p>Click the link below to go back to index.</p>

<a href="{{ site.baseurl }}/index.html">Go back</a>