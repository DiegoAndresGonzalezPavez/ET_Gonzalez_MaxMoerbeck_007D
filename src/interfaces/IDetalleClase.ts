export interface DetalleClase {
  id: string;                  // Identificador único de la clase
  nombreAsignatura: string;    // Nombre de la asignatura
  fecha: string;               // Fecha de la clase
  descripcion: string;         // Descripción del contenido de la clase
  profesor: string;            // Nombre del profesor
  correo: string;              // Correo del profesor
  rut: string;                 // RUT del profesor
  imagenUrl?: string;          // URL opcional de la imagen asociada
  codigoQR: string;            // Código QR de la clase
}

export interface ActualizarClase {
  id: string;                  // Para actualizar la clase, se requiere el id
  nombreAsignatura: string;
  fecha: string;
  descripcion: string;
  profesor: string;
  correo: string;
  rut: string;
  imagenUrl?: string;
  codigoQR: string;
}
