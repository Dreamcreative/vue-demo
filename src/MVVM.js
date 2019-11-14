function Vue(options) {
  this.data = options.data;
  var data = this.data;
//   对数据做一个响应
  observe(data, this);
  var id = options.el;
  var dom = new Compile(document.getElementById(id), this);//vm
  // 编译完成后，将dom返回到app中
  document.getElementById(id).appendChild(dom);
}
