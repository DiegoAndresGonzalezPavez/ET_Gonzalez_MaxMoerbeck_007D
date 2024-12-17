import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJustificacionPage } from './crear-justificacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJustificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJustificacionPageRoutingModule {}
