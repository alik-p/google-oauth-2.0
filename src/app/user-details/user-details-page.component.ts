import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<app-user-details></app-user-details>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPageComponent {}
