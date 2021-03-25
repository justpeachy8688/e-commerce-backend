//CREATE A ROUTER FROM EXPRESS
const router = require('express').Router();
//IMPORT THE MODELS
const { Category, Product, ProductTag, Tag } = require("../../models");

// The `/api/products` endpoint

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll(
            {
                include: [{ model: Tag }, { model: Category }]
            }
        )
        res.status(200).json(productData);
    } catch (err) {
        res.status(400).json(err)
    }
});

// FIND A SINGLE PRODUCT BY IT'S 'ID'
router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id,
            {
                include: [{ model: Category }, { model: Tag }]
            },
        );

        if (!productData) {
            res.status(404).json({ message: 'No product found with this id!' });
            return;
        }

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE NEW PRODUCT
router.post('/', (req, res) => {
    /* req.body should look like this...
    {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
    }
    */
    Product.create(req.body)
        .then((product) => {
            // IF THERES PRODUCT TAGS, WE NEED TO CREATE PAIRINGS TO BULK CREATE IN THE ProductTag MODEL
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // IF NOT PRODUCT TAGS, JUST RESPOND
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
    // UPDATE PRODUCT DATA
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            // FIND ALL ASSOCIATED TAGS FROM ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // GET A LIST OF CURRENT TAG ID's
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // CREATE FILTERED LIST OF NEW TAG_ID's
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // FIGURE OUT WHICH ONES TO REMOVE
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // RUN BOTH ACTIONS
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', async (req, res) => {
    // DELETE ONE PRODUCT BY IT'S ID VALUE
    try {
        const productData = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!productData) {
            res.status(404).json({ message: "No product with this id!" })
            return;
        }

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//EXPORT THE ROUTER
module.exports = router;