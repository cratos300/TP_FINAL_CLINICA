import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrarEspecialistaService } from 'src/app/services/registrar-especialista.service';
import { RegistrarPacienteService } from 'src/app/services/registrar-paciente.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {

  unpaciente:Paciente
  public formGroup!: FormGroup;
  encontrado:boolean = false;
  @Output() volver: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private fb:FormBuilder,private us:RegistrarUsuariosService,private auth:AuthService) 
  {
    this.unpaciente = new Paciente();
  }

  ngOnInit(): void { 
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',[Validators.required]],
      'edad': ['',[Validators.required, Validators.min(18),Validators.max(99)]],
      'obraSocial': ['',Validators.required],
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
        this.unpaciente.nombre = this.formGroup.getRawValue().nombre;
        this.unpaciente.apellido = this.formGroup.getRawValue().apellido;
        this.unpaciente.edad = this.formGroup.getRawValue().edad;
        this.unpaciente.dni = this.formGroup.getRawValue().dni;
        this.unpaciente.obraSocial = this.formGroup.getRawValue().obraSocial;
        this.unpaciente.email = this.formGroup.getRawValue().email;
        this.unpaciente.password = this.formGroup.getRawValue().password;
        this.unpaciente.perfil = "paciente";
            console.log("mensaje enviado");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Paciente registrado correctamente!',
              showConfirmButton: false,
              timer: 2000,
            })
            this.us.create(this.unpaciente).then((e:any)=>{
            })
            
            this.auth.crearUsuario(this.unpaciente.email,this.unpaciente.password).then(e=>{
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
