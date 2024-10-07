const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments');
const Cart = require('../models/Carts');
const ObjectId = mongoose.Types.ObjectId
const mongoose = require('mongoose')
//token
const verifyToken = require('../middleware/verifyToken');

//post payment inform to db
router.post('/', async (req, res) => {
    const payment = req.body;
    try{
        const paymentRequest = await Payment.create(payment);

        //delete cart after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id:{$in: cartIds}});

        res.status(200).json({paymentRequest});

    } catch (error){
        res.status(404).json({message: error.message})
    }
})

module.exports = router