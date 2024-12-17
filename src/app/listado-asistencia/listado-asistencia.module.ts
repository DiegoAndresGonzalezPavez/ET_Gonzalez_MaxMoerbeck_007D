import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAsistenciaPageRoutingModule } from './listado-asistencia-routing.module';

import { ListadoAsistenciaPage } from './listado-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAsistenciaPageRoutingModule
  ],
  declarations: [ListadoAsistenciaPage]
})
export class ListadoAsistenciaPageModule {}
