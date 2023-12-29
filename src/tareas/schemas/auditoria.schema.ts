import { Schema } from 'mongoose';

export const AuditoriaSchema = new Schema({
    fecha_creado: { type: Date, default: Date.now },
    fecha_editado: { type: Date, default: null },
    fecha_eliminado: { type: Date, default: null },
});