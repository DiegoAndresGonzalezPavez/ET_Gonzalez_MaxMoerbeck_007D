import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  correoUsuario: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.correoUsuario = sessionStorage.getItem('reset-email');
    if (!this.correoUsuario) {
      this.router.navigate(['/forgot-password']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  cambiarContrasena() {
    if (this.changePasswordForm.valid && this.correoUsuario) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      
      this.authService.GetUserByCorreo(this.correoUsuario).subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            const usuario = data[0];
            usuario.contrasena = newPassword;
            
            this.authService.putAlumno(usuario).subscribe({
              next: async () => {
                await this.mostrarExito('Contraseña actualizada correctamente');
                sessionStorage.removeItem('reset-email');
                this.router.navigate(['/login']);
              },
              error: async (error) => {
                console.error('Error al actualizar contraseña:', error);
                await this.mostrarError('Error al actualizar la contraseña');
              }
            });
          }
        },
        error: async (error) => {
          console.error('Error al obtener usuario:', error);
          await this.mostrarError('Error al obtener los datos del usuario');
        }
      });
    }
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
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
