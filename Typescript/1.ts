// let age: number = 10;
// let uname: string = 'jack';
// let list: Array<number> = [1, 2, 3];
// let x: [string, number] = ['kk', 12];
// let c: any = 'kkk';
// enum Status { Success = 'success', Fail = 'fail', Warning = 'warning' }
// let code: Status = Status.Fail
// console.log(age, uname, list, x, c,code)

// function getData(params = {}) {

//     console.log(params)
// }
/**1.普通参数是一个对象
 * function getData(params={}) {}
 * 2. 解构参数
 * function getData({name,age = 10}= {})
 * 3.接口
 * interface Params{
    name: string;
    age?: number
    }
 * function getData(params: Params) {console.log(params)}
 */
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let p1: Point = { x: 10, y: 20 }
// console.log(p1.x)

// let a: Array<number> = [1,2,3];
// let ro: ReadonlyArray <number> = a;

interface SearchFn {
    (param1: string,param2: string): boolean
}
let fn: SearchFn
fn = function(param1: string,param2: string): boolean {
    console.log(param1,param2);
    return true
}
fn('a','b')


