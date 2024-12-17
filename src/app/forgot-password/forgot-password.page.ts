import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.forgotForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  irACambiarPassword() {
    if (this.forgotForm.valid) {
      const correo = this.forgotForm.get('correo')?.value;
      
      this.authService.GetUserByCorreo(correo).subscribe({
        next: async (data) => {
          if (data && data.length > 0) {
            sessionStorage.setItem('reset-email', correo);
            
            const alert = await this.alertController.create({
              header: 'Correo Verificado',
              message: 'El correo ha sido verificado correctamente. Serás redirigido para cambiar tu contraseña.',
              mode: 'ios',
              buttons: [
                {
                  text: 'Continuar',
                  handler: () => {
                    this.router.navigate(['/change-password'])
                      .then(() => {
                        console.log('Navegación exitosa a change-password');
                      })
                      .catch(error => {
                        console.error('Error en la navegación:', error);
                        this.mostrarError('Error al navegar a la página de cambio de contraseña');
                      });
                  }
                }
              ]
            });
            await alert.present();
          } else {
            this.mostrarError('El correo ingresado no está registrado en el sistema. Por favor, verifica que sea correcto o regístrate si aún no tienes una cuenta.');
          }
        },
        error: async (error) => {
          console.error('Error al verificar el correo:', error);
          this.mostrarError('Ha ocurrido un error al verificar el correo. Por favor, intenta nuevamente.');
        }
      });
    } else {
      this.mostrarError('Por favor, ingresa un correo electrónico válido.');
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
      buttons: ['OK']
    });
    await alert.present();
  }

  Registrar() {
    this.router.navigate(['/register']);
  }
}