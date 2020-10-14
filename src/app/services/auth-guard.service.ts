import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(activatedRoute: ActivatedRouteSnapshot) {
    let access_token = activatedRoute.params["access_token"];
    if(!access_token) {
      access_token = sessionStorage.getItem("access_token");
    }

    return this.authService.isAuthenticated(access_token).pipe(
      tap((result) => {
        if(!result) {
          this.router.navigate(['/403']);
        }
      })
    );
  }
}
