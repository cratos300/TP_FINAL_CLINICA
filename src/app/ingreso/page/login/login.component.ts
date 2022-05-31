import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { AprobarEspecialistasService } from 'src/app/services/aprobar-especialistas.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';
import { Especialista } from 'src/app/clases/especialista';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private auth:AuthService,private fb:FormBuilder,private router:Router,private spinner: NgxSpinnerService,private apEspecialista:AprobarEspecialistasService,private us:RegistrarUsuariosService,private ToastrSvc:ToastrService) 
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
    this.chequiar(this.correo).then((efe:any)=>{
      if(efe!=null)
      {
        if(efe.perfil == 'paciente')
        {
          this.auth.login(this.correo,this.contrasenia).then(e=>{
    
            let data = this.auth.VerificarCorreo().then(e=>{
              this.sp = false;
              if(e == true)
              {
                this.router.navigateByUrl('/home');
              }
              else
              {
                this.ToastrSvc.warning("Valida el email..","Error");
              }
     
            }).catch(e=>{
              this.sp = false;
            })
            //ir a cada parte dependiendo si es especialista o paciente
            console.log(e);
          }).catch(error=>{
            this.sp = false;
         
          })
        }
        else if(efe.perfil == 'especialista')
        {
          if(efe.estado == 'deshabilitado')
          {
            this.sp = false;
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cuenta deshabilitada temporalmente, habla con el administrador.',
              showConfirmButton: false,
              timer: 4000,
            })
          }
          else
          {
          this.revisarconfirmacion(this.correo).then(e=>{
            if(e != null)
            {
              if(e.confirmar == "pendiente")
              {
                this.sp = false;
                Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Un administrador debe confirmar tu cuenta.',
                      showConfirmButton: false,
                      timer: 4000,
                    })
              }
              else if(e.confirmar == "confirmado")
              {
                      this.auth.login(this.correo,this.contrasenia).then(e=>{
                        this.auth.VerificarCorreo().then(e=>{
                          if(e == true)
                          {
                            this.sp = false;
    
                            this.router.navigateByUrl('/home');
                          }
                          else 
                          {
                            this.sp = false;
                            this.auth.deslogear();
                            this.ToastrSvc.warning("Valida el email..","Error");
                          }
                        })

                        //ir a cada parte dependiendo si es especialista o pacient
                      }  ).catch(e=>{
                        alert(e);
                      })  
              }
               else 
               {
                this.sp = false;
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El administrador no te quiere en el sistema.',
                  showConfirmButton: false,
                  timer: 4000,
                })
               }
            }
          })
     
    
        }
      }
      else 
      {
        this.auth.login(this.correo,this.contrasenia).then(e=>{

              this.sp = false;

              this.router.navigateByUrl('/home');


          //ir a cada parte dependiendo si es especialista o pacient
        }  ).catch(e=>{
          this.sp = false;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error interno contactate con el dueño del proyecto',
            showConfirmButton: false,
            timer: 4000,
          })
        })  
      }
      }
      else
      {
        this.sp = false;
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
  chequiar(email:string):Promise<any>
  {
    return new Promise((resolve,reject)=>{
      this.us.getAll().get().subscribe(e=>{e.forEach(e=>{
        if(e.data().email == email)
        {
          resolve(e.data());
        }
      })
      resolve(null);
    }
      )
    })
  }
  revisarconfirmacion(email:string):Promise<any>
  {
    return new Promise((resolve,reject)=>{
      this.apEspecialista.getAll().get().subscribe(e=>{e.forEach(e=>{
          if(e.data().email == email)
          {
            resolve (e.data());
          }
      })
    resolve(null);
  })
    })
  }

}
