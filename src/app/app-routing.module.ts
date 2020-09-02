import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {// GUARD - en dashboard porque es mi pagina principal el cual tiene hijos
    path: '', 
    component: DashboardComponent , 
    children: dashboardRoutes,
    canActivate: [AuthGuard] //todas las reglas o guards que quiero que esta ruta compruebe antes de entrar
  },
  {path: '**', redirectTo: ''},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
