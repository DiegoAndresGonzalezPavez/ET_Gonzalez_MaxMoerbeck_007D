import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RegistroAsistenciaService } from '../services/registro-asistencia.service';
import { RegistroAsistencia, Clase } from 'src/interfaces/IRegistroAsistencia';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage implements OnInit {
  asistencias: RegistroAsistencia[] = [];
  clase?: Clase;
  isLoading: boolean = false;
  puedeEscanear: boolean = true;
  
  constructor(
    private registroAsistenciaService: RegistroAsistenciaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const claseId = this.route.snapshot.paramMap.get('id');
    if (claseId) {
      this.cargarAsistencias(claseId);
    }
  }

  cargarAsistencias(claseId: string) {
    this.isLoading = true;
    this.registroAsistenciaService.getAsistenciaByClaseId(claseId).subscribe({
      next: (data: RegistroAsistencia[]) => {
        this.asistencias = data;
        if (data.length > 0) {
          this.clase = data[0].clase;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar asistencias', error);
        this.isLoading = false;
      }
    });
  }

  async escanearQR() {
    if (!this.puedeEscanear) return;
    
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (image && image.webPath) {
        console.log('Imagen capturada:', image.webPath);
        // Aquí implementar la lógica para procesar el código QR
      }
    } catch (error) {
      console.error('Error al escanear código QR:', error);
    }
  }

  finalizarRegistro() {
    if (this.asistencias.length > 0 && this.asistencias[0].estudiantes.length > 0) {
      this.isLoading = true;
      // Implementar la lógica para guardar el registro final
      console.log('Finalizando registro de asistencia:', this.asistencias[0]);
      this.isLoading = false;
    }
  }
}