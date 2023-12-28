import { Schema } from 'mongoose';

export const TareaSchema = new Schema({
  numero: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false } // Campo para representar el estado de eliminación
});
