### 1.window 对象

> window 对象在浏览器上指的是浏览器对象，在 node 中指的是 global

```
window.name = 'jack'

global.name = 'pack'


node xx.js

```

**视口位置**

```
window.scroll()

window.scrollTo()

window.scrollBy()
```

### 2.location 对象

- location.hash #后面的内容
- location.host 127.0.0.1:5500

- location.hostname 127.0.0.1

- location.href http://127.0.0.1:5500/demo/1.html

- location.pathname /demo/1.html

- location.port 5500

- location.protocol http:

- location.search

- location.origin http://127.0.0.1:5500

### navigator 对象

> navigator 对象实现了 NavigatorID 、 NavigatorLanguage 、 NavigatorOnLine 、
> NavigatorContentUtils 、 NavigatorStorage 、 NavigatorStorageUtils 、 NavigatorConcurrentHardware、NavigatorPlugins 和 NavigatorUserMedia 接口定义的属性和方法

### history 对象

```
window.history.go(-1) //后退

window.history.go(1) //前进一页
window.history.go(2) //前进2页

window.history.length //返回历史记录条数

```

### 历史状态管理

> pushState()方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相
> 对 URL。

```
let stateObj = {
  foo: 'bar'
}
history.pushState(stateObj,'title','baz.html')


```

```
## 点击后退
window.addEventListener("popstate", (event) => {
 let state = event.state;
 if (state) { // 第一个页面加载时状态是 null
 processState(state);
 }
});


## 更新状态
history.replaceState({newFoo: "newBar"}, "New title");
```
