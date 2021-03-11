let person = {
  age: 20
}

Object.defineProperty(person,'name',{
  configurable: true,
  enumerable: false,
  writable: true,
  value: undefined
})


for(let k in person) {
  console.log(k)
}