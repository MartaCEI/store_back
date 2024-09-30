import multer from "multer";
import path from 'path';

// opción 1  mínima
// export const upload = multer({dest: 'public/uploads/'})

// opción 2 personalizada
// export const storage = multer.diskStorage({
//     destination: function (req, fille, cb) {
//         // aqui definimos donde subimos los archivoa
//         cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         // aqui definimos el nombre de nustro upload
//         // v2.1 guardar el archivo con el nombre original
//         // cb(null, file.originalname);

//         // v2.2 Generar un nombre único más la extensión
//         const extension = path.extname(file.originalname)
//         const uniqueNumber = Date.now() + Math.round(Math.random()*1E9);
//         // ej: "avatar-unixTimeStamp-655466764.png"
//         cb(null, `${file.fieldname}-${uniqueNumber}${extension}`)
//     }
// });

// opción 3 personalizada y mas bonita ej: "avatar-unixTimeStamp-655466764.png"
export const storage = multer.diskStorage({
    destination: function (req, fille, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname)
        const uniqueSuffix = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        // ej: "avatar-unixTimeStamp-655466764.png"
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
    }
});

export const upload = multer({storage:storage});