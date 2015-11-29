---
layout: post
title: Maven私服（Nexus）搭建
tags: [maven, nexus, repository]
categories: [maven, nexus]
---


#1、Nexus简介
Nexus是当前非常流行的一种Maven私服。Maven私服是架设在局域网的一种特殊的远程仓库，目的是代理远程仓库及部署第三方构件。

有了Nexus之后，当Maven需要下载构件时，直接请求私服。如果私服上存在，则下载到本地仓库；否则，私服将先请求外部的远程仓库，将构件下载到私服，再提供给本地仓库下载。

除了代理功能外，Nexus的优点还有：

>* 强大的仓库管理
>* 构件搜索
>* 基于REST
>* 有好的UI（使用extjs）
>* 基于简单文件系统而非数据库

#2、下载和安装Nexus

#### 1）下载
Nexus提供了两种安装包：

>* 包含Jetty容器的bundle包
>* 不包含容器的war包

下载地址：[http://www.sonatype.org/nexus/archived/](http://www.sonatype.org/nexus/archived/)

这篇文章主要介绍使用bundle方式的安装Nexus，并不提供war包的安装方式。

#### 2）安装
解压安装包`nexus-2.8.1-01-bundle.zip`，将bin文件夹的绝对路径添加到环境变量path中，打开Windows的控制台（以管理员身份运行）；
执行`nexus install`将Nexus安装成Windows服务；

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/launch_nexus_by_command.jpg" width="55%"></image>
</div>

执行`nexus start`即可启动Nexus。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/nexus_service_launched.jpg" width="55%"></image>
</div>

打开浏览器，输入[http://localhost:8081/nexus/](http://localhost:8081/nexus/)，即可访问Nexus的控制首页。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/nexus_home_unlogin.jpg" width="55%"></image>
</div>


#3、查看Nexus预置的仓库
点击右上角`Log In`，输入用户名：`admin`，密码：`admin23`，可使用更多功能。
点击左侧的`Repositorys`，查看Nexus的内置仓库。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/nexus_home_login.jpg" width="55%"></image>
</div>

Nexus的仓库主要分类如下：

> * hosted宿主仓库：用于部署三种构件：无法从公共仓库获取的构件、第三方的项目构件、自己的项目构件
> * proxy代理仓库：代理公共的远程仓库
> * virtual虚拟仓库：用于适配Maven 1
> * group仓库组：Nexus通过仓库组统一管理多个仓库，这样只需要请求一个仓库组就可以请求该仓库组管理的多个仓库。


#4、添加代理仓库

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/add_proxy_repo.jpg" width="55%"></image>
</div>


#5、搜索构件

#### 1）设置允许下载远程仓库索引

点击选中一个代理仓库，然后点击`Configuration`，将`Download Remote Indexes`选项设置为`True`。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/download_remote_repo_index.jpg" width="55%"></image>
</div>

#### 2）下载索引，并检查是否下载成功

点击查看`Browse Index`Tab页。如果加载出来索引，则表示远程仓库的索引下载成功，否则表示下载失败。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/check_nexus_index_success.jpg" width="55%"></image>
</div>

#### 3）搜索构件

搜索构件的方式主要有两种：
一种是名称`模糊搜索`，即根据关键词模糊匹配；
另一种是`GAV搜索`，即已知构件的`GroupId+ArtifactId+Version`对构件进行精确搜索。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/search_component.jpg" width="55%"></image>
</div>


#6、配置maven使用nexus
只需要修改1个文件：`settings.xml`

    <mirrors>    
	    <mirror>       
		    <id>nexus</id>        
		    <url>http://127.0.0.1:8081/nexus/content/groups/public/</url>       
		    <mirrorOf>*</mirrorOf>       
	    </mirror>    
    </mirrors>    


#7、部署构件到nexus私服仓库中
需要修改2个文件：`pom.xml`和`settings.xml`

#### 1）pom.xml

    <distributionManagement> 
	    <repository> 
		    <id>my-nexus-releases</id>  
		    <url>http://127.0.0.1:8081/nexus/content/repositories/releases/</url> 
	    </repository>  
	    <snapshotRepository> 
		    <id>my-nexus-snapshot</id>  
		    <url>http://127.0.0.1:8081/nexus/content/repositories/snapshots/</url> 
	    </snapshotRepository> 
    </distributionManagement>

#### 2）settings.xml

    <servers>    
	    <server>    
		    <id>my-nexus-releases</id>    
		    <username>admin</username>    
		    <password>admin123</password>    
	    </server>    
	    <server>    
		    <id>my-nexus-snapshot</id>    
		    <username>admin</username>    
		    <password>admin123</password>    
	    </server>    
    </servers>

执行`mvn deploy`后，打开仓库地址，可以看到刚刚部署的构件已经上传到Nexus的私服仓库中。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/deploy_component_to_nexus.jpg" width="55%"></image>
</div>
<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/nexus/deploy_component_to_nexus_2.jpg" width="55%"></image>
</div>


#参考资料
[http://aijezdm915.iteye.com/blog/1335025](http://aijezdm915.iteye.com/blog/1335025)  
[http://www.oschina.net/question/698806_159372](http://www.oschina.net/question/698806_159372)

<a href="{{ site.baseurl }}/index.html" class="btn-back">返 回</a>