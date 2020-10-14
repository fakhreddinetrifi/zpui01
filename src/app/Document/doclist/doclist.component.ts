import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as FileSaver from 'file-saver';
import { DownloaderService } from 'src/app/services/downloader.service';
import { allList } from '../../Models/alllist';
import { Document } from '../../Models/Document';
import { listElt } from '../../Models/listelt';

@Component({
  selector: 'app-doclist',
  templateUrl: './doclist.component.html',
  styleUrls: ['./doclist.component.css']
})
export class DoclistComponent implements OnInit, OnChanges {
  alllistobj: allList = new allList([], []);

  @Input() documents: Document[];
  @Output() selectedDocument = new EventEmitter();
  @Input() needFilters: string;
  @Output() needFiltersChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() filteredValues: EventEmitter<allList> = new EventEmitter<allList>();
  @Input() loadingCompleted: boolean;
  @Input() docUpdateType: string;
  @Output() openPreviewDialog: EventEmitter<Document> = new EventEmitter<Document>();
  currentdoc: Document = null

  document: any;
  allDocuments: Document[];
  HighlightRow: any;
  HighlightRow_tmp: any = 0
  p: number = 1;
  listStats: string[] = [];
  listType: string[] = [];

  downloadInProgress: {itemId: string, downloadInProgress: boolean}[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.needFilters) {
      if (this.needFilters == 'filter') {
        console.log('filter action detected from doclist')
        this.openNav();
      }
    }

