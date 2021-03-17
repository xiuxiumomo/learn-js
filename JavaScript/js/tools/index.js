//重写 requestAniFrame
window.requestAniFrame = (function () {
  return (
    window.requestAnimationFrame ||
    // Older versions Chrome/Webkit
    window.webkitRequestAnimationFrame ||
    // Firefox < 23
    window.mozRequestAnimationFrame ||
    // opera
    window.oRequestAnimationFrame ||
    // ie
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**
 * 注意 window.scrollTo() 在IE中behave属性不支持
 */
export function scrollTop() {
  let scrollH = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollH > 0) {
    window.scrollTo(0, scrollTop - scrollTop / 8);
    window.requestAnimationFrame(scrollTop);
  }
}
/**
 *
 * @param {*} min 最小数
 * @param {*} max 最大数
 * 如果不传最大值，取值 0-min
 */
export function getRandom(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random * (max - min + 1));
}

/**
 *
 * @param {*} arr  数组
 * @param {*} rank +1 升序 -1 降序
 */
function arraySort(arr, rank = 1) {
  let isArray = Object.prototype.toString.call(arr) === "[object Array]";

  if (!isArray) return arr;
  //升序
  if (rank === 1) {
    return arr.sort((a, b) => a-b);
  } else {
    //降序
    return arr.sort((a, b) => b-a);
  }
}

/**
 * 
 * @param {*} nameString  dom身上的class
 * @param {*} targetClass 要删除的target
 * @returns 
 */
function deleteClass(nameString,targetClass) {
  let classNames = nameString.split(/\s+/);
  let idx = classNames.indexOf(targetClass);
  if(idx>-1) {
    classNames.splice(i,1);
  }
  return classNames.join(" ")
}