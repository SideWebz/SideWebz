const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.home);
router.get('/over', siteController.over);
router.get('/contact', siteController.contact);
router.get('/privacy', siteController.privacy)
router.get('/cookiebeleid', siteController.cookie);  
router.get('/algemeen', siteController.terms);

module.exports = router;
