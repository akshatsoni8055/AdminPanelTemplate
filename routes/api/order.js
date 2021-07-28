var express = require('express');
var router = express.Router();
const { Order } = require('../../sql/models')
const { isAuthenticated } = require('./users')

router.get('', isAuthenticated, async (req, res) => {
    
    const orders = await Order.findAll({where: {userId: req.user.id} })
    res.json(orders)
})

module.exports = router;
