---
layout: post
title: Struts2上传图片报异常java.lang.IllegalStateException的解决方法
tags: [Struts2, 上传图片, IllegalStateException, 异常]
categories: [Struts2]
---





## 1、异常详请
{% highlight java %}
java.lang.IllegalStateException: Cannot call sendError() after the response has been committed
	at org.apache.catalina.connector.ResponseFacade.sendError(ResponseFacade.java:450)
	at javax.servlet.http.HttpServletResponseWrapper.sendError(HttpServletResponseWrapper.java:119)
	at javax.servlet.http.HttpServletResponseWrapper.sendError(HttpServletResponseWrapper.java:119)
	at com.opensymphony.module.sitemesh.filter.PageResponseWrapper.sendError(PageResponseWrapper.java:176)
	at javax.servlet.http.HttpServletResponseWrapper.sendError(HttpServletResponseWrapper.java:119)
	at org.apache.struts2.dispatcher.Dispatcher.sendError(Dispatcher.java:914)
	at org.apache.struts2.dispatcher.Dispatcher.serviceAction(Dispatcher.java:574)
	at org.apache.struts2.dispatcher.ng.ExecuteOperations.executeAction(ExecuteOperations.java:77)
	at org.apache.struts2.dispatcher.ng.filter.StrutsExecuteFilter.doFilter(StrutsExecuteFilter.java:93)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	at org.apache.struts2.dispatcher.ng.filter.StrutsPrepareFilter.doFilter(StrutsPrepareFilter.java:91)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)
	...
{% endhighlight %}


## 2、原因分析
在网上查找原因，发现原因是：

>在Action中调用了response.getWriter()获取输出流，当该输出流close()之后，此时`response已经提交`（has been committed），当再次调用response进行转发或者重定向，就会导致`IllegalStateException`异常。

本人在实现图片上传的功能中，需要向前端返回了图片的URL、高度和宽度等字段，这些字段是通过response的输出流以纯文本的形式返回的。具体的代码如下：

{% highlight java %}
public String execute() throws Exception {
	// 处理图片，获取宽度和高度
	// 上传图片，获取图片URL
	try {
		// 设置输出格式为纯文本
	    ServletActionContext.getResponse().setContentType("text/plain;charset=utf-8");

	    // 获取response的输出流对象
	    PrintWriter writer = ServletActionContext.getResponse().getWriter();

	    // 以json字符串的形式拼接需要返回的字段
	    StringBuilder sb = new StringBuilder();
	    sb.append("{").append("\"code\":").append(code).append(",").append("\"msg\":").append(JsonUtils.object2JsonString(this.msg)).append("}");

	    // 返回给前端
	    writer.write(sb.toString());
	    writer.flush();
	    writer.close();

	    // 打印查看response是否已经提交
	    System.out.println(ServletActionContext.getResponse().isCommitted());
	} catch (IOException e) {
	    e.printStackTrace();
	}

	return SUCCESS;
}
{% endhighlight %}

代码中，`ServletActionContext.getResponse().isCommitted()`用于查看response是否已经提交。启动程序运行后，可以看到控制台打印出了`true`，表示程序运行到此处response已经提交。此时，`return SUCCESS`，就会发生`IllegalStateException`异常。 


## 3、解决方法

在Struts2的Action中，将`return SUCCESS;`替换为`return null;`。

{% highlight java %}
//return SUCCESS;
return null;
{% endhighlight %}





