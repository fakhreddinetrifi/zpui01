export class TokenApiResponse {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    token_type?: string

    constructor(obj) {
        this.access_token = obj.access_token ? obj.access_token : undefined;
        this.refresh_token = obj.refresh_token ? obj.refresh_token : undefined;
        this.expires_in = obj.expires_in ? obj.expires_in : undefined;
        this.token_type = obj.token_type ? obj.token_type : undefined;
    }
}