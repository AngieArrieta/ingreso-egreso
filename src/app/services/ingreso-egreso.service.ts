import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore'; // para hacer referencia a la coleccion
import { IngresoEgreso} from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService ) { }


  // funcion 1
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    const userAuth = this.authService.getUser(); // obetener el usuario para obtener su id y crear el doc de ingreso-egreso dentro del usuario logueado
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${userAuth.uid}/ingresos-egresos`)
        .collection('items')
        .add({... ingresoEgreso});
        
  }


  // funcion 2
  initIngresosEgresosListener(uid: string) {

    //me subscribo a la coleccion de items
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges() // no es solo el valor, varia informacion, el value chanfes solo me devolvia la coleccion  
        .pipe(
          map(resSnapshot =>{ // map1: toma cada una de las respuestas, lo que retorne recibo en subscribe
            return resSnapshot.map( doc => { //map2: transforma cada documento de la coleccion, retorna uno nuevo por cada recorrido del primer map
              return {
                uid: doc.payload.doc.id,
                 ... doc.payload.doc.data() as any
              }
            });
          })
        );

  }


  eliminarItem(udiItem: string) {

    const userAuth = this.authService.getUser();
    return this.firestore.doc(`${userAuth.uid}/ingresos-egresos/items/${udiItem}`).delete(); 

  }

}
