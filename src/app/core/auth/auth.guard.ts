import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticateUserSuccess } from '../state-management/app.actions';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private googleAuthService: GoogleAuthService,
    private store: Store,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isUserAuthenticated$();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isUserAuthenticated$();
  }

  private isUserAuthenticated$(): Observable<boolean> {
    return this.googleAuthService.authenticateUser$().pipe(
      tap(user => {
        this.store.dispatch(new AuthenticateUserSuccess(user));
      }),
      map(user => !!user)
    );
  }

}
