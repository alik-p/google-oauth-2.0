import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDetails } from '../core/auth/user-details';
import { AppState } from '../core/state-management/app.state';

@Component({
  template: `
    <app-user-details [user]="user$ | async"></app-user-details>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPageComponent {
  @Select(AppState.getUserDetails) user$: Observable<UserDetails>;

  constructor() { }

}
