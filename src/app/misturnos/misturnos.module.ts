import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisturnosRoutingModule } from './misturnos-routing.module';
import { MisturnosComponent } from './misturnos/misturnos.component';


@NgModule({
  declarations: [
    MisturnosComponent
  ],
  imports: [
    CommonModule,
    MisturnosRoutingModule
  ]
})
export class MisturnosModule { }
