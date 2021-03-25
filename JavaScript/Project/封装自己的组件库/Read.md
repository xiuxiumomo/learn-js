## 如何封装企业内部组件库

> 以建设通hhb为主要的站点，以其他流量站点为辅助(vip站点，www站点，zb站点，ppp站点),在某些时刻需要共同引入某些公共部分如头部和尾部，以保持建设通站点的风格一致性，目前我们的做法，每一个站点引入一套js，js封装了统一的js,css,html，然后根据各类站点，处理共同点和异同点。发布在各自的站点上。但这种开发模式会带来以下几点弊端。

- 1.js由后端人员开发，使用传统jquery注入，开发难度非常大。

- 2.js内部重新加载了海量其他js,导致页面请求时发出大量网络请求，拖累了网站的打开速度，大量document.writln影响性能，可能会导致SEO问题。

- 3.js内部逻辑判断非常复杂，使用ES5的语法，会更加庞大，苟星星同学深感痛苦。

- 4.js代码，css代码没有经过压缩，加载后的资源很大，加载速度慢。

### 1.有没有更好的替代方案？

> 答案是肯定的，如果由前端的开发人员，把头部尾部之类的公共组件封装成组件库，然后各个站点npm i 一次，每个组件放在相应的地方，不需要引入任何js文件。

**这样做的好处**

- 1.组件化开发，不需要后端人员去维护，前端人员独立开始项目，使用Vue框架搭建ui组件，使用webpack打包组件，压缩后的代码轻量，简洁。

- 2.利用组件传参的原理,可以做到差异化传参数，渲染不同的结果如：导航如果想多加一个，只需要往参数数组多添加一组即可。

- 3.优化网络请求，大大的减少了白屏事件，有利于SEO。

- 4.封装公司内部的组件库，可以跨部门完成合作，前端开发人员只需要npm install 即可。

### 2.封装组件的原理

> 封装组件的最核心的东西即: 暴露出install方法给Vue.use使用，注册全局组件。

```
//全局引入
import ZlUI from 'zl-ui'
import 'zl-ui/dist/zl-ui.css'
Vue.use(ZlUI)

//按需引入
import ZLUI from "zl-ui";
import "zl-ui/dist/zl-ui.css";

Vue.use(ZLUI.Footer)
Vue.use(ZLUI.Header)

```

### 3.如何设计组件库
> 本库参考element-ui组件库封装思想，在其思想下做了缩略版内部组件库。基于vue-cli3搭建基础框架。

**目录介绍**

```
- dist
- public
- src
  - assets
  - styles
    - scss
      index.scss
  - components
    - ComponentA
      - src
         main.vue
        index.js  
    - ComponentB
      - src
         main.vue
        index.js 
    App.vue
    main.js
  .gitignore
  babel.config.js
  package.json
  Read.md
  vue.config.js
```

简单的说明以下，主要的文件夹使用的是src/components组件库，注意之里面的文件夹统一使用小写，如果名字过长则使用小写+"-"完成如：footer go-top的等。
文件夹下必须至少包含src/和index.js文件，index.js用于导出该组件，src/main.vue主要是组件文件。注意，main.vue一定要写name属性，且必须以Zl-*开头
必须尊遵循帕斯卡命名规则。

```
export default {
  name: 'ZlFooter'
}
```

**组件文件夹下对外导出index.js的作用**

```
import Footer from './src/main'

Footer.install = function(Vue) {
  Vue.component(Footer.name,Footer)
}
export default Footer
```

可以看出，引入组件之后，然后直接导出组件，为什么需要在组件上注册一个install方法呢？当然是为了，按需引入后Vue.use()单独注册该组件啦。

**入口文件**
这里的入口文件是☞components/index.js，里面到底做了什么呢?首先分析代码:

```


import Footer from './footer'
import Header from './header'
import '../styles/scss/index.scss'
const components = [
  Footer,
  Header
]
//创建install方法注册组建
const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
//执行注册组建
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    Footer,
    Header
}

```

可以看出，它做了两部操作，左手进，右手出，只是将组件导入导出，但是增加了一个关键的install方法。
那么，有同学又要问了，这么install有什么用呢?那当然是为了全局引入所有的组件啦！仔细观察install方法，
无非就是使用遍历方法，依次把组件注入。
```
import ZlUI from 'zl-ui'
import 'zl-ui/dist/zl-ui.css'
Vue.use(ZlUI)//使用install注入全部

```

**处理样式**
elementui使用是用gulp单独打包scss文件的，且别做了定制化主题的功能。内部组件库可以不需要如此复杂，依然使用webpack的打包scss功能即可。
以style/scss/index.scss为出口。在上面的index.js中引入即可。

### 4.如何完成打包
在package.json中添加相关配置

```
"main": "./dist/zl-ui.common.js",
"scripts": {
  "build-bundle": "vue-cli-service build --target lib --name zl-ui ./src/components/index.js"
}

```
这里简单的解释一下这条指令的意思，不一定准确。利用vue-cli-service build 指令 lib说明是打成一个依赖包，名字叫zl-ui 入口的文件是 xxx
执行npm run build-bunld后会增加dist目录，有amd和cmd规格的文件。


### 5.如何将私有库上传到私有npm仓库?
查看另外一篇文章 [!部署私有仓库](../../../Linux/npm私有库.md)





