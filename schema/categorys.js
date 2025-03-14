let mongoose = require('mongoose');

//Tạo một schema cho obj category gồm name, description, timestamp
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        quantity: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);
