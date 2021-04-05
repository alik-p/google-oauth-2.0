import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserDetails } from '../auth/user-details';
import { AuthenticateUserSuccess, SignOut } from './app.actions';

export interface AppStateModel {
  isSignedIn: boolean;
  user: UserDetails;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isSignedIn: false,
    user: null,
  }
})
@Injectable()
export class AppState {

  @Selector()
  static isSignedIn(state: AppStateModel): boolean {
    return state.isSignedIn;
  }

  @Selector()
  static getUserDetails(state: AppStateModel): UserDetails {
    return state.user;
  }

  constructor() {}

  @Action(AuthenticateUserSuccess)
  authenticateUserSuccess(context: StateContext<AppStateModel>, { payload }: AuthenticateUserSuccess): void {
    context.setState(state => ({ ...state, isSignedIn: true, user: payload }));
  }

  /**
   * Simulate sign out
   * TODO: implement real Sign Out logic
   */
  @Action(SignOut)
  signOut(context: StateContext<AppStateModel>): void {
    context.setState(state => ({ ...state, isSignedIn: false, user: null }));
  }

}
