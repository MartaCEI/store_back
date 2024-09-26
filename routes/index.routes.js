import {Router} from "express"
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productos.controller.js';
import { getAdmin, authLogin, createRegister, getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js';
import {authenticateToken} from '../middlewares/auth.js'
const router = Router();

<<<<<<< Updated upstream
=======
// Rutas
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
>>>>>>> Stashed changes


// Rutas
router.get('/users', getUsers);
router.post('/login', authLogin);
router.post('/register',createRegister);
router.get('/admin', authenticateToken, getAdmin);


router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


// router.get('/users', getUsers);
router.get('/usuarios/:username', getUserByUsername);
router.post('/users', createUser);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

export default router;