// 对于不兼容Object.defineProperty()的浏览器 使用__defineGetter__ 、__defineSetter__
function observe(data, vm) {
  Object.keys(data).forEach(key => {
    defineProperty(vm, key, data[key]);
  });
}

function defineProperty(vm, key, value) {
  var dep = new Dep();
  Object.defineProperty(vm, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newV) {
      if (newV === value) return;
      value = newV;
      dep.notify();
    }
  });
}
