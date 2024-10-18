export default class AsyncData {

    constructor (initialData) {
        this.data = initialData;
        this.subscribers = [];
    }
  
    // Subscribe to changes in the data
    subscribe (callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback must be a function");
        }
        this.subscribers.push(callback);
    }
  
    // Update the data and wait for all updates to complete
    async set (key, value) {
        this.data[key] = value;
      
        // Call the subscribed function and wait for it to resolve
        const updates = this.subscribers.map(async (callback) => {
            await callback(key, value);
        });
      
        await Promise.allSettled(updates);
    }

    get (key) {
        return this.data[key];
    }

}