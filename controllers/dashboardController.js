const Course = require('../models/courses');
const User = require('../models/user');

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
module.exports.renderCourseEditForm = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.render('dashboard/editCourse', { course });
}
module.exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    const findCourse = await Course.findById(id);
    if (findCourse.courseImage) {
        cloudinary.uploader.destroy(findCourse.courseImage.filename);
    }
    await Course.findByIdAndDelete(id);
    req.flash('success', 'Course Deleted!');
    res.redirect('/dashboard/teacherDashboard');
}
module.exports.editCourses = async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndUpdate(id, { ...req.body.course });
    req.flash('success', 'Course Updated!');
    res.redirect('/dashboard/teacherDashboard');
}