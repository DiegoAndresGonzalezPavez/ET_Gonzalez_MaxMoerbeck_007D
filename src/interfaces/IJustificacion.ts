// Modificamos la interfaz IJustificacion.ts para incluir el correo
export interface Justificaciones {
  id: number;
  asignatura: string;
  fecha: string;
  descripcion: string;
  profesor: string;
  imagen?: string;
  correo: string; 
}

export interface NuevaJustificacion {
  asignatura: string;
  fecha: string;
  descripcion: string;
  profesor: string;
  imagen?: string;
  correo: string; 
}