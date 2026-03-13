const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendVendorNotification } = require('../utils/emailService');

// @desc    Paystack Webhook Handler
// @route   POST /api/webhooks/paystack
// @access  Public
const paystackWebhook = async (req, res) => {
  // req.body is a raw Buffer (from express.raw middleware)
  const rawBody = req.body;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    console.warn('Invalid Paystack signature received');
    return res.status(400).send('Invalid signature');
  }

  const payload = JSON.parse(rawBody);

  try {
    if (payload.event === 'charge.success') {
      const { reference, metadata } = payload.data;
      const orderId = metadata ? metadata.order_id : null;

      if (!orderId) {
        console.warn(`Webhook received for reference ${reference} but no order_id in metadata.`);
        return res.status(200).send('OK'); // Paystack requires 200 OK so it doesn't retry
      }

      // Find order
      const order = await Order.findById(orderId);
      if (!order) {
        console.warn(`Order ${orderId} not found for webhook.`);
        return res.status(200).send('OK');
      }

      // If already paid, do nothing
      if (order.paymentStatus === 'paid') {
        return res.status(200).send('OK');
      }

      // Update Order Status
      order.paymentStatus = 'paid';
      
      // Reduce stock for each product
      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          // ensure stock doesn't go below 0 if concurrent updates happened
          const newStock = Math.max(0, product.stock - item.quantity);
          product.stock = newStock;
          await product.save();
        }
      }

      await order.save(); // Save order status

      // Send Vendor Notification
      await sendVendorNotification(order);
    }

    res.status(200).send('Webhook handled successfully');

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  paystackWebhook
};
