import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiperfilRoutingModule } from './miperfil-routing.module';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MiperfilRoutingModule
  ]
})
export class MiperfilModule { }
