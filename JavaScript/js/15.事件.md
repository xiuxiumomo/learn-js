## 事件

> JavaScript 与 HTML 的交互是通过事件来进行的，是文档或浏览器窗口发生一些特定的交互瞬间。

### 1.事件流

> 事件流描述的是从页面中接收事件的顺序，通常有这样完全相反的事件流概念：事件冒泡流和事件捕获流

### 1.1 事件冒泡

事件冒泡(Event Bubbling)事件开始时由最具体的元素接收，然后逐层向上传播到较为不具体的节点。

```
<body>
<div>按钮</div>
</body>
//点击按钮触发事件
//div->body->html->document
```

### 1.2 事件捕获

> 事件捕获：让不太具体的节点更早的接收事件，而最具体的节点最后接收事件，即在事件到达预定目标之前捕获到。

```
1.document
2.html
3.body
4.div
```

### 1.3 事件流

> dom2 事件规定的事件流包含三个阶段: 事件捕获阶段，处于目标阶段和事件冒泡阶段。事件捕获为截获事件提供机会，然后实际的目标接收到事件。最后事件冒泡对事件作出响应即：事件捕获->目标阶段->事件冒泡

### 2.事件处理

事件处理，即响应某个事件。我们把事件处理的函数，称为“事件处理程序”。
事件处理程序的名称一般都以 on 开头，如 click 事件的事件处理程序就是 onclick， load 事件的事件处理程序就是 onload。
我们将事件处理程序，分为这么几类：

-   HTML 事件处理程序
-   DOM0 级事件处理程序
-   DOM2 级事件处理程序
-   IE 事件处理程序
-   跨浏览器事件处理程序

### 2.1HTML 事件处理程序

某个元素支持的事件，都可以用一个与相应事件处理程序同名的 HTML 特性来指定，这个特性的值应该是能够执行的 JavaScript 代码。比如：

```
<input type="button" value="点击" onclick="alert('hello world')"/>
//缺点 耦合性太强
```

### 2.2dom0 事件

通过赋值形式，将一个函数赋值给一个事件处理程序属性。每个元素（包含 window 和 document）都有自己的事件处理属性，这些属性通常全部小写，如 onclick，将这种属性的值设置成一个函数，就可以指定事件处理程序：

```
let dom = document.getElementById('box')
dom.onclick = function() {
    alert('1234')
}
```

使用 DOM0 级方法指定事件处理程序，被认为是元素的方法。此时的事件处理程序是在元素的作用域执行，那么，this 就引用当前元素，可以访问元素的任何属性和方法：

```
let dom = document.getElementById('box')
dom.onclick = function() {
    alert(this.id)
}
//dom.onclick = null 删除绑定
```

### 2.3dom2 事件处理程序

-   添加事件处理程序 addEventListener()
-   删除事件处理程序 removeEventListener()
    参数：fnType-事件类型 callback-事件 boolean(true 事件捕获阶段调用，false 事件冒泡阶段调用)

```
let dom = document.getElementById('box');
dom.addEventListener('click',function(){
    alert(this.id)
},false)

//与DOM0级方法一样，这里的事件处理程序也会是在元素的作用域中执行，因此this也是指向元素，可以访问元素的任何属性和方法。
//同一个元素可以添加多个事件，按照顺序触发
let dom = document.getElementById('box');
dom.addEventListener('click',function(){
    alert(1)
},false)

dom.addEventListener('click',function(){
    alert(2)
})
```

通过 addEventListener 添加的函数只能被 removeEventLitener 移除，这也意味着 addEventListenerZ()添加的匿名函数无法被移除

```
let dom = document.getElementById('box')
dom.addEventListener('click',function(){
    alert(1)
},false)

dom.removeEventListener('click',function(){
    //无法解除
},false)
//解决
let fn = function() {
    console.log(this.id)
}
dom.addEventListener('click',fn,false)
dom.removeEventListener('click',fn,false)
```

### 2.4IE 事件处理

> IE 实现两种方法： attachEvent()和 detachEvent()。这两个方法接收相同的两个参数：事件处理程序名称和事件处理程序函数。
> 由于 IE8 和更早版本只支持事件冒泡，所以通过 attachEvent()添加的事件处理程序会被添加到冒泡阶段。

```
let dom = document.getElementById('box');
let fn = function() {
    console.log(this.id)
}
dom.attachEvent('onclick',fn,false)
dom.detachEvent('onclick',fn,false)
```

### 2.5 跨浏览器事件处理程序

```
let myEvent = {
    addMyEvent: function(el,type,handler) {
        if(el.addEventListener) { //优先dom2
            el.addEventListener(type,handler,false)
        }else if(el.attachEvent) {
           el.attachEvent('on'+type,fn,false)
        }else{
            el['on'+type] = handler
        }
    },
    removeMyEvent: function(el,type,handler) {
        if(el.removeEventListener) {
            el.removeEventListener(type,handler,false)
        }else if(el.detachEvent) {
            el.detachEvent('on'+type,false)
        }else {
            el['on'+type] = null
        }
    }
}
```

### 3.对象事件
当Dom触发一个以上的事件时候，都会产生一个event对象，并作为参数传入事件处理程序，这个对象包含所有与事件相关的信息。
### 3.1DOM的事件对象
~~~
let dom = document.getElementById('box')
dom.onclick = function(ev) {
    console.log(ev)
}
dom.addEventListener('click',function(ev) {
    console.log(ev)
},false)
~~~
- 阻止事件的默认行为
~~~
let dom = document.getElementById('box');
dom.onclick = function(ev) {
    ev.preventDefault()
}
~~~
- 立即停止事件的Dom传播(调用ev.stopPropagation())

~~~
let dom = document.getElementById('box');
dom.onclick = function(ev) {
    //阻止默认事件
    ev.stopPropagation();
}
~~~
### 4.事件类型
- UI事件：用户与页面上的元素交互时触发
- 焦点事件： 输入框焦点
- 鼠标事件：鼠标滚动
- 文本事件 
- 键盘事件
- 合成事件
- 变动事件

### 5.事件委托
事件委托利用事件冒泡，指定一个事件处理程序来管理某一类型的所有事件，比如我们通过一个函数来代替其他三个函数：
最适合采用事件委托技术的事件包括： click/ mousedown/ mouseup/ keyup/ keydown/ keypress，虽然 mouseover和 mouseout事件也有冒泡，但因为不好处理它们并且经常需要重新计算元素位置。
