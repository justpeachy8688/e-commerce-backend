//CREATE A ROUTER FROM EXPRESS
const router = require('express').Router();
//IMPORT THE MODELS
const { Category, Product } = require("../../models");


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll(
            {
                include: [{ model: Product }]
            },
        )
        res.status(200).json(categoryData)
        // res.status(200).send("Is this working?")
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', (req, res) => {
    // FIND ONE CATEGORY BY IT'S ID VALUE
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
    // CREATE A NEW CATEGORY
    try {
        const categoryData = await Category.create(req.body)
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // UPDATE A CATEGORY BY IT's ID VALUE
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
    // DELETE A CATEGORY BY IT'S ID VALUE
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