export class PINResponse {
    state: string
    "atom:link"?: string
    message: string
    completed?: string
}
   
export enum PINStateCode {
    done = "done",
    failed = "failed"
}