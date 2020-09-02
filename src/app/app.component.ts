import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
//aplicacion siempre pasa por aqui

constructor(private _authService: AuthService){
  this._authService.initAuthListener();
}



}
