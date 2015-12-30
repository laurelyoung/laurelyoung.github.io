---
layout: post
title: Struts2的Ajax接口总是返回空json对象的解决方法
tags: [Struts2, Ajax, json]
categories: [Struts2]
---





## 1、问题描述
在使用Struts2的Action实现一些Ajax接口的过程中，在调用接口时，总是返回一个`空的json对象`，即`{}`，事实上应该返回`{"code":500,"msg":{"msg":"正文不能为空"}}`。


## 2、原因分析
通过调试发现，是`访问权限控制符`引起的。使用protected时，外界不能通过getter方法获取到属性的值，所以必须使用允许外界访问的公开权限控制符，即`public`。

产生问题代码如下：

``` java
protected int code:
protected Map<String, Object> msg = new HashMap<String, Object>();
protected int getCode(){return code;}
protected Map<String, Object> getMsg(){return msg;}
```

## 3、解决方法
通过以上分析，我们只需要将访问权限控制符`从protected改成public`，就可以解决这个问题。

具体代码如下：

``` java
public int code:
public Map<String, Object> msg = new HashMap<String, Object>();
public int getCode(){return code;}
public Map<String, Object> getMsg(){return msg;}
```






