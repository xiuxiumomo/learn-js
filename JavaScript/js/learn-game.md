## 编程游戏
```
//replace 的第二个参数可以是一个函数遍历匹配到的所有

String.prototype.toJadenCase = function () {
    return this.replace(/(^| )(\w)/g, function (s) {
        console.log(s)
        return s.toUpperCase();
    });
};

let res = 'How old are you';
console.log(res.toJadenCase()) //How Old Are You
```

```


function digital_root(n) {
    if (n <10 ) {
        return n
    }else{
        let num = String(n).split('');
        let sum = 0;
        for(let i=0;i<num.length;i++) {
            sum+=Number(num[i])
        }
        if(sum>=10) {
            return digital_root(sum)
        }else{
            return sum
        }
    }

}
console.log(digital_root(165)) 
```