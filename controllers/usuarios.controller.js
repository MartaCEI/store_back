import { User } from '../data/mongodb.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "Usuario no encontrado, revisa el ID"})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        const newUser = new User({username, email, password});
        await newUser.save();  // Guuarda el nuevo documento en la base de datos. 
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) return res.status(404).json({message: "Usuario no encontrado"});
        res.json({message: "Usuario eliminado correctamente"}); // Si no tiene status envia el mensaje. si le ponemos status(204) no envia mensaje
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const {username, email, password} = req.body;

        // Utilizamos el new: true para que nos devuelva el documento actualizado
        const updatedUser = await User.findByIdAndUpdate(userId, {username, email, password}, {new: true});
        if(!updatedUser) return res.status(404).json({message: "Usuario no encontrado"});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// export const updateEmail = async (req, res, next) => {
//     try {
//         const correoId = req.params.id;
//
//         // Utilizamos el new: true para que nos devuelva el documento actualizado
//         // Utilizamos {isLeido:true} para marcar el correo como leido
//         const updatedemail = await
//         Email.findByIdAndUpdate(
//             correoId,
//             {isLeido: true},
//             {new: true}
//         )

//         if(!updateEmail) return es.status(404).json({message: "Correo no encontrado"});
//         res.status(200).json(updateEmail);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }

// }


