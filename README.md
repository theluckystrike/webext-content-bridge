# webext-content-bridge — Type-Safe RPC Bridge
> **Built by [Zovo](https://zovo.one)** | `npm i webext-content-bridge`

RPC-style handler registration, call background from content script, callTab, and broadcast to all tabs.

```typescript
import { ContentBridge } from 'webext-content-bridge';
// Background:
const bridge = new ContentBridge();
bridge.handle('getUser', (id) => db.getUser(id)).listen();
// Content script:
const user = await bridge.call<User>('getUser', userId);
```
MIT License
