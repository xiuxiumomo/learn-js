## 1.实现一个数字累加的效果
> 前言：实现一个数字累计变化比如:0-100类似金币累加效果。


### 1.1认识缓动函数[tween](http://www.createjs.cc/tweenjs)一个用来变化数据的函数主要的参数有
~~~
/*
*   参数 fn
*   t: 循环次数
*   b: 起始量
*   c: 变化量
*   d: 持续时间
*
* */

let Tween = {
    Linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function (t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;
~~~

### 1.2设计思路
> 传递的参数有 起始量，变化量，变化的总时间，变化效果(从Tween选) 有效数字 更新中(方法) 更新完成()，用定时器方法查询每次更新中的数据

~~~
class NumberChange {
    constructor(opt) {
        let def = {
            startNum: 0, //起始值
            aimNum: 100, //变化量
            speed: 300, //持续总时间
            effect: 'Quad',
            eNumber: 0,//有效数
            onUpdate() { //持续更新

            },
            onComplete() { //更新结束

            }
        }
        //合并参数
        this.opt = Object.assign(def, opt);
        this.tempValue = 0; //当前状态值
        this.loopCount = 0; //当前累加次数

        this.interval = null;
        this.init()

    }
    init() {
        this.interval = setInterval(() => {
            this.updateTimer()
        }, 1000 / 60)
    }
    updateTimer() {
        this.loopCount++;
        let value = Tween[this.opt.effect].easeOut(this.loopCount, this.opt.startNum, this.opt.aimNum, this.opt.speed);
        this.tempValue = Number(value).toFixed(this.opt.eNumber);
        if (this.loopCount <= this.opt.speed) {
            this.opt.onUpdate();
        } else {
            this.tempValue = (this.opt.aimNum).toFixed(this.opt.eNumber); //最终结果采用传入的结果
            this.opt.onComplete(); //结束后的回调
            clearInterval(this.interval)
        }


    }

}
~~~
### 1.2使用方法
~~~
使用方法：先引入上面封装好的
let num = new NumberChange({
    startNum: 10, //起始值
    aimNum: 100, //变化量
    speed: 300, //持续总时间
    effect: 'Quad',
    eNumber: 0,//有效数
    onUpdate(){
    //

    },
    onComplete(){

    }

})
~~~

效果:
![](https://user-gold-cdn.xitu.io/2019/6/5/16b26643b0d56500?w=377&h=649&f=gif&s=42844)

## 2.引发的扩展
> 由此可以引申出另外一个抽奖效果，转盘开始到结束，速度会越来越慢，直到停止。常见的有转盘抽奖和9宫格抽奖原理大致相同需要确定抽奖的是:中奖的id(由后端计算出，前端显示)，转盘转动的圈数,总共几个格子

~~~
class Lottery {
    constructor(opt) {
        let deFault = {
            winId: 0, //获胜的ID
            round: 5, //旋转圈
            duration: 300, //动画时间
            itemNum: 8, //总共几个各格子
            effect: 'Quad', //动画效果
            onUpdate: () => {

            },
            onComplete: () => {

            } //回调函数
        }
        this.options = Object.assign(deFault, opt);
        this.currentId = 0; //当前的选中项目
        this.change = this.options.round * this.options.itemNum + this.options.winId; //变化的总量
        this.interval = null;
        this.loopCount = 0; //开始值
        this.init();
    }
    init() {
        this.interval = setInterval(() => {
            this.changeData()
        }, 1000 / 60)
    }
    changeData() {
        this.loopCount++;
        let NowTotal = Tween[this.options.effect].easeOut(this.loopCount, 0, this.change, this.options.duration);
        //当前id
        this.currentId = (Math.ceil(NowTotal) % this.options.itemNum); //计算当前中奖的项目
        if (this.loopCount <= this.options.duration) {
            //更新中的回调
            this.options.onUpdate()
        } else {
            clearInterval(this.interval);
            //结束时的回调
            this.options.onComplete()
        }
    }




}
~~~

### 2.1使用方法

~~~

let lottery = new Lottery({
    winId: winId, //获胜的ID
    round: 4, //旋转圈
    duration: 300, //动画时间
    itemNum: 8, //总共几个各格子
    effect: 'Quad', //动画效果可选
    onUpdate: () => {
        that.setData({
            ['lotteryData.active_num']: lottery.currentId, //显示当前激活项
            ['lotteryData.canRoll']: false //抽奖中-阻止转动
        })

    },
    onComplete: () => {
        that.setData({
            ['lotteryData.canRoll']: true
        })


    }
})
~~~

### 2.2使用的效果

![](https://user-gold-cdn.xitu.io/2019/6/5/16b2673db38a7fbf?w=360&h=601&f=gif&s=908579)
