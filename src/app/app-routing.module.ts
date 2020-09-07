import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module') // se carga el archivo
                        .then(m => m.IngresoEgresoModule) //cuando se cague, se carga el modulo
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
