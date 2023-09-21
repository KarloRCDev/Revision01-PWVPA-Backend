const express = require("express")
const {itemModel} = require("../models/itemModel");
const router = express.Router()

router.post('/publishItem', async (req, res) => {
    const {productID, productImage} = req.body

    try {
        if (!productImage) {
            return res.status(400).send({message: 'Debes subir una imagen...'});
        }

        const model = await itemModel.findOne({productID: productID});
        if (model) return res.status(400).send({message: 'Este código ya está registrado...'});

        itemModel(req.body).save().then(() => {
            return res.status(200).send({message: 'Producto registrado...'});
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'Ocurrió un error en el servidor.'});
    }
})

router.get('/searchItems', async (req, res) => {
    const query = req.query.queryString;
    try {
        console.log(query)
        const itemsResult = await itemModel.find({productName: {$regex: query, $options: 'i'}});
        res.status(200).json({items: itemsResult});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error en la búsqueda'});
    }
});

module.exports = router;