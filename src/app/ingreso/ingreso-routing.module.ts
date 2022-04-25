import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegistrarComponent } from './page/registrar/registrar.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'registrar',component: RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
