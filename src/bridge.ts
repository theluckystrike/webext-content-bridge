/**
 * Content Bridge — Type-safe RPC between content script and background
 */
export class ContentBridge {
    private handlers = new Map<string, (payload: any) => any>();
    private prefix: string;

    constructor(prefix: string = '__bridge__') { this.prefix = prefix; }

    /** Register a handler (background side) */
    handle(method: string, handler: (payload: any) => any | Promise<any>): this {
        this.handlers.set(method, handler);
        return this;
    }

    /** Start listening for messages (background side) */
    listen(): this {
        chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
            if (msg?.type !== this.prefix || !msg.method) return false;
            const handler = this.handlers.get(msg.method);
            if (!handler) { sendResponse({ error: `Unknown method: ${msg.method}` }); return false; }
            const result = handler(msg.payload);
            if (result instanceof Promise) { result.then((data) => sendResponse({ data })).catch((e) => sendResponse({ error: e.message })); return true; }
            sendResponse({ data: result }); return false;
        });
        return this;
    }

    /** Call a method on the background (content script side) */
    async call<T>(method: string, payload?: any): Promise<T> {
        const response = await chrome.runtime.sendMessage({ type: this.prefix, method, payload });
        if (response?.error) throw new Error(response.error);
        return response?.data as T;
    }

    /** Call a method on a specific tab's content script */
    async callTab<T>(tabId: number, method: string, payload?: any): Promise<T> {
        const response = await chrome.tabs.sendMessage(tabId, { type: this.prefix, method, payload });
        if (response?.error) throw new Error(response.error);
        return response?.data as T;
    }

    /** Broadcast to all tabs */
    async broadcast(method: string, payload?: any): Promise<number> {
        const tabs = await chrome.tabs.query({});
        let count = 0;
        for (const tab of tabs) {
            if (!tab.id) continue;
            try { await chrome.tabs.sendMessage(tab.id, { type: this.prefix, method, payload }); count++; } catch { }
        }
        return count;
    }

    /** Check if handler exists */
    has(method: string): boolean { return this.handlers.has(method); }

    /** List registered methods */
    methods(): string[] { return Array.from(this.handlers.keys()); }
}
