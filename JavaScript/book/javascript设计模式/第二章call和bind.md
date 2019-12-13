## 第二章 this call 和 bind

### 2.1this

跟别的语言大相径庭的是，JavaScript 的 this 总是指向一个对象，而具体指向哪个对象是在
运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境

#### 2.1.1this 的指向问题

除去不常用的 with 和 eval 的情况，具体到实际应用中， this 的指向大致可以分为以下 4 种。

-   作为对象的方法调用。
-   作为普通函数调用。
-   构造器调用。
-   Function.prototype.call 或 Function.prototype.apply 调用。

    1.作为对象调用

```
var obj = {
    a: 1,
    getA: function(){
        alert ( this === obj ); // 输出：true
        alert ( this.a ); // 输出: 1
    }
};
obj.getA();
```

2.作为函数调用

```
window.name = 'jack'
var a = function() {
    return this.name
}
a()

或者：
window.name = 'globalName';
   var myObject = {
       name: 'sven',
       getName: function(){
       return this.name;
   }
};
var getName = myObject.getName;
console.log( getName() ); // globalName
```

3.构造器使用

```
var MyClass = function(){
    this.name = 'sven';
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven
```

但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对
象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this ：

```
var MyClass = function(){
    this.name = 'sven';
    return { // 显式地返回一个对象
        name: 'anne'
    }
};
var obj = new MyClass();
alert ( obj.name ); // 输出：anne
```

4.Function.prototype.call 或 Function.prototype.apply 调用

```
var obj1 = {
    name: 'sven',
    getName: function(){
        return this.name;
    }
};
var obj2 = {
    name: 'anne'
};
console.log( obj1.getName() ); // 输出: sven
console.log( obj1.getName.call( obj2 ) ); // 输出：anne
```

#### 2.1.2 丢失的 this

```
let obj = {
    name: 'jack',
    getName: function() {
        return this.name
    }
}
let b = obj.getName;
b() //undefined this指向了window
```

### 2.2call 和 apply

Function.prototype.call 和 Function.prototype.apply 是非常有用的方法他们的使用方法基本一样唯一的区别是传入参数的区别:
fn.call(null,1)和 fn.apply(null,[1]) apply 接收一个数组，当使用 call 或者 apply 的时候如果传入的第一个参数是 null，函数中的 this 会指向默认宿主对象，在浏览器中就是 window

#### 2.2.1 区别

```
let a = function(a,b) {
    console.log(this===window) //true
}
a.apply(null,[1,2])
//应用
Math.max.apply(null,[1,2,3])
```

#### 2.2.2call 和 apply 的使用

前面说过，能够熟练使用 call 和 apply ，是我们真正成为一名 **JavaScript 程序员**的重要一步，本节我们将详细介绍 call 和 apply 在实际开发中的用途。 1.改变 this 的指向

```
let obj1 = {
    name: 'jack'
}
let obj2 = {
    name: 'mack'
}
window.name = 'fack'
var fn = function(){
    return this.name
}
fn() //fack
fn.call(obj1) //jack
fn.call(obj2) //mack
```

在实际开发中，经常会遇到 this 指向被不经意改变的场景，比如有一个 div 节点， div 节点
的 onclick 事件中的 this 本来是指向这个 div 的：

```
document.getElementById( 'div1' ).onclick = function(){
    alert( this.id ); // 输出：div1
};

```

假如该事件函数中有一个内部函数 func ，在事件内部调用 func 函数时， func 函数体内的 this
就指向了 window ，而不是我们预期的 div ，见如下代码：

```
document.getElementById( 'div1' ).onclick = function(){
    alert( this.id ); // 输出：div1
    var func = function(){
        alert ( this.id ); // 输出：undefined
    }
    func();
};

```

这时候我们用 call 来修正 func 函数内的 this ，使其依然指向 div ：

```
document.getElementById( 'div1' ).onclick = function(){
    var func = function(){
        alert ( this.id ); // 输出：div1
    }
    func.call( this );
};
```

2.Function.prototype.bind

大部分高级浏览器都实现了内置的 Function.prototype.bind ，用来指定函数内部的 this 指向，
即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事，代码如下：

```
//简单版本
Function.prototype.myBind = function(context){ //参数obj对象
    var self = this; //fnc函数
    return function() {
        return self.apply(context,argument) //argument fnc的参数
    }
}

var obj = {
    name: 'jack'
}

var fnc = function() {
    return this.name
}.myBind(obj)
fnc()


//复杂版本
Function.prototype.myBind = function() {
    var self = this,
        context = [].shift.call(arguments), //获取第一个参数也就是obj同时arguments(myBind的参数)长度减一
        arg = [].slice.call(arguments); //获取剩余的参数(array格式)
    return function() { //[].slice.call(arguments) 获取的是fnc的参数
        return self.apply(context,[].concat.call(arg,[].slice.call(arguments)))
    }
}

var obj = {
    name: 'jack'
}

var fnc = function(a,b,c,d) {
    console.log(a,b,c,d)
    return this.name
}.myBind(obj,1,2)
fnc(3,4)

```

3.借用其他对象的方法
借用方法的第一种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果：

```

var A = function( name ){
    this.name = name;
};
var B = function(){
    A.apply( this, arguments ); //A的this指向已经改变当b调用时指向b了seven - > argument -> 解析name秒啊
};
B.prototype.getName = function(){
    return this.name;
};
var b = new B( 'sven' );
console.log( b.getName() ); // 输出： 'sven


//请记住 apply的参数
let a = function(a,b) {
    console.log(this===window) //true
}
a.apply(null,[1,2])
```

第二种写法
Array.prototype.push ：

```

(function(){
Array.prototype.push.call( arguments, 3 );
console.log ( arguments ); // 输出[1,2,3]
})( 1, 2 );
```
