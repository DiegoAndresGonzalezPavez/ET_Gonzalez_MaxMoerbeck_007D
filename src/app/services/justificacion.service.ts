import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Justificaciones, NuevaJustificacion } from 'src/interfaces/IJustificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificacionService {

  constructor(private httpclient: HttpClient) { }

  getJustificacion(): Observable<Justificaciones[]> {
    const correoUsuario = sessionStorage.getItem('correo');
    return this.httpclient.get<Justificaciones[]>(`${environment.apiUrl}/justificaciones`).pipe(
      map(justificaciones => {
        return justificaciones.filter(j => j.correo === correoUsuario);
      })
    );
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
    const correoUsuario = sessionStorage.getItem('correo');
    justificacion.correo = correoUsuario; 
    
    return this.httpclient.put<Justificaciones>(
      `${environment.apiUrl}/justificaciones/${justificacion.id}`, 
      justificacion
    );
  }

  deleteJustificacion(id: number): Observable<Justificaciones> {
    return this.httpclient.delete<Justificaciones>(`${environment.apiUrl}/justificaciones/${id}`);
  }
}

