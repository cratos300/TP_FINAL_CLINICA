import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { CantturnosespecialidadComponent } from './cantturnosespecialidad/cantturnosespecialidad.component';
import { CantturnosdiaComponent } from './cantturnosdia/cantturnosdia.component';
import { TurnosolicitadolapsoComponent } from './turnosolicitadolapso/turnosolicitadolapso.component';
import { TurnofinalizadolapsoComponent } from './turnofinalizadolapso/turnofinalizadolapso.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    IngresosComponent,
    CantturnosespecialidadComponent,
    CantturnosdiaComponent,
    TurnosolicitadolapsoComponent,
    TurnofinalizadolapsoComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
