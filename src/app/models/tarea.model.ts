import { Contacto } from "./contactos.model";

export class Tarea{
    id!: number;
    descripcion!: string;
    titulo! : string;
    fechaInicio!: Date;
    fechaFin!: Date;
    usuarioAsignado!: string;
}