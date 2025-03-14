let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: {
        type: String,
        quantity: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);

