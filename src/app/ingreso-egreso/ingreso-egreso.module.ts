import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

// modulo que se carga con lazyload porque hasta que se autentique es que va a cargarse

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer), //lazyload de store
    SharedModule,
    DashboardModule,
    ChartsModule
  ]
})
export class IngresoEgresoModule { }