    if (changes.docUpdateType) {
      if (this.docUpdateType == 'doAuth') {
        this.getCurrentDoc(undefined, undefined);
        this.HighlightRow = undefined
      }

    }
  }

  constructor(private downloader: DownloaderService) { }

  //  filter :string;
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
    this.getCurrentDoc(undefined, undefined);
    this.HighlightRow = undefined;
  }

  ngOnInit(): void {
    this.allDocuments = this.documents.slice();
    //this.HighlightRow=undefined;
    //this.getCurrentDoc(undefined,undefined); 

  }
  selectOrUnselectCurrentDoc(): void {
    if (this.documents.includes(this.currentdoc, 0)) {
      return;
    }

    else
      this.getCurrentDoc(undefined, undefined);
  }
  getCurrentDoc(doc: Document, index: number): void {
    this.document = doc;
    console.log('selected send from doclist after selectionxxxxxxxxxx' + doc);
    this.HighlightRow = index;
    this.currentdoc = doc
    this.HighlightRow_tmp = index
    this.selectedDocument.emit(doc);
  }

  onPaginationChange(page: number) {
    this.p = page;
    this.getCurrentDoc(undefined, undefined);
  }

  openNav() {
    document.getElementById("navFilter").style.width = "230px";
  }

  closeNav() {
    document.getElementById("navFilter").style.width = "0";
    this.needFiltersChange.emit('closefilters');
  }

  completed: false
  listStatus: listElt[] = [
    { name: 'Ready for Signature', completed: false },
    { name: 'Marked for Signature', completed: false },
    { name: 'Signature in Progress', completed: false },
    { name: 'Signed', completed: false }
  ];
  listDoctype: listElt[] = [
    { name: 'Good Issue Note', completed: false },
    { name: 'ORDER', completed: false }
  ];

  allComplete: boolean = false;

  updateAllComplete(item: listElt) {
    this.allComplete = this.listStatus != null && this.listStatus.every(t => t.completed);
    this.setListeStatus(item);
    this.filterDocuments(this.listStats, this.listType)
  }

  someComplete(): boolean {
    if (this.listStatus == null) {
      return false;
    }
    return this.listStatus.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listStatus == null) {
      return;
    }
    this.listStatus.forEach((t) => {
      t.completed = completed
      this.updateAllComplete(t)
    });
  }
  allComplete_dt: boolean = false;

  updateAllComplete_dt(item: listElt) {
    this.allComplete_dt = this.listDoctype != null && this.listDoctype.every(t => t.completed);
    this.setListeType(item);
    this.filterDocuments(this.listStats, this.listType)
  }

  someComplete_dt(): boolean {
    if (this.listDoctype == null) {
      return false;
    }
    return this.listDoctype.filter(t => t.completed).length > 0 && !this.allComplete_dt;
  }

  setAll_dt(completed: boolean) {
    this.allComplete_dt = completed;
    if (this.listDoctype == null) {
      return;
    }
    this.listDoctype.forEach((t) => {
      t.completed = completed
      this.updateAllComplete_dt(t);
    });
  }

  filterDocuments(listStats, listType) {
    if (listStats.length > 0 && listType.length > 0) {
      console.log('status filter--> :' + listStats)
      console.log('type filter--> :' + listType)
      this.documents = this.allDocuments.filter(el => (listStats.indexOf(el.status) != -1) && (listType.indexOf(el.type) != -1));
      this.alllistobj.listst = this.listStats
      this.alllistobj.listdt = this.listType
      this.filteredValues.emit(this.alllistobj)
      //this.selectOrUnselectCurrentDoc();
      this.getCurrentDoc(undefined, undefined);
    }
    if (listStats.length == 0 && listType.length > 0) {
      console.log('type filter only--> :' + listType)
      this.documents = this.allDocuments.filter(el => (listType.indexOf(el.type) != -1));
      this.alllistobj.listst = this.listStats
      this.alllistobj.listdt = this.listType
      this.filteredValues.emit(this.alllistobj)
      // this.selectOrUnselectCurrentDoc();
      this.getCurrentDoc(undefined, undefined);
    }
    if (listStats.length > 0 && listType.length == 0) {
      console.log('status filter only--> :' + listStats)
      this.documents = this.allDocuments.filter(el => (listStats.indexOf(el.status) != -1));

      this.alllistobj.listst = listStats;
      this.alllistobj.listdt = listType;
      this.filteredValues.emit(this.alllistobj)
      //  this.selectOrUnselectCurrentDoc();
      this.getCurrentDoc(undefined, undefined);
    }
    if (listStats.length == 0 && listType.length == 0) {
      this.documents = this.allDocuments
      // this.selectOrUnselectCurrentDoc();
      this.getCurrentDoc(undefined, undefined);
    }
  }
  setListeType(type: listElt): void {
    if (type.completed) {
      this.listType.push(type.name);
      console.log('adding selecting type on list --> :' + this.listType)
    }
    else {
      this.listType.splice(this.listType.indexOf(type.name), 1); //remove starting from the current element and one element
      console.log('remove unelected element --> :' + this.listType)
    }
  }

  setListeStatus(status: listElt): void {
    if (status.completed) {
      this.listStats.push(status.name);
      console.log('adding selecting status on list --> :' + this.listStats)
    }
    else {
      this.listStats.splice(this.listStats.indexOf(status.name), 1); //remove starting from the current element and one element
      console.log('remove unelected element --> :' + this.listStats)
    }
  }

  downloadContent(document: Document, event: Event) {
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
    
    let docDownload = this.downloadInProgress.find((el) => {
      return el.itemId === document.itemId;
    });
    if(!docDownload) {
      docDownload = {itemId: document.itemId, downloadInProgress: true}
      this.downloadInProgress.push(docDownload);
    } else {
      docDownload.downloadInProgress = true;
    }

    // if (document.contentType === 'application/pdf')
    this.downloader.downloadFile(document.itemId, document.name, 'blob', document.contentType).subscribe(
      (blob: Blob) => {
        docDownload.downloadInProgress = false;
        if (blob) {
          console.log("blob: ", blob);
          let fileExtension = "";
          if(blob.type === 'application/xml' || blob.type === 'text/xml') { fileExtension = '.xml'}
          if(blob.type === 'application/pdf') { fileExtension = '.pdf'}

          FileSaver.saveAs(blob, document.name + fileExtension);
        }
        console.log("downloadPDFDocument");
        //  this.loadingCompleted.emit();
      },
      ((error) => {
        docDownload.downloadInProgress = false;
        console.log("error", error);
      })
    );
  }

  isDownloadInProgress(document: Document) {
    let docDownload = this.downloadInProgress.find((el) => {
      return el.itemId === document.itemId;
    });

    return docDownload && docDownload.downloadInProgress;
  }

  onInfoClick(document: Document, event: Event) {
    this.openPreviewDialog.emit(document);
  }
}