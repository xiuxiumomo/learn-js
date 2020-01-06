## 1.构造函数的实现原理

> 首先了解一个构造函数

```
var Person =  function(name) {
    this.name = name
}
Person.prototype.getName = function() {
    return this.name
}
var p = new Person('jack');
```

我们会得到 p:

```
p = {
    name: 'jack',
    __proto__: {
        getName: function() {},
        constructor: Person(){},(指向Person的函数),
        __proto__: {
            toStroing: function() {}
            ...
        }
    }
}
```

那么这个过程是如何实现的呢，可以肯定的是 p.**proto**得到了 Person.prototype.

```
var myCreate = function() {
    var obj = new Object(), //创建一个空的对象
        Constructor = [].shift.call(arguments), //截取Person
        obj.__proto__ = Constructor.ptototype; //让obj的__proto__ 指向Person.prototype
        Constructor.apply(obj,arguments); //属性赋值
        return obj; //返回对象
}
var p1 = myCreate(Person,'jack')
这种方法创建的是和上面的一致
同时用Object.getPrototypeof(p1)  得到
{
        getName: function() {},
        constructor: Person(){},(指向Person的函数),
        __proto__: {
            toStroing: function() {}
            ...
        }
    }
    也就是p1.__proto__
```
## 2.{} new Object() 和 Object.create()的区别
首先{} 和new Object() 属性完全一致，没有任何区别因为他们都代表一个空对象，但是__proto__ 指向了Object.protytype:{}

```
Object.prototype： {
    toString: function(){},
    get: function() {},
    set: function() {},
    valueOf: function() {} 
}

var p = {};
var p1 = new Object();
 {
 __prototyp: ...
}

```
```

var p1 = new Object({
    name: 'lee'
})
var p2 = Object.create({
    name: 'jack'
})

console.log(p1)得到
{
    name: 'lee',
    __proto__ : {
        toString...
        //
    }
}

console.log(p2)得到
{
    __proto__: {
        name: 'jack'
    }
}
区别在于new 出来的会在对象本身添加属性而create出来的都是在__proto__ 上面添加属性和方法

```
