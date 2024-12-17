export interface EstudianteQR {
  id: string;
  nombre: string;
  correo: string;
  rut: string;
  codigoQR: string;
  presente?: boolean;
}

export interface Clase {
  id: string;
  nombreClase: string;
  fechaClase: string;
  asignatura: {
    id: string;
    nombre: string;
  };
}

export interface RegistroAsistencia {
  id: string;
  idClase: string;
  fecha: string;
  estudiantes: EstudianteQR[];
  horaInicio?: string;
  horaFin?: string;
  estado?: 'activo' | 'finalizado' | 'cancelado';
  observaciones?: string;
  clase?: Clase;
}