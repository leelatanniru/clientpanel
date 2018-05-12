import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './guards/auth.guards';
import { RegisterGaurd } from './guards/register.guards';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes=[
  {path: '', component: DashboardComponent, canActivate:[AuthGaurd]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[RegisterGaurd]},
  {path: 'client/add', component: AddClientComponent, canActivate:[AuthGaurd]},
  {path: 'client/edit/:id', component: EditClientComponent, canActivate:[AuthGaurd]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate:[AuthGaurd]},
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGaurd]},
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGaurd, RegisterGaurd]
})
export class AppRoutingModule { }
