import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserDetails } from '../auth/user-details';
import { AuthenticateUserSuccess } from './app.actions';

export interface AppStateModel {
  user: UserDetails;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    user: null,
  }
})
@Injectable()
export class AppState {

  @Selector()
  static getUserDetails(state: AppStateModel): UserDetails {
    return state.user;
  }

  @Action(AuthenticateUserSuccess)
  authenticateUserSuccess(context: StateContext<AppStateModel>, { payload }: AuthenticateUserSuccess): void {
    context.setState(state => ({ ...state, user: payload }));
  }

}
