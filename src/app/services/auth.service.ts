import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RegistrarUsuariosService } from './registrar-usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any;
  boolean:boolean = false;
  public estalogeado = false;
  public administrador:boolean = false;
  public especialista:boolean = false;
  public paciente:boolean = false;
  constructor(private a:AngularFireAuth,private router:Router,private us:RegistrarUsuariosService) { 
  } 
  login(email:string,password:string)
  {
    return new Promise((resolve,rejected)=>{
      this.a.signInWithEmailAndPassword(email,password).then(us =>{
        this.data = us.user?.email;
        resolve(us);
    }).catch(err => rejected(err));
   })
  }
  deslogear()
  {
    this.a.signOut().then(e=>{
      this.boolean = false;
      localStorage.removeItem("usuario");
      this.router.navigate(['']);
    }).catch(e=>{
      alert("No se pudo deslogear");
    })
  }
  async enviarCorreo ()
  {
     return (await this.a.currentUser)?.sendEmailVerification();
  }
  async VerificarCorreo()
  {
    return (await this.a.currentUser)?.emailVerified;
  }
  verificarlogeo()
  {
    return new Promise((resolve,rejected)=>{
     this.a.onAuthStateChanged(e=>{
        resolve(e);
      });
    })
  }
  crearUsuario(email:string,password:string)
  {
    return new Promise((resolve,rejected)=>{
      this.a.createUserWithEmailAndPassword(email,password).then((user:any)=>{
        resolve(user)
      }).catch(err => rejected(err));
    })
  }
  chegeneral(email:string): any
  {
    return new Promise((resolve,reject)=>{
      
      this.us.getAll().get().subscribe(e=>{e.forEach(e=>{
        if(e.data().email == email)
        {
          if(e.data().perfil == 'especialista')
          {
            this.especialista = true;
            this.paciente = false;
            this.administrador = false;
          }
          else if(e.data().perfil == 'paciente')
          {
            this.paciente = true;
            this.especialista = false;
            this.administrador = false;
          }
          else
          {
            this.paciente = false;
            this.especialista = false;
            this.administrador = true;
          }
          resolve(true);
        }
      })
    })
    })
  }
}

