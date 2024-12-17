import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RegistroAsistencia } from 'src/interfaces/IRegistroAsistencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService {
  private apiUrl = `${environment.apiUrl}/api/asistencias`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {
    console.log('Configuración de API:', this.apiUrl);
  }

  getAsistenciaAll(): Observable<RegistroAsistencia[]> {
    return this.http.get<RegistroAsistencia[]>(this.apiUrl, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Respuesta del servidor:', response);
        }),
        catchError(this.handleError)
      );
  }

  getAsistencia(id: string): Observable<RegistroAsistencia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RegistroAsistencia>(url, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Asistencia individual obtenida:', response);
        }),
        catchError(this.handleError)
      );
  }

  getAsistenciaByClaseId(claseId: string): Observable<RegistroAsistencia[]> {
    const url = `${this.apiUrl}/clase/${claseId}`;
    return this.http.get<RegistroAsistencia[]>(url, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Asistencias por clase obtenidas:', response);
        }),
        catchError(this.handleError)
      );
  }

  postAsistencia(asistencia: RegistroAsistencia): Observable<RegistroAsistencia> {
    return this.http.post<RegistroAsistencia>(this.apiUrl, asistencia, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Asistencia registrada:', response);
        }),
        catchError(this.handleError)
      );
  }

  putAsistencia(id: string, asistencia: RegistroAsistencia): Observable<RegistroAsistencia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RegistroAsistencia>(url, asistencia, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Asistencia actualizada:', response);
        }),
        catchError(this.handleError)
      );
  }

  deleteAsistencia(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Asistencia eliminada:', response);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Se produjo un error en la solicitud';
    
    if (error.status === 0) {
      errorMessage = 'No se puede conectar al servidor. Verifique su conexión de red.';
    } else if (error.status === 404) {
      errorMessage = 'El recurso solicitado no fue encontrado.';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor.';
    }

    console.error('Error detallado:', {
      mensaje: errorMessage,
      estado: error.status,
      error: error.error,
      url: error.url
    });

    return throwError(() => new Error(errorMessage));
  }
}