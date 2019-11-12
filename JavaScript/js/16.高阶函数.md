## 高阶函数
> 概念一个函数的参数是另一个函数可以称为高阶函数
~~~
let FnA = function(x) {
    return x+'hello'
}
function FnB(Fn,name){
    return Fn(name);
}
FnB(FnA,'jack') //jackhello
~~~
### 1.map函数接收一个函数当参数，，依次调用数组的每一个元素，结果：返回一个新数组，原数组不变。
arr.map(callback())
~~~
let arr = [-1,23,4,-5];
let arr2 = arr.map(Math.abs) //[1,23,4,-5]
~~~
### 2.reduce() 接收一个函数，对数组进行累加操作，把累计结果和下一个值进行操作，最后返回单个结果
~~~
/**
callback()的
`params
returnValue 上一次的处理结果，或者初始值(*)
currentValue 当前处理的元素的值
currentIndex 当前索引
array`
initValue初次调用callback的时候returnValue值默认是数组的第一个元素，可选

**/
arr.reduce(callback())
let arr = [1,4,5,6,34]
arr.reduce((res,curr)=>{return res+curr})
let arr2 = [[2,4,7],[3,5,6],[6,7]];
arr2.reduce((res,curr)=>{return res.concat(curr)});
~~~

### 3.filter()过滤函数,返回一个过滤剩下的新数组,原数组不变
~~~
let arr = [null,undefined,1,3,'','a'];
arr.filter((item)=>{return item&&item.trim()})

~~~

### 4.sort()排序
对数组sort排序sort((a,b)=>{return a-b}) fun(a,b) 若a小于b a排在b的前面否则a排在b的后面，也就是说函数的返回值大于0 a和b交换位置。\
利用sort((a,b)=>{return a-b}) 对数组进行升序排序
~~~
let arr = [5,1,3,6,4,7].sort((a,b)=>{return a-b});

~~~
### 网页定时器requestAnimFrame
> 前言:requestAnimFrame是h5新的api目前支持高版本的浏览器(只能在网页中使用),该方法保持与浏览器同步帧数刷新频率60hz,用于动画等提高性能。


~~~
//定义
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

    //使用
 var demo = document.getElementById('demo');
    function rander(){
        demo.style.left = parseInt(demo.style.left) + 1 + 'px'; //每一帧向右移动1px
    }
    window.requestAnimationFrame(function(){
        rander();
        //当超过300px后才停止
        if(parseInt(demo.style.left)<=300){
            requestAnimationFrame(arguments.callee);
        }
    });
~~~


注明：该文章是在原文[前端自习课](https://mp.weixin.qq.com/s/-HPtViPA926BwNp599555w)修改而得，感谢原作者！
