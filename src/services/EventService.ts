type EventHandlerMap = {
  [key: string]: (...args: any) => void;
};

export default class EventService<T extends EventHandlerMap> {
  handlers: { [key in keyof T]?: T[keyof T][] } = {};

  addEventListener<K extends keyof T, F extends T[K]>(
    eventName: K,
    eventHandler: F
  ) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [eventHandler];
    } else {
      this.handlers[eventName].push(eventHandler);
    }
    return this;
  }

  removeEventListener<K extends keyof T, F extends T[K]>(
    eventName: K,
    eventHandler: F
  ) {
    if (!this.handlers[eventName]) {
      return this;
    } else {
      this.handlers[eventName] = this.handlers[eventName].filter(
        handler => handler !== eventHandler
      );
    }
    return this;
  }

  emit<K extends keyof T, F extends T[K]>(
    eventName: K,
    ...args: Parameters<F>
  ) {
    const handlers = this.handlers[eventName] || [];
    handlers.forEach(handler => handler(args));
  }
}
