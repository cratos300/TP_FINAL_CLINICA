import { Component, OnInit } from '@angular/core';
import { AgregarestadoturnoService } from 'src/app/services/agregarestadoturno.service';
import { AuthService } from 'src/app/services/auth.service';
import { HorariosturnosService } from 'src/app/services/horariosturnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  list:any;
  resenia:boolean = false;
  reseniaActual:any;

  constructor(public auth:AuthService,private agregarestadoturno:AgregarestadoturnoService,private hsturnos:HorariosturnosService) 
  {
    this.agregarestadoturno.getAll().valueChanges().subscribe(e=>{
      this.list = e;
      console.log(this.list);
      
    })
  }

  ngOnInit(): void {
  }
  ejecutarAccion(accion:any,data:any)
  {
    if(accion == 'aceptar')
    {
      data.estado = 'aceptado';
    }
  }
  cancelarTurno(quiencancelo:any,data:any)
  {  
    Swal.fire({
      title: '¿Escribe el comentario?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(quiencancelo == 'especialista')
        {
          data.comentarioespecialista = result.value
        }
        else if(quiencancelo == 'paciente')
        {
          data.comentariopaciente = result.value;
        }
        else
        {
          data.comentarioadmin = result.value;
        }
        data.estado = "cancelado";
        this.buscar(data);
        this.quehago(data.dia,data.hora,data.minutos,data.correoEspecialista);
      }
    })
  }
  buscar(data:any)
  {
   this.agregarestadoturno.getAll().get().subscribe(e=>{e.forEach(e=>{
      if(e.data().especialidad == data.especialidad && e.data().correoEspecialista == data.correoEspecialista && e.data().dia == data.dia && e.data().hora == data.hora && e.data().minutos == data.minutos)
      {
        this.agregarestadoturno.update(e.id,data)
      }
   })})
  }
  verresenia(data:any)
  {
    this.reseniaActual = data;
    this.resenia  = !this.resenia;
  }

  quehago(dia:any,hora:any,minutos:any,email:any)
  {
    let arraytercero:any = [];
   let tip =  this.hsturnos.getAll().valueChanges().subscribe(e=>{
    tip.unsubscribe();
      for(let i = 0; i<e.length;i++)
      {
          arraytercero.push(e[i]);
      }
      for(let i = 0; i<arraytercero.length;i++)
      {
        if(arraytercero[i].email == email)
        {
      for(let z = 0; z<arraytercero[i].fechas.length;z++)
      {
        if(arraytercero[i].fechas[z].dia == dia)
        {
          for(let j = 0; j<arraytercero[i].fechas[z].horario.length;j++)
          {  
            
            if(arraytercero[i].fechas[z].horario[j].hora == hora && arraytercero[i].fechas[z].horario[j].minutos == minutos)
            {
              arraytercero[i].fechas[z].horario[j].estado= 'habilitado';
              console.log("ROMPIO");
              
              
              this.hsturnos.getAll().query.get().then(e=>{
                e.forEach((e:any)=>{
                   if(arraytercero[i].email == e.val().email && arraytercero[i].especialidad == e.val().especialidad)
                   {
                    this.hsturnos.update(e.key,arraytercero[i])
                   }
                 }
                 )
               })
               break;
            }
          }
        }
      }
    }
    }
    })  
    
  
  }
}
