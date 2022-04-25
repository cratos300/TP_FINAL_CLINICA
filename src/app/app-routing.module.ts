import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaPacienteComponent } from './altas/alta-paciente/alta-paciente.component';
import { PepeComponent } from './pepe/pepe.component';

const routes: Routes = [
  {path:'',redirectTo: '/ingreso/login',pathMatch:'full'},
  {path:'alta',component:AltaPacienteComponent},
  {path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  {path:'pepe',component:PepeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
