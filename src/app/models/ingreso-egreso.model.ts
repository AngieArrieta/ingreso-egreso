export class IngresoEgreso {

   // public descripcion;
    /* constructor(descripcion){
        descripcion = this.descripcion;
    } */

    // forma corta

    constructor(
        public descripcion: string,
        public monto: number,
        public tipo: string,
        public uid?: string,
    ){}
}
