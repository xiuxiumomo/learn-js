## 字符串
> 在javascript中字符串的每个元素，在字符串中都占据一个位置,第一个元素的索引值为0，往后加1

- 1.字面量创建
~~~
let a = 'hello'
typeof a 

let a = new String('123')
typeof a 

let a1 = '1+1'
let a2 = new String('1+1')
eval(a1) 2
eval(a2) '1+1'
~~~
在实际开发中尽量使用字面量的形式，因为二者的差异很大,string有一个length属性，返回其长度。

### 1.String对象的方法
- chartAt,chartCodeAt,codePointAt  返回字符串指定位置的字符或者字符编码
- indexOf,lastIndexOf 分别返回指定位置或最后位置
- startsWith, endsWith, includes 字符串是否以自定的字符串开始，或是否包含某字符
- concat 连接两个字符串
- fromCharCode,fromCodePoin 从指定的Unicode值序列够高一个字符串
- split 按指定的字符分割字符串返回数组
- slice() 截取字符串
- substring,substr 分别通过指定起始和结束位置，起始位置和长度来返回字符串的指定子集。
- match,replace, search 正则表达式方法
- toLowerCase,toUpCase 大小写转换
- normalize 序列号
- repeat 将字符串内容重复n次返回
- trim 去掉开头和结尾的空格
### 1.1 chartAt str.charAt(index)
~~~
//index 若小于0则返回'',若不传则默认为0
let a = 'abc'
a.charAt(0) //a
~~~
### 1.2indexOf和lastIndexOf 两者接收的参数一致，没有查到内容，返回 -1。
~~~
let a = 'hello'
a.indexOf('h') //0
~~~
### 1.3concat
~~~
let a = 'hello'
let b ='jack'
a.concat(b) //hellojack
~~~
### 1.4split() 按指定的字符分割 split(sep,limit) //limit指定返回的最大数组长度
~~~
let str = 'hello jack'
str.split(' ') //[hello,jack]
~~~

### 1.5slice() 提取返回字符串的片段 
~~~
//含前不含后如果只传一个参数，从该参数开始截取所有 如果尾部是负数则从尾部开始算
let str = 'hello world?'
str.slice(0,3) //hel 
str.slice(0,-1) //hello world
~~~

### 2.字符串的扩展方法（ES6）
### 2.1.includes() startsWith() endsWith()
- includes 返回布尔值 表示是否找到字符串
- startsWith 返回布尔值 表示参数字符串是否在原字符串的头部
- endsWith 返回布尔值 表示数字字符串是否在原字符串的尾部
~~~
let str = 'hello world'
str.includes('hello') //true
~~~
### 2.2repeat() 返回一个重复n次的字符串
~~~
let str = 'aaabbb'.repeat(2) //'aaabbbaaabbb'
~~~

### 2.3padStart() ,padEnd() 
用于将字符串头部或尾部补全长度， padStart()为头部补全， padEnd()为尾部补全。
这两个方法接收2个参数，第一个指定字符串最小长度，第二个用于补全的字符串。

~~~
'x'.padStart(5,'ab') //ababx
'x'.padEnd(5,'xabab') //xabab
//如果不传第二个参数用空格补齐
'x'.padStart(4) //'    x'

~~~


