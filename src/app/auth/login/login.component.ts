import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, 
              private _authServices: AuthService, 
              private router: Router) { }

  ngOnInit(){
    this.forma = this.fb.group({
      correo: ['',[Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  logearUsuario(){

    // start loading

    
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    }); //se destruye solo si salta el error



    if(this.forma.invalid){ 
      this.errorModal("Error de autenticación");
      return;
    }

    const { correo, password } = this.forma.value;
    this._authServices.logearUsuario(correo, password)
        .then(res=>{
          console.log("usuario logeado!!", res);

          // stop loading 
          //destruir si es exitoso
          Swal.close();

          this.router.navigate(['/']);
        })
        .catch(err=> this.errorModal(err.message));
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
