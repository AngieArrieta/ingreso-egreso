import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actionsUI from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean;
  uiSubscription: Subscription;


  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {

    this.forma = this.fb.group({

      descripcion: ['', Validators.required],
      monto: ['', Validators.required]

    });

    // siempre me tengo que subcribir al store si necesito una variable global
    this.uiSubscription = this.store.select('ui').subscribe(ui => {this.cargando = ui.isLoading ;}); 
  }

  ngOnDestroy(){
  this.uiSubscription.unsubscribe();
  }

  guardar() {


    if(this.forma.invalid){return;}
    this.store.dispatch(actionsUI.isLoading());


    const {descripcion, monto} = this.forma.value;

    const ingreseEgresoTemp = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingreseEgresoTemp)
        .then( () => 
        {
          this.forma.reset();
          this.store.dispatch(actionsUI.stopLoading());
          swal.fire('Resgistro Creado', descripcion, 'success');
        })
        .catch( err =>
        {
          swal.fire('Error', err.message , 'error');
          this.store.dispatch(actionsUI.stopLoading());
        });

    
  }

}
