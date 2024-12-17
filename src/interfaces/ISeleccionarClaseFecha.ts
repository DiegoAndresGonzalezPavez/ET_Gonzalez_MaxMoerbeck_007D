export interface SeleccionClase {
  idClase: string;             // Identificador de la clase
  nombreAsignatura: string;    // Nombre de la asignatura
  profesor: string;            // Nombre del profesor
  rut: string;                 // RUT del profesor
}

export interface SeleccionFecha {
  fecha: string;               // Fecha seleccionada
}

export interface SeleccionClaseFecha {
  clase: SeleccionClase;       // Detalles de la clase seleccionada
  fecha: SeleccionFecha;       // Fecha de la clase
}
