import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoClasesPage } from './listado-clases.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoClasesPageRoutingModule {}
