//CREATE A ROUTER FROM EXPRESS
const router = require('express').Router();
//IMPORT THE MODELS
const { Category, Product, ProductTag, Tag } = require("../../models");


// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
});

router.post('/', (req, res) => {
    // create a new tag
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

//EXPORT THE ROUTER
module.exports = router;