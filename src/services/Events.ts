import { EventEmitter } from "events";



export enum EventType {
    
    /** Called when a new record has been received */
    NEW_RECORD = 'NEW_RECORD',

    /** Called when a user logs in */
    USER_LOGIN = 'USER_LOGIN',
}

class ClinicEvents {

    private _emitter: EventEmitter = new EventEmitter();

    constructor() {
    }


    public on(event: EventType, listener: (...args: any[]) => void): void {
        this._emitter.on(event, listener);
    }

    public emit(event: EventType, ...args: any[]): void {
        this._emitter.emit(event, ...args);
    }

}

export const CLINIC_EVENTS = new ClinicEvents();
