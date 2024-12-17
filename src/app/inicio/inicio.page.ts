import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Users } from 'src/interfaces/users'; 
import { Router } from '@angular/router';

interface Menu {
  icon: string;
  name: string;
  redirecTo: string;
}


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: Users = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rut: '',
    isactive: false,
  };

  menu: Menu[] = [
    {
      icon: 'home-outline',
      name: 'Inicio',
      redirecTo: '/inicio'
    },
    {
      icon: 'person-outline',
      name: 'Perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'book-outline',
      name: 'Clases',
      redirecTo: '/clase'
    },
    {
      icon: 'document-text-outline',
      name: 'Justificación',
      redirecTo: '/justificacion'
    },
    {
      icon: 'bookmark-outline',
      name: 'Asignaturas',
      redirecTo: '/asignaturas'
    },
    {
      icon: 'log-out-outline',
      name: 'Cerrar Sesión',
      redirecTo: '/home'
    },
  ];

  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  ionViewWillEnter() {
    this.cargarUsuario();
  }

  private cargarUsuario() {
    const usuarioStr = sessionStorage.getItem('usuario');
    if (usuarioStr) {
      const usuarioStorage = JSON.parse(usuarioStr);
      const correoSesion = sessionStorage.getItem('correo');
      
      if (usuarioStorage.correo === correoSesion) {
        this.usuario = usuarioStorage;
      } else {
        this.obtenerDatosUsuario();
      }
    } else {
      this.obtenerDatosUsuario();
    }
  }

  obtenerDatosUsuario(): void {
    const correo = sessionStorage.getItem('correo');
    if (!correo) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.GetUserByCorreo(correo).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.usuario = data[0];
          sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        } else {
          console.error('No se encontraron datos del usuario');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  cerrarMenu() {
    this.menuController.close('first');
  }

  cerrarSesion() {
    sessionStorage.clear();
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
