import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    //lazyload
    path: '',
    // canActivate: [AuthGuard] -- carga el modulo
    canLoad: [AuthGuard],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module') // se carga el archivo
                        .then(m => m.IngresoEgresoModule) //cuando se cargue, se carga el modulo
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
