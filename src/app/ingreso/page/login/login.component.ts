import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:any = "dasd"
  contrasenia:any;
  paciente1:Paciente;
  public formGroup!: FormGroup;
  sp:boolean = false;;
  constructor(private auth:AuthService,private fb:FormBuilder,private router:Router,private spinner: NgxSpinnerService) 
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
    this.formGroup = this.fb.group({
      'email': ['',[Validators.pattern(/\w+@\w+\.+[a-z]/)]],
      'password': ['',[this.validarcantidadCaracter]],
    });
  }
  private validarcantidadCaracter(control: AbstractControl):null |object
  {
   const apellido = <any>control.value;
   var booleano: boolean = isNaN(apellido);
   if(apellido.length < 6)
   {
    return {
      caracter:true
   };
   }
   else
   {
     return null;
   }
  }
  
  
  ingresar()
  {
    this.sp = true;
    this.correo = this.formGroup.getRawValue().email;
    this.contrasenia = this.formGroup.getRawValue().password;
    this.auth.login(this.correo,this.contrasenia).then(e=>{
    
      let data = this.auth.VerificarCorreo().then(e=>{
        this.sp = false;
        this.router.navigateByUrl('/home');
      }).catch(e=>{
        this.sp = false;
      })
      //ir a cada parte dependiendo si es especialista o paciente
      console.log(e);
    }).catch(error=>{
      this.sp = false;
      if(error == "FirebaseError: Firebase: The user account has been disabled by an administrator. (auth/user-disabled).")
      {
       
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Especialista inhabilitado, consulte administrador.',
          showConfirmButton: false,
          timer: 4000,
        })
      }
      else if(error = "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).")
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Datos incorrectos.',
          showConfirmButton: false,
          timer: 4000,
        })
      }
    })
  }

}
