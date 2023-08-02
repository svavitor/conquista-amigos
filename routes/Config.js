const express = require('express');
const router = express.Router();

router.get("/", (request,response) => {
    response.render('config/config.pug');
});


router.post("/", (request, response) => {
    let ids = request.body.steamids.split('\r\n')
    console.log(ids);
    response.render('config/config.pug');
});

module.exports = router;