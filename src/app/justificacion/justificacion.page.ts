import { Component, OnInit } from '@angular/core';
import { JustificacionService } from '../services/justificacion.service';
import { Justificaciones } from 'src/interfaces/IJustificacion';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificacion',
  templateUrl: './justificacion.page.html',
  styleUrls: ['./justificacion.page.scss'],
})
export class JustificacionPage implements OnInit {
  justificaciones: Justificaciones[] = [];
  esProfesor: boolean = false;

  constructor(
    private justservices: JustificacionService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.esProfesor = sessionStorage.getItem('rol') === 'profesor';
  }

  ngOnInit() {
    this.cargarJustificaciones();
  }

  ionViewWillEnter() {
    this.cargarJustificaciones();
  }

  cargarJustificaciones() {
    if (!sessionStorage.getItem('correo')) {
      this.mostrarErrorSesion();
      return;
    }

    this.justservices.getJustificacion().subscribe(
      (justificaciones) => {
        this.justificaciones = justificaciones;
        console.log('Justificaciones:', this.justificaciones);
      },
      (error) => {
        console.error('Error:', error);
        this.mostrarError('Error al cargar las justificaciones');
      }
    );
  }

  buscarJustificacion(justificacion: Justificaciones) {
    this.router.navigate(['/detalle-justificacion'], {
      queryParams: { justificacion: JSON.stringify(justificacion) }
    });
  }

  crear() {
    if (sessionStorage.getItem('correo')) {
      this.router.navigate(['/crear-justificacion']);
    } else {
      this.mostrarErrorSesion();
    }
  }

  async mostrarErrorSesion() {
    const alert = await this.alertController.create({
      header: 'Error de Sesión',
      message: 'Debe iniciar sesión para ver las justificaciones',
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
}