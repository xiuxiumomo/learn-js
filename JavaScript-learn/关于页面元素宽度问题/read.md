## 理解页面元素的高度
> 关于页面中的clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop等系列名称以及代表的含义。
* clientHeight:元素的高度。计算方法height+padding-top+padding-bottom
* offsetHeight:元素的高度。计算方法height+padding-top+padding-bottom+border*2 比上面的一种多了边框的高度。
* scrollHeight:元素的滚动高度。例如：A DIV子元素B DIV A设置overflow:scroll 那么A的scrollHeight就是B的offsetHeight
```
#box-1{
    width: 500px;
    height: 500px;
    overflow: scroll;
    background: #ccc;
}
#box-1-1{
    height: 800px;
    background-color: #999;
    padding: 20px;
    border: 2px solid #CC0000;
}

let clientHeight = document.getElementById('box').clientHeight; // padding(*2)+height
let offsetHeight = document.getElementById('box').offsetHeight; // border(*2)+padding(*2)+height
let scrollHeight = document.getElementById('box-1').scrollHeight; // box-1的scrollHeight 是box-1-1的offsetHeight
let winHeight = document.documentElement.clientHeight; //当前页面的宽度
let offSetHeight = document.getElementById('box-1').offsetTop; //相对于网页顶部的距离 164box的offsetHeight

```

![img](https://user-gold-cdn.xitu.io/2019/5/31/16b0d3c40a26b026?w=523&h=519&f=png&s=2815)
* offsetTop: 元素偏移量。


![](https://user-gold-cdn.xitu.io/2019/5/31/16b0d40268b6d476?w=503&h=647&f=png&s=4415)
此时b的偏移量就是a的offsetHeight.
> 页面中关于window的操作1.判断滚动条是否到达底部
~~~
window.addEventListener('scroll',function(){
    let scrollHeight = document.documentElement.scrollHeight; //滚动页面高度
    let scrollTop = document.documentElement.scrollTop; //window滚动条
    let wHeight = document.documentElement.clientHeight; //window高度
    if(scrollTop+wHeight>=scrollHeight){
        console.log('滚动到底了');
    }else{
        console.log('没到')
    }
})
~~~
> 判断页面是否滚动到某个元素了
~~~
function isToAim(){
    let offsetTop = document.getElementById('box-3').getBoundingClientRect().top; //代替offsetTop 必须放在scroll外面，否则没滚动一次会重新计算
    window.addEventListener('scroll',function(){
        let winHeight = document.documentElement.clientHeight;
        let scrollTop= document.documentElement.scrollTop;
        return offsetTop<=(scrollTop+winHeight);
    })
}
~~~

~~~
function isToAim(){
    window.addEventListener('scroll',function(){
        let offsetTop = document.getElementById('box-3').offsetTop; //固定值
        let winHeight = document.documentElement.clientHeight;
        let scrollTop= document.documentElement.scrollTop;
        return offsetTop<=(scrollTop+winHeight);
    })
}
~~~

![](https://user-gold-cdn.xitu.io/2019/5/31/16b0d6af32f4bee6?w=667&h=438&f=jpeg&s=23133)

> 关于document.documentElement与document.body区别
* document.documentElement获取的是<html>标签而document.body获取页面的body标签
* chrome某些版本只能通过document.body获取scrollTop.IE用document.documentElement获取
~~~
//优化代码
function isToAim(){
    window.addEventListener('scroll',function(){
        let offsetTop = document.getElementById('box-3').offsetTop; //固定值
        let winHeight = document.documentElement.clientHeight||document.body.clientHeight;
        let scrollTop= document.documentElement.scrollTop||document.body.scrollTop;
        return offsetTop<=(scrollTop+winHeight);
    })
}
~~~
