const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

// Product.belongsToMany(Tag, {
//     through: {
//         model: ProductTag,
//         unique: false
//     },
// })

module.exports = { Category, Product, ProductTag, Tag };