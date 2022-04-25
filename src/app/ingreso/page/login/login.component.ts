import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:any;
  contrasenia:any;
  paciente1:Paciente;
  constructor(private auth:AuthService) 
  {
    this.paciente1 = new Paciente();
    this.paciente1.nombre = "german"
    this.paciente1.apellido = "vi";
    this.paciente1.edad = 17;
    this.paciente1.email = "dasd@asda.com";
    this.paciente1.obraSocial = "dasd";
    this.paciente1.dni = 414141; 
    this.paciente1.password = "dasda";
    console.log(this.paciente1);
    // this.auth.login("hernannvilaerr@gmail.com","123456").then(e=>{
    //   alert("todo ok");
    // }).catch(e=>{
    //   alert("Error")
    // })
   }

  ngOnInit(): void {
  }
  
  ingresar()
  {
    this.auth.login(this.correo,this.contrasenia).then(e=>{
      //ir a cada parte dependiendo si es especialista o paciente
      console.log(e);
    }).catch(error=>{
      console.log(error);
    })
  }

}
