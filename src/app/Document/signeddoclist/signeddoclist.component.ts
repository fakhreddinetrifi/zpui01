import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../Models/Document';
import { DownloaderService } from 'src/app/services/downloader.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-signeddoclist',
  templateUrl: './signeddoclist.component.html',
  styleUrls: ['./signeddoclist.component.css']
})
export class SigneddoclistComponent implements OnInit {
@Input() signedDocdocuments: Document ;
@Input() loadingCompleted_sd: boolean ;

  HighlightRow: any;  
  p_sd:number = 1;
 //  filter :string;
    //sorting
  key_sd: string = 'name'; //set default
  reverse_sd: boolean = false;

  downloadInProgress: {itemId: string, downloadInProgress: boolean}[] = [];


  sort_sd(key){
    this.key_sd = key;
    this.reverse_sd = !this.reverse_sd;
  }

  getCurrentDoc (index:number) : void{
    this.HighlightRow = index ;
  }
  constructor(private downloader: DownloaderService) { }

  ngOnInit(): void {
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
}
