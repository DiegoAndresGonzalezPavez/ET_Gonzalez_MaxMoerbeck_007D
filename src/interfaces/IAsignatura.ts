export interface IAsignatura {
    id: string;                  // Identificador único de la asignatura
    nombre: string;              // Nombre de la asignatura
    descripcion?: string;        // Descripción breve de la asignatura (opcional)
    docente: string;             // Nombre del docente encargado
    codigo: string;              // Código de la asignatura
    creditos?: number;           // Créditos de la asignatura (opcional)
  }
  