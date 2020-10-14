import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { DownloaderService } from 'src/app/services/downloader.service';
import { Document } from '../../../Models/Document';
import { forkJoin } from 'rxjs';
import { xsltProcess, xmlParse } from 'xslt-processor';

@Component({
  selector: 'app-xml-doc-viewer',
  templateUrl: './xml-doc-viewer.component.html',
  styleUrls: ['./xml-doc-viewer.component.css']
})
export class XmlDocViewerComponent implements OnInit, OnChanges {
  @Input() document: Document
  @Output() loadingCompleted: EventEmitter<void> = new EventEmitter();
  outXmlString: string;

  constructor(private downloader: DownloaderService) { }

  ngOnInit(): void {
    // console.log('XML Document Viewer - Document selected', this.document);
    // this.transformXML();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.document) {
      console.log('XML Document Viewer (On Changes) - Document selected', this.document);
      this.outXmlString = null;
      this.transformXML();
    }
  }

  transformXML() {
    forkJoin([this.downloadContent(), this.downloadXsltTemplate()]).subscribe((res) => {
      this.outXmlString = xsltProcess(xmlParse(res[0]), xmlParse(res[1]));
      this.loadingCompleted.emit();
    })
  }

  private downloadContent() {
    return this.downloader.getContentFile(this.document.itemId, this.document.name, 'text', this.document.contentType);
  }

  private downloadXsltTemplate() {
    return this.downloader.getXsltString('assets/xml_z.xsl');
  }
}
