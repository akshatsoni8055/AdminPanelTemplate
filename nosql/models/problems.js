const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    companies: {
        type: Array,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },

})

module.exports = new mongoose.model("Problem", problemSchema)