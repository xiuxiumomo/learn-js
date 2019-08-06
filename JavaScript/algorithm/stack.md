## 栈
> 栈又称为堆栈，是一种后进先出的有序集合，添加元素称之为入栈(改变栈的长度)，删除元素称之为出栈(删除并返回一个该元素)

### 1.实现一个栈，和栈的以下方法。
- push(el): 添加一个元素到栈顶
- pop(): 移除栈顶的元素，返回被移除的元素
- peek(): 返回栈顶的元素
- isEmpty(): 如果是空返回true否则false
- clear(): 清空栈
- size(): 返回栈的长度

~~~
//stack.js

~~~
## 队列
> 队列queue,先进先出的线性表。队列只允许在后端进行插入操作，在前端进行删除操作。栈与队列的区别，队列只允许新数据在后端进行添加。
### 1.实现一个队列和队列的以下方法
- enqueue(el) 向队列尾部添加一个新的元素
- dequeue() 移除队列的第一项，返回被移除的元素
- front() 返回队列中的第一个元素 队列不变
- tail() 返回队列中的最后一个元素，队列不变
- isEmpty() 判断队列是否为空
- print() 打印队列所有元素
~~~
//queue.js
~~~
### 2.使用队列计算斐波那契数列第n项 
> 斐波那契数列 1,1,2,3,5...规则第一项第二项为1以后的每一项是前两项的和。
~~~
//先引入Queue
function getData(n) {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(1);
    let index = 0;
    while(index<n-2) {
        index+=1;
        const delItem = queue.dequeue(); //头部被删除的元素
        const firstItem = queue.front(); //第一个元素
        const nextItem = firstItem+delItem; //下一个元素
        queue.enqueue(nextItem); //添加
    }
    return queue.tail();
}
~~~