import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import { RegistroAsistencia, EstudianteQR, Clase } from 'src/interfaces/IRegistroAsistencia';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {
  claseId: string = '';
  asistencias: RegistroAsistencia[] = [];
  clase?: Clase;
  isLoading: boolean = false;
  cantidadPresentes: number = 0;
  porcentajeAsistencia: number = 0;

  constructor(
    private route: ActivatedRoute,
    private asistenciaService: RegistroAsistenciaService,
    private toastController: ToastController
  ) {
    this.claseId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    if (this.claseId) {
      this.cargarAsistencia();
    }
  }

  cargarAsistencia() {
    this.isLoading = true;
    this.asistenciaService.getAsistenciaByClaseId(this.claseId).subscribe({
      next: (data: RegistroAsistencia[]) => {
        this.asistencias = data;
        if (data.length > 0) {
          this.clase = data[0].clase;
          this.calcularEstadisticas();
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar la asistencia', error);
        this.mostrarToast('Error al cargar la asistencia');
        this.isLoading = false;
      }
    });
  }

  calcularEstadisticas() {
    if (this.asistencias.length > 0 && this.asistencias[0].estudiantes) {
      const estudiantes = this.asistencias[0].estudiantes;
      this.cantidadPresentes = estudiantes.filter(e => e.presente).length;
      this.porcentajeAsistencia = Math.round((this.cantidadPresentes / estudiantes.length) * 100);
    }
  }

  actualizarAsistencia(estudianteActualizado: EstudianteQR) {
    const registroIndex = this.asistencias.findIndex(registro =>
      registro.estudiantes.some(estudiante => estudiante.id === estudianteActualizado.id)
    );

    if (registroIndex !== -1) {
      const estudianteIndex = this.asistencias[registroIndex].estudiantes.findIndex(est => est.id === estudianteActualizado.id);
      if (estudianteIndex !== -1) {
        this.asistencias[registroIndex].estudiantes[estudianteIndex].presente = estudianteActualizado.presente;

        const registroActualizado = this.asistencias[registroIndex];
        this.asistenciaService.putAsistencia(registroActualizado.id, registroActualizado).subscribe({
          next: () => {
            this.mostrarToast('Asistencia actualizada exitosamente');
            this.calcularEstadisticas();
          },
          error: (error: any) => {
            console.error('Error al actualizar asistencia', error);
            this.mostrarToast('Error al actualizar asistencia');
          }
        });
      }
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}