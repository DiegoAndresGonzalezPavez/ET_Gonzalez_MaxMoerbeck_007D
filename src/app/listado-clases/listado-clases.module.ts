import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoClasesPageRoutingModule } from './listado-clases-routing.module';

import { ListadoClasesPage } from './listado-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoClasesPageRoutingModule
  ],
  declarations: [ListadoClasesPage]
})
export class ListadoClasesPageModule {}
