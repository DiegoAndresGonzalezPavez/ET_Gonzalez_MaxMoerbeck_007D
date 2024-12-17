import { Component, OnInit } from '@angular/core';
import { NuevaJustificacion } from 'src/interfaces/IJustificacion';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JustificacionService } from '../services/justificacion.service';
import { AuthService } from '../services/auth.service';

interface ProfesorAsignaturas {
  [key: string]: string[];
}

@Component({
  selector: 'app-crear-justificacion',
  templateUrl: './crear-justificacion.page.html',
  styleUrls: ['./crear-justificacion.page.scss'],
})
export class CrearJustificacionPage implements OnInit {
  justificacionForm: FormGroup;
  nuevaJustificacion: NuevaJustificacion = {
    asignatura: "",
    fecha: "",
    descripcion: "",
    profesor: "",
    imagen: "",
    correo: ""
  };

  profesoresAsignaturas: ProfesorAsignaturas = {
    'Prof. López': ['Estructura de Datos', 'Programación'],
    'Prof. González': ['Aplicaciones Móviles', 'Desarrollo Web'],
    'Prof. Pérez': ['Base de Datos', 'Arquitectura de Software'],
    'Prof. García': ['Ingeniería de Software', 'Metodologías Ágiles'],
    'Prof. Rodríguez': ['Redes', 'Sistemas Operativos'],
    'Prof. Martínez': ['Calidad de Software', 'Testing'],
    'Prof. Sánchez': ['Seguridad Informática', 'Ethical Hacking']
  };

  profesores: string[] = Object.keys(this.profesoresAsignaturas);
  asignaturas: string[] = [];

  constructor(
    private justificacionService: JustificacionService,
    private alertController: AlertController,
    private router: Router,
    private fBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.justificacionForm = this.fBuilder.group({
      profesor: ['', [Validators.required]],
      asignatura: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagen: ['']
    });
  }

  ngOnInit() {
    this.verificarSesion();
    
    this.justificacionForm.get('profesor')?.valueChanges.subscribe(profesor => {
      this.onProfesorChange(profesor);
    });
  }

  fileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Validar el tamaño del archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        this.mostrarErrorTamanoImagen();
        return;
      }

      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.mostrarErrorTipoArchivo();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.justificacionForm.patchValue({
          imagen: base64String
        });
        console.log('Imagen cargada en Base64');
      };
      reader.readAsDataURL(file);
    }
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

  onProfesorChange(profesor: string) {
    if (profesor && this.profesoresAsignaturas.hasOwnProperty(profesor)) {
      this.asignaturas = this.profesoresAsignaturas[profesor];
      this.justificacionForm.get('asignatura')?.reset();
    } else {
      this.asignaturas = [];
    }
  }

  ionViewWillEnter() {
    this.verificarSesion();
  }

  private async verificarSesion() {
    const usuario = this.authService.getUsuarioActual();
    const correo = sessionStorage.getItem('correo') || localStorage.getItem('correo');

    console.log('Verificando sesión:', { usuario, correo });

    if (!usuario || !correo) {
      await this.mostrarErrorAcceso();
      this.router.navigate(['/login']);
    }
  }

  async crearJustificacion() {
    if (this.justificacionForm.valid) {
      const correoUsuario = sessionStorage.getItem('correo') || localStorage.getItem('correo');
      
      if (!correoUsuario) {
        await this.mostrarErrorAcceso();
        return;
      }

      this.nuevaJustificacion = {
        ...this.justificacionForm.value,
        correo: correoUsuario
      };

      this.justificacionService.postJustifiacion(this.nuevaJustificacion).subscribe(
        (response) => {
          console.log('Justificación creada:', response);
          this.mostrarMensajeExito();
          this.justificacionForm.reset();
          this.router.navigate(['/justificacion']);
        },
        (error) => {
          console.error('Error al crear la justificación:', error);
          this.mostrarErrorServidor();
        }
      );
    } else {
      this.mostrarErrorFormulario();
    }
  }

  async mostrarErrorAcceso() {
    const alert = await this.alertController.create({
      header: 'Error de Acceso',
      message: 'Debe iniciar sesión para crear una justificación',
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

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Justificación creada correctamente',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarErrorFormulario() {
    const alert = await this.alertController.create({
      header: 'Error en el formulario',
      message: 'Por favor, complete todos los campos correctamente',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarErrorServidor() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un problema al crear la justificación',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  volver() {
    this.router.navigate(['/justificacion']);
  }
}