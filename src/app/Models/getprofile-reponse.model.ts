export class GetProfileResponse {
    service?: string
    id?: string
    client_id?: string

    constructor(obj) {
        this.id = obj.id ? obj.id : undefined;
        this.client_id = obj.client_id ? obj.client_id : undefined;
    }
}