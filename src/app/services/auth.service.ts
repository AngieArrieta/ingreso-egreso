import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/'
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore) { }

  initAuthListener(){ // avisarnos cambios de la autenticación
    this.auth.authState.subscribe( fuser => { //trabaja con funciones de signIn y se subscribe
    console.log(fuser?.uid);
    console.log(fuser?.email);
    });
  }

  crearUsuario(nombre: string, email: string, password: string){ // tambien se puede mandar la desestruturacion del objeto
  return  this.auth.auth.createUserWithEmailAndPassword(email, password)
          .then(({user}) => {
            const newUser = new Usuario(user.uid, nombre, user.email);
            return this.firestore.doc(`${user.uid}/usuario`) //url que se apunta [xxxxxx/usuario]
                .set({...newUser}); //'devuelve otra promesa'
          });
  }

  logearUsuario(email: string, password: string){
    return  this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.auth.signOut();
  }

  isAuth(){ //esta autenticado o no?
    //this.auth.authState; -> me devulve una promesa que resuelve (resolve) un USER
    //necesito un bool - entonces:
    return this.auth.authState.pipe(
     map( fireuser => fireuser != null )
    ) //funcion authState devuelve un observable - modifico con map para que resuelve un bool y no un user
  }
}
