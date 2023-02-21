# ObservableStorage

A simplified implementation to subscribe to localStorage or sessionStorage changes

## Installation

Install using `npm`, `yarn` or `pnpm`

```bash
pnpm i observable-storage
```

## Usage

```typescript
import { ObservableStorage } from "./observable-storage";

// Create a instance providing storage adapter
// Adapter can be localStorage, sessionStorage or custom that implements the same API
const ls = new ObservableStorage(localStorage);

ls.setItem("example", "old-value");

// subscribe to changes passing the storage key
ls.subscribe("example", (newValue) => {
  // After 2sec newValue will log as 'new-value'
  console.log("storage has changed:", newValue);
});

setTimeout(() => {
  ls.setItem("example", "new-value");
}, 2000);

// removes all listeners to that storage key
ls.unsubscribe("example");

// will no longer log
ls.setItem("example", "old-value");
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
