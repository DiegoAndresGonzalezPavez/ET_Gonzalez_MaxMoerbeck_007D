import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  usuario: Users = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rut: '',
    isactive: false,
    imagenUrl: ''
  };

  mostrarContrasena: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioData = sessionStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData) as Users;
    } else {
      console.error('No se encontraron datos del usuario en sessionStorage.');
    }
  }

  actualizarUsuario() {
    console.log('Datos enviados al backend:', this.usuario);

    this.authService.putAlumno(this.usuario).subscribe(
      (response: Users) => {
        console.log('Usuario actualizado con éxito:', response);
        sessionStorage.setItem('usuario', JSON.stringify(response));
        this.router.navigate(['/perfil']);
      },
      (error: any) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/perfil']);
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  fileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.usuario.imagenUrl = reader.result as string; // Convertir el archivo a Base64 y almacenarlo
        console.log('Imagen cargada en Base64:', this.usuario.imagenUrl);
      };
      reader.readAsDataURL(file); // Inicia la conversión a Base64
    }
  }
  

}