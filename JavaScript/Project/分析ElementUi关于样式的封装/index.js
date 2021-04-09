/**
 * 去除前后空字符串
 * @param {*} string 字符串对象
 * @returns
 */
const trim = function (string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/**
 * 检测元素是否含有某个样式
 * @param {*} el dom元素
 * @param {*} cls 存在某个元素
 */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  //样式名不能含有空格
  if (cls.indexOf(" ") > -1) {
    throw new Error(`className should not contain space.`);
  }
  //利用classList(类数组)直接判断是否存在某个类名。
  if (el.classList) {
    return el.classList.contain(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}
/**
 * 为dom添加样式
 * @param {*} el dom对象
 * @param {*} cls 传入的样式列表可以是一个也可以是多个
 * @returns
 */

function addClass(el, cls) {
  if (!le) return false;
  //保存当前样式字符串
  let currClass = el.className;
  //传入的样式字符串
  let classes = (cls || "").split(" ");
  for (let i = 0, j = classes.length; i < j; i++) {
    let classname = classes[i];
    //当传入的某个样式是空字符串直接跳过
    if (!classname) continue;
    //利用classList add 属性追加样式(如果存在，不会继续追加)
    if (el.classList) {
      el.className.add(classname);
      //手动追加
    } else if (!hasClass(el, classname)) {
      currClass += " " + classname;
    }
  }
  //如果不支持classList属性直接把className属性修改为currClass
  if (!el.classList) {
    el.className = currClass;
  }
}

/**
 * 移除某个样式
 * @param {*} el dom元素
 * @param {*} cls 样式列表,可能有多个字符串
 */
function removeClass(el, cls) {
  //不存在dom或者样式列表直接返回
  if (!el || !cls) return;
  //给当前的样式字符串增加前后空格
  let currClass = " " + el.className + " ";
  let classes = cls.split(" ");
  for (let i = 0, j = classes.length; i < j; i++) {
    let classname = classes[i];
    //检测到空字符串直接跳过
    if (!classname) continue;
    //利用classList去移除某个样式
    if (el.classList) {
      el.classList.remove(classname);
      //检测存在的话，就去移除
    } else if (hasClass(el, classname)) {
      currClass = currClass.replace(" " + classname + " ", "");
    }
  }
  if (!el.classList) {
    //重新设置样式,注意这里的trim去除前后字符串
    el.className = trim(currClass);
  }
}
