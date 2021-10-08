const express = require('express');
const router = express.Router({ mergeParams: true });
const relearnController = require('../controllers/relearnController');

router.get('/', relearnController.index);
router.get('/courses', relearnController.courses);
router.get('/about', relearnController.about);
router.get('/contact', relearnController.contact);

module.exports = router;