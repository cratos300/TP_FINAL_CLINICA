import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaPacienteComponent } from './altas/alta-paciente/alta-paciente.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { BoolGuard } from './guards/bool.guard';
import { EnviarhomelogeadoGuard } from './guards/enviarhomelogeado.guard';
import { GuardauthGuard } from './guards/guardauth.guard';
import { HomeComponent } from './home/home.component';
import { PepeComponent } from './pepe/pepe.component';

const routes: Routes = [
  {path:'',redirectTo: '/ingreso/login',pathMatch:'full'},
  {path:'bienvenida',component:BienvenidaComponent},
  {path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  {path: 'altas', loadChildren: () => import('./altas/altas.module').then(m => m.AltasModule),canActivate:[BoolGuard] },
  {path: 'aprobarCuenta', loadChildren: () => import('./aprobar-cuentas/aprobar-cuentas.module').then(m => m.AprobarCuentasModule),canActivate:[GuardauthGuard] },
  {path: 'miperfil', loadChildren: () => import('./miperfil/miperfil.module').then(m => m.MiperfilModule),canActivate:[GuardauthGuard] },
  {path: 'habilitarCuenta', loadChildren: () => import('./habilitar-cuentas/habilitar-cuentas.module').then(m => m.HabilitarCuentasModule),canActivate:[GuardauthGuard] },
  {path:'pepe',component:PepeComponent},
  {path:'home',component:HomeComponent,canActivate:[GuardauthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
