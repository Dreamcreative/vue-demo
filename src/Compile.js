function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}
Compile.prototype = {
  nodeToFragment(node, vm) {
    var _self = this;
    var frag = document.createDocumentFragment();
    var child;
    while ((child = node.firstChild)) {
      _self.compileElement(child, vm);
      frag.append(child);
    }
    return frag;
  },
  compileElement(child, vm) {
    var reg = /\{\{(.*)\}\}/;
    if (child.nodeType === 1) {
      var attributes = child.attributes;
      for (let attr of attributes) {
        var name = attr.nodeValue;
        if (attr.nodeName === "v-model") {
          child.addEventListener("input", e => {
            vm[name] = e.target.value;
          });
          new Watcher(vm, child, name, "value");
        }
      }
    }
    if (child.nodeType === 3) {
      if (reg.test(child.nodeValue)) {
        var name = RegExp.$1;
        name = name.trim();
        new Watcher(vm, child, name, "nodeValue");
      }
    }
  }
};
