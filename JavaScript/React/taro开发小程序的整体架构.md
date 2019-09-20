---
title: taro开发小程序整体架构
tags:
- react
categories: 
- react
---

<p>taro一时爽一直taro一直爽</p>
<!--more-->

## 项目中使用taro自我总总结
> 前言taro是京东出的一套基于react的小程序框架，实现多端开发[官网](https://taro.aotu.io/)taro基本兼容了小程序的原生写法，最大的保留了小程序的原生性。

### 1.使用官方的集成cli
-  npm install -g @tarojs/cli 全局下载习惯用yarn命令的可以yarn add 
-  taro init myApp 创建项目一路回车
-  npm install 后 npm run dev:weapp 启动后用小程序开发工具打开dist
  


### 2.基于taro.request封装请求库，使用promise可以在页面中使用async await
~~~
import Taro from '@tarojs/taro'
import { getToken } from '@/utils/util'
const apiBaseUrl = process.env.BASE_API
const ajax = async function (url, {
    data = {},
    method = 'GET',
    header = {
        'content-type': 'application/json'
    } } = {}) {
    Taro.showLoading({
        title: '数据获取中'
    })
    return await new Promise((resolve, reject) => {
        if (Object.keys(data).length > 0) {
            for (let k in data) {
                let item = data[k];
                if (item === '' || item === null || item === undefined) {
                    delete data[k]
                }
            }
        }
        Taro.request({
            url: apiBaseUrl + url,
            data: {
                ...data,
                token: getToken()
            },
            method,
            header,
        }).then(res => {
            Taro.hideLoading()
            if (res.data.code != 200) {
                if (res.data.code == 40002) {
                    Taro.showToast({
                        title: '登录过期，请重新登录',
                        icon: 'none'
                    });
                    Taro.navigateTo({
                        url: '/pages/login/index?pre=1'
                    })
                }
            }
            resolve(res.data)
        }).catch(err => {
            reject(err)
            Taro.hideLoading()
            Taro.showToast({
                title: '网络请求失败',
                icon: 'none'
            })
        })
    })
}


Taro.$request = ajax
export const request = ajax

~~~
### 2.1创建api目录保存所有的接口请求
每一个模块分开，避免接口过多，单个文件代码冗长，不利于维护。
~~~
- api
   - module
     - a.js
     - b.js
   - index.js
~~~
### 2.2css模块，在src目录中搭建 assets/style
所有的页面中page下都不引入scss文件，组件除外。
~~~
- style
  - module
    - a.scss
    - b.scss
  - common.scss
  - variable.scss 
  - mixin.scss
  - index.scss
~~~

## 3页面中使用react箭头函数避免this绑定的问题。

~~~
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {View,Text} from '@tarojs/components'

@connect(({ }) => ({}))
class Templete extends Component {
    state={

    }
    config = {
        navigationBarTitleText: '模板'
    }

    componentDidMount() {
        this.getData()
    }
    async getData() {

    }
    componentDidShow() { }
    onShareAppMessage (res) {
        if (res.from === 'button') {
          
            console.log(res.target)
        }
        return {
            title: 'title',
            path: ''
        }
    }
    render() {
        return (
            <View className='bookcase'>
                <View><Text>模板</Text></View>
            </View>
        )
    }
}

export default Templete

~~~

### 4.bug及问题
从A页面跳转到B页面，B页面有动态的Taro.setNavBarTitle({title: 'xx'}),且xx是接口请求出来的数据时，迅速返回A页面，A页面的标题被替换成了Xx
解决办法，在B页面中
~~~
/**
 * 判断当前页面是否为某个页面
 */
export function isCurrPage(_pages) {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url.indexOf(_pages) > -1 
}
~~~
当页面是B时，再设置标题否则就不设置
