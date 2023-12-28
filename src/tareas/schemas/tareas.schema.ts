import { Schema } from 'mongoose';
import { AuditoriaSchema } from './auditoria.schema';

export const TareaSchema = new Schema({
    numero: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    deleted: { type: Boolean, default: false }, // Campo para representar el estado
    auditoria: { type: AuditoriaSchema, default: {} },
});