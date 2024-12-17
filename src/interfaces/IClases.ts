export interface Clases {
  id: number;
  asignatura: string;
  fecha: string;
  descripcion: string;
  profesor: string;
  imagenUrl?: string;
  correo: string;
  rut: string;     // Agregado campo rut
  codigoQR: string;
}

export interface NuevaClase {
  asignatura: string;
  fecha: string;
  descripcion: string;
  profesor: string;
  imagenUrl?: string;
  correo: string;
  rut: string;     // Agregado campo rut
  codigoQR: string;
}