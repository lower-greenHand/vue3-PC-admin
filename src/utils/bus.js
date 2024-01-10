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
    const keys = Object.keys(this.list);

    // 检查方法是否已经存在于订阅列表中
    if (!keys.includes(name)) {
      fn.push(callback);
    }
    this.list[name] = fn;
  }
  off(name) {
    const keys = Object.keys(this.list);
    // 检查方法是否已经存在于订阅列表中
    if (keys.includes(name)) {
      delete this.list[name];
    }
  }
}

export default new Bus();
