import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PINResponse } from '../Models/pin-response.model';
import { TokenApiResponse } from '../Models/token-api-reponse.model';
import { DoAuthorizationResponse } from '../Models/do-authorization-response.model';
import { ResponseErrorCode } from '../Models/reponse-error.model';
import { AppConfig } from 'src/app/services/appconfig';
import { OTCSAuthResponse } from '../Models/otcs-auth-response.model';
import { GetProfileResponse } from '../Models/getprofile-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class DoAuthorizationService {
  assecoToken: any;
  assecoRefreshToken: any;
  profileId: string;
  baseUrlGetToken: string ;
  baseUrlGetProfile: string;
  baseUrlValidatePin: string ;
  baseUrlDoAuth: string;
  constructor(private http: HttpClient,private environment : AppConfig ) {
  this.baseUrlGetToken = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_gettoken_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/cpi/gettoken/";
  this.baseUrlGetProfile= `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_getprofile_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/cpi/getprofile/";
  this.baseUrlValidatePin = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_cpi_validatepin_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/cpi/validatepin/"
  this.baseUrlDoAuth = `${environment.emc_protocol}://${environment.emc_host}:${environment.ecm_port}/${environment.ecm_app_name}/${environment.ecm_document_sign_service}`;//"https://dev.ecm.zabka.pl:8443/zpecm-rest/document/sign";

   }

  getTokenApi(): Observable<TokenApiResponse> {
    let assecoToken = sessionStorage.getItem("assecoTokenApi");
    let assecoRefreshToken = sessionStorage.getItem("assecoRefreshTokenApi");


    //Check availaibility of token in session storage
    if (assecoRefreshToken && assecoToken && assecoToken != undefined && assecoRefreshToken != undefined) {
      //Check token hasn't expired 
      let isTokenValid = this.isTokenValid();
      if (isTokenValid) {
        return of(new TokenApiResponse({
          access_token: sessionStorage.getItem("assecoTokenApi"),
          refresh_token: sessionStorage.getItem("assecoRefreshTokenApi")
          // expires_in: sessionStorage.getItem(""),
          // token_type: 'bearer'
        }));
      }
      //Use refresh token for a new code
      else {
        return this.getTokenApiByType(assecoRefreshToken, "refresh");
      }
    }
    //No token available
    else {
      let code = sessionStorage.getItem("assecoRedirectedData");
      //OTP code available from sympliSign
      if (code && code != undefined) {
        console.log("Requesting token for doAuthorization.");
        return this.getTokenApiByType(code, "access");
      }
      //No OTP code available
      else {
        console.error("Request cannot be processed: No OTP code from Asseco SympliSign.");
        return throwError("Request cannot be processed: No OTP code from Asseco SympliSign");
      }
    }

  }

  isTokenValid(): boolean {
    var expirationDateStr = sessionStorage.getItem("assecoTokenApiValidUntil");
    if (expirationDateStr && expirationDateStr != undefined) {
      var expirationDate = new Date(expirationDateStr);
      console.log('DoAuthorization - Token expiration string :', expirationDateStr);
      if (new Date() < expirationDate) {
        console.log('DoAuthorization - The token is valid and will expire on :', expirationDate);
        return true;
      }
      console.log('DoAuthorization - The token has expired on :', expirationDate);
    }
    console.log('DoAuthorization - The token is not available on the storage');
    return false;

  }

  private getTokenApiByType(code: string, type: string): Observable<TokenApiResponse> {
    console.log(`${this.baseUrlGetToken}/${code}/?type=${type}`);
    return this.http.get<TokenApiResponse>(
      `${this.baseUrlGetToken}/${code}/?type=${type}`,
      {
        headers: new HttpHeaders(
          {
            // Authorization: 'Basic QWRtaW46cFI2IUFqMkxjSEN3bj1lSg==',
            'OTCSTICKET': sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          })
      })
      .pipe(
        tap((data: TokenApiResponse) => {
          this.assecoToken = data.access_token;
          this.assecoRefreshToken = data.refresh_token;
          var expirationDate = new Date();
          console.log("assecoTokenApi: " + this.assecoToken + "; assecoRefreshTokenApi:" + this.assecoRefreshToken);
          expirationDate.setSeconds(expirationDate.getSeconds() + 3600);
          sessionStorage.setItem("assecoTokenApi", this.assecoToken);
          sessionStorage.setItem("assecoTokenApiValidUntil", expirationDate.toString())
          if (type == 'access') {
            sessionStorage.setItem("assecoRefreshTokenApi", this.assecoRefreshToken)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            //Clearing Tokens and related data
            //sessionStorage.removeItem("assecoTokenApi");
            //sessionStorage.removeItem("assecoTokenApiValidUntil");
            //sessionStorage.removeItem("assecoRefreshTokenApi");
            //sessionStorage.removeItem("assecoRedirectedData");
          }
          // If you want to return a new response:
          //return of(new HttpResponse({body: [{name: "Default value..."}]}));
          // If you want to return the error on the upper level:
          //return throwError(error);
          // or just return nothing:
          return throwError(error.error);;
        })
      );


  }

  getProfile(code: string): Observable<GetProfileResponse> {
    console.log(`${this.baseUrlGetProfile}/?access_token=${code}`);
    return this.http.get<GetProfileResponse>(
      `${this.baseUrlGetProfile}/?access_token=${code}`,
      {
        headers: new HttpHeaders(
          {
            // Authorization: 'Basic QWRtaW46cFI2IUFqMkxjSEN3bj1lSg==',
            'OTCSTICKET': sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
          })
      })
      .pipe(
        tap((data: GetProfileResponse) => {
          this.profileId = data.id;
          sessionStorage.setItem("assecoProfileId", this.profileId);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            //Clearing Tokens and related data
            sessionStorage.removeItem("assecoProfileId");
          }
          // If you want to return a new response:
          //return of(new HttpResponse({body: [{name: "Default value..."}]}));
          // If you want to return the error on the upper level:
          //return throwError(error);
          // or just return nothing:
          return throwError(error.error);;
        })
      );


  }


  doPinValidation(pin: string, access_token: string): Observable<PINResponse> {
    console.log(this.baseUrlValidatePin);
    console.log("pin: ", pin);
    // let access_token = sessionStorage.getItem("assecoTokenApi");
    console.log(this.baseUrlDoAuth);
    return this.http.post<PINResponse>(
      this.baseUrlValidatePin,
      {
        pin: pin,
        access_token: access_token,
      },
      {
        headers: new HttpHeaders({
          // Authorization: 'Basic QWRtaW46cFI2IUFqMkxjSEN3bj1lSg==',
          'OTCSTICKET': sessionStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        })
      }
    );
  }

  doAuthorization(pin: string): Observable<DoAuthorizationResponse> {
    let access_token = sessionStorage.getItem("assecoTokenApi");
    let shopId = sessionStorage.getItem("shopId");
    let adUser = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'Admin';
    if (access_token && shopId && pin && adUser) {
      console.log(this.baseUrlDoAuth);
      const httpOptions = {
        headers: new HttpHeaders({
          // Authorization: 'Basic QWRtaW46cFI2IUFqMkxjSEN3bj1lSg==',
          'OTCSTICKET': sessionStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        })
      };
      const params = { 'pin': pin, 'access_token': access_token, 'shopId': shopId, 'adUser': adUser };
      return this.http.post<DoAuthorizationResponse>(this.baseUrlDoAuth, params, httpOptions)
        .pipe(
          tap((data: DoAuthorizationResponse) => {
            console.log("doAuthorization - Beginning Signature for Shop ID: " + shopId);
            console.log(data);
            // return from(data);
          })
        );
    } else {
      if (!access_token) { return throwError(ResponseErrorCode.access_token_invalid) }
      if (!shopId) { return throwError(ResponseErrorCode.shopId_invalid) }
      if (!adUser) { return throwError(ResponseErrorCode.adUser_invalid) }
    }
  }

  validateOTCSTicket(access_token: string): Observable<OTCSAuthResponse> {
    return this.http.get<OTCSAuthResponse>(
      `${this.environment.emc_protocol}://${this.environment.emc_host}:${this.environment.ecm_port}/${this.environment.ecm_app_name}/${this.environment.otcs_auth_service}`,
      {
        headers: new HttpHeaders({
          otcsticket: access_token
        })
      }
    ).pipe(
      catchError((error) => {
        console.log(error);
        return of(new OTCSAuthResponse({ userName: null, ticketValid: false }));
      })
    )
  }
}