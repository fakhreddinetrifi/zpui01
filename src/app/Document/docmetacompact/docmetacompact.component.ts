import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../Models/Document';

@Component({
  selector: 'app-docmetacompact',
  templateUrl: './docmetacompact.component.html',
  styleUrls: ['./docmetacompact.component.css']
})
export class DocmetacompactComponent implements OnInit {
@Input() selectedDoc: Document;

  constructor() { }

  ngOnInit(): void {

    //console.log('Mark for Sign activation ?',this.StatusControlValue())

  }
  
}
