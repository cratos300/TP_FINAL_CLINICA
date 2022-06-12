import { Component, Input, OnInit } from '@angular/core';
import { Fecha } from 'src/app/clases/fecha';
import { Horario } from 'src/app/clases/horario';

@Component({
  selector: 'app-elegir-horarios',
  templateUrl: './elegir-horarios.component.html',
  styleUrls: ['./elegir-horarios.component.css']
})
export class ElegirHorariosComponent implements OnInit {
  @Input() objectoActual:any;
  ahora:any = new Date();
  arrayHorarios:any = [];
  arraytercero:any = [];
  constructor() {
   
    
   }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.arraytercero[0].horario);
    }, 2000);
    this.calculartiempo(this.ahora,this.objectoActual.dias,this.objectoActual.hora.horamin,this.objectoActual.hora.horamax)
  }

  calculartiempo(data:any,arradia:any,minimo:number,maximo:number)
  {
    
    this.ahora.setHours(minimo)
    this.ahora.setMinutes(0);
    this.ahora.setSeconds(0);
    for(let i = 0; i< 14 ;i++)
    {
      
      let ti = new Fecha();
  
      
      if(this.ahora.getDay() == arradia[0] || this.ahora.getDay() == arradia[1] ||this.ahora.getDay() == arradia[2]||this.ahora.getDay() == arradia[3]||this.ahora.getDay() == arradia[4]||this.ahora.getDay() == arradia[5]||this.ahora.getDay() == arradia[6])
      {
        
        while(data.getHours() < maximo)
       {
         let hs = new Horario();
         var dat = {'hora': data.getHours(),'minutos':data.getMinutes(),'estado':'habilitado'}
         if(dat.minutos == 0)
         {
          dat.minutos = "00";

         }
  
         hs = dat;
         
         this.arrayHorarios.push(hs)
  
        this.ahora.setMinutes(this.ahora.getMinutes()+30);
      }
      ti.dia = data.toLocaleDateString()
      ti.horario = this.arrayHorarios;
      console.log(ti);
      this.arraytercero.push(ti);
      }
      data.setDate(data.getDate()+1);
      
      
    
    }

}
}
