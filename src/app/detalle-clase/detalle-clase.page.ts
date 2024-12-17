import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Clases } from 'src/interfaces/IClases';
import { AlertController } from '@ionic/angular';
import { ApiclasesService } from '../services/apiclases.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface DatosQR {
  asignatura: {
    nombre: string;
    id: number;
    descripcion: string;
  };
  clase: {
    fecha: string;
    profesor: string;
  };
  alumno: {
    rutParcial: string;
    correo: string;
  };
  registro: {
    timestamp: string;
    tipo: string;
    estado: string;
  };
  validezQR?: string;  
}

@Component({
  selector: 'app-detalle-clase',
  templateUrl: './detalle-clase.page.html',
  styleUrls: ['./detalle-clase.page.scss'],
})
export class DetalleClasePage implements OnInit {
  clase: Clases = {
    id: 0,
    asignatura: "",
    fecha: "",
    descripcion: "",
    profesor: "",
    correo: "",
    rut: "",
    codigoQR: ""
  };

  qrData: string = '';
  mostrarQR: boolean = false;
  imagenCapturada: string | undefined;
  scanActive: boolean = false;

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private apiClasesService: ApiclasesService
  ) { }

  ngOnInit() {
    this.cargarClase();
    Camera.requestPermissions();
  }

  private cargarClase() {
    this.activated.queryParams.subscribe(params => {
      if (params['clase']) {
        const claseData = JSON.parse(params['clase']);
        const userCorreo = sessionStorage.getItem('correo');
        
        if (claseData.correo === userCorreo) {
          this.clase = claseData;
        } else {
          this.mostrarErrorAcceso();
          this.router.navigate(['/clase']);
        }
      }
    });
  }

  formatearFechaHora(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async takePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      console.log('Imagen capturada:', image);
      this.imagenCapturada = image.webPath;
      await this.procesarImagenQR(image);
      
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      await this.mostrarError('Error al acceder a la cámara');
    }
  }

  private async procesarImagenQR(imagen: any) {
    try {
      console.log('Procesando imagen:', imagen);
      const rutAlumno = sessionStorage.getItem('rut');
      const correoAlumno = sessionStorage.getItem('correo');

      if (!rutAlumno || !correoAlumno) {
        throw new Error('No se encontraron los datos del alumno');
      }

      await this.mostrarMensajeExito('Asistencia registrada correctamente');
      
    } catch (error) {
      console.error('Error al procesar QR:', error);
      await this.mostrarError('Error al procesar el código QR');
    }
  }

  generarDatosQR() {
    const userCorreo = sessionStorage.getItem('correo');
    const userRut = sessionStorage.getItem('rut');
    
    if (!userCorreo || !userRut) {
      this.mostrarError('Error al generar el QR');
      return;
    }

    const rutParcial = userRut.substring(0, 8);

    const datosQR: DatosQR = {
      asignatura: {
        nombre: this.clase.asignatura,
        id: this.clase.id,
        descripcion: this.clase.descripcion
      },
      clase: {
        fecha: this.formatearFechaHora(this.clase.fecha),
        profesor: this.clase.profesor
      },
      alumno: {
        rutParcial: rutParcial,
        correo: userCorreo
      },
      registro: {
        timestamp: new Date().toISOString(),
        tipo: 'asistencia',
        estado: 'registrado'
      }
    };

    const validezQR = new Date();
    validezQR.setHours(validezQR.getHours() + 24);
    datosQR.validezQR = validezQR.toISOString();

    this.qrData = JSON.stringify(datosQR);
    this.mostrarQR = true;

    console.log('QR generado:', datosQR);
  }

  ocultarQr() {
    this.mostrarQR = false;
    this.qrData = '';
  }

  async confirmarEliminacion() {
    const userCorreo = sessionStorage.getItem('correo');
    
    if (this.clase.correo !== userCorreo) {
      this.mostrarError('No tienes permiso para eliminar esta clase');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Está seguro que desea eliminar esta clase?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarClase();
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarClase() {
    this.apiClasesService.deleteClase(this.clase.id).subscribe(
      () => {
        this.mostrarMensajeExito('Clase eliminada correctamente');
        this.router.navigate(['/clase']);
      },
      (error) => {
        console.error('Error:', error);
        this.mostrarError('Error al eliminar la clase');
      }
    );
  }

  async mostrarMensajeExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      mode: 'ios',
      buttons: ['OK']
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

  async mostrarErrorAcceso() {
    const alert = await this.alertController.create({
      header: 'Error de Acceso',
      message: 'No tienes permiso para ver esta clase',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.ocultarQr();
  }
}