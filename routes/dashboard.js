const express = require('express');
const router = express.Router({ mergeParams: true });
const { storage1, storage2 } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage: storage1 });
const uploadVideo = multer({ storage: storage2 });
const catchAsync = require('../utils/catchAsync');

const dashboardController = require('../controllers/dashboardController');

const { isLoggedInTeacher, validateCourse, validateCourseEdit } = require('../Middleware');

router.get('/teacherDashboard', isLoggedInTeacher, catchAsync(dashboardController.teacherDashboard));
router.get('/studentDashboard', dashboardController.studentDashboard);
router.get('/addCourses', isLoggedInTeacher, dashboardController.renderAddCourses);
router.post('/addCourses', upload.single('course[image]'), validateCourse, catchAsync(dashboardController.createCourse));
router.get('/courses/:id/edit', isLoggedInTeacher, catchAsync(dashboardController.renderCourseEditForm));
router.delete('/courses/:id', isLoggedInTeacher, catchAsync(dashboardController.deleteCourse));
router.put('/courses/:id', upload.single('course[image]'), isLoggedInTeacher, validateCourseEdit, catchAsync(dashboardController.editCourses));
router.get('/addVideos', isLoggedInTeacher, catchAsync(dashboardController.renderAddVideoForm));
router.post('/addVideos', uploadVideo.single('videos[videoFile]'), isLoggedInTeacher, catchAsync(dashboardController.createVideo));
router.delete('/video/:videoId', isLoggedInTeacher, catchAsync(dashboardController.deleteVideo));

module.exports = router;