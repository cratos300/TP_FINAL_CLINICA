import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegistrarUsuariosService } from '../services/registrar-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private us:RegistrarUsuariosService,public auth:AuthService) 
  {
    
//     this.us.getAll().get().subscribe(e=>{e.forEach(e=>{
//       if(e.data().email == email)
//       {
        
//       }
//   })
// })
  
    
  }

  ngOnInit(): void {
  }

}
