import { Component, OnInit } from '@angular/core';
import { AgregarestadoturnoService } from 'src/app/services/agregarestadoturno.service';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(public auth:AuthService,private agregarestadoturno:AgregarestadoturnoService) 
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

}
