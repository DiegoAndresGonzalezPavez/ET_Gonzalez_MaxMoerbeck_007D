export interface Clase {
  id: string;                  // Identificador único de la clase
  nombreAsignatura: string;    // Nombre de la asignatura
  periodoAcademico: string;    // Periodo académico (ej: 2023)
  sala: string;                // Sala de clases asignada
  profesor: string;            // Nombre del profesor
  correo: string;              // Correo del profesor
  rut: string;                 // RUT del profesor
  codigoQR: string;            // Código QR asociado a la clase
}

export interface NuevaClase {
  nombreAsignatura: string;    // Para creación de clase, se omite el id
  periodoAcademico: string;
  sala: string;
  profesor: string;
  correo: string;
  rut: string;
  codigoQR: string;
}
