## BFC原理
- 内部Box会在垂直方向一个接一个的放置
- Box垂直方向的下边距会产生堆叠
- BFC中盒子会与紧贴左边
- 形成BFC的区域不会与float box重叠
- 计算BFC高度时，浮动元素也参与计算
### BFC作用
- 清除浮动
- 防止同一个BFC容器中的相邻元素垂直方向上的外边距重叠问题

### 1.发生外边距叠加
~~~
.out-box {
    width: 500px;
    height: 500px;
    background-color: #ccc;
}

.box-1 {
    width: 100px;
    height: 100px;
    margin-bottom: 100px;
    background-color: #333;
}

.box-2 {
    width: 100px;
    height: 100px;
    margin-top: 50px;
    background-color: #333;
}

<div class="out-box">
    <div class="box-1"></div>
    <div class="box-2"></div>
</div>
详见html
~~~

### 2.清除浮动(触发bfc)
~~~
    .clearfix {}

    .clearfix::after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
    <div class="box-1"></div>
    我是一段文字
    <div class="clearfix"></div>
~~~

### 3.阻止元素被浮动的元素覆盖

~~~
.box-1 {
        width: 100px;
        height: 100px;
        background-color: #333;
        float: left;
    }
    
    .box-2 {
        width: 300px;
        height: 300px;
        background-color: #ccc;
    }
     .clearfix::after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
<div class="box-1"> 我是一段文字</div>

<div class="box-2">visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0;visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0;</div>
<div class="clearfix"></div> //触发bfc消除影响
~~~

