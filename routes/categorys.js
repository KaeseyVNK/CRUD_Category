var express = require('express');
var router = express.Router();
let categorySchema = require('../schema/categorys');
const e = require('express');
router.get('/', async function(req, res, next) {
    let categorys = await categorySchema.find();
    res.send(categorys);
});
router.post('/', async function(req, res, next) {
    try {
        let body = req.body;

        let newCategory = new categorySchema({
            name: body.name,
            description: body.description,
        });
        await newCategory.save();
        res.send({
            success: true,
            data: newCategory
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
        let category = await categorySchema.findById(req.params.id);
        //let product = await productSchema.findOne({_id: req.params.id});
        res.send({
            success: true,
            data: category
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
        if (body.name) updateOBje.name = body.name;
        if (body.description) updateOBje.description = body.description;
        let updatecategory = await categorySchema.findByIdAndUpdate(req.params.id, updateOBje, {new: true});
        res.send({
            success: true,
            data: updatecategory
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
    let updatecategory = await categorySchema.findByIdAndUpdate(req.params.id, updateOBje, {new: true});
    res.send({
        success: true,
        data: updatecategory
    });
});
module.exports = router;
