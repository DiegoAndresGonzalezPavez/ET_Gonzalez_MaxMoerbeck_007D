import { Component, OnInit } from '@angular/core';
import { ApiclasesService } from '../services/apiclases.service';
import { Clases } from 'src/interfaces/IClases';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  clases: Clases[] = [];
  correoUsuario: string | null = null;

  constructor(
    private apiClasesService: ApiclasesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarClases();
  }

  ionViewWillEnter() {
    this.cargarClases();
  }

  private cargarClases() {
    this.correoUsuario = sessionStorage.getItem('correo');
    
    if (!this.correoUsuario) {
      this.mostrarErrorSesion();
      return;
    }

    this.apiClasesService.getClase().subscribe(
      (data) => {
        this.clases = data.filter(clase => clase.correo === this.correoUsuario);
        console.log('Clases del usuario:', this.clases);
      },
      (error) => {
        console.error('Error:', error);
        this.mostrarError('Error al cargar las clases');
      }
    );
  }

  buscarClase(clase: Clases) {
    if (clase.correo === this.correoUsuario) {
      this.router.navigate(['/detalle-clase'], {
        queryParams: { clase: JSON.stringify(clase) }
      });
    } else {
      this.mostrarError('No tienes acceso a esta clase');
    }
  }

  crearClase() {
    if (this.correoUsuario) {
      this.router.navigate(['/registrar-clase']);
    } else {
      this.mostrarErrorSesion();
    }
  }

  async mostrarErrorSesion() {
    const alert = await this.alertController.create({
      header: 'Error de Sesión',
      message: 'Debe iniciar sesión para ver las clases',
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

  doRefresh(event: any) {
    this.cargarClases();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
