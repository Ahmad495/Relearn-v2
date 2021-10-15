const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');

// const imageSchema = new Schema({
//     url: String,
//     filename: String
// });

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseImage: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    courseDescription: {
        type: String,
        required: true
    },
    teacherRef: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Course', courseSchema);