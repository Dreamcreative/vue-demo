// var uid = 0;
// function Watcher(vm, node, name, type) {
//   Dep.target = this;
//   this.node = node;
//   this.name = name;
//   //使用uid作为Watcher的id 容易造成内存的泄露，一个指令对应一个Watcher，如果一个指令消失了，那么这个指令对应的Watcher就会消失，而Watcher是通过数组维护，所以数组会出现值为undefined的情况 [1,undefined,3 , undefined,.....]
//   this.id = ++uid;
//   this.vm = vm;
//   this.type = type;
//   this.update();
//   Dep.target = null;
// }

// Watcher.prototype = {
//     update(){
//         this.get();
//         if(!batcher){
//             batcher = new Batcher()
//         }
//         batcher.push(this)
//         // this.node[this.type] = this.value ;
//     },
//     cb(){
//         console.log("dom update")
//         this.node[this.type]=this.value
//     },
//     get(){
//         //触发defineProperty() 的get
//         this.value = this.vm[this.name] ;
//     }
// }
var uid = 0;
function Watcher(vm, node, name, type) {
  Dep.target = this;
  this.vm = vm;
  this.node = node;
  this.id = ++uid;
  this.name = name;
  this.type = type;
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  update() {
    this.get();
    if (!batcher) {
      batcher = new Batcher();
    }
    batcher.push(this);
  },
  cb() {
    console.log("dom update ");
    this.node[this.type] = this.value;
  },
  get() {
    this.value = this.vm[this.name];
  }
};
