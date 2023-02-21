import { ObservableStorage } from "./lib/observable-storage";

// Create a instance providing storage adapter
// Adapter can be localStorage, sessionStorage or custom that implements the same API
const store = new ObservableStorage(localStorage);

store.setItem("example", "old-value");

// subscribe to changes passing the storage key
store.subscribe("example", (newValue) => {
  // After 2sec newValue will log as 'new-value'
  console.log("storage has changed:", newValue);
});

setTimeout(() => {
  store.setItem("example", "new-value");
}, 2000);

// removes all listeners to that storage key
store.unsubscribe("example");

// will no longer log
store.setItem("example", "old-value");
