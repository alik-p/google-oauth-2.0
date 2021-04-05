import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SignOut } from './core/state-management/app.actions';
import { AppState } from './core/state-management/app.state';
import { IconRegistryService } from './shared/icon-registry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @Select(AppState.isSignedIn) isSignedIn$: Observable<boolean>;
  date = Date.now();

  constructor(
    private iconRegistryService: IconRegistryService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.registryIcons();
  }

  onSignOut(): void {
    this.store.dispatch(new SignOut());
    this.router.navigate(['/sign-in']);
  }

  private registryIcons(): void {
    this.iconRegistryService.registerSvgIcon('google-logo', '../assets/img/google-logo.svg');
  }

}
