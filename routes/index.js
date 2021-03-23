const router = require('express').Router();

//IMPORT API ROUTES
const apiRoutes = require('./api');

//CONFIGURE THE ROUTE
router.use('/api', apiRoutes);

//EXPORT THE ROUTER
module.exports = router;

