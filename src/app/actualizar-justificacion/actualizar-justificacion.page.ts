import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { JustificacionService } from '../services/justificacion.service';
import { Justificaciones } from 'src/interfaces/IJustificacion';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-justificacion',
  templateUrl: './actualizar-justificacion.page.html',
  styleUrls: ['./actualizar-justificacion.page.scss'],
})
export class ActualizarJustificacionPage implements OnInit {
  justificacion: Justificaciones = {
    id: 0,
    asignatura: "",
    fecha: "",
    descripcion: "",
    profesor: "",
    correo: "",
    imagen: ""
  };

  constructor(
    private activated: ActivatedRoute,
    private justificacionService: JustificacionService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activated.queryParams.subscribe(param => {
      if (param['justificacion']) {
        const justificacionData = JSON.parse(param['justificacion']);
        const userCorreo = sessionStorage.getItem('correo');
        
        if (justificacionData.correo === userCorreo) {
          this.justificacion = justificacionData;
        } else {
          this.mostrarErrorAcceso();
          this.router.navigate(['/justificacion']);
        }
      }
    });
  }

  ngOnInit() {
    this.verificarPermisos();
  }

  ionViewWillEnter() {
    this.verificarPermisos();
  }

  private verificarPermisos(): boolean {
    const userCorreo = sessionStorage.getItem('correo');
    if (!userCorreo || this.justificacion.correo !== userCorreo) {
      this.mostrarErrorAcceso();
      this.router.navigate(['/justificacion']);
      return false;
    }
    return true;
  }

  fileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Validar el tamaño del archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.mostrarError('La imagen no debe superar los 5MB');
        return;
      }

      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.mostrarError('El archivo debe ser una imagen');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.justificacion.imagen = reader.result as string;
        console.log('Nueva imagen cargada');
      };
      reader.readAsDataURL(file);
    }
  }

  async actualizarJustificacion() {
    if (!this.verificarPermisos()) return;

    if (!this.justificacion.descripcion.trim()) {
      await this.mostrarError('La descripción es obligatoria');
      return;
    }

    const userCorreo = sessionStorage.getItem('correo');
    this.justificacion.correo = userCorreo || '';

    this.justificacionService.putJustificacion(this.justificacion).subscribe(
      async () => {
        await this.mostrarMensajeExito();
        this.router.navigate(['/justificacion']);
      },
      async (error) => {
        console.error('Error al actualizar:', error);
        await this.mostrarError('Error al actualizar la justificación');
      }
    );
  }

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Justificación actualizada correctamente',
      mode: 'ios',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/justificacion']);
        }
      }]
    });
    await alert.present();
  }

  async mostrarErrorAcceso() {
    const alert = await this.alertController.create({
      header: 'Error de Acceso',
      message: 'No tienes permiso para modificar esta justificación',
      mode: 'ios',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/justificacion']);
        }
      }]
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

  async mostrarErrorTamanoImagen() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'La imagen no debe superar los 5MB',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarErrorTipoArchivo() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El archivo debe ser una imagen',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
}