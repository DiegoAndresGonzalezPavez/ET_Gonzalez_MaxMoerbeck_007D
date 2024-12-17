import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  subjects: string[] = ['Calculo I', 'Arquitectura', 'Estadística']; 
  teachers: string[] = ['Prof. Viviana', 'Prof. Montero', 'Prof. Ignacio'];

  selectedSubject: string = '';  
  selectedTeacher: string = '';  
  selectedDate: string = '';  
  attendanceMessage: string = '';  

  constructor() { }

  ngOnInit() { }

  registerAttendance() {
    if (this.selectedSubject && this.selectedTeacher && this.selectedDate) {
      this.attendanceMessage = `Asistencia registrada para ${this.selectedSubject} con ${this.selectedTeacher} el ${this.selectedDate}`;
    } else {
      this.attendanceMessage = 'Por favor, complete todos los campos antes de registrar la asistencia.';
    }
  }
}
