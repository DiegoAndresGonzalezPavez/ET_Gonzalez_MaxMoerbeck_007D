export interface EstudianteAsistencia {
  id: string;                  // Identificador del estudiante
  nombre: string;              // Nombre del estudiante
  correo: string;              // Correo del estudiante
  rut: string;                 // RUT del estudiante
  asistio: boolean;            // Estado de asistencia (asistió/no asistió)
}

export interface ListadoAsistencia {
  idClase: string;             // Identificador de la clase
  fecha: string;               // Fecha de la clase
  estudiantes: EstudianteAsistencia[];
}
