let router = require('express').Router();
const passport = require('passport');




router
    .get('/', (req, res) => {
        return res.send({
            status: 'success',
            message: "Admin Account Api"
        })
    });

module.exports = router;
