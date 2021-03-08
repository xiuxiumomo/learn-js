## 1.检测元素是否含有指定的类

```
export function hasClass(el,className) {
    return el.classList.includes(className)
}
```

## 2.页面平滑滚动到顶部

```
window.requestAniFrame = (function () {
    return window.requestAnimationFrame ||

        // Older versions Chrome/Webkit
        window.webkitRequestAnimationFrame ||

        // Firefox < 23
        window.mozRequestAnimationFrame ||

        // opera
        window.oRequestAnimationFrame ||

        // ie
        window.msRequestAnimationFrame ||

        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})()


export function scrollTop() {
    let scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollH>0) {
        window.scrollTo(0,scrollTop-scrollTop/8);
        window.requestAnimationFrame(scrollTop)
    }
}
```
