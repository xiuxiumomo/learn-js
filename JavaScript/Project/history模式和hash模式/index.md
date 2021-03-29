## spa 路由实现与解析

> 现代前端项目多为单页 Web 应用(SPA)，在单页 Web 应用中路由是其中的重要环节。每个现代前端框架都有与之对应的路由实现，例如 vue-router、react-router 等。

### 什么是前端路由

> 简单的说，就是在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和 SEO 时均通过这个特殊的 url 来实现。为实现这一目标，我们需要做到以下二点：改变 url 且不让浏览器像服务器发送请求。
> 可以监听到 url 的变化
> 接下来要介绍的 hash 模式和 history 模式，就是实现了上面的功能

### hash 模式

"http://www.baidu.com/#hashhash" ，其中 "#hashhash" 就是我们期望的 hash 值。

```
window.location.hash = 'aaa'
window.addEventListener('hashchange',function(){},false)
```

//实现 hash 参考 hash.js

```
    <div id="box">
    <ul>
    <li>
        <a href="#/page1">page1</a>
    </li>
    <li>
        <a href="#/page2">page2</a>
    </li>
    <li>
        <a href="#/page3">page3</a>
    </li>
    <li>
        <a href="#/page4">page4</a>
    </li>
    </ul>
    <div id="container"></div>
    </div>


    let router = new HashRouter();
    let container = document.getElementById('container');
    router.registerIndex(() => container.innerHTML = '首页')
    router.register('/page1', () => container.innerHTML = 'page1')
    router.register('/page2', () => container.innerHTML = 'page2')
    router.register('/page3', () => container.innerHTML = 'page3')
    router.register('/page4', () => container.innerHTML = 'page4')
    router.load()
    router.registerNotFound(() => container.innerHTML = '未发现页面')
    router.registerError((e) => container.innerHTML = `页面异常${e.message}`)
```

### history 模式

//js 参考 hostory

```
 <div id="box">
    <ul>
    <li>
        <a href="#/page1">page1</a>
    </li>
    <li>
        <a href="#/page2">page2</a>
    </li>
    <li>
        <a href="#/page3">page3</a>
    </li>
    <li>
        <a href="#/page4">page4</a>
    </li>
    </ul>
    <div id="container"></div>
    </div>


    let router = new HistoryRouter();
    let container = document.getElementById('container');
    router.registerIndex(() => container.innerHTML = '首页')
    router.register('/page1', () => container.innerHTML = 'page1')
    router.register('/page2', () => container.innerHTML = 'page2')
    router.register('/page3', () => container.innerHTML = 'page3')
    router.register('/page4', () => container.innerHTML = 'page4')
    router.load()
    router.registerNotFound(() => container.innerHTML = '未发现页面')
    router.registerError((e) => container.innerHTML = `页面异常${e.message}`)
```

### 对比

hash、history 如何抉择

hash 模式相比于
history 模式的优点：

-   兼容性更好，可以兼容到 IE8
-   无需服务端配合处理非单页的 url 地址
    hash 模式相比于 history 模式的缺点：

-   看起来更丑。
-   会导致锚点功能失效。
    相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。
    综上所述，当我们不需要兼容老版本 IE 浏览器，并且可以控制服务端覆盖所有情况的候选资源时，我们可以愉快的使用 history 模式了。

反之，很遗憾，只能使用丑陋的 hash 模式~

```
## hash模式
export default class HashRouter {
    constructor() {
        this.routers = {}
        window.addEventListener('hashchange', this.load.bind(this), false)
    }

    //注册视图
    register(hashName, callBack = () => { }) {
        this.routers[hashName] = callBack
    }
    //注册首页
    registerIndex(callBack = () => { }) {
        this.routers['index'] = callBack;
    }
    //404
    registerNotFound(callBack = () => { }) {
        this.routers['404'] = callBack
    }
    //异常
    registerError(callBack = () => { }) {
        this.routers['error'] = callBack;
    }
    //load
    load() {
        let hash = location
            .hash
            .slice(1),
            handler = null;
        if (hash) {
            handler = this.routers[hash]
        } else if (!this.routers.hasOwnProperty(hash)) {
            handler = this.$routers['404'] || function () { }
        } else {
            handler = this.routers['index']
        }
        try {
            handler.call(this)
        } catch (e) {
            (this.routers['error'] || function () {}).call(this, e)
        }

    }
}
```

```
## history模式
export class HistoryRouter {
    constructor() {
        this.routers = {}
    }
    //首次进入
    load() {
        let path = location.pathname;
        this.dealPathHandler(path)
    }
    //监听a链接
    listenLink() {
        window.addEventListener('click', (e) => {
            let dom = e.target;
            if (dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')) {
                e.preventDefault()
                this.assign(dom.getAttribute('href'))
            }
        }, false)
    }
    //监听popstate
    listenPopState() {
        window.addEventListener('popstate', (e) => {
            let state = e.state || {};
            let path = state.path || '';
            this.dealPathHandler(path)
        }, false)

    }
    //用于注册每个视图
    register(path, callback = () => { }) {
        this.routers[path] = callback;
    }
    //用于注册首页
    registerIndex(callback = () => { }) {
        this.routers['/'] = callback
    }
    //用于注册没找到的情况
    registerNotFound(callback = () => { }) {
        this.routers['404'] = callback
    }
    //用于处理异常情况
    registerError(callback = () => { }) {
        this.routers['error'] = callback;
    }
    //跳转到path history.pushState 参数state对象 title url
    assign(path) {
        history.pushState({ path }, null, path)
        this.dealPathHandler(path)
    }
    //替换
    replace(path) {
        history.replaceState({ path }, null, path)
        this.dealPathHandler(path)
    }
    //通用处理path
    dealPathHandler(path) {
        let handler = null;
        if (!this.routers.hasOwnProperty(path)) {
            handler = this.routers['404'] || function () { };
        } else {
            handler = this.routers[path]
        }
        try {
            handler.call(this)

        } catch (e) {
            (this.routers['error'] || function () { }).call(this, e)
        }
    }

}
```
