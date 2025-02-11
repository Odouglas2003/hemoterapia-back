const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    delete_at: { type: Date },
});

module.exports = model("User", userSchema, "user"); // Nombre correcto de la colección
