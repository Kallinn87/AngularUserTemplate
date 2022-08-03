import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';

import { HelpComponent } from './component/help/help.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UsersComponent } from './component/users/users.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MainComponent } from './component/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: AuthComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'users', component: UsersComponent},
  {path: 'help', component: HelpComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
