import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarClaseFechaPageRoutingModule } from './seleccionar-clase-fecha-routing.module';

import { SeleccionarClaseFechaPage } from './seleccionar-clase-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarClaseFechaPageRoutingModule
  ],
  declarations: [SeleccionarClaseFechaPage]
})
export class SeleccionarClaseFechaPageModule {}
