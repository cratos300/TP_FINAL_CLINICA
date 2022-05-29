import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaPacienteComponent } from './altas/alta-paciente/alta-paciente.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { GuardauthGuard } from './guards/guardauth.guard';
import { HomeComponent } from './home/home.component';
import { PepeComponent } from './pepe/pepe.component';

const routes: Routes = [
  {path:'',redirectTo: '/ingreso/login',pathMatch:'full'},
  {path:'bienvenida',component:BienvenidaComponent},
  {path:'alta',component:AltaPacienteComponent},
  {path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  {path: 'altas', loadChildren: () => import('./altas/altas.module').then(m => m.AltasModule) },
  {path:'pepe',component:PepeComponent},
  {path:'home',component:HomeComponent,canActivate:[GuardauthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }