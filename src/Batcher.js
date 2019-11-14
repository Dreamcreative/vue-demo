/**
 * []+{} // [object Object]
 * object 表示一种数据类型
 * Object 表示构造函数
 *
 * {}+[] // 0
 * 前面的 {}被当做一个代码块执行
 *  +[] +{} 对象数组在转number的时候 会先调用 valueOf() ，如果返回值不是基本类型
 * 会再次调用toString()
 * 在转数字的时候会先调用valueOf()
 * 在转string的时候回调用toString(),如果返回值不是基本类型,会再次调用valueOf()
 *
 */
function Batcher() {
  this.reset();
}

Batcher.prototype = {
  reset() {
    this.has = {};
    this.queue = [];
    this.waiting = false;
  },
  flush() {
    this.queue.forEach(watch => {
      watch.cb();
    });
    this.reset();
  },
  push(watcher) {
    var id = watcher.id;
    if (!this.has[id]) {
      this.queue.push(watcher);
      this.has[id] = true;
      if (!this.waiting) {
        this.waiting = true;
        if ("Promise" in window) {
          Promise.resolve().then(res => {
            this.flush();
          });
        } else {
          setTimeout(() => {
            this.flush();
          }, 0);
        }
      }
    }
  }
};
