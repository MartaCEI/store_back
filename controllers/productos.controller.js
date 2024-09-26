import { Product } from '../data/mongodb.js';
import { User } from '../data/mongodb.js';

export const getProducts = async (req, res, next) => {
    try {
        const product = await Product.find().populate('User', 'name username');
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product= await Product.findById(productId).populate('remitente destinatario', 'username email');

        if(!product) return res.status(404).json({message: "Correo no encontrado, revisa el ID"})
        res.status(200).json(product);
    
        } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createProduct= async (req, res, next) => {
    try {
        const {remitente, destinatario, asunto, contenido} = req.body;

        const newProduct = new Product({remitente, 
                                    destinatario, 
                                    asunto, 
                                    contenido, 
                                    isImportant:true});
        await newProduct.save();  // Guuarda el nuevo documento en la base de datos. 
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProduct= async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedproduct= await Product.findByIdAndDelete(productId);
        if(!deleteProduct) return res.status(404).json({message: "Correo no encontrado"});
        res.json({message: "Correo eliminado correctamente"}); // Si no tiene status envia el mensaje. si le ponemos status(204) no envia mensaje
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Marcar correo como leido
export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Utilizamos el new: true para que nos devuelva el documento actualizado
        // Utilizamos {isLeido:true} para marcar el correo como leido
        const updatedproduct= await Product.findByIdAndUpdate(
            productId,
            {isLeido: true},
            {new: true}    
        )
        if(!updateProduct) return es.status(404).json({message: "Correo no encontrado"});
        res.status(200).json(updateProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


