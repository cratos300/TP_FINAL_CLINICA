import { Component, Input, OnInit } from '@angular/core';
import { Fecha } from 'src/app/clases/fecha';
import { Horario } from 'src/app/clases/horario';
import { Nuevo } from 'src/app/clases/nuevo';

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
  hs:any;
  dat:any;
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
    
  
    for(let i = 0; i< 14 ;i++)
    {
      
      let ti = new Fecha();
      this.ahora.setHours(minimo)
      this.ahora.setMinutes(0);
      this.ahora.setSeconds(0);
      this.arrayHorarios = new Array();
      if(this.ahora.getDay() == arradia[0] || this.ahora.getDay() == arradia[1] ||this.ahora.getDay() == arradia[2]||this.ahora.getDay() == arradia[3]||this.ahora.getDay() == arradia[4]||this.ahora.getDay() == arradia[5]||this.ahora.getDay() == arradia[6])
      {
        while(data.getHours() < maximo)
       {
         this.hs = new Horario();

         this.dat = new Nuevo();  
         this.dat.hora = data.getHours();
         this.dat.minutos = data.getMinutes();
         this.dat.estado = 'habilitado';
        
         if(this.dat.minutos == 0)
         {
          this.dat.minutos = "00";

         }
  
         this.hs = this.dat;
         
         
         this.arrayHorarios.push(this.hs)
  
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
quehago(dia:any,hora:any,minutos:any)
{
  for(let i = 0; i<this.arraytercero.length;i++)
  {
    
    if(this.arraytercero[i].dia == dia)
    {
      for(let j = 0; j<this.arraytercero[i].horario.length;j++)
      {
        
        
        if(this.arraytercero[i].horario[j].hora == hora && this.arraytercero[i].horario[j].minutos == minutos)
        {
          alert("si")
          this.arraytercero[i].horario[j].estado = 'falso';
        }
      }
    }
  }
}
}
