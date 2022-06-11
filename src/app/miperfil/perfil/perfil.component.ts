import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Diahoraespecialista } from 'src/app/clases/diahoraespecialista';
import { AuthService } from 'src/app/services/auth.service';
import { CargarhoraespecialistaService } from 'src/app/services/cargarhoraespecialista.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  datoUsuario:any
  cargo:boolean = false;
  unseg:boolean = false;
  formGroup!:FormGroup;
  lunes:any;
  martes:any;
  miercoles:any;
  jueves:any;
  viernes:any;
  sabado:any;
  domingo:any;
  arrayhoraaa:any = [];
  unespecialista!:Diahoraespecialista;


  constructor(public auth:AuthService,private sv:RegistrarUsuariosService,private fb:FormBuilder,private es:CargarhoraespecialistaService) 
  {
    setTimeout(() => {
      this.unseg = true;
    }, 1000);
     this.sv.getAll().get().subscribe(e=>{e.forEach(ese=>{
        if(ese.data().email == this.auth.correologeado)
        {
          this.cargo = true;
          this.datoUsuario = ese.data();
          console.log(this.datoUsuario); 
        }

     })})
     this.arrayhoraaa[0] = null;
     this.arrayhoraaa[1] = null;
     this.arrayhoraaa[2] = null;
     this.arrayhoraaa[3] = null;
     this.arrayhoraaa[4] = null;
     this.arrayhoraaa[5] = null;
     this.arrayhoraaa[6] = null;
  }

  enviar()
  {
    let data = (<HTMLInputElement>document.getElementById("select")).value;
    this.unespecialista = new Diahoraespecialista();
    this.arrayhoraaa[0] = null;
    this.arrayhoraaa[1] = null;
    this.arrayhoraaa[2] = null;
    this.arrayhoraaa[3] = null;
    this.arrayhoraaa[4] = null;
    this.arrayhoraaa[5] = null;
    this.arrayhoraaa[6] = null;
    if(this.lunes)
    {
      this.arrayhoraaa[1] = 1;
    }
    if(this.martes)
    {
      this.arrayhoraaa[2] = 2;
    }
    if(this.miercoles)
    {
      this.arrayhoraaa[3] = 3;
    }
    if(this.jueves)
    {
      this.arrayhoraaa[4] = 4;
    }
    if(this.viernes)
    {
      this.arrayhoraaa[5] = 5;
    }
    if(this.sabado)
    {
      this.arrayhoraaa[6] = 6;
    }
    console.log(this.arrayhoraaa);
    this.unespecialista.dias = this.arrayhoraaa;
    this.unespecialista.email = this.datoUsuario.email;
    this.unespecialista.especialidad = this.datoUsuario.especialidades[0];
    this.unespecialista.imagen = this.datoUsuario.imagen;
    this.unespecialista.nombre = this.datoUsuario.nombre;
    if(data == 'maniana')
    {
      this.unespecialista.hora = {'horamin':'8','horamax':'12:30'}
    }
    else if(data == 'tarde')
    {
      this.unespecialista.hora = {'horamin':'12:30','horamax':'19:00'}
    }
    else 
    {
      this.unespecialista.hora = {'horamin':'8','horamax':'19:00'}
    }
    this.es.create(this.unespecialista).then((e:any)=>{
      console.log("Hora y dias cargado correctamente!!");
      
    })
    
    
  }
  ngOnInit(): void {
  }
  dias(data:any)
  {
    if(data == 'lunes')
    {
      this.lunes = !this.lunes;
      console.log(data);
    }
    else if(data == 'martes')
    {
      this.martes = !this.martes;
      console.log(data);
    }
    else if(data == 'miercoles')
    {
      this.miercoles = !this.miercoles;
      console.log(data);
    }
    else if(data == 'jueves')
    {
      this.jueves = !this.jueves;
      console.log(data);
    }
    else if (data == 'viernes')
    {
      this.viernes = !this.viernes;
      console.log(data);
    }
    else
    {
      this.sabado = !this.sabado;
      console.log(data);
    }   
  }

}
