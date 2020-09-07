import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  items: IngresoEgreso [];
  ingresosEgresosSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(){
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.items = items;
    })
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }


  eliminarItem(id){
    this.ingresoEgresoService.eliminarItem(id)
        .then( () => Swal.fire('Borrado', 'Items borrado exitosamente!', 'success'))
        .catch( (err) => Swal.fire('Error', err.message, 'error'));
  }

}
