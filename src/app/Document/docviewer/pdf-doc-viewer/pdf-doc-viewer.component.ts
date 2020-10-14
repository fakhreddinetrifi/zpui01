import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { Document } from 'src/app/Models/Document';
import { DownloaderService } from 'src/app/services/downloader.service';

@Component({
  selector: 'app-pdf-doc-viewer',
  templateUrl: './pdf-doc-viewer.component.html',
  styleUrls: ['./pdf-doc-viewer.component.css']
})
export class PdfDocViewerComponent implements OnInit, OnChanges {
  @Input() document: Document
  @Output() loadingCompleted: EventEmitter<void> = new EventEmitter();
  data: Uint8Array;

  constructor(private downloader: DownloaderService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // console.log("PDF Viewer - Document: ", this.document);
    // this.downloadPDFDocument();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.document) {
      console.log("PDF Viewer - ngOnChange - Document: ", this.document);
      this.data = null;
      this.downloadPDFDocument();
    }
  }

  downloadPDFDocument() {
    this.downloader.getContentFile(this.document.itemId, this.document.name, 'arraybuffer', this.document.contentType)
      .pipe(
        tap((stream) => {
          console.log(typeof stream);
          console.log("stream: ", stream);
        }),
        map((stream: ArrayBuffer) => {
          // return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([stream], {type: "application/pdf"})));
          return new Uint8Array(stream);
          
          // var bytes = Object.keys(stream).length;
          // if (bytes > 0) {
          //   var dataArray = new Uint8Array(bytes);
          //   for (var i = 0; i < bytes; i++) {
          //     dataArray[i] = stream[i].charCodeAt(0);
          //   }
          //   return dataArray;
          // } else {
          //   return null;
          // }
          
        })
      )
      .subscribe(
        (res: Uint8Array) => {
          if (res) {
            this.data = res;
            console.log("data: ", this.data);
            // console.log("URL", URL.createObjectURL(this.data));
          }
          console.log("downloadPDFDocument");
          this.loadingCompleted.emit();
        },
        ((error) => {
          console.log("error", error);
        })
      );
  }

  onAfterLoadComplete() {
    console.log("onAfterLoadComplete");
    this.loadingCompleted.emit();
  }
}
