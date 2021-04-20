import { Injectable } from '@angular/core';
import { BehaviorSubject, bindCallback, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import BasicProfile = gapi.auth2.BasicProfile;
import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  #authClient$ = new BehaviorSubject<GoogleAuth>(undefined);
  #isApiLoaded = false;
  #user$ = new BehaviorSubject<GoogleUser>(undefined);

  constructor() { }

  authenticateUser$(): Observable<BasicProfile> {
    return this.getUserProfile$();
  }

  private getAuthClient(): GoogleAuth {
    return this.#authClient$.getValue();
  }

  private getAuthClient$(): Observable<GoogleAuth> {
    return this.getAuthClient()
      ? this.#authClient$.asObservable()
      : this.initAuthClient$();
  }

  private getGoogleApi$(): Observable<boolean> {
    return this.#isApiLoaded ? of(true) : this.loadGoogleApi$();
  }

  private getUserProfile$(): Observable<BasicProfile> {
    const user$ = this.#user$.getValue()
      ? this.#user$.asObservable()
      : this.signIn$();
    return user$.pipe(
      map((user: GoogleUser) => user?.getBasicProfile())
    );
  }

  /**
   * Initialize Google OAuth Client
   */
  private initAuthClient$(): Observable<GoogleAuth> {
    return this.getGoogleApi$().pipe(
      switchMap((loaded: boolean) => loaded
        ? from(gapi.auth2.init({ client_id: environment.authClientId }))
        : of(null)
      ),
      tap(authClient => {
        this.#authClient$.next(authClient);
      })
    );
  }

  /**
   * Load Google API OAuth Client
   */
  private loadGoogleApi$(): Observable<boolean> {
    const loadApi = (resolve) => gapi.load('auth2', resolve);
    const loadApi$ = bindCallback(loadApi);
    return loadApi$().pipe(
      map(() => true),
      catchError(() => of(false)),
      tap((isLoaded: boolean) => {
        this.#isApiLoaded = isLoaded;
      }),
    );
  }

  private signIn$(): Observable<GoogleUser> {
    return this.getAuthClient$().pipe(
      switchMap(authClient => {
        const googleUser: GoogleUser = authClient.currentUser?.get();
        return googleUser?.isSignedIn()
          ? of(googleUser)
          : from(authClient.signIn());
      }),
      tap((user: GoogleUser) => {
        this.#user$.next(user);
      })
    );
  }

}
