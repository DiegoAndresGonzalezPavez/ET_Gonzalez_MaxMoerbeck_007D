//peticion get, put, delete
export interface Users {
    id: number;
    nombre: string;
    correo: string;
    contrasena: string;
    rut: string;
    isactive: boolean;
    imagenUrl?: string;
  }
  
//peticion post
  export interface UserNuevo {
    nombre: string;
    correo: string;
    contrasena: string;
    rut: string;
    isactive: boolean;
    imagenUrl?: string;
  }  