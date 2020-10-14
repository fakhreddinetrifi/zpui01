import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoclistComponent } from '../../doclist/doclist.component';

@Component({
  selector: 'app-docviewer-dialog',
  templateUrl: './docviewer-dialog.component.html',
  styleUrls: ['./docviewer-dialog.component.css']
})
export class DocviewerDialogComponent implements OnInit {
  @Output() markForSignClick: EventEmitter<string> = new EventEmitter<string>();
  selectedDoc: Document;
  LL_COOK: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {document: Document, LL_COOK: string}) { }

  ngOnInit(): void {
    this.LL_COOK = this.data.LL_COOK;
    this.selectedDoc = this.data.document;
  }

  getCurrentUpdate(updateSTatus: string) {
    this.markForSignClick.emit(updateSTatus);
  }
  

}
