## vue项目架构和开发
> 前言，vue作为前端三大框架之一，得到广大开发者的认同和喜爱。我将根据自己在工作中，应用vue框架做出一个自我总结，仅供大家参考。需要总结的
  是一个vue-pc端的(移动端的同理)项目架构。


## 开发环境
---
vue全家桶+elementui,毕竟很多公共组件elmentui自带了，很方便也很快捷,最主要的时需要兼容IE9。

## 需求分析

* 1.公共的头部和尾部，根据不同的页面来控制显示和隐藏。
* 2.公共的通用组件，比如：回到顶部，未登录时弹出的弹窗等。
* 3.一套less(variable常量)，用于全局匹配按钮，文字等颜色。
* 4.一套axios请求库，封装好ajax请求包含(get,post,put,delete,patch)等。
* 5.一份api文件里面保存所有接口请求后的接口。
* 6.模块化router路由来控制不同页面。
* 7.模块化*store*来控制所有全局数据(包含axios请求的结果)。
* 8.一套mixin封装各个页面需要用到的方法。
* 9.一份utils 里面包含validate.js以及index.js 包含验证等常用方法。
* 10.一份permission.js，控制token的传递。以及路由页面切换(权限等问题)。
* 11.实现微信、微博、QQ登录，以及支付宝、微信支付。

## 项目结构

~~~
- build
- config
    - dev.env.js
    - index.js
    - prod.env.js
- src
    - api
        - modules
        - index.js
    - assets
        - font
        - img
        - less
            - modules
                - base.less
                - mixin.less
                - variable.less
                - index.less
    - components
        - goTop
    - layouts
        - index.vue
    - mixins
        - index.js
    - router
        - modules
        - index.js
    - store
        - modules
            - mA.js
            - mB.js
        - getters
            - gA.js
            - gB.js
        - getters.js
        - index.js
    - utils
        - variable.js
        - index.js
    - views
        - A
        - B
    - App.vue
    - main.js
    - permission.js
- index.html
- package.json
- .babelrc
- .gitignore


~~~


## 实现过程
1.控制公共头部显示和隐藏
在layouts里面引入头部和尾部，根据当前路由的名字控制时否需要显示公共头部和尾部

~~~
    //页面
    <c-header v-if="!isRegPart"></c-header>
        <div class="content-container">
            <slot></slot>
        </div>
    <c-footer v-if="!isTeam"></c-footer>
    //js过滤写在computed里面
    isRegPart() {
    //如果是注册模块不显示公共头部
    let whiteNameList = ["login","Register","404"];
    if (whiteNameList.includes(this.$route.name)) {
        return true;
    }
        return false;
    },

~~~

2.实现回到顶部等公共组件(可以是全局的和局部的)
写在components里面 一个index.vue和一份index.js 以回到顶部为例。
~~~
import GoTop from './index.vue';
const goTop = {
    install: function(Vue){
        Vue.component('goTop',GoTop)
    }
}
export default goTop;
//在main.js中引入 并且Vue.use(你的组件)，在页面中直接使用该组件即可。

~~~

3.less常量,写在less中
~~~
@import "./base";//覆盖默认
@import "./mixin";//混合
@import "./variable";//常量
@import "./modules/home";//首页
//直接在main.js中引入 index.less
~~~

4.封装axios请求库，卸载utils.js新建request.js

