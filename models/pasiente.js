const { Schema, model } = require("mongoose");

const colaboradorSchema = new Schema({
    id: { type: Number, unique: true },
    dni: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    n_ficha: { type: String, unique: true },
    n_obra_social: { type: String, default: null },
    imunos: { type: String, default: null },
    created_at: { type: Date, required: true, default: Date.now },
    delete_at: { type: Date }
});

module.exports = model("Colaborador", colaboradorSchema, "pacientes");
