//CREATE A ROUTER FROM EXPRESS
const router = require('express').Router();
//IMPORT THE MODELS
const { Category, Product, ProductTag, Tag } = require("../../models");


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll()
        res.status(200).json(categoryData)
        // res.status(200).send("Is this working?")
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findByPk(req.params.id, {
        include: [{ model: Product }]
    })
        .then(idResponse => {
            if (!idResponse) {
                res.status(404).json({ message: 'No category found with this id!' });
                return;
            }
            res.json(idResponse).status(200)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/', async (req, res) => {
    // create a new category
    try {
        const categoryData = await Category.create(req.body)
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
        const categoryData = await Category.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err)
    }
});


//EXPORT THE ROUTER
module.exports = router;