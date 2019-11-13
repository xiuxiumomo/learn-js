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