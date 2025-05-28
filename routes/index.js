const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.home);
router.get('/projects', siteController.projects);
router.get('/contact', siteController.contact);

module.exports = router;
