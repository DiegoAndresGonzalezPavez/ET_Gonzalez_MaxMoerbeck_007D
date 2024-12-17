import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarClasePageRoutingModule } from './registrar-clase-routing.module';

import { RegistrarClasePage } from './registrar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarClasePageRoutingModule
  ],
  declarations: [RegistrarClasePage]
})
export class RegistrarClasePageModule {}
