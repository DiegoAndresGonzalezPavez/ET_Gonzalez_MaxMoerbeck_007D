import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarJustificacionPage } from './actualizar-justificacion.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarJustificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarJustificacionPageRoutingModule {}
