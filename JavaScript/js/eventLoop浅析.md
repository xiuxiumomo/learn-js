## eventLoop简介
> js是通过事件队列的方式来实现异步回调的

## 1.从EevntLoop看事件执行机制
- 1.js分为同步任务和异步任务
- 2.同步任务都在js引擎上执行的，形成一个执行栈
- 3.事件触发线程管理一个任务队列，异步任务触发条件达成，将回调事件放到任务队列中
- 4.执行栈中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行。

```
let fna = function() {
    console.log(1)
}
let fnb = function() {
    console.log(2)
}
setTimeout(fnb,1000)
console.log(3)

//fna ,setTimeout, console.log 同时执行 先返回 1 再返回3 同步任务结束后添加回调函数到执行栈中 返回2
```

## 2.宏任务和微任务
> 1.我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。2.我们已经知道宏任务结束后，会执行渲染，然后执行下一个宏任务， 而微任务可以理解成在当前宏任务执行后立即执行的任务。

```
//宏任务
//document.body 住代码块算一次宏任务 setTimeout setInterval 算一个宏任务
document.body.style = 'background:blue';
setTimeout(function(){
    document.body.style = 'background:black'
},0)
```

```
//微任务
//执行doucment.body.style 立即执行Promise 方法

document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()=>{
    console.log(2);
    document.body.style = 'background:black'
});
console.log(3);

```