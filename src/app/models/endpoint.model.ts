import { Payload } from "./payload.model";

export class Endpoint {
    id?: string = '';
    url: string = '';
    requestType: string
    delay?: number = 0;
    online: boolean = true;
    payloads?: Payload[]
    status: string = this.online? 'On' : 'Off'
}

