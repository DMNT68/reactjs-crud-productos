import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const Productos = db.define('productos', {
  nombre: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.NUMBER },
});
