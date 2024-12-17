import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleClase } from '../../interfaces/IDetalleClase';
import { ClaseService } from '../services/clase.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-detalle-clase',
  templateUrl: './detalle-clase.page.html',
  styleUrls: ['./detalle-clase.page.scss'],
})
export class DetalleClasePage implements OnInit {
  detalleClase: DetalleClase | null = null; 

  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService, 
    private alertController: AlertController 
  ) { }

  ngOnInit() {
    const idClase = this.route.snapshot.paramMap.get('id');
    if (idClase) {
      this.cargarDetalleClase(idClase);
    } else {
      this.mostrarError('ID de clase no encontrado');
    }
  }

  cargarDetalleClase(id: string) {
    this.claseService.getClaseById(id).subscribe(
      (data: DetalleClase) => {
        this.detalleClase = data;
      },
      (error) => {
        this.mostrarError('No se pudo cargar la información de la clase');
      }
    );
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
