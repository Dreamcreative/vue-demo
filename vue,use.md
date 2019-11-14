# Vue.use 实现
- Vue使用插件的形式
```javascript
    import Vue from 'vue';
    import Router from 'vue-router';

    Vue.use(Router);
```

```javascript
 Vue.use = function( plugin : Function | Object){
     //获取已安装的插件,如果没有 就初始化 []
     const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
     // 如果当前插件已经安装,直接返回
     if(installedPlugins.indexOf(plugin)>-1){
         return this
     }
    // 获取传入use()中的第一个参数以外的其他参数
     const args = toArray(arguments,1)
     args.unshift(this)
    //  判断plugin的install是否是函数，如果是函数，就直接执行,如果install不是函数，就将plugin本身当做函数执行一遍.然后将执行后的插件推入到vue对象维护的插件数组中
     if( typeof plugin.install === "function"){
         plugin.install.apply(plugin  ,args)
     }else if( typeof plugin === "function"){
         plugin.apply(null , args)
     }
     installedPlugins.push(plugin)
     return this
 }
```