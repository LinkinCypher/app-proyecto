import { Document } from "mongoose";
export interface Tarea extends Document {
    readonly numero: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly createdAt: Date;
}
