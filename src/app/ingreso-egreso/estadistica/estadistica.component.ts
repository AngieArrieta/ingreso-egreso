import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos:number = 0;
  egresos:number = 0

  totalIngresos:number = 0;
  totalEgresos:number = 0;

    // Doughnut
    public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
    public doughnutChartData: MultiDataSet = [[]];

  constructor( private store : Store<AppStateWithIE>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe(({items})=>{
      this.generarEstadistica(items);
    })
  }


  generarEstadistica(items: IngresoEgreso[]) {
    for (const item of items) {
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
