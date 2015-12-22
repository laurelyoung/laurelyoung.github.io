---
layout: post
title: Mac OS安装Python MySQLdb
tags: [Mac, Python, MySQLdb]
categories: [Mac, Python]
---



# 1、下载

Python要想访问mysql数据库，需要安装`MySQLdb模块`，下载地址是：

>http://sourceforge.net/projects/mysql-python/


# 2、配置

解压下载的文件，找到`site.cfg`这个配置文件，修改里面的一行：

```
mysql_config = /usr/local/mysql/bin/mysql_config
```

# 3、安装

执行以下的命令进行安装：

```
sudo python setup.py build  
sudo python setup.py install
```

# 4、安装错误的解决方法

安装成功后，在命令行输入`python`进入python环境，输入`import MySQLdb`，此时会报错。解决方法如下：

```
sudo ln -s /usr/local/mysql/lib/libmysqlclient.18.dylib /usr/lib/libmysqlclient.18.dylib
````


## 参考资料
- [mac os x下python安装MySQLdb模块](http://my.oschina.net/NoSay/blog/474567)

- [Mac os 10.9 Python MySQLdb](http://www.chenruixuan.com/archives/408.html)

- [在 Mac 中安装 MySQLdb (Python mysql)](http://blog.csdn.net/janronehoo/article/details/25207825)

