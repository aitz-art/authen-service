const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('../controllers/auth.controller');

router.post('/login', auth_controller.login);
module.exports = router;
