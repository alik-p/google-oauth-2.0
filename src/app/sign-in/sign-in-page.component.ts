import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<app-sign-in></app-sign-in>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent { }
