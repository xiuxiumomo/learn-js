/**
 * 订阅发布模式简单
 * 使用方法：
 * mounted调用
 * ev.list('show',function(data) {
 *  console.log(data)
 * })
 * //任何时候用
 * ev.trigger('show',true)
 */
class Event {
    constructor() {
        this.clientList = [];//创建列表
    }
    listen(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn) //添加订阅
    }
    trigger() {   //触发事件
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0;i<fns.length;i++) {
            var fn = fns[i];
            fn.apply(this, arguments)
        }
    }
    remove(key, fn) {
        var fns = this.clientList[key];
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0) //如果没有传入回调，取消key上的所有回调
        } else {
            for (var l = fns.length - 1; l >= 0; l--) { //逆序删除当前回调
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1)
                }
            }
        }

    }
}

var Ev = new Event();
export default Ev;

