const {buyerModel, validateBuyer} = require("../models/buyerModel");
const {sellerModel, validateSeller} = require("../models/sellerModel");
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const router = require('express').Router()

const checkName = (firstName, lastName) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return (!nameRegex.test(firstName) || !nameRegex.test(lastName))
}

router.post('/buyerRegister', (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body
    const validation = validateBuyer(req.body)

    if (validation.error) return res.status(400).send({error: validation.error.details[0].message || validation.error.message})

    buyerModel.findOne({$or: [{userEmail: email.toLowerCase()}, {userPhone: phone}]}).then((buyerResponse) => {
        if (buyerResponse) {
            if (buyerResponse.userEmail === email.toLowerCase()) return res.status(400).send({error: 'Este correo ya está registrado...'})
            if (buyerResponse.userPhone === parseInt(phone)) return res.status(400).send({error: 'Este número ya está registrado...'})
        }

        if (checkName(firstName, lastName)) return res.status(400).send({message: 'El nombre y apellido solo puede contener letras.'});

        return bcrypt.genSalt(Number(process.env.SALT)).then((salt) => {
            return bcrypt.hash(password, salt).then((encryptedPassword) => {
                return new buyerModel({
                    userID: crypto.randomUUID(),
                    userFirstName: firstName,
                    userLastName: lastName,
                    userEmail: email.toLowerCase(),
                    userPassword: encryptedPassword,
                    userPhone: phone,
                    userRole: "buyer"
                }).save().then(() => {
                    return res.status(201).send({message: 'Usuario registrado con éxito...'});
                })
            })
        })
    }).catch((error) => {
        console.error(error);
        res.status(500).send({message: 'Error interno de servidor...'});
    })
})

router.post('/sellerRegister', (req, res) => {
    const {firstName, lastName, email, password, phone, ruc} = req.body
    const validation = validateSeller(req.body)

    if (validation.error) return res.status(400).send({error: validation.error.details[0].message || validation.error.message})

    sellerModel.findOne({$or: [{userEmail: email.toLowerCase()}, {userPhone: phone}, {userRUC: ruc}]}).then((sellerResponse) => {
        if (sellerResponse) {
            if (sellerResponse.userEmail === email.toLowerCase()) return res.status(400).send({error: 'Este correo ya está registrado...'})
            if (sellerResponse.userPhone === parseInt(phone)) return res.status(400).send({error: 'Este número ya está registrado...'})
            if (sellerResponse.userRUC === parseInt(ruc)) return res.status(400).send({error: 'Este RUC ya está registrado...'})
        }

        if (checkName(firstName, lastName)) return res.status(400).send({message: 'El nombre y apellido solo puede contener letras.'});

        return bcrypt.genSalt(Number(process.env.SALT)).then((salt) => {
            return bcrypt.hash(password, salt).then((encryptedPassword) => {
                return new sellerModel({
                    userID: crypto.randomUUID(),
                    userFirstName: firstName,
                    userLastName: lastName,
                    userEmail: email.toLowerCase(),
                    userPassword: encryptedPassword,
                    userPhone: phone,
                    userRUC: ruc,
                    userRole: "seller"
                }).save().then(() => {
                    return res.status(201).send({message: 'Usuario registrado con éxito...'});
                })
            })
        })
    }).catch((error) => {
        console.error(error);
        res.status(500).send({message: 'Error interno de servidor...'});
    })
})

module.exports = router