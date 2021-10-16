const express = require('express');
const router = express.Router({ mergeParams: true });
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');

const dashboardController = require('../controllers/dashboardController');

const { isLoggedInTeacher, validateCourse } = require('../Middleware');

router.get('/teacherDashboard', isLoggedInTeacher, catchAsync(dashboardController.teacherDashboard));
router.get('/studentDashboard', dashboardController.studentDashboard);
router.get('/addCourses', isLoggedInTeacher, dashboardController.renderAddCourses);
router.post('/addCourses', upload.single('course[image]'), validateCourse, dashboardController.createCourse);
router.get('/courses/:id/edit', isLoggedInTeacher, catchAsync(dashboardController.renderCourseEditForm));
router.delete('/courses/:id', isLoggedInTeacher, catchAsync(dashboardController.deleteCourse));
router.put('/courses/:id', isLoggedInTeacher, catchAsync(dashboardController.editCourses));

module.exports = router;