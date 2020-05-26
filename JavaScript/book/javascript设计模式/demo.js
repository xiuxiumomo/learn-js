
var plus = function() {
    var total = 0;
    for(var i=0,l=arguments.length;i<l;i++) {
        total+=l[i]
    }
    return total;
}

var proxyFn = (function(){
    var cache =[];
    return function(fn) {
        var args = Array.prototype.join.apply(arguments,',');
        if(args in cache) {
            return cache[args]
        }
        return cache[args] = fn.apply(this,arguments)
    }

})()
var add = proxyFn(plus);
console.log(add(1,2,3))