import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploaderService } from '../services/uploader.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  files: any[] = [];
  uploadInProgress: boolean = false;
  filesAlreadyUploaded: boolean = false;
  docType: string;
  docTypes: string[] = ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"];

  constructor(private activatedRoute: ActivatedRoute, private uploader: UploaderService) {}
  
  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.docType = parameters['doc_type'];
      console.log(parameters);
    });
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if(!this.filesAlreadyUploaded) {
      this.files.splice(index, 1);
    }
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator() {
    this.uploadInProgress = true;
    let fakeUploader = this.uploader.uploadFiles(this.files)
    fakeUploader.subscribe((res) => {
      this.filesAlreadyUploaded = true;
      this.uploadInProgress = false;
      // for(let i=0;i<res.length;i++) {
      //   if(this.files[i].progress === 100) {
      //     fakeUploader[i].unsubscribe();
      //   }
      // }
    });


    // if(index === 0) {
    //   this.uploadInProgress = true;
    // }
    // if (index === this.files.length) {
    //   this.uploadInProgress = false;
    //   return;
    // } else {
    //   setTimeout(() => {
    //     const progressInterval = setInterval(() => {
    //       if (this.files[index].progress === 100) {
    //         clearInterval(progressInterval);
    //         this.uploadFilesSimulator(index + 1);
    //       } else {
    //         this.files[index].progress += 5;
    //       }
    //     }, 1000);
    //   }, 200);
    // }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    console.log(files);
    for (const item of files) {
      if(this.files.findIndex(file => file.name === item.name) == -1) {
        item.progress = 0;
        this.files.push(item);
      }
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  isUploadDisabled(): boolean {
    return this.files.length === 0 || this.uploadInProgress || this.isUploadDone();
  }

  isUploadDone(): boolean {
    return this.filesAlreadyUploaded;
  }

  isDeleteFileAllowed() {
    return !this.uploadInProgress && !this.isUploadDone();
  }

  closeWindow() {
    // opener.document.getElementById('myVal').value = 'Value from Popup';
    // opener.postMessage("popup-colsed", "http://localhost:8080", {code: "code from popup"});

    console.log("search", window.location.search);
    /*without iFrame*/
    // window.close();

    /* With iFrame */
    window.parent.close();
  }
}
