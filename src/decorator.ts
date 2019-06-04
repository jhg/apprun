export const Reflect = {
  meta: new WeakMap(),

  defineMetadata(metadataKey, metadataValue, target) {
    if (!this.meta.has(target)) this.meta.set(target, {});
    this.meta.get(target)[metadataKey] = metadataValue;
  },

  getMetadataKeys(target) {
    target = Object.getPrototypeOf(target);
    return this.meta.get(target) ? Object.keys(this.meta.get(target)) : [];
  },

  getMetadata(metadataKey, target) {
    target = Object.getPrototypeOf(target);
    return this.meta.get(target) ? this.meta.get(target)[metadataKey] : null;
  }
};

export function update<E = string>(events?: E, options: any = {}) {
  return (target: any, key: string, descriptor: any) => {
    const name = events ? events.toString() : key;
    Reflect.defineMetadata(`apprun-update:${name}`, { name, key, options }, target);
    return descriptor;
  };
}

export function on<E>(events?: E, options: any = {}) {
  return function(target: any, key: string) {
    const name = events ? events.toString() : key;
    Reflect.defineMetadata(`apprun-update:${name}`, { name, key, options }, target);
  };
}

export function customElement(name:string) {
  return function _customElement<T extends { new(...args: any[]): {} }>(constructor: T) {
    app.webComponent(name, constructor)
    return constructor;
  }
}

import { isObservable, observable, observe, unobserve } from '@nx-js/observer-util';
export function reactive<T extends { new (...args: any[]): {} }>(constructor: T) {

  return class extends constructor {
    private reaction;
    private _view;
    private _unload;

    constructor(...args) {
      super(...args)
      this._view = this['view'];
      this._unload = this['unload'];
      this['view'] = (...p) => {
        this.reaction && unobserve(this.reaction);
        if (!p[0] || !this._view) return;
        if (!isObservable(p[0])) {
          this['state'] = observable(p[0]);
          this.reaction = observe(() => this['run']('.'))
        }
        return this._view(...p);
      }
      this['unload'] = (...p) => {
        this.reaction && unobserve(this.reaction);
        this._unload && this._unload(...p);
      }
    }
  }
}
