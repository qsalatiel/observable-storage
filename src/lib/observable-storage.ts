export type Adapter<K, V> = {
  getItem: (k: K) => V | null;
  setItem: (k: K, v: V) => void;
  removeItem: (k: K) => void;
  clear?: () => void;
  key?: (k: number) => V | null;
};

export const ERROR_MESSAGES = {
  adapterNotFound:
    "You need to pass an adapter e.g: window.localStorage or window.sessionStorage",
};

export class ObservableStorage<K, V> {
  private listeners: Map<K, Array<(value: V) => void>>;
  private store: Adapter<K, V>;

  constructor(adapter: Adapter<K, V>) {
    if (!adapter) {
      throw new Error(ERROR_MESSAGES.adapterNotFound);
    }

    this.listeners = new Map();
    this.store = adapter;
  }

  setItem(key: K, value: V) {
    this.store.setItem(key, value);

    if (this.listeners.has(key)) {
      const listeners = this.listeners.get(key);

      listeners?.forEach((listener) => {
        listener(value);
      });
    }
  }

  getItem(key: K) {
    return this.store.getItem(key);
  }

  removeItem(key: K) {
    this.store.removeItem(key);
  }

  clear() {
    if (typeof this.store.clear === "function") {
      this.store.clear();
    }
  }

  key(index: number) {
    if (typeof this.store.key === "function") {
      return this.store.key(index);
    }

    return null;
  }

  subscribe(key: K, subscriberFn: (value: V) => void) {
    const currentListeners = this.listeners.get(key) || [];

    this.listeners.set(key, [...currentListeners, subscriberFn]);
  }

  unsubscribe(key: K) {
    const hasKey = this.listeners.has(key);

    if (hasKey) {
      this.listeners.delete(key);
    }
  }
}
