const express = require('express');
const router = express.Router();
const SenderController = require('../Controllers/SenderController');




router.get('/send/:phone', SenderController.send)


module.exports = router;