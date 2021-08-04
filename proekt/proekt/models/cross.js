const {Schema, model} = require('mongoose')

const Cross = new Schema({
    model: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    }
})

module.exports = model('Cross', Cross)