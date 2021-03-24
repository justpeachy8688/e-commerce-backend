//CREATE A ROUTER BY REQUIRE EXPRESS
const router = require('express').Router();

//IMPORT ALL OF OUR ROUTING FILES
const categoryRoutes = require('./category-routes');
// const productTagRoutes = require('./productTagRoutes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

//CONFIGURE THE ROUTES 
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/tag", tagRoutes);

//EXPORT ROUTER
module.exports = router;


