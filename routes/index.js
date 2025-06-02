const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.home);
router.get('/over', siteController.over);
router.get('/contact', siteController.contact);

module.exports = router;
