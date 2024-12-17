import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Users } from 'src/interfaces/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  qrdata: string = '';
  mostrarQr: boolean = false;
  usuario: Users = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    rut: '',
    isactive: false,
    imagenUrl: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private activated: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarUsuario() {
    const usuarioStr = sessionStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
    }

    const correo = sessionStorage.getItem('correo');
    if (correo) {
      this.authService.GetUserByCorreo(correo)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data && data.length > 0) {
              const usuarioActualizado = data[0];
              if (!usuarioActualizado.imagenUrl && this.usuario.imagenUrl) {
                usuarioActualizado.imagenUrl = this.usuario.imagenUrl;
              }
              this.usuario = usuarioActualizado;
              this.actualizarStorage();
            }
          },
          error: (error) => {
            console.error('Error al obtener datos:', error);
            this.mostrarError('Error al cargar los datos del usuario');
          }
        });
    }
  }

  async fileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];
    if (!file) return;

    try {
      if (file.size > 5 * 1024 * 1024) {
        await this.mostrarError('La imagen es demasiado grande. Máximo 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        await this.mostrarError('Por favor seleccione una imagen válida.');
        return;
      }

      const imagenBase64 = await this.convertirABase64(file);
      if (typeof imagenBase64 === 'string') {
        this.usuario.imagenUrl = imagenBase64;
        this.actualizarStorage();
        
        this.authService.putAlumno(this.usuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => this.mostrarExito('Imagen actualizada correctamente'),
            error: () => this.mostrarError('Error al actualizar la imagen')
          });
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      await this.mostrarError('Error al procesar la imagen');
    }
  }

  private convertirABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al convertir la imagen'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  private actualizarStorage() {
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  actualizarUsuario(usuario: Users) {
    this.actualizarStorage();
    this.router.navigate(['/actualizar', usuario.id]);
  }

  async mostrarConfirmacionEliminar(usuario: Users) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que desea eliminar su cuenta ${usuario.nombre}?`,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => this.eliminarUsuario(usuario)
        }
      ]
    });
    await alert.present();
  }

  eliminarUsuario(usuario: Users) {
    this.authService.deleteAlumno(usuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.mostrarExito('Cuenta eliminada correctamente');
          this.cerrarSesion();
        },
        error: () => this.mostrarError('Error al eliminar la cuenta')
      });
  }

  cerrarSesion() {
    this.authService.logout();
  }

  generarQr() {
    this.qrdata = `${this.usuario.nombre} - ${this.usuario.correo} - ${this.usuario.rut}`;
    this.mostrarQr = true;
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
}