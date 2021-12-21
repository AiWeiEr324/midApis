declare class EventBus {
    handlers: Record<string, any>;
    constructor();
    on(eventName: string, handler: Function): void;
    off(eventName: string, handler: Function): void;
    trigger(eventName: string, ...args: any[]): void;
    once(eventName: string, handler: Function): void;
}
export default EventBus;
