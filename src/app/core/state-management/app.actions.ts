import { UserDetails } from '../auth/user-details';

export class AuthenticateUserSuccess {
  static readonly type = '[Google API] Authenticate User Success';
  constructor(public payload: UserDetails) { }
}
