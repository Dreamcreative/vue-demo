# 微任务、宏任务

1. 浏览器自己实现的 eventloop，node 中是通过 libuv 实现的 eventloop
2. 代码都先执行一遍，然后再将宏任务与微任务分别放入到各自的执行队列中
3. 当执行栈中的任务执行完毕之后，会先到微任务队列中拉取，一直到微任务队列清空，再去宏任务队列拉取，一直这样循环执行下去
4. eventloop 包括执行栈，宏任务队列，微任务队列

- 宏任务：setTimeout 、setInterval、ajax、事件监听、io、postmessage、messageChannal(消息通信)
- 微任务：Promise.then()、observer(quicklink) 、mutationObserver
