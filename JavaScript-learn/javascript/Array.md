## 总结一下数组Array常用的方法和特性
> 前言数组是javascript种一个非常重要的数据结构。数组是一个有序的数据集合，使用数组名称和索引进行访问。
## 1.创建数组
~~~
let arr = [];
let arr = new Array();
let arr = Array();
~~~
### 2.使用数组
### 2.1简单的使用数组
~~~
let arr = [1,2,3];
a[0] //1
arr.length //3
~~~
### 2.2了解数组length属性
- 数组的索引值从0开始，从0开始一次增加1
- 数组的length永远返回数组最后一个元素的索引值+1
- 可通过arr.length =0;来清空数组
- 可通过arr.length = len来设置数组长度。
### 2.3遍历数组
- for循环
- 使用for in 遍历
- 使用forEach 遍历
~~~
let arr = [1,2,3];
for(let i=0;i<arr.length;i++){
    console.log(arr[i])
}
for(let i in arr){
    console.log(arr[i])
}
arr.forEach((item)=>{
    console.log(item)
})
~~~
## 3.数组的方法
### 3.1 concat()和join()
> concat 一个数组与另一个或多个数组合并组成新数组，join 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
- arr.concat(arr1,arr2,...);
- arr.join(str)
~~~
let arr = [1,3];
arr.concat([4,5]);
arr.join('-')
~~~
### 3.2 pop()和push()
- pop():删除并返回数组的最后一个元素，原数组会改变。
- push(item):向数组的尾部添加一个或多个元素，改变原数组，返回的是新数组的长度

~~~
let arr = [1,2,3];
console.log(arr,arr.pop()); //[1,2] 3

let len = arr.push(4)
console.log(len,arr) //4, [1,2,3,4]
~~~

### 3.3 shift()和unshift()
- shift(): 删除并返回数组的第一个元素，改变元素组。
- unshift(): 从数组的头部插入一个元素并返回数组的长度。

### 3.4 reserve() 颠倒数组的顺序
~~~
let arr = [1,3,4,5];
arr.reserve() //[5,4,3,1]
~~~
### 3.5 slice()和splice()
- slice(start,[end]) 提取指定位置的片段返回数组，原数组不变。[start,end)
- splice(start,num)  删掉数组中指定位置的元素并返回成数组。原数组会改变。
~~~
let arr = [1,2,3,4];
arr.slice(1,3) //[2,3] 
~~~




