import { Router } from 'express';
import { deleteProductos, getProductos, postProductos, putProducto } from '../controller/productos';
const router = Router();

router.post('/', postProductos);
router.get('/', getProductos);
router.delete('/:id', deleteProductos);
router.put('/:id', putProducto);

export default router;
