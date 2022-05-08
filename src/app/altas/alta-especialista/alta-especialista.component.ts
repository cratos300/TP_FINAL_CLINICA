import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';
import { SelecespecialistaService } from 'src/app/services/selecespecialista.service';
import { SubirimagenService } from 'src/app/services/subirimagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.css']
})
export class AltaEspecialistaComponent implements OnInit {

  a:string = "hola"
  det!:string;
  list:any[] = [];
  eventoGeneral:any;
  unespecialista:Especialista;
  imagenes:any[] = [];
  public formGroup!: FormGroup;
  encontrado:boolean = false;
  @Output() volver: EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private fb:FormBuilder,private us:RegistrarUsuariosService,private auth:AuthService,private storageService:SubirimagenService,private se:SelecespecialistaService) 
  {
    this.se.getAll().valueChanges().subscribe(e=>{
    this.list = [];
    e.forEach(element => {
      this.list.push(element.especialidad);
      
    });
      
    })
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
      'inputFile': ['',[Validators.required]],
      'especialidad': ['',[Validators.required]],
    });
  }

  ac()
  {
    console.log(this.formGroup.getRawValue().inputFile);
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
        this.unespecialista.especialidad = this.formGroup.getRawValue().especialidad;
        this.unespecialista.perfil = "especialista"; 
            this.us.create(this.unespecialista).then((e:any)=>{
              this.auth.crearUsuario(this.unespecialista.email,this.unespecialista.password).then(e=>{
                console.log(this.eventoGeneral.target);
                let archivos = this.eventoGeneral.target.files;
                let reader = new FileReader();
                reader.readAsDataURL(archivos[0]);
                reader.onloadend = ()=>{
                this.imagenes.push(reader.result);
                this.storageService.subirImagen(this.unespecialista.nombre + "_" + "d", reader.result);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Especialista registrado correctamente!',
                  showConfirmButton: false,
                  timer: 2000,
                })
             }
              })
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
                  if(doc.data().email == data)
                  {

                      this.encontrado = true;
                  }    
                })
                resolve(this.encontrado);
                 })
          })

}
cargarImagen(event:any)
{
  this.eventoGeneral = event;
}
agregar()
{
 let data = (<HTMLInputElement>document.getElementById('agregar')).value;
 this.list = [];
  let dato = {especialidad:data}
  this.se.create(dato);
}
borrar()
{
  let data = (<HTMLInputElement>document.getElementById("select")).value;
  this.revisar(data).then((e:any)=>{
    if(e != null)
    {
      this.se.delete(e).then(e=>{
      })
    }

  })
  
}
revisar(especial:any)
{
      return new Promise((resolve,rejected)=>{
            var clientesSubscription = this.se.getAll().get().subscribe((q) =>{q.forEach((doc)=>{
                  if(doc.data().especialidad == especial)
                  {
                        this.det = doc.id;
                  }    
                })
                resolve(this.det);
                 })
          })

}

} 
