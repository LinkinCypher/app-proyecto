export class CreateTareaDTO {
    readonly numero: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly auditoria: {
        fecha_creado: Date;
        fecha_editado: Date | null;
    };
    deleted: boolean; // Agregar el campo deleted

    constructor() {
        this.auditoria = {
            fecha_creado: new Date(),
            fecha_editado: null,
        };
        this.deleted = false; // Establecer el valor por defecto de deleted como false
    }
}
