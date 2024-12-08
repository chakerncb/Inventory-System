const express = require('express');
const app = express();
// const env = require('dotenv').config();
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../views/index.html'));
});

module.exports = router;