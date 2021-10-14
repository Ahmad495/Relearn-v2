const Course = require('../models/courses');
const { cloudinary } = require('../cloudinary');

module.exports.teacherDashboard = (req, res) => {
    res.render('dashboard/teacherDashboard');
}
module.exports.studentDashboard = (req, res) => {
    res.render('dashboard/studentDashboard');
}
module.exports.renderAddCourses = (req, res) => {
    res.render('dashboard/addCourses');
}
module.exports.createCourse = async (req, res) => {
    const course = new Course(req.body.course);
    course.courseImage.url = req.file.path;
    course.courseImage.filename = req.file.filename;
    course.teacherRef = req.user._id;
    await course.save();
    req.flash('success', 'Course has been added');
    res.redirect('/dashboard/teacherDashboard');
}