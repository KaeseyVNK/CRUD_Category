var express = require('express');
var router = express.Router();
let productSchema = require('../schema/products');
const e = require('express');

router.get('/', async function(req, res, next) {
    let products = await productSchema.find();
    res.send(products);
});
router.post('/', async function(req, res, next) {
    try {
        let body = req.body;

        let newProduct = new productSchema({
            name: body.name,
            price: body.price ? body.price : 1000,
            quantity: body.quantity ? body.quantity : 10,
            description: body.description,
            category: body.category,
        });

        await newProduct.save();
        res.send({
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        let product = await productSchema.findById(req.params.id);
        res.send({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});
router.put('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updateOBje = {}
        if (body.name) 
            updateOBje.name = body.name;
        if (body.price) 
            updateOBje.price = body.price;
        if (body.quantity) 
            updateOBje.quantity = body.quantity;
        if (body.description) 
            updateOBje.description = body.description;
        if (body.category) 
            updateOBje.category = body.category;
        let updateproduct = await productSchema.findByIdAndUpdate(req.params.id, updateOBje, {new: true});
        res.send({
            success: true,
            data: updateproduct
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});
router.delete('/:id', async function(req, res, next) {
    let body = req.body;
    let updateOBje = {}
    
        updateOBje.isDeleted = true;
    let updateproduct = await productSchema.findByIdAndUpdate(req.params.id, updateOBje, {new: true});
    res.send({
        success: true,
        data: updateproduct
    });
});
module.exports = router;
