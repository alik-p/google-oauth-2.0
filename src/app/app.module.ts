import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState } from './core/state-management/app.state';
import { SignInPageComponent } from './sign-in/sign-in-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDetailsPageComponent } from './user-details/user-details-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const ANGULAR_MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignInPageComponent,
    UserDetailsComponent,
    UserDetailsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production
    }),
    ...ANGULAR_MATERIAL,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
