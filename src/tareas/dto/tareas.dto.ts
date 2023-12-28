export class CreateTareaDTO {
    readonly numero: number;
    readonly nombre: string;
    readonly descripcion: string;
    fecha_editado: Date; // Añade la propiedad fecha_editado si no está presente
}
