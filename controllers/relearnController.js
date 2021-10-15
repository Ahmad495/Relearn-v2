const Course = require('../models/courses');

module.exports.index = async (req, res) => {
    const courses = await Course.find({});
    res.render('relearn/index', { courses });
}
module.exports.courses = (req, res) => {
    res.render('relearn/courses');
}
module.exports.about = (req, res) => {
    res.render('relearn/about');
}
module.exports.contact = (req, res) => {
    res.render('relearn/contact');
}