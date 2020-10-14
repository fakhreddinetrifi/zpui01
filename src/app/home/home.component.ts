import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DoAuthorizationService } from '../services/do-authorization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DoAuthorizationService]
})
export class HomeComponent implements OnInit {
  title = 'ZP ECM - Universal Signature';
  message: string;
  shopId: string;
  access_token: string;
  LLCOOKIE: string;
  reqObj: any;
  assecoCode: string;
  assecoToken: string;
  assecoRefreshToken: string;
  userName: string;

  constructor(private doAuthService: DoAuthorizationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameters => {
      console.log(parameters);
      // var parameters = new URLSearchParams(window.location.search)
      this.shopId = parameters["shopId"] ? parameters["shopId"] : sessionStorage.getItem("shopId");
      this.access_token = parameters["access_token"] ? parameters["access_token"] : sessionStorage.getItem("access_token");
      this.assecoCode = parameters["code"] ? parameters["code"] : sessionStorage.getItem("assecoRedirectedData");
      this.userName = sessionStorage.getItem("username");
  
      if (this.shopId) {
        // console.log("URL PARAMETERS found: shopId - " + this.shopId);
        sessionStorage.setItem('shopId', this.shopId);
      }
      if (this.access_token) {
        // console.log("URL PARAMETERS found: access_code - " + this.access_token);
        this.LLCOOKIE = this.access_token;
        sessionStorage.setItem('access_token', this.access_token);
        // let accessTokenObject = this.parseJwt(this.access_token);
        // if (accessTokenObject) {
        //   this.userName = accessTokenObject.TechnicalAccountName;
        //   sessionStorage.setItem('userName', this.userName);
        //   console.log(this.userName);
        // }
      }
      // if (this.userName) {
      //   console.log("URL PARAMETERS found: username - " + this.userName);
      //   sessionStorage.setItem('username', this.userName);
      // }
      if (this.assecoCode) {
        // console.log('HomeComponent - OnInit: with access_token (Cookie)', sessionStorage.getItem("access_token"));
        // console.log("URL PARAMETERS found: code (Asseco SimplySign) - " + this.assecoCode);
        sessionStorage.setItem('assecoRedirectedData', this.assecoCode);
        this.getTokenApi();
      }
      
      console.log( `Class Parameters in use: [shopId:${this.shopId};access_token:${this.access_token};asseco Code:${this.assecoCode};username:${this.userName}]`);
  
      console.log( 'Session Parameters in use: [shopId:'+sessionStorage.getItem("shopId")+';asseco Code:'+sessionStorage.getItem("assecoRedirectData")+';assecoRefreshTokenApi:'+sessionStorage.getItem("assecoRefreshTokenApi")+';username:'+sessionStorage.getItem("username")+']');
   });
  }

  private getTokenApi() {
    this.doAuthService.getTokenApi().subscribe();
  }

}
