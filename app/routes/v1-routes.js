let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'Welcome to Giftshop api V1',
        message: "Version 1"
    });
});


let adminRoutes = require('../modules/admin/api/v1/routes');
let customerRoutes = require('../modules/customer/api/v1/routes');


router.use('/admin', adminRoutes);
router.use('/customer', customerRoutes);


module.exports = router;
