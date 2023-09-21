const {buyerModel} = require("../models/buyerModel");
const {sellerModel} = require('../models/sellerModel');
const bcrypt = require('bcrypt');
const router = require('express').Router();

async function handleLogin(req, res, userModel) {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({error: 'Ingrese los campos requeridos...'});
        }

        const user = await userModel.findOne({userEmail: email.toLowerCase()});

        if (!user) {
            return res.status(400).json({error: 'Correo o contraseña incorrecta...'});
        }

        const validAuth = await bcrypt.compare(password, user.userPassword);


        if (!validAuth) {
            return res.status(400).json({error: 'Correo o contraseña incorrecta...'});
        }

        return res.status(200).json({model: {...user.toObject()}, message: 'Inicio de sesión exitoso...'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'});
    }
}

router.post('/buyerLogin', async (req, res) => {
    await handleLogin(req, res, buyerModel);
});

router.post('/sellerLogin', async (req, res) => {
    await handleLogin(req, res, sellerModel);
});

module.exports = router;