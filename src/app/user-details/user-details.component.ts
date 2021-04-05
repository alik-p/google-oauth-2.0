import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '../core/auth/user-details';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserDetails;

  constructor() { }

  ngOnInit(): void { }

}
