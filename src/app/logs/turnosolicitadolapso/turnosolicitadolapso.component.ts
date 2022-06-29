import { Component, OnInit } from '@angular/core';
import { AgregarestadoturnoService } from 'src/app/services/agregarestadoturno.service';

@Component({
  selector: 'app-turnosolicitadolapso',
  templateUrl: './turnosolicitadolapso.component.html',
  styleUrls: ['./turnosolicitadolapso.component.css']
})
export class TurnosolicitadolapsoComponent implements OnInit {
  correoscontador:any = [];
  correos:any = [];
  fechaDesde:any;
  fechaHasta:any;
  list:any = [];
  constructor(private agregarestadoturno:AgregarestadoturnoService) 
  {
    // agregarestadoturno.getAll().valueChanges().subscribe(e=>{
    //   for(let i = 0; i<e.length;i++)
    //   {
    //     if(e[i].dia >= this.fechaDesde && e[i].dia <=this.fechaHasta)
    //     {
    //       this.list.push(e[i]);
    //     }
    //   }
    //   console.log(e);
      
    // })
  }

  ngOnInit(): void {
  }
  filtrar()
  {

    this.correos = [];
    this.correoscontador = [];
    this.list = [];
    let cambai1 = this.fechaDesde.split('/');
    let eche:any  = cambai1[1]+'/'+cambai1[0]+'/'+cambai1[2];
    let termineitor1 = new Date(eche);


    
    let cambai2 = this.fechaHasta.split('/');
    let eche2:any  = cambai2[1]+'/'+cambai2[0]+'/'+cambai2[2];
    let termineitor2 = new Date(eche2);
    
    
    // var det = new Date("09/05/2024").trans
    // console.log(det);
    
    // var det = new Date(this.fechaDesde)
    // console.log(det);
    
  //   var date3 = new Date("09/05/2024")
  //   var date4 = new Date("09/04/2024")
  //   // var date1 = new Date("2024/04/08")
  //   // var date2 = new Date("2024/04/08")
  //   var f1 =    new Date(2015,11, 31); //31 de diciembre de 2015
  //   var f2 =    new Date(2014, 10, 30); 

  
  // console.log(date3);

  
  
    
    // if(date3 > date4)
    // {
    //   alert("si");
    // }
    
    
    let hola = this.agregarestadoturno.getAll().valueChanges().subscribe(e=>{
       for(let i = 0; i<e.length;i++)
       {
        let data = e[i].dia;
       let di = data.split('/');
       let formateado:any  = di[1]+'/'+di[0]+'/'+di[2];
       let terminado = new Date(formateado);
  
    
    
       if(terminado > termineitor1 &&  terminado < termineitor2)
       {
        this.list.push(e[i]);
       }
       }    



       for(let i = 0; i<this.list.length;i++)
      {
        console.log(this.list[i].correoEspecialista);
        
       const elemento = this.list[i].correoEspecialista;
       if(!this.correos.includes(this.list[i].correoEspecialista))
       {
        this.correos.push(elemento);
       }
       
      }

      for(let i = 0; i <this.correos.length;i++)
      {
         let contador = 0;
         for(let j = 0; j<this.list.length;j++)
         {
           if(this.correos[i] == e[j].correoEspecialista)
           {
             contador ++;
           }
         }
         alert("entro2")
         this.correoscontador.push(contador);
      }
      console.log(this.correos);
      console.log(this.correoscontador);
      







     hola.unsubscribe()
    }
    )
    // setTimeout(() => {
    //   console.log(this.list);
      
    // }, 500);

  }

}
