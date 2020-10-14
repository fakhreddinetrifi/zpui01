import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class AssecoHelperService {

  constructor(private http: HttpClient) { }


  getQueryVariable(uri: string, variable: string) {
    console.log("Current uri:" + uri);
    var query = uri.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable %s not found', variable);
  }


  getAssecoCode(url: string): string {
    let code;
    if (url) {
      console.log("Current url for Asseco Iframe:" + url);
      code = this.getQueryVariable(url, 'code')
      if (code) {
        console.log("generated code: " + code);
        localStorage.setItem('assecoRedirectedData', code);
        return code;
        // window.open('your current page URL', '_self', '');
        // window.close();

      } else {
        console.log("No code generated");
        return;
      }

    }
  }
  
  isAssecoCodeInStorage(): boolean {
    let code;
    code = localStorage.getItem('assecoRedirectedData') ;
      if (code) {
        console.log("generated code: " + code);
        return true
      } else {
        console.log("No code generated");
        return false;
      }

    }
  


  getTokenApi(code: string) : string {
    let token;
    this.http.get(
      "https://y2238-iflmap.hcisbp.eu2.hana.ondemand.com/http/test/cloudsign/gettoken?" + `access_code=${code}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Basic UDIwMDIyNTM4ODk6cDpJMnN3aXRjaCExMjM='
          }),
        responseType: 'json'
      })
      .pipe(
        tap(
          data => token = data,
          error => console.error(error)
        )
      );
    console.log('RESPONSE from Token API:  ' + token)
    return token;

  }


}
