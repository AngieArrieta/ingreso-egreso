import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, 
              private _authServices: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(){

    this.forma = this.fb.group({
      correo: ['',[Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {this.cargando = ui.isLoading ;}); 

    // el state es un objeto
    // el servicio de store se subcribe para ver los cambios del nodo
    // como respuesta tengo un objeto de la definicion de los estados del nodo (objeto creado en el reducer)
    // asigno mi variable local al valor del que tenga isLoading (hace parte del objeto)
  }

  //lugar para hacer limpiezas
  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  logearUsuario(){

    // start loading
   /*  Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    }); //se destruye solo si salta el error */


    if(this.forma.invalid){ 
      this.errorModal("Error de autenticación");
      return;
    }

    this.store.dispatch(ui.isLoading());


    const { correo, password } = this.forma.value;
    this._authServices.logearUsuario(correo, password)
        .then(res=>{
          console.log("usuario logeado!!", res);

          // stop loading 
          //destruir si es exitoso
          /* Swal.close(); */

          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch(err=> {
          this.store.dispatch(ui.stopLoading());
          this.errorModal(err.message)
          
        });
  }

  errorModal(mensaje: string){
    Swal.fire({
      title: "Oops...",
      text: mensaje,
      icon: "error",
      footer: "Intentalo de nuevo"
    });
  }

}
