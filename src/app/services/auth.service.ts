import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OTCSAuthResponse } from '../Models/otcs-auth-response.model';
import { DoAuthorizationService } from './do-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private doAuthService: DoAuthorizationService) {}

  public isAuthenticated(access_token: string) : Observable<boolean> {
    return this.doAuthService.validateOTCSTicket(access_token).pipe(
      map((response: OTCSAuthResponse) => {
        console.log("Ticket Validation", response);
        if(response.ticketValid) {
          console.log("username: ", response.userName);
          sessionStorage.setItem("username", response.userName);
          sessionStorage.setItem("access_token", access_token);
        }
        return response.ticketValid;
      })
    );
  }
}
