
/**
 * parasm {domBox,wrapBox} 当前元素 和当前元素的父亲元素如果没有表示整个body
 */
class Drag {
    constructor(options = {}) {
  
      this.options = {
        domBox: null,
        wrapBox: document.body,
        ...options
      }
      this.init()
    }
    getSafeDis({ type = 'x', val = 0 } = {}) {
      let { domBox, wrapBox } = this.options;
      let maxW = wrapBox.clientWidth - domBox.clientWidth;
      let maxH = wrapBox.clientHeight - domBox.clientHeight;
      if (type === 'x') {
        if (val >= maxW) {
          val = maxW
        }
  
      } else {
        if (val >= maxH) {
          val = maxH
        }
      }
      return val <= 0 ? 0 : val;
    }
    init() {
      let that = this;
      let { domBox, wrapBox } = this.options;
      let x = 0, y = 0;
      domBox.onmousedown = function (e) {
  
        x = e.x - domBox.offsetLeft
        y = e.y - domBox.offsetTop
        document.onmousemove = function (e) {
          let disX = e.x - x;
          let disY = e.y - y;
          disX = that.getSafeDis({
            type: 'x',
            val: disX
          })
          disY = that.getSafeDis({
            type: 'y',
            val: disY
          })
  
          domBox.style.left = disX + 'px'
          domBox.style.top = disY + 'px'
        }
        document.onmouseup = function () {
          document.onmouseup = null
          document.onmousemove = null
        }
      }
    }
  }
  export default Drag;