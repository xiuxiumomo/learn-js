//观察者模式

class Dom {
  constructor() {
    this.events = {

    }
  }
  addEventListen(event,handler) {
    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler)
  }
  removeEventListen(event,callback) {
    if(!this.events[event]) {
      return
    }
    let _index = this.events[event].indexOf(callback);
    if(_index>0) {
      this.events[event].splice(_index,1)
    }
  }
  fireEvent(event) {
    if(!this.events[event]) {
      return 
    }
    this.events(event).forEach((callBack)=>{
      callBack()
    })
  }
}