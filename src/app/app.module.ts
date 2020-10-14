import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DoclistComponent } from './Document/doclist/doclist.component';
import { DoclistheaderComponent } from './Document/doclistheader/doclistheader.component';
import { DocmetacompactComponent } from './Document/docmetacompact/docmetacompact.component';
import { DocviewerDialogComponent } from './Document/docviewer/docviewer-dialog/docviewer-dialog.component';
import { DocviewerComponent } from './Document/docviewer/docviewer.component';
import { PdfDocViewerComponent } from './Document/docviewer/pdf-doc-viewer/pdf-doc-viewer.component';
import { XmlDocViewerComponent } from './Document/docviewer/xml-doc-viewer/xml-doc-viewer.component';
import { DocviewerheaderComponent } from './Document/docviewerheader/docviewerheader.component';
import { PagedoclistComponent } from './Document/pagedoclist/pagedoclist.component';
import { SigneddoclistComponent } from './Document/signeddoclist/signeddoclist.component';
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { AppConfig } from './services/appconfig';
import { DoAuthorizationService } from './services/do-authorization.service';
import { DownloaderService } from './services/downloader.service';
import { JsonappconfigService } from './services/jsonappconfig.service';
import { MessageDialogComponent } from './validate-pin/message-dialog/message-dialog.component';
import { ValidatePINComponent } from './validate-pin/validate-pin.component';
import { UploaderService } from './services/uploader.service';
import { Discrepancy_ProtocolComponent } from './Discrepancy_Protocol/Discrepancy_Protocol.component';

export function initializerFn(jsonappconfigService: JsonappconfigService) {
  return () => {
    return jsonappconfigService.load();
  }
}

@NgModule({
  declarations: [	
    AppComponent,
    DoclistComponent,
    DoclistheaderComponent,
    DocmetacompactComponent,
    DocviewerComponent,
    DocviewerheaderComponent,
    PagedoclistComponent,
    ValidatePINComponent,
    SigneddoclistComponent,
    MessageDialogComponent,
    ForbiddenComponent,
    HomeComponent,
    XmlDocViewerComponent,
    PdfDocViewerComponent,
    DocviewerDialogComponent,
    FooterComponent,
    DocumentUploadComponent,
      Discrepancy_ProtocolComponent
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    NgxDocViewerModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    NgxPaginationModule,
    MatTooltipModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    MatProgressSpinnerModule,
    PdfViewerModule,
    MatCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonappconfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [JsonappconfigService],
      useFactory: initializerFn
    },
    CookieService,
    DownloaderService,
    DoAuthorizationService,
    UploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
