[![CI](https://github.com/theluckystrike/webext-content-bridge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-content-bridge/actions)
[![npm](https://img.shields.io/npm/v/webext-content-bridge)](https://www.npmjs.com/package/webext-content-bridge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-content-bridge

Type-safe RPC bridge between content script and background for Chrome extensions. Call functions, streaming, and lifecycle for Manifest V3.

## Installation

```bash
npm install webext-content-bridge
```

## Usage

### Background Script

```typescript
import { ContentBridge } from 'webext-content-bridge';

const bridge = new ContentBridge();

bridge
  .handle('getUser', async (id) => {
    // Your logic here
    return { id, name: 'Example User' };
  })
  .handle('fetchData', async (options) => {
    // Handle additional methods
    return await fetchData(options);
  })
  .listen();
```

### Content Script

```typescript
import { ContentBridge } from 'webext-content-bridge';

const bridge = new ContentBridge();

// Call a method on the background script
const user = await bridge.call<User>('getUser', userId);
```

### Call Specific Tab

```typescript
// Call a method on a specific tab's content script
const result = await bridge.callTab<T>(tabId, 'someMethod', payload);
```

### Broadcast to All Tabs

```typescript
// Broadcast a message to all open tabs
const count = await bridge.broadcast('refreshData', { source: 'background' });
```

## API REFERENCE

### Constructor

```typescript
new ContentBridge(prefix?: string): ContentBridge
```

Creates a new bridge instance. The prefix is used to identify bridge messages. Default prefix is `__bridge__`.

### Methods

**handle(method: string, handler: (payload: any) => any | Promise<any>): this**

Register a handler for a method. Returns `this` for chaining.

**listen(): this**

Start listening for messages from content scripts. Call this after registering all handlers.

**call<T>(method: string, payload?: any): Promise<T>**

Call a method on the background script from a content script. Returns the result typed as T.

**callTab<T>(tabId: number, method: string, payload?: any): Promise<T>**

Call a method on a specific tab's content script. Useful for communication in the other direction.

**broadcast(method: string, payload?: any): Promise<number>**

Broadcast a method call to all open tabs. Returns the number of tabs that received the message.

**has(method: string): boolean**

Check if a handler is registered for a method.

**methods(): string[]**

Get a list of all registered method names.

## TypeScript

This library is written in TypeScript and provides full type definitions out of the box.

```typescript
interface User {
  id: string;
  name: string;
}

const user = await bridge.call<User>('getUser', '123');
```

## Requirements

- Chrome Extensions (Manifest V3)
- TypeScript 5.3+
- Node.js 18+

## About

Maintained by theluckystrike. Built for modern Chrome extension development.

For issues and contributions, please visit the GitHub repository.

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