~~~
import axios from "axios";//axios库
import qs from "qs"; //参数序列化
import { getToken,removeToken,removeNickname } from "@/utils/auth"; //引入token
import { Message, MessageBox } from "element-ui"; //弹出层
let token = getToken();
const service = axios.create({
    //baseURL: process.env.BASE_API, // 这里不需填写用代理
    timeout: 15000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
    config => {
        config.headers["token"] = `${token}`; //所有的请求中把token放在头部
        if (config.method == "post" || config.method == "put") {
             //去除空的字段
            if (config.data) {
                let data = JSON.parse(JSON.stringify(config.data));
                for (let k in data) {
                    if (data[k] === "") {
                        delete config.data[k];
                    }
                }
                config.data = qs.stringify(config.data);
            }
        } else {
            let params = JSON.parse(JSON.stringify(config.params));
            for (let k in params) {
                if (params[k] === "") {
                    delete config.params[k];
                }
            }

        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        //请求出错对应的关系
        const res = response.data; //接口res

        if (response.status !== 200 ) {
            Message({
                message: "出错了~",
                type: "error",
                duration: 5 * 1000
            });

        }
        if(res.code==401){ //处理token失效


        }

        return res;
    },
    error => {
        console.log("err" + error);
        Message({
            message: '请求出错'
        });
        return Promise.reject(error);
    }
);

export default service;

//与之相对应的代理关系
 proxyTable: {
    "/api/v1":{
        target: "http://newpc.yyuexs.com/",
        changeOrigin: true
    }

 },

~~~

5.api文件保存所有的接口请求的接口
~~~
    - api
        - module
            - A.js
        - index.js
    //以home为例子
    //在module中
    import request from '@/utils/request';
    export  function getBanner(params){
        return request({
            url: '/api/v1/adv',
            method: 'get',
            params
        })
    }
    //在index.js里面
    import * as app from './modules/app'; //全局app
    import * as home from "./modules/home"; // 首页
    export { app,home };
~~~

6.模块化路由,注册登录模块，书籍模块等不同模块单独放一份js文件，在index中引入。有利于项目维护，结构清晰。
~~~
    - router
        - module
            - a.js
            - b.js
        - index.js

        import Vue from 'vue';
        import Router from 'vue-router';
        Vue.use(Router);
        import A from './modules/A';
        import B from './modules/B';
        let routes = [
            {
                path: '/',
                name: '',
                redirect: '/home',
                children: []
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index'),
                children: [],
                meta: {
                    title: '首页'
                }
            },

            ...A,
            ...B,
            {
                path: '/404',
                component: () => import('@/views/404'),
                name: '404',
                hidden: true
            },
            {
                path: '*',
                redirect: '/404',
                component: () => import('@/views/404'),
                hidden: true
            }
        ];

        export default new Router({
            mode: 'history', //不加/
            routes,
            scrollBehavior(to,from,savePosition){
                if(savePosition){
                    return savePosition;
                }else{
                    return {  //确保跳转到新的页面滚动条设为 0,0
                        x: 0,
                        y: 0
                    }
                }
            }
        });

~~~

7.模块化store。所有的axios请求结果全部过一遍vuex。然后在每一个页面中mounted时候触发。优点：如果接口好几个页面都要用，这样写极为方便。
而且每一个模块的接口很清晰，有利于修改和查找错误。
~~~
    - store
        - getters
            - A.js
            - B.js
        - module
            - A.js
            - B.js
        - getters.js
        - index.js
    以home为例子

    //modules里面
    import { home as api } from "@/api/index";
    const home = {
        state: {
            bannerList: {
                banner_data: [
                    {
                        "id": 190,
                        "title": "测试1",
                        "to_type": 1,
                        "to_value": "2100",
                        "to_img": "https://res.shiyin.net/FpoVBpLz2LH1ri_FqAhFAPE35cQG"
                    },
                ]
            },

        },
        mutations: {
            bannerList: (state, response) => {
                let resultData = response.data;
                state.bannerList.banner_data = resultData;

            },

        },
        actions: {
            //banner图片管理
            getBanner: async function ({ commit }, params = {}) {
                let response = await api.getBanner(params);
                if (response.code == 200) {
                    commit('bannerList', response)
                }
                return response;
            },

        }
    }
    export default home;
     //getters里面
    const home = {
        homeBannerList: state => state.home.bannerList

    }
    export default home;
    //index.js里面
       import app from './getters/app'; //全局
       import home from './getters/home'; //首页

       const getters = {
           ...app,
           //首页
           ...home,

       }
       export default getters;
       //index,js里面
       import Vue from 'vue'
       import Vuex from 'vuex'
       import getters from './getters';

       import app from './module/app';
       import home from './module/home';


       Vue.use(Vuex)
       export default new Vuex.Store({
           modules: {
               app,
               home,
           },
           getters
       })


~~~

8.一份mixin.js包含各个页面可能出现的功能，如点击按钮进入书籍详情页，加入收藏等。
~~~

export const mixin = {
    created() { },
    methods: {
        //加入书架
        async collectBookFn(book_id) {
            let res = await this.$store.dispatch('postLibraryCollect', { book_id });
            if (res.code == 200) {
                messageToast({
                    str: '加入成功~'
                })
               return new Promise((resolve)=>{
                   resolve()
               })
            }
        },
    },
    computed: {
    }
};
~~~

9.一份utils包含通用index.js,variable等文件（根据需求自己定义）
~~~
    - utils
         - index.js
         - variable.js
~~~
10.permission.js 这算是一份非常重要的文件，用于控制页面的跳转以及全局vuex状态的控制

~~~
import router from "./router";
import {getToken} from "./utils/auth";
import store from './store'
let token = getToken();

const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
    if(token){
        store.dispatch('setToken',token); //设置token
    }
    next();
});
router.afterEach(()=>{

})

~~~

