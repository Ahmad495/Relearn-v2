const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Course = require('./courses');

const videoSchema = new Schema({
    videoTitle: {
        type: String,
        required: true
    },
    videoFile: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    videoDescription: {
        type: String,
        required: true
    },
    courseRef: {
        type: mongoose.Types.ObjectId, ref: 'Course'
    },
    teacherRef: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Video', videoSchema);