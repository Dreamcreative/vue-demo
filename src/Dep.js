function Dep(){
    this.subs = [];
}
Dep.prototype={
    addSub( watcher ){
        this.subs.push(watcher)
    },
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}