## javascript中关于对象的使用
> JavaScript的对象是一些列属性的集合，一个属性包含一个键值对(名称区分大小写A和a是不同属性)。

## 1.创建对象的方法
~~~
let obj = new Object();

let obj = {};
~~~

### 1.1设置对象属性
~~~
 //创建时设置
 let obj = {
    name: "张三"
 }

 //直接设置
 let obj = {}
 obj.name = '张三';
~~~

### 1.2访问属性

~~~
let obj = {
    name: '张三'
}
obj.name
obj[name]
~~~

## 2.枚举对象的所有属性
* for in遍历
* Object.keys(o)
* Object.getOwnPropertyNames(o)

### 2.1 for in 循环 访问一个对象及其$\color{#ff0000}{原型链}$中所有可枚举属性(不推荐使用)
~~~
let obj = {
    name: '张三',
    age: 12
}
for(let k in obj){
    console.log('key-'+k+'-value-'+obj[k])
}
//不推荐的原因 let arr = ['a','b','c']
Array.property.test = 'd';
//使用for in 循环会循环出d
~~~

### 2.2Object.keys(o) 遍历该方法返回一个对象自身($\color{#ff0000}{不包含原型中}$)的所有key的数组集合(推荐使用)。
~~~
let obj = {
    name: '张三',
    age: 12
}
let arr = Object.keys(obj);
arr.forEach((val)=>{
    console.log("key-"+val+"-value-"+obj[val])
})
~~~

### 2.3Object.getOwnPropertyNames(o)该方法返回一个数组返回所有属性，$\color{#ff000}{无论书否可枚举}$的名称
~~~
let obj = {
    name: '张三',
    age: 12
}

Object.defineProperty(obj,'FnB',{
    enumerable: false,
    value: function(){}
}) //定义一个不可枚举的属性

let arr = Object.getOwnPropertyNames(obj);


arr.forEach((val)=>{
    console.log("key-"+val+"-value-"+obj[val])
})
~~~

## 3.对象的扩展
---
### 3.1属性的简洁性
~~~
let a = 'aaa';
let b = {a};
~~~
### 3.2Object.is()
> 判断两个值相等Es5时可以用==或者=== 前者会制动转化类型后者+0 -0 NaN无法判断。
~~~

function isEqual(a,b){
    return Object.is(a,b)
}
let a = isEqual(NaN,NaN); //true ===判断时会是false
let a = isEqual(+0,-0); //false ===判断时会是true

~~~

### 3.3Object.assign()
> 将多个对象的所有可枚举属性合并到同一个对象身上 ,注意如果两个对象有同样的属性，后者会覆盖前者。
~~~
let a = {name:'aaa'};
let b = {age:12};
Object.assign(a,b);

~~~

### 3.4Object.values(),Obejct.entries()(Es8)
> Object.values()返回值的数组集合，Object.entries返回键值对
~~~
let obj = {
    name: 'lee',
    age: 12
}
let a = Object.values(obj); //['lee',12]
let b = Object.entries(obj); //[['name','lee'],['age',12]]

~~~

## 4.对象的扩展运算符
### 4.1赋值运费
~~~
    let {x,y,...z} = {x:1,y:2,a:3,b:4};
    x:1
    y:2
    z: {a:3,b:4}
~~~
### 4.2实现浅拷贝
~~~
let a = {a:1}
let b= {b:2}
//Object.assign(a,b)
let c = {...a,...b};
~~~



