var express = require('express');
var router = express.Router();
const { Op } = require('sequelize')
const { isAuthenticated } = require('./users')
const { Product, Order } = require('../../sql/models')

// listing all products using pagination

router.get('', async (req, res) => {

    var limit = parseInt(req.query.limit)
    var offset = parseInt(req.query.page) * limit

    if (req.query.page === undefined || req.query.page === '') offset = 0
    if (req.query.limit === undefined || req.query.limit === '') limit = 5

    const products = await Product.findAll({ limit, offset })

    res.json({ nextPageToken: ++offset, products })
})

// searching from products

router.get('/:q', async (req, res) => {
    const products = await Product.findAll({ limit: 5, where: { title: { [Op.like]: `%${req.params.q}%` } } })
    res.json(products)
})

// creating order by user

router.post('/:productId', isAuthenticated, async (req, res) => {

    const order = await Order.create({
        userId: req.user.id,
        productId: req.params.productId
    })

    res.json(order)
})

module.exports = router;
