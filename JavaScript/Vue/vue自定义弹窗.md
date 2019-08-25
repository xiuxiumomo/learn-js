## vue自定义弹窗
> 前言: 弹窗等基础组件很多UI框架都自带有，且为基础组件。但有些时候与实际工作中ui不太一样还需要自己定义。

## 1.分析弹窗的结构
弹出结构一般是一个rgb为黑色的透明层+一层白色的绝对居中的白色内容层。
- 标题文字一般都是居中
- 内容不固定外部传入
- 底部可以只是一个按钮或两个按钮，出现一个确定按钮或出现确定与取消按钮。

所以页面的结构可以写成
~~~
<template>
  <div class="dialog" >
    <div class="mask"  @click="cancel"></div>
    <div class="dialog-content">
      <!-- 标题 -->
      <h3 class="title">{{ modal.title }}</h3>
      <!-- 自定义内容 -->
      <slot name="content"></slot>
      <!-- 按钮组 -->
      <div class="btn-group" v-if="footerType==1">
        <div class="btn" @click="cancel">{{ modal.cancelButtonText }}</div>
        <div class="btn" @click="submit">{{ modal.confirmButtonText }}</div>
      </div>
      <!-- 按钮组 -->
      <div class="btn-group" v-else>
        <div class="btn" @click="cancel">{{ modal.cancelButtonText }}</div>
        <div class="btn" @click="submit">{{ modal.confirmButtonText }}</div>
      </div>
    </div>
  </div>
</template>

~~~
## 2.功能分析
### 2.1options默认选项
默认选项是一个对象包含标题，按钮种类，按钮文字按钮上的颜色等。

### 2.2回调函数
点击确定或者取消分别触发回调，或者点击灰色背景也能触发取消大的回调。回调可以用emit触发或者用promise传递。
- 点击确定触发确定回调 successCallback
- 点击取消触发取消回调 cancelCallback
- 传递回调的方式

两种方式对比一下emit需要写两个函数，promise只有一个函数但是需要ref钩子。
~~~

<script>
export default {
  name: "MyModal",
  props: {
    options: {
      type: Object,
      default:  () => {
        return {
            title: "温馨提示",
            footerType: 1,
            cancelButtonText: "取消",
            confirmButtonText: "确定"
        };
      }
    }
    
  },
  data() {
    return {
     
    };
  },
  computed: {
    modal() {
      let {
        title = "提示",
        footerType = 1,
        cancelButtonText = "取消",
        confirmButtonText = "确定"
      } = this.options;
      return {
        title,
        footerType,
        cancelButtonText,
        confirmButtonText
      };
    }
  },
  methods: {
      confirm(status=false) {
          this.$emit('confirm',status)
      }
     
    submit() {
      this.confirm(true)
    },
   
    cancel() {
        this.confirm(false)
    },
   
   
  }
};
</script>
//方式二

<script>
export default {
  name: "MyModal",
  props: {
    options: {
      type: Object,
      default:  () => {
        return {
            title: "温馨提示",
            footerType: 1,
            cancelButtonText: "取消",
            confirmButtonText: "确定"
        };
      }
    }
    
  },
  data() {
    return {
      resolve: "",
      reject: "",
      promise: "" //保存promise对象
    };
  },
  computed: {
    modal() {
      let {
        title = "提示",
        footerType = 1,
        cancelButtonText = "取消",
        confirmButtonText = "确定"
      } = this.options;
      return {
        title,
        footerType,
        cancelButtonText,
        confirmButtonText
      };
    }
  },
  methods: {
   
    submit() {
      this.resolve();
    },
   
    cancel() {
      this.reject();
    },
   
    confirm() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise; //返回promise对象,给父级组件调用
    }
  }
};
</script>


~~~
## 2.3全局弹窗样式
~~~
<style scoped lang="less">
.dialog {
  position: relative;
  
  .dialog-content {
    position: fixed;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background: white;
    border-radius: 5px;
    padding: 20px;
    min-height: 140px;
    width: 300px;
    height: 200px;
    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
    }
    .text {
      font-size: 14px;
      line-height: 30px;
      color: #555;
    }
    .btn-group {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 10px;
      .btn {
        padding: 10px 20px;
        font-size: 14px;
        &:last-child {
          color: #76d49b;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
}
</style>
~~~
## 3.在templete中使用模板
1.第一种方式
~~~
<template>
  <div>
    <button @click="getConfirm">ask</button>

    <my-dialog :options="options" v-show="show" @confirm="confirm">
      <div slot="content">aaaa</div>>
    </my-dialog>
  </div>
</template>
<script>
import MyDialog from "../../components/MyDialog/idex";
export default {
  name: "ask",
  components: {
    MyDialog
  },
  data() {
    return {
      show: false,
      options: {
        title: "是吗"
      }
    };
  },
  methods: {
    getConfirm(status) {
      if(status) {
          //do sth 确定
      }else{
          //do sth 取消状态
      }
    }
  }
};
</script>

~~~
2.第二种回调方式必须在组件中声明ref="xx"才能拿到该组件下的confirm方法
~~~

<script>
import MyDialog from "../../components/MyDialog/idex";
export default {
  name: "ask",
  components: {
    MyDialog
  },
  data() {
    return {
      show: false,
      options: {
        title: "是吗"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    getConfirm() {
      this.show = true;
      this.$refs.dialog
        .confirm()
        .then(() => {
          console.log("确定")
          this.show = false;
        })
        .catch(() => {
          console.log("取消")
          this.show = false;
        });
    }
  }
};
</script>

~~~
