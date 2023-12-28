import { Schema } from 'mongoose';

export const TareaSchema = new Schema({
  numero: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha_creado: { type: Date, default: Date.now },
  fecha_editado: { type: Date, default: null }, // Fecha de la última edición
  deleted: { type: Boolean, default: false }, // Campo para representar el estado
});
