import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAsignatura } from 'src/interfaces/IAsignatura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private apiUrl = environment.apiUrl + '/asignaturas';

  constructor(private http: HttpClient) {}

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<IAsignatura[]> {
    return this.http.get<IAsignatura[]>(this.apiUrl);
  }

  // Obtener asignatura por ID
  getAsignaturaById(id: string): Observable<IAsignatura> {
    return this.http.get<IAsignatura>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva asignatura
  createAsignatura(asignatura: IAsignatura): Observable<IAsignatura> {
    return this.http.post<IAsignatura>(this.apiUrl, asignatura);
  }

  // Actualizar una asignatura existente
  updateAsignatura(id: string, asignatura: IAsignatura): Observable<IAsignatura> {
    return this.http.put<IAsignatura>(`${this.apiUrl}/${id}`, asignatura);
  }

  // Eliminar una asignatura por ID
  deleteAsignatura(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
