import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppConfig } from 'src/app/services/appconfig';
import { Document } from '../../Models/Document';

@Component({
  selector: 'app-docviewer',
  templateUrl: './docviewer.component.html',
  styleUrls: ['./docviewer.component.css']
})
export class DocviewerComponent implements OnInit, OnChanges {
  @Input() doc_viewer: Document;
  @Input() LL_COOKI_doc_viewer: string;
  @Output() chekupdate = new EventEmitter();
  baseURL: any; 
  loadingCompleted: boolean = false;
  markForSignature: boolean;
  nearTheBottom: boolean = false;

  constructor(private _http: HttpClient,private environment: AppConfig) {
     this.baseURL = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_document_updatestatus_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/document/updatestatus";
 
  }

  ngOnInit(): void {
    console.log('LLCOOKIE value', this.LL_COOKI_doc_viewer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.doc_viewer && this.isSupportedDocumentForPreview()) {
      console.log(this.doc_viewer);
      this.loadingCompleted = false;
    } else {
      this.loadingCompleted = true;
    }
  }

  onLoadingCompleted() {
    this.loadingCompleted = true;
    setTimeout(() => {
      this.nearTheBottom = this.isNearTheBottom();
      console.log("control disabled: ", (!this.doc_viewer || (this.doc_viewer && (this.doc_viewer.status === 'Ready for Signature' || this.doc_viewer.status === 'Marked for Signature') && !this.nearTheBottom)));
    }, 200);
  }

  onScroll() {
    if (!this.nearTheBottom && this.isNearTheBottom()) {
      this.nearTheBottom = true;
    }
  }

  isNearTheBottom(): boolean {
    var objDiv = document.getElementById("myScrolldiv");
    console.log('objDiv.scrollTop', objDiv.scrollTop)
    console.log('objDiv.scrollHeight', objDiv.scrollHeight)
    console.log('objDiv.clientHeight', objDiv.clientHeight)
    return (objDiv.scrollTop == (objDiv.scrollHeight - objDiv.clientHeight));
  }

  needToScroll() {
    var objDiv = document.getElementById("myScrolldiv");
    // console.log('needToScroll: ', objDiv.scrollHeight == objDiv.clientHeight);
    return (objDiv.scrollHeight > objDiv.clientHeight);
  }

  disableControl(): boolean {
    return (!this.doc_viewer || (this.doc_viewer && (this.doc_viewer.status === 'Ready for Signature' || this.doc_viewer.status === 'Marked for Signature') && !this.nearTheBottom));
  }

  setDefaultValue(): boolean {
    return (this.doc_viewer && this.doc_viewer.status == 'Marked for Signature');
  }

  /** POST: update the document status. */
  markForSign(): void {
    console.log('Get Document----', this.doc_viewer);
    let newStatus = (this.doc_viewer.status === 'Ready for Signature') ? 'Marked for Signature' : 'Ready for Signature';
    const headers = { 'content-type': 'application/json', 'otcsticket': this.LL_COOKI_doc_viewer };
    const JSONBody =
    {
      // externalId: this.doc_viewer.itemId,
      id: this.doc_viewer.itemId,
      searchByExternal: false,
      status: newStatus,
      doctype: this.doc_viewer.type,
      requestor: sessionStorage.getItem("username")

    };
    this.doc_viewer.status = newStatus
    const body = JSONBody;
    console.log('JSONBody IS... ' + body);
    this._http.post(this.baseURL, body, { headers: headers }).subscribe(data => {
      console.log('updated document', data)
      this.getCurrentUpdate('markForSign');
    });
  }

  getCurrentUpdate(obj: string): void {
    console.log('selected send from doclist after selectionxxxxxxxxxx' + obj);
    this.chekupdate.emit(obj);
  }

  scrollToTop() {
    var objDiv = document.getElementById("myScrolldiv");
    objDiv.scrollTop = 0
  }

  isSupportedDocumentForPreview(): boolean {
    return this.isXMLORDERDocument() || this.isPDFDocument();
  }

  isXMLORDERDocument(): boolean {
    return (this.doc_viewer && (this.doc_viewer.contentType === 'application/xml' || this.doc_viewer.contentType === 'text/xml') && this.doc_viewer.type === 'ORDER')
  }

  isPDFDocument(): boolean {
    return (this.doc_viewer && this.doc_viewer.contentType === 'application/pdf')
  }

  showMarkForSign() {
    return this.doc_viewer && (this.doc_viewer.status == 'Ready for Signature' ||  (this.doc_viewer.status == 'Marked for Signature')) && this.isSupportedDocumentForPreview() && this.loadingCompleted;
  }

  scrollDivHieght() {
    var objDiv = document.getElementById("myScrolldiv");
    var footerDiv = document.getElementById("footer");
    return "calc(100vh - " + (objDiv.getBoundingClientRect().top +footerDiv.scrollHeight+6) + "px)";
    // return this.showMarkForSign() ? '574px' : '644px';
  }
}