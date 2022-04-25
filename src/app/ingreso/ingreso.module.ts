import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { RegistrarComponent } from './page/registrar/registrar.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaPacienteComponent } from '../altas/alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from '../altas/alta-especialista/alta-especialista.component';


@NgModule({
  declarations: [
    RegistrarComponent,
    LoginComponent,
    AltaPacienteComponent,
    AltaEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IngresoRoutingModule,
    ReactiveFormsModule
  ]
})
export class IngresoModule { }
