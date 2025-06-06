const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactRateLimiter } = require('../middleware/contactRateLimiter');

router.get('/', contactController.showForm);
router.post('/', contactRateLimiter, contactController.handleForm);

module.exports = router;
