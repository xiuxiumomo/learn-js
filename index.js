// 函数接受另一个函数A作为参数，运行后返回一个新的函数，新函数具有处理A参数的能力

function currying(fnc, arg = []) {
  let articy = fnc.length;
  return function (..._arg) {
    let that = this;
    _arg.unshift(...arg);
    if (_arg.length < articy) {
      return currying.call(that, fnc, _arg);
    }
   
    return fnc(..._arg);
  };
}

function A(name,age) {
  return `${name}-${age}`
}

let caculateFn = currying(A);
let san = caculateFn('张三');
let res = san('4')
console.log(res)