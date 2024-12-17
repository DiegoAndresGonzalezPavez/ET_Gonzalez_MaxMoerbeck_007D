import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/alumnos`);
  }

  GetUserByCorreo(usuario: string): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/alumnos/?correo=${usuario}`);
  }

  IsLoggedIn(): boolean {
    const correo = sessionStorage.getItem('correo');
    const usuario = sessionStorage.getItem('usuario');
    return correo !== null && usuario !== null;
  }

  login(token: string, usuario: Users): void {
    this.logout();
    
    localStorage.setItem('authToken', token);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    sessionStorage.setItem('correo', usuario.correo);
    sessionStorage.setItem('rut', usuario.rut);
    
    console.log('Login completado:', {
      usuario: sessionStorage.getItem('usuario'),
      correo: sessionStorage.getItem('correo'),
      rut: sessionStorage.getItem('rut')
    });
  }

  logout(): void {
    console.log('Limpiando sesión...');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(`${environment.apiUrl}/alumnos`, newUsuario);
  }

  getAlumnoID(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/alumnos/?id=${id}`);
  }

  putAlumno(usuario: Users): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/alumnos/${usuario.id}`, usuario);
  }

  deleteAlumno(usuario: any): Observable<Users> {
    return this.httpclient.delete<Users>(`${environment.apiUrl}/alumnos/${usuario.id}`);
  }

  getUserId(): number | null {
    const usuario = this.getUsuarioActual();
    return usuario?.id || null;
  }

  getUsuarioActual(): Users | null {
    const usuarioStr = sessionStorage.getItem('usuario');
    if (!usuarioStr) return null;
    
    try {
      return JSON.parse(usuarioStr);
    } catch (error) {
      console.error('Error al parsear usuario:', error);
      return null;
    }
  }

  getCurrentUserEmail(): string | null {
    const usuario = this.getUsuarioActual();
    return usuario?.correo || sessionStorage.getItem('correo');
  }

  canAccessJustificacion(justificacionCorreo: string): boolean {
    const currentUserEmail = this.getCurrentUserEmail();
    return currentUserEmail === justificacionCorreo;
  }

  canAccessClase(claseCorreo: string): boolean {
    const currentUserEmail = this.getCurrentUserEmail();
    return currentUserEmail === claseCorreo;
  }
}