import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabilitarCuentasRoutingModule } from './habilitar-cuentas-routing.module';
import { HabilitarcuentaComponent } from './habilitarcuenta/habilitarcuenta.component';


@NgModule({
  declarations: [
    HabilitarcuentaComponent
  ],
  imports: [
    CommonModule,
    HabilitarCuentasRoutingModule
  ]
})
export class HabilitarCuentasModule { }
