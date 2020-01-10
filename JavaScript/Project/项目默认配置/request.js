import axios from "axios";
import qs from "qs";

var filterParams = function (params = {}) {
    if (Object.keys(params).length === 0) {
        return {}
    }
    for (let k in params) {
        if (params[k] === "" || params[k] === undefined || params[k] === null) {
            delete params.data[k];
        }
    }
    return params;

}
// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API,
    timeout: 40000 //请求超时时间
});

// request拦截器1
service.interceptors.request.use(
    config => {
        if (
            config.method == "post" ||
            config.method == "put" ||
            config.method == "patch"
        ) {
            if (config.data) {
                let data = JSON.parse(JSON.stringify(config.data));
                data = filterParams(data);
                config.data = qs.stringify(data);
            }
        } else {
            config.params = config.params || {}
            let params = JSON.parse(JSON.stringify(config.params));
            params = filterParams(params);
            config.params = params;
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
        /**
         * code为非0时是抛错 可结合自己业务进行修改
         */
        const res = response.data;


        if (res.code !== 200) {
            console.log('请求出错')

            if (res.code === 5000) {
                console.log('服务器错误')
            }
        }
        return res;
    },
    error => {
        return Promise.resolve(error.response.data);
    }
);

export default service;
