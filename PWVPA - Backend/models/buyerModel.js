const mongoose = require('mongoose').default
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const buyerSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    userPassword: {type: String, required: true},
    userPhone: {type: Number, required: true},
    userRole: {type: String, required: true}
})

const buyerModel = mongoose.model("buyer", buyerSchema)

const validateBuyer = (data) => {
    const Schema = joi.object({
        firstName: joi.string().min(1).required().label("Nombre"),
        lastName: joi.string().min(1).required().label("Apellido"),
        email: joi.string().min(1).email().required().label("Correo"),
        password: passwordComplexity().min(1).required().label("Contraseña"),
        phone: joi.number().min(1).required().label("Celular"),
    })
    return Schema.validate(data)
}

module.exports = {buyerModel, validateBuyer}