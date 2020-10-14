export class DoAuthorizationResponse {
    state: string
    message?: string

    constructor(obj) {
        this.state = obj.state;
    }
}