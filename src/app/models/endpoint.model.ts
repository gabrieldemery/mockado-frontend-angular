import { Payload } from "./payload.model";

export class Endpoint {
    id?: string = '';
    url: string = '';
    requestType: string
    delay?: number = 0;
    online: boolean = true;
    payloads?: Payload[]


    get status() : string {
        return this.online? 'On' : 'Off'
    }
}

