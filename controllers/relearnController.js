const Course = require('../models/courses');
const Video = require('../models/videos');

module.exports.index = async (req, res) => {
    const courses = await Course.find({});
    res.render('relearn/index', { courses });
}
module.exports.courses = async (req, res) => {
    const courses = await Course.find({});
    res.render('relearn/courses', { courses });
}
module.exports.about = (req, res) => {
    res.render('relearn/about');
}
module.exports.contact = (req, res) => {
    res.render('relearn/contact');
}
module.exports.videos = async (req, res) => {
    const { id } = req.params;
    const courses = await Course.findById(id).populate('videoRef');
    res.render('relearn/videos', { courses });
    // res.send(courses);
}