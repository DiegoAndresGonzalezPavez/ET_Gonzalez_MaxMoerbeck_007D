import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Asignatura {
  codigo: string;
  nombre: string;
  profesor: string;
  horario: string;
  sala: string;
  asistencia: number;
}

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asignaturas: Asignatura[] = [
    {
      codigo: 'PGY4121',
      nombre: 'Programación de Aplicaciones Móviles',
      profesor: 'Prof. González',
      horario: 'Lunes y Miércoles 08:30 - 10:40',
      sala: 'Lab 301',
      asistencia: 85
    },
    {
      codigo: 'ASY4131',
      nombre: 'Arquitectura de Software',
      profesor: 'Prof. Pérez',
      horario: 'Martes y Jueves 10:50 - 13:00',
      sala: 'Sala 405',
      asistencia: 92
    },
    {
      codigo: 'CAL4131',
      nombre: 'Calidad de Software',
      profesor: 'Prof. Martínez',
      horario: 'Viernes 14:00 - 18:15',
      sala: 'Lab 302',
      asistencia: 78
    },
    {
      codigo: 'ING4131',
      nombre: 'Inglés Intermedio',
      profesor: 'Prof. Smith',
      horario: 'Miércoles 14:00 - 17:15',
      sala: 'Sala 203',
      asistencia: 88
    }
  ];

  filtroAsistencia: string = 'todos';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificarSesion();
  }

  ionViewWillEnter() {
    this.verificarSesion();
  }

  private async verificarSesion() {
    const correo = sessionStorage.getItem('correo') || localStorage.getItem('correo');
    if (!correo) {
      await this.mostrarErrorAcceso();
      this.router.navigate(['/login']);
    }
  }

  getColorAsistencia(asistencia: number): string {
    if (asistencia >= 85) return 'success';
    if (asistencia >= 75) return 'warning';
    return 'danger';
  }

  async mostrarFiltros() {
    const alert = await this.alertController.create({
      header: 'Filtrar por Asistencia',
      mode: 'ios',
      inputs: [
        {
          name: 'filtro',
          type: 'radio',
          label: 'Todas las asignaturas',
          value: 'todos',
          checked: this.filtroAsistencia === 'todos'
        },
        {
          name: 'filtro',
          type: 'radio',
          label: 'Asistencia crítica (<75%)',
          value: 'critica',
          checked: this.filtroAsistencia === 'critica'
        },
        {
          name: 'filtro',
          type: 'radio',
          label: 'Asistencia en riesgo (75-84%)',
          value: 'riesgo',
          checked: this.filtroAsistencia === 'riesgo'
        },
        {
          name: 'filtro',
          type: 'radio',
          label: 'Asistencia normal (≥85%)',
          value: 'normal',
          checked: this.filtroAsistencia === 'normal'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Filtrar',
          handler: (value) => {
            this.filtroAsistencia = value;
            this.aplicarFiltro();
          }
        }
      ]
    });

    await alert.present();
  }

  private aplicarFiltro() {

  }

  async mostrarErrorAcceso() {
    const alert = await this.alertController.create({
      header: 'Error de Acceso',
      message: 'Debe iniciar sesión para ver sus asignaturas',
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  }
}
