import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Justificaciones, NuevaJustificacion } from 'src/interfaces/IJustificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificacionService {

  constructor(private httpclient: HttpClient) { }

  getJustificacion(): Observable<Justificaciones[]> {
    return this.httpclient.get<Justificaciones[]>(`${environment.apiUrl}/justificaciones`);
  }

  postJustifiacion(nuevaJustificacion: NuevaJustificacion): Observable<NuevaJustificacion> {
    const correoUsuario = sessionStorage.getItem('correo');
    nuevaJustificacion.correo = correoUsuario || '';
    
    return this.httpclient.post<NuevaJustificacion>(
      `${environment.apiUrl}/justificaciones`, 
      nuevaJustificacion
    );
  }

  putJustificacion(justificacion: any): Observable<Justificaciones> {
    return this.httpclient.put<Justificaciones>(
      `${environment.apiUrl}/justificaciones/${justificacion.id}`, 
      justificacion
    );
  }

  deleteJustificacion(id: number): Observable<Justificaciones> {
    return this.httpclient.delete<Justificaciones>(`${environment.apiUrl}/justificaciones/${id}`);
  }
}