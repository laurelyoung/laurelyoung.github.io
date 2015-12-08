---
layout: post
title: Maven私服（Nexus）搭建-离线安装索引
tags: [maven, nexus, index]
categories: [maven, nexus]
---



使用Nexus搜索开发需要的jar包是我们建立私服最基本的功能，此功能依赖于所有jar包的索引文件。但是如果通过在线的方式来获取和安装索引，这将需要耗费相当长的一段时间。为了节省时间，我们可以通过离线的方式来实现。


# 1、下载索引文件
访问[http://repo.maven.apache.org/maven2/.index/](http://repo.maven.apache.org/maven2/.index/)下载中心仓库最新版本的索引文件，将会看到一个很长的列表，我们只需要下载如下两个文件：

> nexus-maven-repository-index.gz  
> nexus-maven-repository-index.properties


# 2、解析索引文件
`nexus-maven-repository-index.gz`这个索引文件格式比较特殊，后缀名为`gz`，需要使用[`indexer-cli-5.1.1.jar`](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.apache.maven.indexer%22%20AND%20a%3A%22indexer-cli%22)进行解压。
`indexer-cli-5.1.1.jar`是专门用来解析和发布索引的工具。

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/nexus/indexer-cli-5.1.1.jpg"></image>
</div>

运行命令`java -jar indexer-cli-5.1.1.jar -u nexus-maven-repository-index.gz -d indexer`，这个过程大概需要十几分钟。执行完成后，将得到一个`indexer文件夹`，这个文件夹内存放的是所有的索引文件，我们需要将它们全部拷贝到Nexus私服的`{nexus-home}/sonatype-work/nexus/indexer/central-ctx`目录下（注意：先删除该目录下的东西）


# 3、重启Nexus
使用命令`nexus restart`重启nexus服务，访问[http://localhost:8081/nexus/](http://localhost:8081/nexus/)，并输入用户名`admin`和密码`admin123`登陆查看`Repositorys`下的中央仓库。此时，可以看到索引已经更新完毕。

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/nexus/index_installed.jpg"></image>
</div>


#参考资料

1、[http://m.blog.csdn.net/blog/kmter/23564681](http://m.blog.csdn.net/blog/kmter/23564681)

