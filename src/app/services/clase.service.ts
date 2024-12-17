import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DetalleClase } from 'src/interfaces/IDetalleClase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private httpclient: HttpClient) { }

  // Obtener clase por ID
  getClaseById(id: string): Observable<DetalleClase> {
    const userCorreo = sessionStorage.getItem('correo');
    return this.httpclient.get<DetalleClase[]>(`${environment.apiUrl}/clases`).pipe(
      map(clases => {
        const clase = clases.find(clase => clase.id === id && clase.correo === userCorreo);
        if (!clase) {
          throw new Error('Clase no encontrada o no autorizada');
        }
        return clase as DetalleClase;
      }),
      catchError((error) => {
        console.error('Error al obtener la clase', error);
        return throwError(() => new Error('Error al obtener la clase'));
      })
    );
  }

  // Obtener todas las clases del usuario
  getAllClases(): Observable<DetalleClase[]> {
    const userCorreo = sessionStorage.getItem('correo');
    return this.httpclient.get<DetalleClase[]>(`${environment.apiUrl}/clases`).pipe(
      map(clases => clases.filter(clase => clase.correo === userCorreo)),
      catchError((error) => {
        console.error('Error al obtener las clases', error);
        return throwError(() => new Error('Error al obtener las clases'));
      })
    );
  }

  // Crear una nueva clase
  postClase(nuevaClase: DetalleClase): Observable<DetalleClase> {
    const userCorreo = sessionStorage.getItem('correo');
    if (!userCorreo) {
      return throwError(() => new Error('No se ha encontrado un usuario válido en la sesión'));
    }
    nuevaClase.correo = userCorreo;
    return this.httpclient.post<DetalleClase>(`${environment.apiUrl}/clases`, nuevaClase).pipe(
      catchError((error) => {
        console.error('Error al crear la clase', error);
        return throwError(() => new Error('Error al crear la clase'));
      })
    );
  }

  // Actualizar una clase existente
  putClase(clase: DetalleClase): Observable<DetalleClase> {
    const userCorreo = sessionStorage.getItem('correo');
    if (clase.correo !== userCorreo) {
      return throwError(() => new Error('No autorizado para modificar esta clase'));
    }
    return this.httpclient.put<DetalleClase>(`${environment.apiUrl}/clases/${clase.id}`, clase).pipe(
      catchError((error) => {
        console.error('Error al actualizar la clase', error);
        return throwError(() => new Error('Error al actualizar la clase'));
      })
    );
  }

  // Eliminar una clase por ID
  deleteClase(id: string): Observable<any> {
    const userCorreo = sessionStorage.getItem('correo');
    return this.getClaseById(id).pipe(
      switchMap(clase => {
        if (clase.correo !== userCorreo) {
          return throwError(() => new Error('No autorizado para eliminar esta clase'));
        }
        return this.httpclient.delete(`${environment.apiUrl}/clases/${id}`);
      }),
      catchError((error) => {
        console.error('Error al eliminar la clase', error);
        return throwError(() => new Error('Error al eliminar la clase'));
      })
    );
  }
}

