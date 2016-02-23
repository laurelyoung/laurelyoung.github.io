---
layout: post
title: IntelliJ IDEA和WebStorm下无法输入中文标点符号的解决方法
tags: [IntelliJ IDEA, WebStorm]
categories: [IntelliJ IDEA, WebStorm]
---



# 1、问题描述
将IntelliJ IDEA从14升级到15和WebStorm从10升级到11版本后，发现它们都无法输入中文标点。


# 2、原因分析
在网上搜索了一遍，发现最可能的原因是：

> IntelliJ IDEA 15和WebStorm 11内置JDK 1.8的版本，但是这个版本存在中文标点输入以后自动被转换成英文（半角）的Bug。


# 3、解决办法

第一步，下载并安装JDK8u45，在终端输入`java -version`验证是否安装成功 <br>
第二步，重新启动IDEA或WebStorm <br>
第三步，在IDEA或WebStorm中按下快捷键`CMD+Shift+A`（或者`双击Shift`），在弹出框中输入`Switch IDE boot JDK`，之后在下拉框中选择刚刚安装的JDK8u45替代内置的JDK <br>
第四步，再次重启IDEA或WebStorm



