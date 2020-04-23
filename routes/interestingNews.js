const express = require('express');

const interestingNewsController = require('../controllers/interestingNewsController');

const router = express.Router();

/* GET users listing. */

router.post('/view_all',interestingNewsController.view_all);

module.exports = router;