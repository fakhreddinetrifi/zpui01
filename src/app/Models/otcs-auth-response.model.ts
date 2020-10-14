export class OTCSAuthResponse {
    userName: string;
    ticketValid: boolean;
    constructor(obj) {
        this.userName = obj.userName;
        this.ticketValid = obj.ticketValid
    }
}