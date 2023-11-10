let router = require('express').Router();




router
      .get('/', (req, res) => {
        return res.send({
            status: 'success',
            message: "Admin API is Live"
        })
    });

module.exports = router;



