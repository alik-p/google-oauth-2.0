import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private googleAuthService: GoogleAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isUserAuthenticated$();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isUserAuthenticated$();
  }

  private isUserAuthenticated$(): Observable<boolean> {
    return this.googleAuthService.authenticateUser$().pipe(
      tap(user => console.log({ user })),
      map(user => !!user)
    );
  }

}
