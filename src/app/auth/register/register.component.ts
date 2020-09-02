import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup; //nuestro formulario
  
  constructor(private fb: FormBuilder, 
              private _authService: AuthService, 
              private router: Router) { }

  ngOnInit() {

    //definicion de formulario
    this.forma = this.fb.group({
      nombre:   ['', Validators.required], //formcontrolname
      correo:   ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  crearUsuario(){

    // start loading
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    }); //se destruye solo si salta el error


    if(this.forma.invalid){
      this.errorModal("Intente con un correo y/o usuario valido");
      return;
    }

    // desestructuracion de objetos
    const { nombre, correo, password } = this.forma.value;

    this._authService.crearUsuario(nombre,correo,password)
        .then(credenciales => { //accept
          Swal.fire({
            title: "Genial!",
            text: "Usuario registrado exitosamente, ya puedes iniciar sesión",
            icon: "success"
          });
          this.router.navigate(['/login']);
        })
        .catch(err => this.errorModal(err.message)); //reject
  
  
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
