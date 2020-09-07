import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actionsIE from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  itemsSubs: Subscription;
  
  constructor(private store: Store<AppState>, 
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(){

    //me subcribo al nodo de user para obtener el uid del usuario
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)//regresa true o false
    )
    .subscribe(({user}) => {

      this.itemsSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
                      .subscribe( ingresosEgresosFB => {
                        this.store.dispatch(actionsIE.setItems({items: ingresosEgresosFB}));
                      });
    
    });

  }

  ngOnDestroy(){

    this.itemsSubs.unsubscribe();
    this.userSubs.unsubscribe();

  }

}
