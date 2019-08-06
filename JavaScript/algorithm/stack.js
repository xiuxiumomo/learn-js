class Stack {
    constructor() {
        this.items = [];
    }
    push(el) {
        this.items.push(el)
    }
    pop() {
        this.items.pop()
    }
    peek() {
        return this.items[this.items.length];
    }
    isEmpty() {
        return this.items.length === 0
    }
    clear() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
}
export default Stack;