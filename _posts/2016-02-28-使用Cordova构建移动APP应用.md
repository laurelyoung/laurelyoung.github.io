---
layout: post
title: 使用Cordova构建移动APP应用
tags: [Cordova, 移动APP]
categories: [Cordova, 移动APP]
---





# 1、安装nodejs
根据cordova的官网指南说明，需要借助于npm命令来安装cordova。npm是`nodejs`的包管理和分发工具。因此，第一步我们要实现nodejs的安装。
到官网下载最新版本的nodejs，使用`node -v`检查是否安装成功。

- cordova官网：[http://cordova.apache.org](http://cordova.apache.org)
- nodejs官网：[http://www.nodejs.org](http://www.nodejs.org)



# 2、安装cordova
{% highlight xml %}
npm install -g cordova
{% endhighlight %}

> **NOTE:** 在Mac OS中，需要使用管理员权限进行安装，即前面加`sudo`，后面的cordova命令同理。



# 3、cordova项目环境搭建

安装好cordova cli后，我们就可以在终端使用cordova命令进行项目的创建、构建和运行了。

## 1) 创建cordova项目
{% highlight xml %}
npm create hello
{% endhighlight %}

## 2) 添加android平台
{% highlight xml %}
cordova platform add android
{% endhighlight %}

## 3) 构建
{% highlight xml %}
cordova build
{% endhighlight %}
cordova支持使用ant和gradle对项目进行构建，这里我们使用gradle进行构建。

第一次构建，会一直处于等待状态，无法完成构建：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/build_failure.png"></image>
</div>

此时，如果一直这样的傻傻等待，只能是坐以待毙，我们需要一种节省时间的方法，于是我们采用离线方案：

> 1. 1) 离线下载gradle-2.2.1-all.zip
> 2. 2) 进入{cordova项目}/platforms/android/cordova/lib/builders文件夹，打开GradleBuilder.js，进行如下修改：

{% highlight javascript %}
/*var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL']
                            || 'http\\://services.gradle.org/distributions/gradle-2.2.1-all.zip';*/
var distributionUrl = '../gradle-2.2.1-all.zip';
{% endhighlight %}


第二次进行构建，会继续报错：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/bad_maven_reporsitory.png"></image>
</div>

从错误提示可以看出，构建失败是由于连不上maven仓库导致的。于是，我们需要将maven 仓库更换成一个有效的地址，具体操作是：

> 分别打开{cordova项目}/platforms/android/CordovaLib/build.gradle
和{cordova项目}/platforms/android/CordovaLib/build.gradle，进行如下修改：

{% highlight xml %}
buildscript {
    repositories {
        //mavenCentral()
        maven { url 'http://repo1.maven.org/maven2' }
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:1.5.0'
    }

}
{% endhighlight %}

第三次构建，构建成功。执行结果如下图所示：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/build_success.png"></image>
</div>


## 4) 运行
{% highlight xml %}
cordova run
{% endhighlight %}

运行结果如下图所示：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/run_success.png"></image>
</div>



# 4、使用android studio开发cordova项目

打开android studio，点击`import project...`，在弹出框中，选中`{cordova项目}/platforms/android/build.gradle`，然后点击OK。
此时，android studio底下的`Event Log`窗口会出现如下错误信息：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/cordova_can_not_open_in_android_studio.png" style="width:100%;"></image>
</div>

从错误信息大概可以猜出，这是由于没有文件的写权限导致的。于是，我们使用如下命令给cordova项目所在文件夹赋予所有的权限（读、写、执行）：

{% highlight xml %}
chmod -R 755 cordova项目所在文件夹
{% endhighlight %}

执行上面的命令后，我们就可以很顺利地将cordova项目导入android studio。APP运行后的效果如下图所示：

<div style="text-align: center;">
    <image src="{{ post.url }}/static/images/cordova/genymotion.png" style="width:45%;"></image>
</div>