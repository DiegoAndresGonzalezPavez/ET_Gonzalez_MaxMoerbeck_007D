import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarJustificacionPageRoutingModule } from './actualizar-justificacion-routing.module';

import { ActualizarJustificacionPage } from './actualizar-justificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActualizarJustificacionPageRoutingModule
  ],
  declarations: [ActualizarJustificacionPage]
})
export class ActualizarJustificacionPageModule {}
