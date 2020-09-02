import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService,
              private router: Router){}

  //proteger rutas de usuarios no logeados, si no se cumple la siguiente condicion

  //el canActive puede retornar:
  //canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  canActivate(): Observable<boolean> {
    return this._authService.isAuth()
            .pipe(
              tap(estado => {
                if(!estado){//siempre es el contrario del efecto (siempre pasa)
                  this.router.navigate(["/login"]);
                }
              })//efecto secundario
            );
  }
  
}
