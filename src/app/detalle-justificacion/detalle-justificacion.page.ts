import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Justificaciones } from 'src/interfaces/IJustificacion';
import { AlertController } from '@ionic/angular';
import { JustificacionService } from '../services/justificacion.service';

@Component({
  selector: 'app-detalle-justificacion',
  templateUrl: './detalle-justificacion.page.html',
  styleUrls: ['./detalle-justificacion.page.scss'],
})
export class DetalleJustificacionPage implements OnInit {
  justificacion: Justificaciones = {
    id: 0,
    asignatura: "",
    fecha: "",
    descripcion: "",
    profesor: "",
    correo: ""
  }

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private alertcontroller: AlertController,
    private justiservices: JustificacionService
  ) {
    this.activated.queryParams.subscribe(params => {
      const justificacionData = JSON.parse(params['justificacion']);
      if (justificacionData.correo === sessionStorage.getItem('correo')) {
        this.justificacion = justificacionData;
      } else {
        this.mostrarErrorAcceso();
        this.router.navigate(['/justificacion']);
      }
    });
  }

  ngOnInit() {}

  actualizarJustificacion() {
    const userCorreo = sessionStorage.getItem('correo');
    if (this.justificacion.correo === userCorreo) {
      this.router.navigate(['/actualizar-justificacion', this.justificacion.id],
        { queryParams: { justificacion: JSON.stringify(this.justificacion) } });
    } else {
      this.mostrarErrorAcceso();
    }
  }

  async mostrarConfirmacionEliminar() {
    const alert = await this.alertcontroller.create({
      header: 'Confirmar Eliminación',
      mode: 'ios',
      message: '¿Desea eliminar la justificación?',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.eliminar();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });
    await alert.present();
  }

  eliminar() {
    if (this.justificacion && this.justificacion.id) {
      this.justiservices.deleteJustificacion(this.justificacion.id).subscribe(
        (response) => {
          console.log('Justificación eliminada:', response);
          this.mostrarMensaje();
        },
        (error) => {
          console.error('Error al eliminar la justificación:', error);
          this.mostrarErrorAcceso();
        }
      );
    } else {
      console.error('ID de justificación no válido:', this.justificacion);
    }
  }

  async mostrarMensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Eliminación',
      mode: 'ios',
      message: 'La información ha sido eliminada',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });
    await alert.present();
  }

  async mostrarErrorAcceso() {
    const alert = await this.alertcontroller.create({
      header: 'Error de Acceso',
      mode: 'ios',
      message: 'No tienes permiso para acceder a esta justificación',
      buttons: ['OK']
    });
    await alert.present();
  }

  obtenerCorreoUsuario(): string {
    return sessionStorage.getItem('correo') || '';
  }
}