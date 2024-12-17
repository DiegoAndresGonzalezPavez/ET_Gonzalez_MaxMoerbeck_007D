import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJustificacionPageRoutingModule } from './crear-justificacion-routing.module';

import { CrearJustificacionPage } from './crear-justificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearJustificacionPageRoutingModule
  ],
  declarations: [CrearJustificacionPage]
})
export class CrearJustificacionPageModule {}
