---
layout: post
title: Maven私服（Nexus）搭建-离线安装索引
tags: [maven, nexus, index]
categories: [maven, nexus]
---



使用Nexus搜索开发需要的jar包是我们建立私服最基本的功能，此功能依赖于所有jar包的索引文件。但是如果通过在线的方式来获取索引，这将需要耗费很长的时间。为了节省时间，我们可以通过离线的方式来实现。


# 1、下载索引文件
访问[http://repo.maven.apache.org/maven2/.index/](http://repo.maven.apache.org/maven2/.index/)下载中心仓库最新版本的索引文件，将会看到一个很长的列表，我们只需要下载如下两个文件：

> nexus-maven-repository-index.gz  
> nexus-maven-repository-index.properties


# 2、解析索引文件

下载一个[indexer-cli-5.1.1.jar](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.apache.maven.indexer%22%20AND%20a%3A%22indexer-cli%22)

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/nexus/index_installed.jpg" width="55%"></image>
</div>

运行命令`java -jar indexer-cli-5.1.1.jar -u nexus-maven-repository-index.gz -d indexer`，将会得到一个包含所有索引的indexer文件夹，然后该文件夹内的所有索引文件拷贝到私服{nexus-home}/sonatype-work/nexus/indexer/central-ctx目录下（注意：先删除改目录下的东西）


# 3、重启Nexus
使用命令nexus restart重启nexus服务，访问[http://localhost:8081/nexus/](http://localhost:8081/nexus/)，并输入用户名admin和密码admin123登陆查看Repositorys下的中央仓库。此时，可以看到索引已经更新完毕。

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/nexus/indexer-cli-5.1.1.jpg" width="55%"></image>
</div>


#参考资料

1、[http://m.blog.csdn.net/blog/kmter/23564681](http://m.blog.csdn.net/blog/kmter/23564681)


<a href="{{ site.baseurl }}/index.html" class="btn-back">返 回</a>
