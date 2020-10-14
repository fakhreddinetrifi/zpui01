import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/services/appconfig';

@Injectable()
export class DownloaderService {
  constructor(private http: HttpClient,private environment : AppConfig) {

   }

  getContentFile(documentId: string, name: string, responseType: string, contentType: string) {
    console.log('DownloaderService - getContentFile: with access_token (Session)', sessionStorage.getItem("access_token"));
    return this.http.get(
      `${this.environment.emc_protocol}://${this.environment.emc_host}:${this.environment.ecm_port}/${this.environment.ecm_app_name}/${this.environment.ecm_document_download_service}?documentId=${documentId}&filename=${documentId}`,
      {
        headers: new HttpHeaders(
          {
            'otcsticket': sessionStorage.getItem('access_token'),
            'Content-Type': contentType
          }
        ),
        responseType: responseType as 'json'
      })
      .pipe(
        tap(
          data => this.log(documentId, data),
          error => this.logError(name, error)
        )
      );
  }
  downloadFile(documentId: string, name: string, responseType: string, contentType: string) {
    console.log('DownloaderService - downloadFile: with access_token (Session)', sessionStorage.getItem("access_token"));
    return this.http.get(
      `${this.environment.emc_protocol}://${this.environment.emc_host}:${this.environment.ecm_port}/${this.environment.ecm_app_name}/${this.environment.ecm_document_download_service}?documentId=${documentId}&filename=${documentId}`,
      {
        headers: new HttpHeaders(
          {
            'otcsticket': sessionStorage.getItem('access_token'),
            'Content-Type': contentType
          }
        ),
        responseType: responseType as 'json'
      })
      .pipe(
        tap(
          data => this.log(documentId, data),
          error => this.logError(name, error)
        )
      );
  }
  getXsltString(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, { responseType: 'text' }).pipe(
      tap( // Log the result or error
        data => this.log(filename, data),
        error => this.logError(filename, error)
      )
    );
  }

  // getTextFile(filename: string) {
  //   // The Observable returned by get() is of type Observable<string>
  //   // because a text response was specified.
  //   // There's no need to pass a <string> type parameter to get().
  //   return this.http.get(filename, {responseType: 'text'})
  //     .pipe(
  //       tap( // Log the result or error
  //         data => this.log(filename, data),
  //         error => this.logError(filename, error)
  //       )
  //     );
  // }

  private log(documentId: string, data: any) {
    const message = `DownloaderService downloaded object with ID "${documentId}"`; // and got "${data}".`;
    console.log(message);
  }

  private logError(documentId: string, error: any) {
    const message = `DownloaderService failed to download object with ID "${documentId}"; got error "${error.message}".`;
    console.error(message);
  }
}
