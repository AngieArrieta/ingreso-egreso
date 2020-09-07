import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/'

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Usuario } from '../models/usuario.model';

import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ingresoEsgresoActions from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable()
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  constructor(public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>) { }



  initAuthListener() { // avisarnos cambios de la autenticación

    this.auth.authState.subscribe(fuser => { //me subcribo a los cambios de auth

      if (fuser) { 

        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((userFire:any) => { //si existe usuario me subscribo a los cambios de ese usuario
            const tempUser = Usuario.fromFirebase(userFire);
            this._user = tempUser;
            this.store.dispatch(authActions.setUser({ user: tempUser })); // inserto el valor del usuario logueado
            this.store.dispatch(ingresoEsgresoActions.unSetItems()); // si hay un tipo de cambio
          });
      } 
      
      
      else { // si no existe usuario me desubscribo y quito el valor de la variable
        //unsetSubscribe
        this._user = null;
        if(this.userSubscription){
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(ingresoEsgresoActions.unSetItems());
      }
    });
  }


  crearUsuario(nombre: string, email: string, password: string) { // tambien se puede mandar la desestruturacion del objeto
    return this.auth.auth.createUserWithEmailAndPassword(email, password) //crea un usuartio auth
      .then(({ user }) => { //en el caso que resuelva
        const newUser = new Usuario(user.uid, nombre, user.email); //instancia model Usuario
        return this.firestore.doc(`${user.uid}/usuario`) //url que se apunta [xxxxxx/usuario]
          .set({ ...newUser }); // inserto el usuario a base de datos
      });
  }


  logearUsuario(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }



  logOut() {
    return this.auth.auth.signOut();
  }



  isAuth() { //esta autenticado o no?
    //this.auth.authState; -> me devulve una promesa que resuelve (resolve) un USER
    //necesito un bool - entonces:
    return this.auth.authState.pipe(
      map(fireuser => fireuser != null)
    ) //funcion authState devuelve un observable - modifico con map para que resuelve un bool y no un user
  }

  getUser(){
    return {... this._user};
  }
}
