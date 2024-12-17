import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clases, NuevaClase } from 'src/interfaces/IClases';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiclasesService {

  constructor(private httpclient: HttpClient) { }

  getClase(): Observable<Clases[]> {
    const userCorreo = sessionStorage.getItem('correo');
    return this.httpclient.get<Clases[]>(`${environment.apiUrl}/clases`).pipe(
      map(clases => clases.filter(clase => clase.correo === userCorreo))
    );
  }

  postClase(nuevaClase: NuevaClase): Observable<NuevaClase> {
    const userCorreo = sessionStorage.getItem('correo');
    nuevaClase.correo = userCorreo || '';
    return this.httpclient.post<NuevaClase>(`${environment.apiUrl}/clases`, nuevaClase);
  }

  putClase(clase: Clases): Observable<Clases> {
    const userCorreo = sessionStorage.getItem('correo');
    if (clase.correo !== userCorreo) {
      throw new Error('No autorizado para modificar esta clase');
    }
    return this.httpclient.put<Clases>(`${environment.apiUrl}/clases/${clase.id}`, clase);
  }

  deleteClase(id: number): Observable<any> {
    return this.httpclient.delete(`${environment.apiUrl}/clases/${id}`);
  }
}