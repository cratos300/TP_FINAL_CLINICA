import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data:any;
  boolean:boolean = false;
  public estalogeado = false;
  constructor(private a:AngularFireAuth,private router:Router) { 
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
}

