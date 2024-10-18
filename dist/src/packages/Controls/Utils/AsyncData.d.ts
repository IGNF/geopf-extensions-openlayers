export default class AsyncData {
    constructor(initialData: any);
    data: any;
    subscribers: any[];
    subscribe(callback: any): void;
    set(key: any, value: any): Promise<void>;
    get(key: any): any;
}
//# sourceMappingURL=AsyncData.d.ts.map