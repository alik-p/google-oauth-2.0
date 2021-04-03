import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in/sign-in-page.component';
import { UserDetailsPageComponent } from './user-details/user-details-page.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'user-details', component: UserDetailsPageComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
