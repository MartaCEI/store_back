import {Router} from "express"
import { getProducts, getProductById, createProduct, updateProductById, deleteProduct } from '../controllers/productos.controller.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js';

const router = Router();

// Rutas
router.get('/productos', getProducts);
router.get('/productos/:id', getProductById);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUserById);
router.post('/usuarios', createUser);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

export default router;