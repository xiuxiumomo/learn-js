## 将ES6转换成浏览器可识别的ES5
> 安装@babel/cli --类似脚手架  @babel/core @babel/preset-env 智能预设 @babel/polyfill  @babel/plugin-transform-runtime --识别高级语法

```
//.babelrc配置
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "targets": {
          "chrome": "58",
          "ie": "10"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
 //package指令配置
 "build": "babel src/index.js -o dist/index.js",
```