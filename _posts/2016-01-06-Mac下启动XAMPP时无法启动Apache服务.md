---
layout: post
title: Mac下启动XAMPP时无法启动Apache服务
tags: [Mac, XAMPP, Apache]
categories: [Mac, XAMPP, Apache]
---





## 1、报错信息
```
Starting XAMPP for Mac OS X 5.6.15-1...
XAMPP: Starting Apache...fail.
XAMPP:  Another web server is already running.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```


## 2、原因分析
Mac上自带的Apache服务器已经启动，因此需要将其关闭后再启动XAMPP。


## 3、解决方法
1、使用命令`sudo apachectl stop`将自带的Apache服务关闭  
2、使用命令`sudo /Applications/XAMPP/xamppfiles/xampp start`重新启动XAMPP

之后将会出现下面的提示信息，这就表示XAMPP已经全部启动成功了。

```
Starting XAMPP for Mac OS X 5.6.15-1...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...already running.
```
