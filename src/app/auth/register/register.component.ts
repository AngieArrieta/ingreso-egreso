import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  forma: FormGroup; //nuestro formulario
  cargando: boolean = false;
  uiSubscription: Subscription;
  
  constructor(private fb: FormBuilder, 
              private _authService: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {

    //definicion de formulario
    this.forma = this.fb.group({
      nombre:   ['', Validators.required], //formcontrolname
      correo:   ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
                          this.cargando = ui.isLoading ; //variable inicializada
                          console.log(ui);
                          }); 
  }


  //lugar para hacer limpiezas
  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }


  crearUsuario(){

    // start loading
    /* Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    }); //se destruye solo si salta el error */


    if(this.forma.invalid){
      this.errorModal("Intente con un correo y/o usuario valido");
      return;
    }

    this.store.dispatch(ui.isLoading());

    // desestructuracion de objetos
    const { nombre, correo, password } = this.forma.value;

    this._authService.crearUsuario(nombre,correo,password)
        .then(credenciales => { //accept
          Swal.fire({
            title: "Genial!",
            text: "Usuario registrado exitosamente, ya puedes iniciar sesión",
            icon: "success"
          });

          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/login']);
        })
        .catch(err => {
          this.errorModal(err.message);
          this.store.dispatch(ui.stopLoading());
        }); //reject
  
  
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
