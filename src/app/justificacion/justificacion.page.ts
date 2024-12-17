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
  correoUsuario: string | null = null;

  constructor(
    private justservices: JustificacionService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarJustificaciones();
  }

  ionViewWillEnter() {
    this.cargarJustificaciones();
  }

  cargarJustificaciones() {
    this.correoUsuario = sessionStorage.getItem('correo');
    
    if (!this.correoUsuario) {
      this.mostrarErrorSesion();
      return;
    }

    this.justservices.getJustificacion().subscribe(
      (justificaciones) => {
        this.justificaciones = justificaciones;
        console.log('Justificaciones del usuario:', this.justificaciones);
      },
      (error) => {
        console.error('Error:', error);
        this.mostrarError('Error al cargar las justificaciones');
      }
    );
  }

  buscarJustificacion(justificacion: Justificaciones) {
    if (justificacion.correo === this.correoUsuario) {
      this.router.navigate(['/detalle-justificacion'], {
        queryParams: { justificacion: JSON.stringify(justificacion) }
      });
    }
  }

  crear() {
    if (this.correoUsuario) {
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