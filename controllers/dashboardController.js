const Course = require('../models/courses');
const User = require('../models/user');
const Video = require('../models/videos');

const { cloudinary } = require('../cloudinary');

module.exports.teacherDashboard = async (req, res) => {
    const teacherId = req.user._id;
    const courses = await Course.find({ teacherRef: teacherId });
    const videos = await Video.find({ teacherRef: teacherId });
    res.render('dashboard/teacherDashboard', { courses, videos });
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
    const findCourse = await Course.findById(id).populate('videoRef');
    if (findCourse.courseImage) {
        cloudinary.uploader.destroy(findCourse.courseImage.filename);
    }
    if (findCourse.videoRef) {
        for (let video of findCourse.videoRef) {
            cloudinary.uploader.destroy(video.videoFile.filename, { resource_type: 'video' });
        }
    }
    await Course.findByIdAndDelete(id);
    req.flash('success', 'Course Deleted!');
    res.redirect('/dashboard/teacherDashboard');
}
module.exports.editCourses = async (req, res) => {
    const { id } = req.params;
    if (!req.file) {
        await Course.findByIdAndUpdate(id, { ...req.body.course });
        req.flash('success', 'Course Updated!');
        res.redirect('/dashboard/teacherDashboard');
    } else {
        const findCourse = await Course.findById(id);
        if (findCourse.courseImage) {
            cloudinary.uploader.destroy(findCourse.courseImage.filename);
            findCourse.courseImage.url = req.file.path;
            findCourse.courseImage.filename = req.file.filename;
            await findCourse.save();
            req.flash('success', 'Course Updated!');
            res.redirect('/dashboard/teacherDashboard');
        }
    }
}
module.exports.renderAddVideoForm = async (req, res) => {
    const teacherId = req.user._id;
    const courses = await Course.find({ teacherRef: teacherId });
    res.render('dashboard/addVideo', { courses });
}
module.exports.createVideo = async (req, res) => {
    const { videosTitle, videosDescription, courseId } = req.body.videos;
    const courseFind = await Course.findById(courseId);
    const video = new Video
        (
            { videoTitle: videosTitle, videoDescription: videosDescription, courseRef: courseId }
        );
    video.videoFile.url = req.file.path;
    video.videoFile.filename = req.file.filename;
    video.teacherRef = req.user._id;
    courseFind.videoRef.push(video);
    await video.save();
    await courseFind.save();
    req.flash('success', 'Video Added!');
    res.redirect('/dashboard/teacherDashboard');
}
module.exports.deleteVideo = async (req, res) => {
    const { videoId } = req.params;
    const findVideo = await Video.findById(videoId);
    if (findVideo.videoFile) {
        cloudinary.uploader.destroy(findVideo.videoFile.filename, { resource_type: 'video' });
    }
    await Course.findOneAndUpdate({ videoRef: videoId }, { $pull: { videoRef: videoId } });
    await Video.findByIdAndDelete(videoId);
    req.flash('success', 'Video Deleted!');
    res.redirect('/dashboard/teacherDashboard');
}