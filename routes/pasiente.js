const express = require("express");
const router = express.Router();
const ColaController = require("../controllers/pasiente.js")

//definir rutas
router.get("/pasiente",ColaController.pruebaColab);

router.post("/register", ColaController.register);

router.put("/editar/:id", ColaController.editColab); 

router.post("/eliminar/:id", ColaController.Eliminar);



//exportar ruter
module.exports = router;