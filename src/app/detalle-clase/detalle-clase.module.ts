import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleClasePageRoutingModule } from './detalle-clase-routing.module';

import { DetalleClasePage } from './detalle-clase.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClasePageRoutingModule,
    QRCodeModule
  ],
  declarations: [DetalleClasePage]
})
export class DetalleClasePageModule {}
