## 1.面向对象

### 1.1 动态类型语言和鸭子类型

```
var duck = {
    duckSinging: function(){
        console.log( '嘎嘎嘎' );
    }
};
var chicken = {
    duckSinging: function(){
        console.log( '嘎嘎嘎' );
    }
};
var choir = []; // 合唱团
var joinChoir = function( animal ){
    if ( animal && typeof animal.duckSinging === 'function' ){
        choir.push( animal );
        console.log( '恭喜加入合唱团' );
        console.log( '合唱团已有成员数量:' + choir.length );
    }
};
joinChoir( duck ); // 恭喜加入合唱团
joinChoir( chicken ); // 恭喜加入合唱团
```

### 1.2 多态

> 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令
> 时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发
> 出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自
> 发出不同的叫声。

#### 1.2.1 多态实现

```
var makeSound = function( animal ){
    if ( animal instanceof Duck ){
        console.log( '嘎嘎嘎' );
    }else if ( animal instanceof Chicken ){
        console.log( '咯咯咯' );
    }
};
var Duck = function(){};
var Chicken = function(){};
makeSound( new Duck() ); // 嘎嘎嘎
makeSound( new Chicken() ); // 咯咯咯
```

#### 1.2.2 对象的多态性

```
var makeSound = function( animal ){
    animal.sound();
};

var Duck = function(){}
Duck.prototype.sound = function(){
    console.log( '嘎嘎嘎' );
};
var Chicken = function(){}
Chicken.prototype.sound = function(){
    console.log( '咯咯咯' );
};
makeSound( new Duck() ); // 嘎嘎嘎
makeSound( new Chicken() ); // 咯咯咯
```

#### 1.2.6 JavaScript 对象的多态性。

假设我们要编写一个地图应用，现在有两家可选的地图 API 提供商供我们接入自己的应用。
目前我们选择的是谷歌地图，谷歌地图的 API 中提供了 show 方法，负责在页面上展示整个地图。
示例代码如下：

```
var googleMap = {
    show: function(){
    console.log( '开始渲染谷歌地图' );
}
};
var renderMap = function(){
    googleMap.show();
};
renderMap(); // 输出：开始渲染谷歌地图
```

后来因为某些原因，要把谷歌地图换成百度地图，为了让 renderMap 函数保持一定的弹性，
我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图：

```
var googleMap = {
    show: function(){
    console.log( '开始渲染谷歌地图' );
}
};
var baiduMap = {
    show: function(){
    console.log( '开始渲染百度地图' );
}
};
var renderMap = function( type ){
if ( type === 'google' ){
    googleMap.show();
}else if ( type === 'baidu' ){
    baiduMap.show();
}
};
renderMap( 'google' ); // 输出：开始渲染谷歌地图
renderMap( 'baidu' ); // 输出：开始渲染百度地图
```

可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要
替换成搜搜地图，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句。
我们还是先把程序中相同的部分抽象出来，那就是显示某个地图：
var renderMap = function( map ){
if ( map.show instanceof Function ){
map.show();
}
};
renderMap( googleMap ); // 输出：开始渲染谷歌地图
renderMap( baiduMap ); // 输出：开始渲染百度地图

### 1.3 封装

### 1.4 原型模式和基于原型继承的 JavaScript 对象系统

#### 1.4.1 使用克隆的原型模式

```
var Plane = function(){
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};
var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;
var clonePlane = Object.create( plane );
console.log( clonePlane ); // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}

```

不支持 Object.create 方法的浏览器可以:

```
Object.create = Object.create || function(obj){
    var F = function() {}
    F.prototype = obj;
    return new F()
}
```

#### 1.4.5JavaScript 中的原型继承

-   所有的数据都是对象。
-   要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
-   对象会记住它的原型。
-   如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

1.所有的数据都是对象

JavaScript 在设计的时候，模仿 Java 引入了两套类型机制：基本类型和对象类型。基本类型
包括 undefined 、 number 、 boolean 、 string 、 function 、 object 。从现在看来，这并不是一个好的
想法。
按照 JavaScript 设计者的本意，除了 undefined 之外，一切都应是对象。为了实现这一目标，
number 、 boolean 、 string 这几种基本类型数据也可以通过“包装类”的方式变成对象类型数据来
处理。
我们不能说在 JavaScript 中所有的数据都是对象，但可以说绝大部分数据都是对象。那么相
信在 JavaScript 中也一定会有一个根对象存在，这些对象追根溯源都来源于这个根对象。
事实上，JavaScript 中的根对象是 Object.prototype 对象。 Object.prototype 对象是一个空的
对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的，
Object.prototype 对象就是它们的原型。比如下面的 obj1 对象和 obj2 对象：
var obj1 = new Object();
var obj2 = {};
可以利用 ECMAScript 5 提供的 Object.getPrototypeOf 来查看这两个对象的原型：
console.log( Object.getPrototypeOf( obj1 ) === Object.prototype ); // 输出：true
console.log( Object.getPrototypeOf( obj2 ) === Object.prototype ); // 输出：true

2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。

但在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我
们所需要做的只是显式地调用 var obj1 = new Object() 或者 var obj2 = {} 。此时，引擎内部会从
Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。
再来看看如何用 new 运算符从构造器中得到一个对象，下面的代码我们再熟悉不过了：
function Person( name ){
this.name = name;
};
Person.prototype.getName = function(){
return this.name;
};
var a = new Person( 'sven' )
console.log( a.name ); // 输出：sven
console.log( a.getName() ); // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype ); // 输出：true

3.对象会记住它的原型

JavaScript 给对象提供了一个名为 **proto** 的隐藏属性，某个对象的 **proto** 属性默认会指
向它的构造器的原型对象，即 {Constructor}.prototype 。在一些浏览器中， **proto** 被公开出来，
我们可以在 Chrome 或者 Firefox 上用这段代码来验证：
var a = new Object();
console.log ( a.**proto**=== Object.prototype ); // 输出：true

4.如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

```
    var obj = { name: 'sven' };
    var A = function(){};
    A.prototype = obj;
    var a = new A();
    console.log( a.name ); // 输出：sven
我们来看看执行这段代码的时候，引擎做了哪些事情。
首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性。
查找 name 属性的这个请求被委托给对象 a 的构造器的原型，它被 a. __proto__ 记录着并且
指向 A.prototype ，而 A.prototype 被设置为对象 obj 。
在对象 obj 中找到了 name 属性，并返回它的值。


```

#### 1.4.6 原型继承的未来

```
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        return "woof";
    }
}
var dog = new Dog("Scamp");
console.log(dog.getName() + ' says ' + dog.speak());
```
