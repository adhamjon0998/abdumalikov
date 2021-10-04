const { Schema, model } = require('mongoose')

const adhamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = model('adham', adhamSchema)