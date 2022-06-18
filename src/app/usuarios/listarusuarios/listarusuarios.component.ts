import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';
import { RegistrarUsuariosService } from 'src/app/services/registrar-usuarios.service';

@Component({
  selector: 'app-listarusuarios',
  templateUrl: './listarusuarios.component.html',
  styleUrls: ['./listarusuarios.component.css']
})
export class ListarusuariosComponent implements OnInit {
  list:any = [];
  constructor(private us:RegistrarUsuariosService,private excelService:ExporterService) 
  {
    us.getAll().valueChanges().subscribe((e:any)=>{
      for(let i = 0; i<e.length;i++)
      {
        let data = {"nombre":e[i].nombre,"email":e[i].email,"dni":e[i].dni,"perfil":e[i].perfil,"edad":e[i].edad}
        this.list.push(data);
      }

    })
   
  }

  ngOnInit(): void {
  }
  click():void
  {
    this.excelService.exportToExcel(this.list,'usuarios');
  }

}
