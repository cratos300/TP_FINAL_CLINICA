import { Component, OnInit } from '@angular/core';
import { iif } from 'rxjs';
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

  b:any;
  list:any;
  resenia:boolean = false;
  reseniaActual:any;

  constructor(public auth:AuthService,private agregarestadoturno:AgregarestadoturnoService,private hsturnos:HorariosturnosService) 
  {
    this.agregarestadoturno.getAll().valueChanges().subscribe(e=>{
      this.list = e;
      
    })
  }

  ngOnInit(): void {
  }
  finalizado(data:any)
  {
    Swal.fire({
      title: 'Comentario Especialista',
      html: `<input type="text" id="comentario" class="swal2-input" placeholder="Comentario">
      <input type="text" id="diagnostico" class="swal2-input" placeholder="Diagnostico">`,
      confirmButtonText: 'Enviar',
      focusConfirm: false,
      preConfirm: () => {
        let comentario!:any;
        let diagnostico!:any;
        comentario = (<HTMLInputElement>Swal.getPopup()!.querySelector('#comentario')).value;
        diagnostico = (<HTMLInputElement>Swal.getPopup()!.querySelector('#diagnostico')).value;
        if (!comentario || !diagnostico) {
          Swal.showValidationMessage(`Cargue Comentario y diagnostico!`)
        }
        return { comentario: comentario, diagnostico: diagnostico }
      }
    }).then((result:any)=>{


      
      if(result.isConfirmed)
      {
        data.comentarioespecialista = result.value.comentario;
        data.diagnostico = result.value.diagnostico;
        data.estado = "finalizado";
        this.buscar(data);
      }
    })
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
  hacerBusqueda()
  {
    let arrnueva = [];
    let cantidadletras = this.b.length;
    
    var especialista = this.list.filter((e:any)=>{

      return e.especialidad == this.b || e.correoEspecialista == this.b;

      
    })
    if(especialista.length > 0 )
    {
      this.list = especialista;
    }
  }
  limpiar()
  {
    this.list = [];
    this.agregarestadoturno.getAll().get().subscribe(e=>{e.forEach(e=>{
      this.list.push(e.data());
    })})
  }
     // setTimeout(() => {    
  

        
    //     Object.keys(data[0]).forEach((entry,index)=>{
    //       if(entry != "hora" && entry != "comentarioadmin" && entry != "correoEspecialista" && entry != "comentarioespecialista" && entry != "correoPaciente" && entry != "diagnostico" && entry != "dia" && entry != "comentariopaciente" && entry != "especialidad")
    //         console.log(data[0][entry]);
          
    //     })
      
    // }, 2000);
}
