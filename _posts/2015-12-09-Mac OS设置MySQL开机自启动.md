---
layout: post
title: Mac OS设置MySQL开机自启动
tags: [Mac, MySQL, 自启动]
categories: [Mac, MySQL]
---




# 1、新建自启动文件
```
sudo touch /Library/LaunchDaemons/com.mysql.mysql.plist
```

# 2、输入启动文件内容
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <true/>
        <key>Label</key>
        <string>com.mysql.mysqld</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/local/mysql/bin/mysqld_safe</string>
            <string>--user=root</string>
        </array>
    </dict>
</plist>
{% endhighlight %}

# 3、加载启动文件
```
sudo launchctl load -w /Library/LaunchDaemons/com.mysql.mysql.plist
```

如果出现下图，则表示启动成功。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/mysql/auto_launch_success.png"></image>
</div>

# 4、将mysql命令添加到环境变量
> sudo vi .zshrc  
> export PATH=$HOME/bin:/usr/local/bin:$PATH  
> source .zshrc

其中，`.zshrc`是`oh my zsh`的配置文件。如果你正在使用的是Mac自带的bash，则需要将命令中的`.zshrc`替换为`.bashrc`。配置完成后，通过命令`echo $PATH`来检查变量是否添加成功。如果出现下图，则表示添加成功。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/mysql/env.png"></image>
</div>

接下来，在终端的任何地方输入`mysql`，我们就可以愉快地对数据库进行操作了。



