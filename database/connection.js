const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Hemoterapia"); // Configuración limpia
        console.log("Connected to MongoDB: Hemoterapia");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};

module.exports = { connection };
