import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroAsistencia } from 'src/interfaces/IRegistroAsistencia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListadoAsistenciaService {
  constructor(private http: HttpClient) {}

  getAsistenciaPorClase(idClase: string, fecha: string): Observable<RegistroAsistencia[]> {
    return this.http.get<RegistroAsistencia[]>(
      `${environment.apiUrl}/asistencias?claseId=${idClase}&fecha=${fecha}`
    );
  }
}
