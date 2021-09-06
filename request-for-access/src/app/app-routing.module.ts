import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ViewRequestComponent } from './components/view-request/view-request.component';
import { AuthenticationGuard } from './helpers/authentication.guard';
import { AuthorizationGuardAdminAndAssociate } from './helpers/authorizationadminandassociate.guard';
import { AuthorizationGuardAdminAndExecutive } from './helpers/authorizationadminandexecutive.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'create/request', component: CreateRequestComponent, canActivate: [AuthorizationGuardAdminAndAssociate] },
  { path: 'view/request', component: ViewRequestComponent, canActivate: [AuthorizationGuardAdminAndExecutive]},
  { path: 'login', component: LoginComponent },
  /**Other redirect to home */
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
