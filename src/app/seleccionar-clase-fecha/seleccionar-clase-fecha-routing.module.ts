import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarClaseFechaPage } from './seleccionar-clase-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarClaseFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarClaseFechaPageRoutingModule {}
