function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    return this.name;
  };
}

let p = new Person('jack',20)

console.log(Person.constructor)
