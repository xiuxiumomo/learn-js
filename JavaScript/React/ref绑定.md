~~~
//父组件 ref的获取方式
   childRef = (el) => {
    this.child = el
  }
  //调用子组件的方法
  getName=()=>{
    this.child.getName()
  }
  
  //引入时
   <Test ref={this.childRef}></Test>
   
   //子组件
   import Taro, { Component } from '@tarojs/taro'
   import { View  } from '@tarojs/components'
   class JoinTo extends Component {
       
       state = {
          
       }
       componentDidMount() {
         
       }
       getName=()=>{
           console.log('jack')
       }
     
       render() { 
          
           return (
               <View className='join-to'>
                  test
               </View>
           )
       }
   }
   export default JoinTo
~~~
