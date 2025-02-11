// Importar dependencias y modelos
const { connection } = require("../database/connection"); // Conexión
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


// Acciones de prueba
const pruebauser = async (req, res) => {
    try {
        // Asegurarte de que la conexión está activa
        await connection();

        // Obtener todos los usuarios
        const users = await User.find();

        // Enviar los usuarios como respuesta
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// Registro de usuarios
const register = async (req, res) => {
    try {
        // Recoger datos de la petición
        let params = req.body;

        // Validar los datos recibidos
        if (!params.name || !params.email || !params.password) {
            return res.status(400).json({
                status: "error",
                message: "FALTAN DATOS POR ENVIAR",
            });
        }

        // Verificar si el usuario ya existe
        const users = await User.find({
            $or: [{ email: params.email.toLowerCase() }],
        });

        if (users.length > 0) {
            return res.status(200).json({
                status: "success",
                message: "El usuario ya existe",
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(params.password, 10);

        // Crear el objeto usuario con la contraseña encriptada
        let user_to_save = new User({
            name: params.name,
            email: params.email.toLowerCase(),
            password: hashedPassword,
            created_at: new Date(), // Fecha actual
            delete_at: null, // Asegúrate de incluir este campo
        });



        // Guardar el usuario en la base de datos
        const savedUser = await user_to_save.save();

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: savedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
        });
    }
};

const login = async (req, res) => {
    try {
        // Recoger parámetros del body
        const params = req.body;

        // Validar que los datos estén presentes
        if (!params.email || !params.password) {
            return res.status(400).json({
                status: "error",
                message: "FALTAN DATOS POR ENVIAR",
            });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email: params.email.toLowerCase() }).exec();

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        // Comprobar la contraseña
        const contre = await User.findOne({ password: params.password }).exec();
        if (!contre) {
            return res.status(401).json({
                status: "error",
                message: "Contraseña incorrecta",
            });
        }

        // Eliminar la contraseña del objeto antes de enviarlo al cliente
        const { password,created_at,delete_at, ...userWithoutPassword } = user.toObject();

        // Retornar respuesta exitosa
        return res.status(200).json({
            status: "success",
            message: "Usuario logueado correctamente",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
        });
    }
};


// Exportar acciones
module.exports = {
    pruebauser,
    register,
    login,
};
