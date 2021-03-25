//CREATE A ROUTER FROM EXPRESS
const router = require('express').Router();
//IMPORT THE MODELS
const { Product, Tag, ProductTag } = require("../../models");


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // FIND ALL TAG's
    try {
        const tagData = await Tag.findAll(
            {
                include: [{ model: Product }]
            },
        )
        res.status(200).json(tagData)
        // res.status(200).send("Is this working?")
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // FIND A SINGLE TAG BY IT'S ID
    try {
        const tagData = await Tag.findByPk(req.params.id,
            {
                include: [{ model: Product }]
            }
        )

        if (!tagData) {
            res.status(404).json({ message: 'No tag found with this id!' })
            return;
        }

        res.status(200).json(tagData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    // CREATE A NEW TAG
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:id', async (req, res) => {
    // UPDATE A TAG'S NAME BY IT's ID VALUE
    try {
        const tagData = await Tag.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            })
        if (!tagData) {
            res.status(404).json({ message: 'No Tag found with that ID.' });
            return;
        }
        res.status(200).json(tagData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
    // DELETE ON TAG BY IT"S ID VALUE
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!tagData) {
            res.status(404).json({ message: "No tag found with this id!" })
            return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//EXPORT THE ROUTER
module.exports = router;