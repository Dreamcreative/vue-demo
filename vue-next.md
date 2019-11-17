# vue3.0

## 使用 new Proxy()监听数据变化
- Proxy只能监听一层的数据变化,不会在分析依赖的时候进行监听，只有当取到时才进行监听

effect收集依赖

ref 基本数据类型 用ref响应
reactive object/array 用reactive响应

## vue-next packages文件夹下
reactive==> 数据响应系统，可以单独拿出来使用
runtime-core==>实现虚拟dom的渲染器。vue组件，vue的各种api
runtime-dom==>针对浏览器运行时,处理dom api dom事件 dom属性
compiler-core ==>与平台无关的编译器
compiler-dom==>针对浏览器而写的编译器
shared:内部的一些帮助方法
vue:完整版本，runtime+compiler


Reflect receiver是代理之后的数据，为了保持this的指向