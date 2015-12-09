---
layout: post
title: FTPClient上传图片出错
tags: [FTPClient]
categories: [FTPClient]
---



# 1、原因分析
FTP客户端与FTP服务器建立的连接可能由于`网络异常或者连接超时`等原因造成`断开`，首先想到的方式便是`重新建立FTP连接`，判断是否重连的关键代码如下：

``` java
public synchronized boolean initialize(String ip, int port, String path, String user, String password) throws Exception {
	// 通过判断原来的client是否为null来判断是否重连
    if(null != client) {
	    return true;
    }
    FTPClient ftpClient = null;
    try {
	    ftpClient = new FTPClient();
	    ftpClient.connect(ip, port);
	    // ... 此处省略若干代码
    } catch(Exception ex) {
	    logger.error("ftp connect failed, ip = " + ip + ", port = " + port + ", path = " + path + ", user = " + user + ", password = " + password, ex);
	    return false;
    }
    client = ftpClient;
    retuen true;
}
```

通过debug发现，当FTP连接断开时，FTP客户端对象即client并不是null，依旧是一个对象，对象中有一些不为null的属性。仔细观察可以发现，里面有一个属性为`_replayCode`，它的值为`421`。进入源代码发现有一个类`FTPReply`，在它里面有一个静态方法`isPositiveCompletion(_replyCode)`用于判断FTP连接是否正常，具体代码如下：
{% highlight java %}
 public static boolean isPositiveCompletion(int reply)
{
    return (reply >= 200 && reply < 300);
}   
{% endhighlight %}
    


# 2、解决方法
根据以上分析，可以得到一个解决方案，即`根据返回码_replayCode判断是否进行FTP重连`，代码如下：

``` java
public synchronized boolean initialize(String ip, int port, String path, String user, String password) throws Exception {
    // 通过判断原来的client是否为null以及返回码是否为成功值来判断是否重连
    if(null != client && FTPReply.isPositiveCompletion(client.getReplyCode())) {
        return true;
    }
    FTPClient ftpClient = null;
    try {
        ftpClient = new FTPClient();
        ftpClient.connect(ip, port);
        // ... 此处省略若干代码
    } catch(Exception ex) {
        logger.error("ftp connect failed, ip = " + ip + ", port = " + port + ", path = " + path + ", user = " + user + ", password = " + password, ex);
        return false;
    }
    client = ftpClient;
    retuen true;
} 
```    

