import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../Models/Document';

@Component({
  selector: 'app-docviewerheader',
  templateUrl: './docviewerheader.component.html',
  styleUrls: ['./docviewerheader.component.css']
})
export class DocviewerheaderComponent implements OnInit {
  @Input() selectedDoc: Document;
  constructor() { }

  ngOnInit(): void {
  }

}
