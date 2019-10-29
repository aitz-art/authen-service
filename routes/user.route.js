const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

router.get('/all', user_controller.user_find_all);
router.get('/:id', user_controller.user_find_id);
router.get('/find/:limit', user_controller.user_find_limit);
router.post('/create', user_controller.user_create);
router.post('/delete/:id', user_controller.user_delete);
router.post('/update/:id', user_controller.user_update);

module.exports = router;
