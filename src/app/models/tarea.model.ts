import { Contacto } from "./contactos.model";

export class Tarea{
    id!: number;
    userId!: number;
    description!: string;
    name! : string;
    startDate!: Date;
    endDate!: Date;
    contactName!: string;
    contactId!: string;
}