import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IconRegistryService } from './shared/icon-registry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private iconRegistryService: IconRegistryService) { }

  ngOnInit(): void {
    this.registryIcons();
  }

  private registryIcons(): void {
    this.iconRegistryService.registerSvgIcon('google-logo', '../assets/img/google-logo.svg');
  }

}
