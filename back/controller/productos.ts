import { Request, Response } from 'express';
import { Productos } from '../models/Productos';

export const postProductos = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio } = req.body;

  // console.log(nombre);

  try {
    const product = Productos.build({ nombre, descripcion, precio });

    await product.save();

    res.status(200).json({
      ok: true,
      msg: 'producto creado',
      nombre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Ha ocurrido un error vuelva a intentarlo`,
    });
  }
};

export const getProductos = async (req: Request, res: Response) => {
  try {
    const product = await Productos.findAll();

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Ha ocurrido un error vuelva a intentarlo`,
    });
  }
};

export const deleteProductos = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const prod = await Productos.findByPk(id);

    if (!prod) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el producto con el id ${id}`,
      });
    }

    await prod.destroy();

    res.status(200).json({
      ok: true,
      msg: 'usuario borrado',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Ha ocurrido un error vuelva a intentarlo`,
    });
  }
};

export const putProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const { nombre, descripcion, precio } = req.body;
  try {
    const prod = await Productos.findByPk(id);

    if (!prod) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el producto con el id ${id}`,
      });
    }

    await prod.update({ nombre, descripcion, precio });

    res.status(200).json({
      ok: true,
      msg: 'producto modificado',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Ha ocurrido un error vuelva a intentarlo`,
    });
  }
};
