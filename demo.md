---
layout: page
title: Little Demos
permalink: /demo/
---



## 1. 基于jQuery的全屏切换插件

### 需要引入的资源

``` html
<link rel="stylesheet" href="{baseUrl}/css/jquery.pageswitch.css" type="text/css">
<script src="{baseUrl}/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="{baseUrl}/js/jquery.pageswitch.js" type="text/javascript"></script>
```

### 配置说明

``` javascript
selectors: {					// DOM选择器
    sections: '.sections',
    section: '.section',
    pages: '.pages',
    active: '.active'
},
index: 0,						// 起始索引
direction: 'vertical',			// 播放方向
loop: true,						// 是否可循环播放
keyboard: true					// 是否键盘触发
```

代码详见 [GitHub](https://github.com/yangchenglong/yangchenglong.github.io/tree/master/demo/PageSwitch)

