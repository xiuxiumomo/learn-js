## vue+ts上手体验
> 前言vue学习到了某个程度之后，总想搞个大新闻...试试ts,[项目地址](https://github.com/xiuxiumomo/typescript-learning/tree/vue-cli3)是首先用vuecli3脚手架一把梭。构建基本框架就不多讲了。搭建后项目的配置基本是
~~~
- public
- src
    - api
        - modules
        - index.ts
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
        - tabBar.vue
    - router
        - index.ts
    - store
        - modules
            - home
                - action.ts
                - getters.ts
                - index.ts
                - mutations.ts
                - types.ts
            - types.ts    
        - store.ts
    - utils
        - request.ts
        - index.ts
    - views
        - A
        - B
    - App.vue
    - main.ts
    - permission.js
- .env
- tslint.json
- package.json
- vue.config.js
~~~
### 1.关于组件的使用
组件使用了包装器vue-property-decorator
~~~
import { Component, Vue } from "vue-property-decorator";
@Component({
    components: {

    }
})
~~~

### 2.关于js页面重新调整改用react的面向对象的整体方法
~~~
export default clss Home extends Vue{
    loading: boolean = false; //属性的写法
    private: async function getData() { //method写法
        //
    }
    private created() {} //生命周期
    private mounted() {}

}
~~~
### 3.utils里面request的封装
~~~
import axios from "axios";
import qs from "qs";
import { Toast } from 'vant';
// 创建axios实例

const service = axios.create({
    baseURL: 'https://cnodejs.org',
    timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (config.method === "post" || config.method === "put") {
            if (config.data) {
                let data = Object.assign({}, config.data);
                for (let k in data) {
                    if (data[k] === "") {
                        delete config.data[k];
                    }
                }
                config.data = qs.stringify(config.data);
            }
        } else {
            if (config.params) {
                let params = Object.assign({}, config.params);
                for (let k in params) {
                    if (params[k] === "") {
                        delete config.params[k];
                    }
                }
            }
        }
        return config;
    },
    error => {
        // eslint-disable-next-line
        Promise.reject(error);
    },


);

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        return res;
    },
    error => {
        console.log('网络错误');
        return Promise.reject(error);
    }
);
export default service;
~~~

### 4.vuex的写法(变化最大)以下以good文件夹为例子
~~~
1.types定义state的数据接口
export interface GoodState {
    list: any[],
    detail: {}
}
2.actions.ts触发vuex进行数据改变
import { ActionTree } from "vuex"; //action包装
import { GoodState } from "./types";  //good数据接口
import { RootState } from "../types";//根state
import { good as api } from "@/api/index"; //axios请求到的数据

export const actions: ActionTree<GoodState, RootState> = {
    async getGoodNewsList({ commit }, params) {
        let response: any = await api.getGoodNewsList(params);
        if (response.success === true) {
            commit("Good_New_List", response.data); //mutation触发
        }
        return response;
    }
};
3.mutation接收action的commit请求经行数据的改变
import { MutationTree } from "vuex"; //mutation包装
import { GoodState } from "./types";
import { formartTime } from '@/utils/index';
let tabJson: any = {
    share: '分享',
    good: '精华',
    job: '职业',
    ask: '问答',
}
export const mutations: MutationTree<GoodState> = {
    Good_New_List: (state, data) => {
        let res = data;
        res.forEach((item: any) => {
            if (!item.tab) {
                item.tab = '首页';
            } else {
                item.tab = tabJson[item.tab];
            }
            item.last_reply_at = formartTime(item.last_reply_at);
            return item
        })
        state.list = res; //state改变了数据
    }
};
4.getters接收最后的结果
import { GetterTree } from "vuex";
import { GoodState } from "./types";
import { RootState } from "../types";
export const getters: GetterTree<GoodState, RootState> = {
    goodList: state => state.list,
};
5.index.ts模块化所有并导出
import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { GoodState } from "./types";
import { RootState } from "../types";

export const state: GoodState = {
    list: [],
    detail: {}

};
const namespaced: boolean = true; //开启命名空间
export const good: Module<GoodState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};

6.最外层的store.ts挂载到vue中
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./modules/types";
import { good } from "./modules/good/index";
Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },
  modules: {
    good
  }
};

export default new Vuex.Store<RootState>(store);

~~~
### 5.在页面中触发vuex
~~~
import { State, Action, Getter } from "vuex-class"; //引入vuex包装
@Getter("goodList", { namespace: "good" }) //与mapState相同页面直接使用数据
goodList!: any;
@Action("getGoodNewsList", { namespace: "good" }) //与dispatch相同
getGoodNewsList!: any;

private async newsListFn(params: Params) {
    let res = await this.getGoodNewsList(params); //触发dispatch接口请求
}
private mounted() {
    this.newsListFn()
}

~~~
### 6.多环境打包问题
直接可以新建.env.test文件设置环境配置
~~~
NODE_ENV = 'test'
VUE_APP_API = 'https://cnodejs.org'
VUE_APP_BASE = 'test'

当build打包时
"build-test": "vue-cli-service build --mode test",
~~~




