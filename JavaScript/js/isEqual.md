## 相等性判断
> 前言比较两个数据是否相等在js操作中有十分重要的作用。js中主要有相等与不相等，全等与不全等。
### 1.介绍
---
在比较两个数据是否相等时ECMAScript提出两种方法。
* == 先转化成相同的数据类型在比较。
* === 仅比较而不转化类型。
* Object.is() 方法Es6新增。
### 2.相等与不相等
> 如果a==b 返回true反之返回false,a和b会转变成相同的数据类型。转变的规则如下(尽量把数据都变成数字来比较):
* 若有一个字符是boolean,则boolean会转变为(0,1)。
* 若有一个字符是string,另外一个是number,比较时string转化为number。
* 若一个是对象，另一个不是,比较前对象调用valueOf()方法，用返回的基本类型类判断。

* null和undefined相等。
* 其中一个是NaN二者不等。
* 两个都是NaN二者不等
* 两个都是对象,比较是否是同一个对象

### 3.全等比较
~~~
99=='99' //true
99==='99' //false
//特殊的
null == undefined //true
null === undefined //false 类型不同
~~~
### 4.object.is()比较如下规则
* 两个值都是 undefined
* 两个值都是 null
* 两个值都是 true 或者都是 false
* 两个值是由相同个数的字符按照相同的顺序组成的字符串
* 两个值指向同一个对象
* 两个值都是数字并且
~~~
Object.is(window, window);   // true

Object.is('a', 'a');     // false
Object.is([], []);           // false
var obj = { a: 1 };
Object.is(obj, obj);       // true
Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true

~~~

注明：该文章是在原文[前端自习课](https://mp.weixin.qq.com/s/-HPtViPA926BwNp599555w)修改而得，感谢原作者！

