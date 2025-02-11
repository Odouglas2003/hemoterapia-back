const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js")

//definir rutas
router.get("/usuario",UserController.pruebauser);

router.post("/register", UserController.register);

router.post("/login", UserController.login);






//exportar ruter
module.exports = router;