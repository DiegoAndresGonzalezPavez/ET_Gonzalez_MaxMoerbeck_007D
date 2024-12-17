import { Component, OnInit } from '@angular/core';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import { RegistroAsistencia, EstudianteQR } from 'src/interfaces/IRegistroAsistencia';
import { ToastController } from '@ionic/angular';

interface ResumenEstudiante {
  id: string;
  nombre: string;
  clasesAsistidas: number;
  clasesTotales: number;
}

@Component({
  selector: 'app-resumen-asistencia',
  templateUrl: './resumen-asistencia.page.html',
  styleUrls: ['./resumen-asistencia.page.scss'],
})
export class ResumenAsistenciaPage implements OnInit {
  asistencias: RegistroAsistencia[] = [];
  error: boolean = false;
  errorMessage: string = '';
  resumen: { [estudianteId: string]: { nombre: string, clasesAsistidas: number, clasesTotales: number } } = {};
  resumenArray: ResumenEstudiante[] = [];
  cargando = true;

  constructor(
    private asistenciaService: RegistroAsistenciaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarAsistencia();
  }

  cargarAsistencia() {
    this.error = false;
    this.errorMessage = '';
    this.cargando = true;
    
    console.log('Iniciando carga de asistencia...'); // Log para depuración
    
    this.asistenciaService.getAsistenciaAll().subscribe({
      next: (data: RegistroAsistencia[]) => {
        console.log('Datos recibidos:', data); // Log para depuración
        if (data && Array.isArray(data)) {
          this.asistencias = data;
          this.calcularResumenAsistencia();
          this.resumenArray = this.getResumenAsArray();
          console.log('Resumen calculado:', this.resumenArray); // Log para depuración
        } else {
          this.error = true;
          this.errorMessage = 'Formato de datos incorrecto';
          this.mostrarToast('Error en el formato de los datos');
        }
        this.cargando = false;
      },
      error: async (error: any) => {
        console.error('Error detallado:', error); // Log para depuración
        this.error = true;
        this.errorMessage = 'Error al cargar los datos. Por favor, intente nuevamente.';
        this.cargando = false;
        await this.mostrarToast('Error al cargar la asistencia. Intente nuevamente.');
      }
    });
  }

  calcularResumenAsistencia() {
    try {
      this.resumen = {};
      this.asistencias.forEach(registro => {
        registro.estudiantes.forEach(estudiante => {
          if (!this.resumen[estudiante.id]) {
            this.resumen[estudiante.id] = {
              nombre: estudiante.nombre,
              clasesAsistidas: 0,
              clasesTotales: 0
            };
          }
          this.resumen[estudiante.id].clasesTotales++;
          if (estudiante.presente) {
            this.resumen[estudiante.id].clasesAsistidas++;
          }
        });
      });
    } catch (error) {
      console.error('Error al calcular resumen:', error);
      this.error = true;
      this.errorMessage = 'Error al procesar los datos';
      this.mostrarToast('Error al procesar los datos de asistencia');
    }
  }

  getResumenAsArray(): ResumenEstudiante[] {
    try {
      return Object.keys(this.resumen).map(key => ({
        id: key,
        ...this.resumen[key]
      }));
    } catch (error) {
      console.error('Error al convertir resumen a array:', error);
      return [];
    }
  }

  calcularPorcentaje(asistidas: number, totales: number): number {
    try {
      return totales > 0 ? Math.round((asistidas / totales) * 100) : 0;
    } catch {
      return 0;
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  intentarNuevamente() {
    this.cargarAsistencia();
  }
}