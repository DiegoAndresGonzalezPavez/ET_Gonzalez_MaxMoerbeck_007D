import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from 'src/interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registroForm: FormGroup;

  nuevoUsuario: UserNuevo = {
    nombre: "",
    correo: "",
    contrasena: "",
    rut: "",
    isactive: false,
    imagenUrl: "" 
  }

  userdata: any;

  constructor(private authservice: AuthService,
              private alertcontroller: AlertController,
              private router: Router,
              private fBuilder: FormBuilder) {
    this.registroForm = this.fBuilder.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(6)]),
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'rut': new FormControl("", [Validators.required, Validators.maxLength(12)]),
    })
  }

  ngOnInit() {
  }

  fileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.nuevoUsuario.imagenUrl = reader.result as string;
        console.log('Imagen cargada:', this.nuevoUsuario.imagenUrl);
      };
      reader.readAsDataURL(file);
    }
  }

crearAlumno() {
  if (this.registroForm.valid) {
    this.authservice.GetUserByCorreo(this.registroForm.value.nombre).subscribe(resp => {
      this.userdata = resp;
      if (this.userdata.length > 0) {
        this.registroForm.reset();
        this.errorDuplicidad();
      } else {
        this.nuevoUsuario.nombre = this.registroForm.value.nombre;
        this.nuevoUsuario.correo = this.registroForm.value.correo;
        this.nuevoUsuario.contrasena = this.registroForm.value.contrasena;
        this.nuevoUsuario.rut = this.registroForm.value.rut;
        this.nuevoUsuario.isactive = true;

        this.authservice.PostUsuario(this.nuevoUsuario).subscribe((response) => {
          console.log('Usuario creado con éxito:', response);

          sessionStorage.setItem('usuario', JSON.stringify(response));
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/perfil');
        });
      }
    });
  }
}


  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.nuevoUsuario.nombre,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted ' + this.nuevoUsuario.nombre + ' ya está registrado :D',
      buttons: ['OK']
    });
    alerta.present();
  }
}
