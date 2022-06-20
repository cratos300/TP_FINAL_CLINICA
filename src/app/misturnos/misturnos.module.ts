import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisturnosRoutingModule } from './misturnos-routing.module';
import { MisturnosComponent } from './misturnos/misturnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MisturnosComponent
  ],
  imports: [
    CommonModule,
    MisturnosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MisturnosModule { }
