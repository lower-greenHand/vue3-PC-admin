/**
 * emit发布者，on订阅者
 * name 事件名称，callback 回调函数
 */
class Bus {
  constructor() {
    this.list = {};
  }

  emit(name, ...args) {
    const eventName = this.list[name];
    eventName.forEach((fn) => {
      fn.apply(this, args);
    });
  }

  on(name, callback) {
    const fn = this.list[name] || [];
    fn.push(callback);
    this.list[name] = fn;
  }
}

export default new Bus();
