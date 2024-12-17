import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userdata: any;
  loginForm: FormGroup;

  usuario: Users = {
    id: 0,
    nombre: "",
    correo: "",
    contrasena: "",
    rut: "",
    isactive: false,
    imagenUrl: ""
  };

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: ToastController,
    private alertcontroller: AlertController,
    private fbuilder: FormBuilder
  ) {
    this.loginForm = this.fbuilder.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl("", [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {
    sessionStorage.clear();
    localStorage.clear();
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const correo = this.loginForm.value.correo;
    const contrasena = this.loginForm.value.contrasena;

    this.authservice.GetUserByCorreo(correo).subscribe({
      next: (resp) => {
        this.userdata = resp;
        console.log('Respuesta del servidor:', this.userdata);

        if (this.userdata.length === 0) {
          this.loginForm.reset();
          this.UsuarioNoExiste();
          return;
        }

        this.usuario = {
          id: this.userdata[0].id,
          nombre: this.userdata[0].nombre,
          correo: this.userdata[0].correo,
          contrasena: this.userdata[0].contrasena,
          rut: this.userdata[0].rut,
          isactive: this.userdata[0].isactive,
          imagenUrl: this.userdata[0].imagenUrl || ''
        };

        if (this.usuario.contrasena !== contrasena) {
          this.loginForm.reset();
          this.ErrorUsuario();
          return;
        }

        if (!this.usuario.isactive) {
          this.loginForm.reset();
          this.UsuarioInactivo();
          return;
        }

        const token = Math.random().toString(36).substring(7);
        this.authservice.login(token, this.usuario);
        this.IniciarSesion(this.usuario);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.ErrorUsuario();
      }
    });
  }

  private IniciarSesion(usuario: Users) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    sessionStorage.setItem('correo', usuario.correo);
    sessionStorage.setItem('rut', usuario.rut);
    sessionStorage.setItem('ingresado', 'true');
    
    console.log('Datos de sesión guardados:', {
      usuario: sessionStorage.getItem('usuario'),
      correo: sessionStorage.getItem('correo'),
      rut: sessionStorage.getItem('rut')
    });

    this.showToast('Sesión Iniciada');
    this.router.navigate(['/inicio']);
  }

  async showToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      color: 'success',
      mode: 'ios'
    });
    await toast.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      mode: 'ios',
      buttons: ['OK']
    });
    await alerta.present();
  }

  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      mode: 'ios',
      buttons: ['OK']
    });
    await alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'No existe...',
      message: 'Debe registrarse.',
      mode: 'ios',
      buttons: ['OK']
    });
    await alerta.present();
  }

  Registrar() {
    this.router.navigate(['/register']);
  }

  ForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}