11.关于PC端微信微博QQ登录,以及微信支付宝支付。
> 微信微博QQ登录是许多官方网站常见的登录方式，对于前端来讲无需做太多处理，只需要负责做以下几点。
* 1.确定好回调地址，这个页面是必须的，常见的方式是新开一个固定大小的页面，中转页面中路由上会带一个code,只需获取code,请求登录接口即可。
* 2.把微博微信QQappkey和secret保存在一份config文件中。
* 3.确定每种方式的地址。
* 4.支付宝支付，页面会跳转一个第三方，支付页面。
* 5.微信支付，调用支付接以后会返回一个二维码字符串，利用qrcode插件生成二维码，用户扫码后完成支付。
~~~
//设置Config文件
const config = {
    qq: {
        appkey:'xxx',
        secrect: 'xxx'
    },
    wb: {
        appkey:'xxx',
        secrect: 'xxx'
    },
    wx: {
        appkey:'xxx',
        secrect: 'xxx'
    }
}
//各种方式的跳转注意区分地址
    wechatHandleClick() {
        this.setCookieFn('loginType','wechat');
        const appid = loginParams.wx.appKey;
        const redirect_uri = encodeURIComponent(
            window.location.origin + "/auth-redirect"
        );
        const url =
            "https://open.weixin.qq.com/connect/qrconnect?appid=" +
            appid +
            "&redirect_uri=" +
            redirect_uri +
            "&response_type=code&scope=snsapi_login#wechat_redirect";
        window.open(url);
    },
    tencentHandleClick() {
        this.setCookieFn('loginType','qq');
        const client_id = loginParams.qq.appKey
        const redirect_uri = encodeURIComponent(window.location.origin + '/auth-redirect');
        const url = 'https://graph.qq.com/oauth2.0/show?which=Login&state=state&scope=get_user_info&display=pc&response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        window.open(url);
    },
    weiboHandleClick() {
        this.setCookieFn('loginType','weibo');
        const appKey = loginParams.weibo.appKey;
        const redirect_uri = encodeURIComponent(window.location.origin + "/auth-redirect");
        const url =
            "https://api.weibo.com/oauth2/authorize?client_id=" +
            appKey +
            "&response_type=code&redirect_uri=" +
            redirect_uri;
        window.open(url);
    }
    //中转页面举例微博,其他同理。
    async getWiBoFn() {
        this.showLoading();
        let code = this.$route.query.code;
        let redirect_uri = window.location.origin + "/auth-redirect";
        let res = await this.$store.dispatch("getRegisterWeiBo", {
            redirect_uri,
            code
        });
        if (res.code == 200 && res.data) {
            this.hideLoading();
            messageToast({
                str: "授权成功~"
            });
            setTimeout(() => {
                this.$router.push({
                    path: "/home?from=auth-redirect"
                });
            }, 1000);
        } else {
            this.hideLoading();
            messageToast({
                str: "授权失败,请重试~"
            });
            setTimeout(() => {
                this.$router.replace({
                    path: "/"
                });
            }, 1000);
        }
        this.removeCookieFn("loginType");
        return;
    },
    //微信支付
    function wxPay(){
        let params = {
            amount: 0.01, //that.rmb
            trade_type: 'wx',
            body: "a",
            token 
	    };
        let res = await this.$store.dispatch('postUserPay',params);
        if(res&&res.code_url){
            let code_str = res.code_url;
            this.wx.codeStr = code_str; //二维码字符串。
            this.wx.show = true; //打开弹窗
        }
    }
    function aLiPay(){
        let params = {
            amount: 0.01, //that.rmb
            trade_type: 'ali',
            body: "a",
            token 
	    };
        let url = `${baseAPI}/api/v1/order?amount=${
					params.amount
				}&trade_type=${params.trade_type}&body=${
					params.body
				}&token=${token}`;
		window.open(url); //直接跳转
    }
   

~~~



## 页面中使用。
~~~
<script>
import { mapGetters } from "vuex";
import { messageToast } from "../../utils";
import { mixin } from "@/mixins/index";

export default {
	name: "home",
	mixins: [mixin],
	computed: {
		...mapGetters({
			banner: "bannerList",
			token: "token"
		})
	},
	data() {
		return {

		};
	},

	mounted() {
        this.getBannerData()

	},
	components: {
        async getBannerData() {
            await this.$store.dispatch("getBanner", {});
        },
    },
	methods: {}

};
</script>
~~~


## 后记，根据个人理解完成一次PC端项目架构，[项目地址(测试)](http://pc.yyuexs.com)，如需体验登录和支付功能，可以来注册和消费哦。！！！



