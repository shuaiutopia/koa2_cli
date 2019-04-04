class BaseController {
  constructor() {
    // console.log("来自base基类")
  }
  static getInstance(eliminate) {
    let selfObj = new this;
    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(selfObj));
    for (let i in methodNames) {
      const name = methodNames[i];
      const func = selfObj[name];
      if (name === 'constructor') continue;
      if (typeof func !== 'function') continue;
      if (eliminate && eliminate.indexOf(name) > -1) continue;

      selfObj[name] = func.bind(selfObj);
      selfObj[name].toString = () => func.toString();
    }
    return selfObj;
  }
}
module.exports = BaseController;