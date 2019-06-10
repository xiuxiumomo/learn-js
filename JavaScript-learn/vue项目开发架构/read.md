## vue项目架构和开发
> 前言，vue作为前端三大框架之一，得到广大开发者的认同和喜爱。我将根据自己在工作中，应用vue框架做出一个自我总结，仅供大家参考。需要总结的
  是一个vue-pc端的(移动端的同理)项目架构。


## 开发环境
---
vue全家桶+elementui,毕竟很多公共组件elmentui自带了，很方便也很快捷,最主要的时需要兼容IE9。

## 需求分析

* 1.公共的头部和尾部，根据不同的页面来控制显示和隐藏。
* 2.公共的通用组件，比如：回到顶部，未登录时弹出的弹窗等。
* 3.一套less(variable常量)，用于全局匹配按钮，文字等颜色。
* 4.一套axios请求库，封装好ajax请求包含(get,post,put,delete,patch)等。
* 5.模块化router路由来控制不同页面。
* 6.模块化$\color{#ff0000}{store}$来控制所有全局数据(包含axios请求的结果)。
* 7.一套mixin封装各个页面需要用到的方法。
* 8.一份utils 里面包含validate.js以及index.js 包含验证等常用方法。
* 9.一份permission.js，控制token的传递。以及路由页面切换(权限等问题)。

## 项目结构

~~~
- build
- config
    - dev.env.js
    - index.js
    - prod.env.js
- src
    - api
        - modules
        - index.js
    - assets
        - font
        - img
        - less
            - modules
                - base.less
                - mixin.less
                - variable.less
                - index.less
    - components
        - goTop
    - layouts
        - index.vue
    - mixins
        - index.js
    - router
        - modules
        - index.js
    - store
        - modules
            - mA.js
            - mB.js
        - getters
            - gA.js
            - gB.js
        - getters.js
        - index.js
    - utils
        - variable.js
        - index.js
    - views
        - A
        - B
    - App.vue
    - main.js
    - permission.js
- index.html
- package.json
- .babelrc
- .gitignore


~~~


## 实现过程
1.控制公共头部显示和隐藏
在layouts里面引入头部和尾部，根据当前路由的名字控制时否需要显示公共头部和尾部

~~~
    //页面
    <c-header v-if="!isRegPart"></c-header>
        <div class="content-container">
            <slot></slot>
        </div>
    <c-footer v-if="!isTeam"></c-footer>
    //js过滤写在computed里面
    isRegPart() {
    //如果是注册模块不显示公共头部
    let whiteNameList = ["login","Register","404"];
    if (whiteNameList.includes(this.$route.name)) {
        return true;
    }
        return false;
    },

~~~

2.实现回到顶部等公共组件(可以是全局的和局部的)
写在components里面 一个index.vue和一份index.js 以回到顶部为例。
~~~
import GoTop from './index.vue';
const goTop = {
    install: function(Vue){
        Vue.component('goTop',GoTop)
    }
}
export default goTop;

~~~

