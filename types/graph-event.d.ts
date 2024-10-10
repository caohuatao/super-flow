import { EventCallback, DispatchEvent } from './index';
export declare class GraphEvent {
    readonly listeners: Record<string, EventCallback[]>;
    add(type: string, callback: EventCallback): void;
    remove(type: string, callback: EventCallback): void;
    dispatch<K extends keyof DocumentEventMap>(event: DispatchEvent<K>, breakOff?: boolean): void;
}
