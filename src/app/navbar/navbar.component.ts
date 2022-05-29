import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


@Output() evento: EventEmitter<any> = new EventEmitter<any>();
  constructor(public  auth:AuthService,private router:Router) 
  {
    this.auth.verificarlogeo().then(e=>{
      
      this.evento.emit();
      if(e != null)
      {
        this.auth.estalogeado = true;
      }
      else
      {

      }
    })
  }

  ngOnInit(): void {
  }

  cerrar()
  {
    this.auth.estalogeado = false;
    this.auth.deslogear();
    this.router.navigateByUrl('/ingreso/login');
  }
}
