const express = require('express');
const router = express.Router();
const {getPrivateData} = require('../controller/private');
const {protect} = require('../middleware/auth')

router.get('/Authorized',protect,getPrivateData);

module.exports = router;