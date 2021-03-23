//CREATE A ROUTER BY REQUIRE EXPRESS
const router = require('express').Router();

//IMPORT ALL OF OUR ROUTING FILES
const categoryRoutes = require('./categoryRoutes');
const productTagRoutes = require('./productTagRoutes');
const productRoutes = require('./productRoutes');
const tagRoutes = require('./tagRoutes');

//CONFIGURE THE ROUTES 
router.use("/category", categoryRoutes);
router.use("/productTag", productTagRoutes);
router.use("/product", productRoutes);
router.use("/tag", tagRoutes);

//EXPORT ROUTER
module.exports = router;


