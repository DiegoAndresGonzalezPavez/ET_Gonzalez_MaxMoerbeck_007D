import { Component, OnInit } from '@angular/core';
import { NuevaClase } from 'src/interfaces/IClases';
import { Users } from 'src/interfaces/users'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiclasesService } from '../services/apiclases.service';
import { AuthService } from '../services/auth.service';  

interface ProfesorAsignaturas {
  [key: string]: string[];
}

@Component({
  selector: 'app-registrar-clase',
  templateUrl: './registrar-clase.page.html',
  styleUrls: ['./registrar-clase.page.scss'],
})
export class RegistrarClasePage implements OnInit {
  claseForm: FormGroup;
  profesoresAsignaturas: ProfesorAsignaturas = {
    'Prof. López': ['Estructura de Datos', 'Programación'],
    'Prof. González': ['Aplicaciones Móviles', 'Desarrollo Web'],
    'Prof. Pérez': ['Base de Datos', 'Arquitectura de Software']
  };

  profesores: string[] = Object.keys(this.profesoresAsignaturas);
  asignaturas: string[] = [];
  usuario: Users | null = null;

  constructor(
    private apiclasesService: ApiclasesService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.claseForm = this.initForm();
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  private initForm(): FormGroup {
    return this.fBuilder.group({
      profesor: ['', Validators.required],
      asignatura: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required], 
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private cargarDatosUsuario() {
    const usuarioStr = sessionStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
    } else {
      this.mostrarError('No se encontraron los datos del usuario');
      this.router.navigate(['/login']);
    }
  }

  onProfesorChange(event: any) {
    const profesor: string = event.detail.value;
    if (profesor && this.profesoresAsignaturas.hasOwnProperty(profesor)) {
      this.asignaturas = this.profesoresAsignaturas[profesor];
      this.claseForm.get('asignatura')?.reset();
    } else {
      this.asignaturas = [];
    }
  }

  registrarClase() {
    if (this.claseForm.valid && this.usuario) {
      const fecha = this.claseForm.get('fecha')?.value;
      const hora = this.claseForm.get('hora')?.value;
      const fechaCompleta = fecha && hora ? `${fecha}T${hora}` : fecha;

      const nuevaClase: NuevaClase = {
        profesor: this.claseForm.get('profesor')?.value,
        asignatura: this.claseForm.get('asignatura')?.value,
        fecha: fechaCompleta,
        descripcion: this.claseForm.get('descripcion')?.value,
        correo: this.usuario.correo,
        rut: this.usuario.rut,
        codigoQR: this.generarCodigoQR(this.usuario.rut, this.usuario.correo)
      };

      this.apiclasesService.postClase(nuevaClase).subscribe(
        () => {
          this.mostrarMensajeExito();
          this.router.navigateByUrl('/clase');
        },
        (error) => {
          console.error('Error:', error);
          this.mostrarError('Error al registrar la clase');
        }
      );
    } else {
      this.mostrarError('Por favor complete todos los campos correctamente');
    }
  }

  private generarCodigoQR(rut: string, correo: string): string {
    return `${rut.substring(0, 8)}-${correo}`;
  }

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Clase registrada correctamente',
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
}