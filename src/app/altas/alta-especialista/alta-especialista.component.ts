import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.css']
})
export class AltaEspecialistaComponent implements OnInit {

  unespecialista:Especialista;
  public formGroup!: FormGroup;
  encontrado:boolean = false;
  @Output() volver: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private fb:FormBuilder,private us:RegistrarUsuariosService,private auth:AuthService) 
  {
    this.unespecialista = new Especialista();
  }

  ngOnInit(): void { 
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',[Validators.required]],
      'edad': ['',[Validators.required, Validators.min(18),Validators.max(99)]],
      'email': ['',[Validators.required,Validators.pattern(/\w+@\w+\.+[a-z]/)]],
      'dni': ['',[Validators.required]],
      'password': ['',[Validators.required]],
    });
  }

  aceptar()
  {
    this.chequear(this.formGroup.getRawValue().email).then(e=>{
      if(e == false)
      { 
        this.unespecialista.nombre = this.formGroup.getRawValue().nombre;
        this.unespecialista.apellido = this.formGroup.getRawValue().apellido;
        this.unespecialista.edad = this.formGroup.getRawValue().edad;
        this.unespecialista.dni = this.formGroup.getRawValue().dni;
        this.unespecialista.email = this.formGroup.getRawValue().email;
        this.unespecialista.password = this.formGroup.getRawValue().password;
        this.unespecialista.perfil = "especialista";
            console.log("mensaje enviado");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Especialista registrado correctamente!',
              showConfirmButton: false,
              timer: 2000,
            })
            this.us.create(this.unespecialista).then((e:any)=>{
            })
            
            this.auth.crearUsuario(this.unespecialista.email,this.unespecialista.password).then(e=>{
            })
      }  
      else
      {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El email ya está en uso!',
        showConfirmButton: false,
        timer: 2000,
      })
      }

    })
    this.encontrado = false;
  }
  atras()
  {
    this.volver.emit(false);
  }
  chequear(data:string)
{
      return new Promise((resolve,rejected)=>{
            var clientesSubscription = this.us.getAll().get().subscribe((q) =>{q.forEach((doc)=>{
              console.log(doc.data().email)
                  if(doc.data().email == data)
                  {

                      this.encontrado = true;
                  }    
                })
                resolve(this.encontrado);
                 })
          })

}
}
