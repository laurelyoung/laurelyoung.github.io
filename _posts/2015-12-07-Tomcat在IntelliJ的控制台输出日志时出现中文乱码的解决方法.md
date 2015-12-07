---
layout: post
title: Tomcat 7在IntelliJ IDEA 14的控制台中输出日志时出现中文乱码的解决方法
tags: [Tomcat, IntelliJ IDEA, 中文乱码]
categories: [Tomcat, IntelliJ IDEA]
---



首先，点击`Edit Configurations`，打开`Run/Debug Configurations`对话框。

然后，按照下图中的提示依次进行操作：

<div style="text-align: center;margin-bottom: 20px;">
	<image src="{{ post.url }}/static/images/intellij/garbled_chinese.png" style="width:65% !important;"></image>
</div>

即：

>1、点击`Startup/Connection`Tab页  
>2、勾选`Pass environment variables`  
>3、添加一个环境变量，name为`JAVA_TOOL_OPTIONS`，value为`-Dfile.encoding=UTF-8`

最后，点击确定。  

重启Tomcat后，IntelliJ IDEA的控制台中就可以正常的输出中文日志了。


<a href="{{ site.baseurl }}/index.html" class="btn-back">返 回</a>





