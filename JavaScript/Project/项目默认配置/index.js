/**
 * 
 * @param {*} type 类型可以是String Number Boolean等基本类型
 * 用法 let isString = isType('String');
 *      isString('123')
 * 
 */
let isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}
/**
 * 
 * @param {*} callBack  回调函数
 * @param {*} time 间隔时间
 * 用法  window.addEventListener('scroll', throttle(function() {
            console.log(111)
        }, 1000))
 */

let throttle = function (callBack, time) {
    let prev = Date.now(),
        first = true;
    return function () {
        if (first) {
            callBack.apply(this, arguments);
            return first = false;
        }
        let now = Date.now();
        if (now - prev >= time) {
            callBack.apply(this, arguments);
            prev = Date.now();
        }
    }
}
/**
 * 
 * @param {*} fn  回调函数
 * @param {*} wait  一段时间
 */
let debounce = function (fn, wait) {
    let time = null;
    return function () {
        if (time !== null) {
            clearTimeout(time);
        }
        time = setTimeout(fn, wait)
    }
}

/**
 * 数组去重
 * @param {*} array数组
 * 注意去重只能去掉数字字符串组成的数组，对象数组不起作用 
 */
let ArrayOnly = function (array) {
    return [...new Set(array)];
}

/**
 * 求最大或最小值
 * @param {*} data 数组 limit 条件求最大还是最小，默认最大
 * console.log(findLimit({
    data: [1, 5, 2, 7],
    limit: 'min'}))
 */
let findLimit = function ({
    data = [],
    limit = 'max'
} = {}) {
    let res = [];
    if (limit === 'max') {
        res = Math.max.apply(null, data)
    } else {
        res = Math.min.apply(null, data)
    }
    return res;
}

/**
 * 检测是否含有某个类名
 * @param {*} obj  dom元素对象
 * @param {*} className  类名
 */

let hasClass = function (obj, className) {
    let arr = obj.className.split(/\s+/);
    return arr.includes(className);
}
/**
 * 返回随机数
 * @param {*} min  最小值
 * @param {*} max  最大值
 */
let randomNum = function (min, max) {
    return Math.round(min + Math.random() * (max - min))
}
/**
 * 随机颜色
 */
let randomColor = function () {
    let color = {
        r: randomNum(0, 255),
        g: randomNum(0, 255),
        b: randomNum(0, 255),
        a: 1
    }
    return `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`
}
/**
 * 时间戳转化到具体的年月日时分秒
 * @param {*} timeNum 时间戳
 */
let timeToDetail = function (timeNum) {
    function getZero(n) {
        return n < 10 ? ('0' + n) : n;
    }
    let myTime = new Date(timeNum);
    let year = myTime.getFullYear();
    let month = myTime.getMonth() + 1;
    let day = myTime.getDate();
    let hour = myTime.getHours();
    let min = myTime.getMinutes();
    let sec = myTime.getSeconds();
    let str = year + '/' + getZero(month) + '/' + getZero(day) + ' ' + getZero(hour) + ':' + getZero(min) + ':' + getZero(sec);
    return str;
}
/**
 * 验证是否为手机号
 */
let isPhoneNum = function (str) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myreg.test(str)
}
/**
 * 缓存代理模式 id 索引
 * callBack 回调函数
 */
let proxySync = (function () {
    let cache = [],
        timer;
    return function (id, callBack) {
        cache.push(id);
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            callBack()
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        }, 500);
    };
})();
/**
 * 系统时间自己刷新
 * 
 * 
 */
let requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) { //如果浏览器不支持 手动刷新
            window.setTimeout(callback, 1000 / 60);
        };

})()
export {
    isType,
    throttle,
    debounce,
    ArrayOnly,
    findLimit,
    hasClass,
    randomNum,
    randomColor,
    timeToDetail,
    isPhoneNum,
    proxySync,
    requestAnimFrame
}
