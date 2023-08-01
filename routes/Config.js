const express = require('express');
const router = express.Router();

router.get("/", (request,response) => {
    response.render('config/config.pug');
});

module.exports = router;