const express = require('express');
const router = express.Router({ mergeParams: true });
const dashboardController = require('../controllers/dashboardController');

const { isLoggedInTeacher } = require('../Middleware');

router.get('/teacherDashboard', isLoggedInTeacher, dashboardController.teacherDashboard);
router.get('/studentDashboard', dashboardController.studentDashboard);

module.exports = router;