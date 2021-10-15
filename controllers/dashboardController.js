const Course = require('../models/courses');
const { cloudinary } = require('../cloudinary');

module.exports.teacherDashboard = async (req, res) => {
    const teacherId = req.user._id;
    const courses = await Course.find({ teacherRef: teacherId });
    res.render('dashboard/teacherDashboard', { courses });
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