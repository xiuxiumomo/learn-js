// - enqueue(el) 向队列尾部添加一个新的元素
// - dequeue() 移除队列的第一项，返回被移除的元素
// - front() 返回队列中的第一个元素 队列不变
// - tail() 返回队列中的最后一个元素，队列不变
// - isEmpty() 判断队列是否为空
// - print() 打印队列所有元素
class Queue {
    constructor() {
        this.items = [];
    }
    //向队列的尾部插入一个元素
    enqueue(el) {
        this.items.push(el)
    }
    //删除队列第一个元素并返回
    dequeue() {
       return this.items.shift();
    }
    //获取队列第一个元素
    front() {
        return this.items[0];
    }
    //返回队列最后一个元素
    tail() {
        return this.items[this.items.length];
    }
    //判断队列是否为空
    isEmpty() {
        return this.items.length===0;
    }
    //返回队列的长度
    size() {
        return this.items.length;
    }
    //打印队列元素
    print() {
        return this.items.toString();
    }
}
export default Queue;