

var Foo = (function (moduleName) {
  moduleName.baz = function () {
    return moduleName.bar;
  };
  return moduleName
})(Foo || {});


console.log(Foo);
