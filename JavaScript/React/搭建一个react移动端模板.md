## 徒手搭建一个react移动端模板。
> 前言,用react搭建一个移动端框架，主要用到了umi和dva集成框架[umi](https://umijs.org/zh/guide/)设置路由等，[dva](https://dvajs.com/)集成redux+saga组合，该简单的框架主要有以下几个功能点。

- 采用约定式路由，在src新建的文件umi自动生成路由
- 底部菜单自动控制，在layout中自定义配置底部菜单
- 统一管理数据module,每个页面的数据统一管理
- service文件模块化控制所有的接口
- assets文件中集成一套常用的规则
- mock数据，前端模拟接口
### 1.采用约定式路由
umi本身倾向约定式路由，何为约定式路由，即：在src目录下,umi会自动配置路由规则
~~~
- src
  - home
    index.js
  - my
    index.js  

[
  { path: '/home', component: './pages/home/index.js' },
  { path: '/my', component: './pages/my/index.js' },
 
]    
~~~
可配置的动态路由，当我们需要传递参数时如：/detail/1这种，可以在文件夹中建立
~~~
- src
  - detail
    $id.js
[
    {path: '/detail/:id',component: './pages/detail/$id.js'}
]    
~~~
### 2.底部菜单自定义
指定页面需要出现底菜单，在全局layouts中index.js中配置 ['goods','share','ask','job']路由需要出现底部菜单配置上面的，否则配置下面的
~~~
- layouts
  - BasicLayout
    - index.js
  - index.js

class Layouts extends Component {
  renderBody = () => {
    const { location: { pathname }, children } = this.props;
    if (Footer_Arr.includes(pathname)) {
      return (<BasicLayout  {...this.props}/>)
    } else {
      return (<React.Fragment>
        {children}
      </React.Fragment>)
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.renderBody()}
      </React.Fragment>
    )
  }
}
~~~
### 3.统一管理mode数据
接口请求到的数据都需要走异步流程，放在dva的书状态管理中，配合connect读取数据。
### 4.service保存了所有的接口请求。
请求数据的前提是，在utils中封装好了一份request.
~~~
- service
  - module
    - a.js
    - b.js
  - index.js 导出所有模块
~~~
### 5.assets中保存所有的less文件，关于css的写法，react和vue有很大的区别，但个人还是喜欢，把所有的less文件都模块化，利用id来保存全局，每个页面一个id这样做的好处是方便统一管理，不必要在页面的而每个组件都分别引入。
### 6.mock数据
mock文件夹下存放接口数据。mock的规则如：
~~~
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
//或者使用第三方库
import mockjs from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};
~~~
## 最后项目地址
[项目地址](https://github.com/xiuxiumomo/react-learn/tree/react-my-templetc)




