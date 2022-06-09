import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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


  constructor(public auth:AuthService,private sv:RegistrarUsuariosService,private fb:FormBuilder) 
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
  }

  enviar()
  {
  
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
