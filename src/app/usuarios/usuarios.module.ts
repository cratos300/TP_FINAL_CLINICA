import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarusuariosComponent } from './listarusuarios/listarusuarios.component';

@NgModule({
  declarations: [
    ListarusuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    
  ]
})
export class UsuariosModule { }
