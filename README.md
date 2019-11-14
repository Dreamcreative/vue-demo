# 简单版 vue

## Observe
- 对vue属性进行监听，在get()时添加到Dep依赖中，在set()时调用Dep的通知
- 对 vue 属性进行监听，并将其挂载到 vue 的实例上,使用 Object.defineProperty()
- 对于不支持 Object.defineProperty()的浏览器可以使用 `Object.__defineGetter__()、Object.__defineSetter__()`

## Dep

- 一个管理依赖的数组，只是收集依赖，通知更新
- 在取值的时候向 Dep 添加一个 Watcher
- 在修改值的时候触发 Dep 的 notify(),循环更新添加到 Dep 的 Watcher

## Watcher

- 一个指令对应一个 Watcher
- 通过一个数组维护指令，由于一个指令对应一个 Watcher,每个 Watcher 具有一个唯一的 ID,当某个指令消失，那个数组中对应位置的 Watcher 就会置为 undefined,所以就会出现[1,undefined,2,undefined,....] 的情况，容易造成内存泄露指令消失，比如 v-if、v-for 在渲染完成之后指令都会消失

## Batcher

- 批处理
- 在值更新之后，通知更新，内部维护了一个全局的变量，来判断是否存在 Batcher 实例
- Batcher 通过 Watcher 的唯一标识 ID，来判断指令是否已存在栈中，
- 在进行批量更新时，先后判断浏览器是否支持 Promise,MutationObserver,setImmediate 是否存在,让更新加入微任务，如果以上都不支持，最后使用 setTimeout，让更新加入宏任务进行更新的操作(这就是 nextTick 的逻辑)

## Compile 跟vue中实现不一样

- 编译模板
- 通过 `node.attributes` 获取节点所有属性
- 通过 `node.firstChild`
- 通过`node.nodeType` 获取当前 node 节点类型，根据不同的类型给 Watcher 传入不同的值，用来更新节点

>> 总结
1. 获取数据时，触发Object.defineProperty()的get()，向Dep添加依赖，在修改数据时，触发Object.defineProperty()的set(),通知Dep的notify()，循环更新Dep维护的依赖数组Watcher数组。
2. Watcher更新时,触发get(),并将自己添加到Batcher中。
3. 添加到Batcher后，再通过nextTick()进行更新,nextTick()优先调用Promise,MutationObserver(),setImmediate()进入微任务队列,如果以上都不支持，就添加到setTimeout宏任务队列中