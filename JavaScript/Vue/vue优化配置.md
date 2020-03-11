## vue优化。
> 前言vue优化有许多方面，但最主要的方面是budild文件js、css、html文件的大小。影响vue项目打开速度的原因有网络资源的请求快慢。
所以，尽量让静态资源处于可快速访问的状态，可以使用cdn节点提高访问速率。
### 1.配置文件
- 在vue.config文件中配置
~~~
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        plugins: [new CompressionPlugin({
            test: /\.js$|\.html$\.css$/,
            threshold: 10240,
            deleteOriginalAssets: false
        })],
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'axios': 'axios'
        }
    }
}
~~~
- 在index.html中配置
```
<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js"></script>
    <script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
    <script src="https://cdn.bootcss.com/element-ui/2.13.0/index.js"></script>
</head>



</html>
```
- externals配置的命名规则
引入vue或vuerouter后window全局对象下面会挂载该对象例如： import elementUi from 'element-ui'  此时的'element-ui'包
可以用 'element-ui': 'ELEMENT', 'ELEMENT' 代替，因为window上已挂载该对象（需要自己测试）

### 2.删除多余配置
起始引入externals后
```
import axios from 'axios' 可以不需要
import Vue from 'vue' 可以不需要
```