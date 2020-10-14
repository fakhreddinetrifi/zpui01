import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Documents } from 'src/app/Models/Documents';
// import { listElt } from '../../Models/listelt'
import { allList } from '../../Models/alllist'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocviewerComponent } from '../docviewer/docviewer.component';
import { DocviewerDialogComponent } from '../docviewer/docviewer-dialog/docviewer-dialog.component';
import { AppConfig } from 'src/app/services/appconfig';
@Component({
  selector: 'app-pagedoclist',
  templateUrl: './pagedoclist.component.html',
  styleUrls: ['./pagedoclist.component.css']
})
export class PagedoclistComponent implements OnInit {
  @Input() LL_COOK: string;
  @Input() shopIdPdc: string;
  temp_llcook;
  documents: any;
  signedDocs: any;
  listdoc: Documents;
  restOutPut;
  selectedDoc: any;
  HighlightRow: any;
  status: boolean;
  needfilter: string = 'notfilter';
  listeStatus: string[] = [];
  listetype: string[] = [];
  loadingCompleted: boolean = true
  loadingCompleted_sd: boolean = true
  docUpdateType: string = 'nothing'
  largeScreen: boolean = true;
  previewDialogRef: MatDialogRef<DocviewerDialogComponent>;
  // filteredValues : Document []=[];
  baseURL: any;
  baseURLSignedDoc: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private environment: AppConfig) {
    console.log('showing environment on constructor', this.environment)
    this.baseURL = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_document_list_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/document/list";
    this.baseURLSignedDoc = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_document_listSigned_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/document/listSigned";
  }
  getCurrentDoc(selectedDocument): void {
    console.log('Getting selected from with the parent', selectedDocument)
    this.selectedDoc = selectedDocument;
  }

  getCurrentUpdate(updateSTatus): void {

    console.log('Getting selected from with the parent', updateSTatus)
    this.docUpdateType = updateSTatus
    this.status = updateSTatus;
    // this.loadingCompleted=false
    // this.getDocuments();
    this.loadingCompleted = false

    if (updateSTatus == 'doAuthEvent') {
      console.log('Refreshing document list after doAuth')
      this.loadingCompleted_sd = false

      this.getDocuments();
      this.getDocumentSignedDoc();

    }
    if (updateSTatus == 'markForSign') {
      console.log('Refreshing document list after mark for sign')
      this.getfilteredDocumentToBeRefreshed();
    }
  }

  ngOnInit(): void {
    console.log('showing environment on ngOninit',this.environment)
    this.largeScreen = window.innerWidth >= 992;
    window.onresize = () => {
      this.largeScreen = window.innerWidth >= 992;
      if(!this.largeScreen){
        console.log("this is not large screen")
      }
      if (this.largeScreen && this.previewDialogRef != undefined) {
        console.log("screen is large")
        this.previewDialogRef.close();

      }
    };

    this.temp_llcook = this.LL_COOK
    console.log('LLCOOKIE value', this.temp_llcook);
    this.baseURL = this.baseURL + "?bwId=" + this.shopIdPdc + "&docType=ORDER";
    this.baseURLSignedDoc = this.baseURLSignedDoc + "?bwId=" + this.shopIdPdc + "&docType=ORDER";

    this.getDocuments();
    this.getDocumentSignedDoc();
  }

  getDocuments(): void {
    const headers = { 'content-type': 'application/json', 'otcsticket': this.LL_COOK, 'Access-Control-Allow-Origin': '*' }
    this.http.get(this.baseURL, { 'headers': headers }).subscribe(data => {
      this.restOutPut = data;

      this.listdoc = this.restOutPut;
      this.documents = this.listdoc.documents;

      if ((Array.isArray(this.listdoc.documents) && this.listdoc.documents.length)) {
        this.documents = this.documents.filter(el => el.status != 'Signed');
        console.log('Not Signed Document List', this.documents);
      }
      this.loadingCompleted = true
      console.log('Refresh Not signed  document list ended')
    })

  }
  getDocumentSignedDoc(): void {
    const headers = { 'content-type': 'application/json', 'otcsticket': this.LL_COOK, 'Access-Control-Allow-Origin': '*' }
    this.http.get(this.baseURLSignedDoc, { 'headers': headers }).subscribe(data => {
      this.restOutPut = data;
      this.listdoc = this.restOutPut;

      if ((Array.isArray(this.listdoc.documents) && this.listdoc.documents.length)) {

        this.signedDocs = this.listdoc.documents;
        console.log('Signed Document List', this.signedDocs);
        this.loadingCompleted_sd = true
        console.log('------closing spinner-----------');
      }
      this.loadingCompleted_sd = true
      console.log('Refresh signing  document list ended')

    })

  }
  getfilteredDocumentToBeRefreshed(): void {
    const headers = { 'content-type': 'application/json', 'otcsticket': this.LL_COOK, 'Access-Control-Allow-Origin': '*' }
    this.http.get(this.baseURL, { 'headers': headers }).subscribe(data => {
      this.restOutPut = data;

      this.listdoc = this.restOutPut;
      this.documents = this.listdoc.documents;
      if (((Array.isArray(this.listdoc.documents) && this.listdoc.documents.length)))  {
        if (this.listeStatus.length > 0 && this.listetype.length > 0) {
          console.log('status filter in doc page list--> :' + this.listeStatus)
          console.log('type filter--> :' + this.listetype)
          this.documents = this.documents.filter(el => (this.listeStatus.indexOf(el.status) != -1) && (this.listetype.indexOf(el.type) != -1));

        }
        if (this.listeStatus.length == 0 && this.listetype.length > 0) {
          console.log('type filter only in doc page list--> :' + this.listetype)
          this.documents = this.documents.filter(el => (this.listetype.indexOf(el.type) != -1));

        }
        if (this.listeStatus.length > 0 && this.listetype.length == 0) {
          console.log('status filter only in doc page list--> :' + this.listeStatus)
          this.documents = this.documents.filter(el => (this.listeStatus.indexOf(el.status) != -1));

        }
        if (this.listeStatus.length == 0 && this.listetype.length == 0) {
          this.documents = this.documents

        }
      }
      this.loadingCompleted = true
      console.log('Refreshing  document list ended')
    })

  }
  filterEvents(needfilters): void {
    this.needfilter = needfilters
    console.log('event filter doc called from page doc list')

  }
  getFiteredValues(fiteredValues: allList): void {
    console.log('Receive filteres values from page doc list', fiteredValues)
    this.listeStatus = fiteredValues.listst
    this.listetype = fiteredValues.listdt

  }

  refresh(updateSTatus): void {
    console.log('Start Refreshing Doc List')
    this.loadingCompleted = false
    this.loadingCompleted_sd = false

    this.getDocumentSignedDoc();
    this.getfilteredDocumentToBeRefreshed();
  }

  onOpenPreviewDialog(document: Document) {
    this.previewDialogRef = this.dialog.open(DocviewerDialogComponent, {
      height: '90%',
      width: '90%',
      maxWidth: '90%',
      panelClass: 'new-container-fluid',

      data: {
        document: document,
        LL_COOK: this.LL_COOK
      }
    });

    this.previewDialogRef.componentInstance.markForSignClick.subscribe((updateSTatus: string) => {
      this.getCurrentUpdate(updateSTatus);
    });

    this.previewDialogRef.afterClosed().subscribe(result => {
      console.log('this.previewDialogRef', this.previewDialogRef);
      console.log(`Dialog result: ${result}`);
    });
  }
}



