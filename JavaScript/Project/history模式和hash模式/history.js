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