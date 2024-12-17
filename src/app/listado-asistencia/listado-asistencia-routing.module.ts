import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoAsistenciaPage } from './listado-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoAsistenciaPageRoutingModule {}
