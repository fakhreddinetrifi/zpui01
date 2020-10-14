import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ValidatePINComponent } from 'src/app/validate-pin/validate-pin.component';
import { AppConfig } from 'src/app/services/appconfig';
import { Document } from '../../Models/Document';
@Component({
  selector: 'app-doclistheader',
  templateUrl: './doclistheader.component.html',
  styleUrls: ['./doclistheader.component.css']
})
export class DoclistheaderComponent implements OnInit {
  @Input() documents: Document[];
  @Input() shopIdDhc;
  @Output() doAuthEvent = new EventEmitter();
  @Output() refreshaction = new EventEmitter();
  @Output() needFilters = new EventEmitter()
  userName: string;
  iframe: HTMLIFrameElement;
  hasItemsReady: boolean;
  hasAssecoCode: boolean;
  // needFilters = new EventEmitter()

  ngOnInit(): void {
    this.hasItemsReady = false;
    this.hasAssecoCode = false;
    this.userName = sessionStorage.getItem("username");
    // console.log("Doc Header userName:", this.userName);
  }

  constructor(private dialog: MatDialog,private environment : AppConfig) {

  }
  
  // openDocFilter() {
  //   document.getElementById("mySidepanel").style.width = "200px";
  // }

  openAsseco() {
    window.location.href = this.environment.simplysign_url;
  }

  closeAsseconInit() {
    this.dialog.closeAll();
  }

  openAssecoFinal() {
    const dialogRef = this.dialog.open(ValidatePINComponent, { width: "450px", disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.doAuthEvent.emit("doAuthEvent");
      }
    });
  }

  hasDocumentForSignature(): boolean {
    if (this.documents) {
      return this.documents.filter(el => el.status == 'Marked for Signature') ? true : false;
    }
  }

  isAuthorizationReady(): boolean {
    if (this.documents) {
      if (this.documents.filter(el => el.status == 'Marked for Signature')) {
        return sessionStorage.getItem("assecoTokenApi")?true:false;
      }
      return false;
    }
  }

  clearAsseco() {
    console.log(`Clearing data for Auth`);
    if(sessionStorage.getItem("assecoTokenApi")){
      sessionStorage.removeItem("assecoTokenApi");
      sessionStorage.removeItem("assecoRefreshTokenApi");
      
    }
}
  public closeDialog() {
    this.dialog.closeAll();
  }
filtersAction(): void {
   console.log('filters button clicked');
           this.needFilters.emit('filter');     
  }

  refresh(): void {
   console.log('refresh button clicked');
            this.refreshaction.emit("refresh");     
  }


}
