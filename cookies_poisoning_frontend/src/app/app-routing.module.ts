import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AdministradorComponent } from './private/administrador/administrador.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: DashboardComponent },
  { path: 'home/restricted', component: AdministradorComponent,canActivate:[AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
