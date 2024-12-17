import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenAsistenciaPageRoutingModule } from './resumen-asistencia-routing.module';

import { ResumenAsistenciaPage } from './resumen-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenAsistenciaPageRoutingModule
  ],
  declarations: [ResumenAsistenciaPage]
})
export class ResumenAsistenciaPageModule {}
