function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    return this.name;
  };
}
Person.prototype.sex = 'man'
let p = new Person('jack',20)
console.log(p.hasOwnProperty('name'))
console.log(p.hasOwnProperty('sex'))
console.log('sex' in p)