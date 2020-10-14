export class Document {
    itemId: string;
    name: string;
    type: string;
    status: string;
    modifyDate: Date;
    creationDate: Date;
    creator: string;
    description: string;
    shopnumber: string;
    classification: string;
    blobcontent: string;
    requestedDeliveryDate: Date;
    contentType: string;
    // tslint:disable-next-line: max-line-length
    constructor(itemId: string,  name: string, type: string, status: string, modifyDate: Date, creationDate: Date, creator: string, description: string,requestedDeliveryDate: Date, contentType: string) {
        this.itemId = itemId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.modifyDate = modifyDate;
        this.creationDate = creationDate;
        this.creator = creator;
        this.description = description;
        this.requestedDeliveryDate = requestedDeliveryDate ;
        this.contentType = contentType;
        // this.shopnumber = shopnumber;
        // this.classification = classification;
        // this.blobcontent = blobcontent;
    }

}
