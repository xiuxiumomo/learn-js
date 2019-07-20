## Vue中封装一个公共组件回到顶部
> 前言:在vue中经常用到回到顶部这个功能，总不可能每次都重新写一个吧？所以需要痛下决心封一个就完事了。

### 1.设计思路
* 确定回到顶部出现的位置,一般滚动页面滚动条拉到最底部就需要出现了。
* 平滑的让滚动条回到顶部。

### 2.实现:
* 确定页面时是否滚动到底部了具体可以参考我的另一篇[文章](http://https://github.com/xiuxiumomo/learn-js/blob/master/JavaScript-learn/%E5%85%B3%E4%BA%8E%E9%A1%B5%E9%9D%A2%E5%85%83%E7%B4%A0%E5%AE%BD%E5%BA%A6%E9%97%AE%E9%A2%98/read.md)
* 利用requestAnimationFrame(页面重绘)实现页面平滑的回到顶部

### 3.关于window.requestAnimationFrame:
* 介绍 参数window.requestAnimationFrame(callback).和window.cancelAnimationFrame()取消
~~~
<template>
    <div id="goTop">
        <div class="goTop" v-show="goTopShow" @click="goTop">
            <i class="el-icon-caret-top goTopIcon"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: "goTop",
    data() {
        return {
            scrollTop: "",
            goTopShow: false
        };
    },
    watch: {
        //确定出现的位置
        scrollTop() {
            let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
            let winHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let aimHeight = scrollH -winHeight;
            if (this.scrollTop >= aimHeight) {
                this.goTopShow = true;
            } else {
                this.goTopShow = false;
            }
        }
    },
    methods: {
        handleScroll() {
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

        },
        goTop() {
            let timer = null,
                _that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 800;
                    document.body.scrollTop = document.documentElement.scrollTop =
                        _that.scrollTop;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow = false;
                }
            });
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style scoped lang="scss">
.goTop {
    position: fixed;
    right: 40px;
    bottom: 160px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    padding: 10px;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center
}
.goTop:hover .goTopIcon {
    color: rgba(51, 153, 255, 1);
}
.goTopIcon {
    font-size: 50px;
    color: rgba(51, 153, 255, 0.8);
}
</style>

~~~


~~~
index.js 导出组件
import GoTop from './index.vue';
const goTop = {
    install: function(Vue){
        Vue.component('goTop',GoTop)
    }
}
export default goTop;
//在main.js中Vue.use(组件)
~~~
