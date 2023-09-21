const mongoose = require('mongoose').default;

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('[LOG] Conexión exitosa a la base de datos...');
    } catch (error) {
        console.error(error);
        console.log('[ERROR] Error al conectar con la base de datos...');
    }
};

module.exports = connectDatabase;
