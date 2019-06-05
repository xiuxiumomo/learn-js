## 小程序实现文章内容分页
---
> 前言小说类小程序文章内容实现自动分页+插入小程序广告。这个功能市面上大部分h5不支持，小程序也很少有。公司业务需求实现该功能。
* 思路1用css3的栅格布局具体参考:[张鑫旭](https://www.zhangxinxu.com/wordpress/2017/02/css3-multiple-column-layout-read-horizontal/)的博客
* 思路2用计算的方法实现

最后前面的方法效果不佳(广告插入的位置以以及分页数的计算)放弃了。实现效果如图
![](https://user-gold-cdn.xitu.io/2019/6/3/16b1c870779855c5?w=369&h=598&f=jpeg&s=59434)

![](https://user-gold-cdn.xitu.io/2019/6/3/16b1c86765030881?w=369&h=597&f=jpeg&s=56918)
![](https://user-gold-cdn.xitu.io/2019/6/5/16b26c2afabff986?w=369&h=647&f=gif&s=1142214)

需求：1 根据不同字体大小，计算一个章节能分多少页。2 根据不同手机大小，计算一个章节能分多少页。3 点击屏幕左边回到上一页，点击屏幕右边实现下一页 4 每三页插入一段广告，且广告的位置处于文章中间位置。


实现原理：a.接口请求文章内容后，根据换行符把数据存储在一个数组中类似
~~~
let arr = ['第一段第一段第一段...','第二段第二段....'];
~~~
b.计算当前屏幕宽度下每一行有多少个文字
~~~
let num = Math.floor(winW/fontSize);
~~~
c.遍历总共的组数，把每一项分割，push到新数组中
d.计算每一页一共有多少行
~~~
 let row = Math.floor(winH / (fz * 2));
~~~
e.遍历c得到的数组%row得到每页展示的内容
~~~
page({
    data: {
        winW: 0, //屏幕宽度
        radio: 1, //比例
        pageContentData: [],
        page: 0,
    },
    drawpageFn(){
        let that = this;
        let winW = wx.getSystemInfoSync().windowWidth;
        let radio = (winW / 750);
        let winH = wx.getSystemInfoSync().windowHeight;
        that.setData({
            winW:winW-30,
            contentH: winH-60, //左右翻页高度
            radio
        })
        that.lineFn(that.data.content, that.data.fontSzie * that.data.radio)

    },
     //计算行数
    lineFn(content,fz){
        let that = this
        let winW = this.data.winW;
        let num = Math.floor(winW / fz); //每一行的字数
        // 计算好的最终结果
        let calcData = [

        ];
        content.forEach((item, index) => {
            // 计算一段文字需要几行
            let line = 0
            if (item.length <= num - 2) {
                line = 1
            } else {
                let s = item.length - (num - 2)
                line = Math.ceil(s / num) + 1
            }
            for (let i = 0; i < line; i++) {
                let lineData = {
                    first: false,
                    last: false,
                    content: '',
                    num: 0
                }
                if (i == 0) {
                    lineData.first = true
                    lineData.content = item.slice(0, num - 2);
                    if(lineData.content.length==num-2){
                        lineData.is_full = true;
                    }
                } else {
                    if (i == line - 1) {
                        lineData.last = true
                    }
                    let w_num = item.slice(i * num - 2, num * i + num - 2);
                    lineData.content = w_num;
                }
                lineData.num = lineData.content.length;
                if(lineData.num==num){
                    lineData.is_full = true;
                }
                calcData.push(lineData)
            }
        })

        calcData.unshift({
            first: false,
            last:false,
            content: that.data.title,
            is_title: true
        })
        that.pageFn(that.data.contentH, that.data.fontSzie * that.data.radio, calcData)
    },
      //计算页数
    pageFn: function(winH, fz, arr) {

        let row = Math.floor(winH / (fz * 2));

        let result = [];
        let _index = 0;
        for (let i = 0; i < arr.length; i++) {
            if(i % row ==0 && i>0){
                result.push(arr.slice(_index, _index + row));
                _index = i;
                if(i%(row*2)==0){
                    result.push(arr.slice(_index, i+row-3));
                    _index = _index+row-3;
                }
            }
        }
        //插广告
        result.forEach((item,index)=>{
            let currItem = item;
            for(let i=0;i<currItem.length;i++){
                let mid = Math.ceil(currItem.length/2);
                if((i+1)==mid){
                    currItem[i].is_adv = true;
                }
            }

        })

        this.setData({
            pageContentData: result,
            page: 0,
        })
    },


})
~~~
每一页的数据

![](https://user-gold-cdn.xitu.io/2019/6/3/16b1c987925e0b0a?w=339&h=617&f=jpeg&s=29227)


以上：具体效果搜小程序搜十音文学





