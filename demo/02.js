let a = { name: 123 };
function getA() {
  return this.name;
}

Function.prototype.myCall = function (_obj) {
  let obj = _obj || window;
  obj.fn = this;
  let arg = [...arguments].splice(1);
  let res = obj.fn(...arg);
  delete obj.fn;
  return res;
};


let res = getA.myCall(a)
console.log(res)