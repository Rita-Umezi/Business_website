const crypto = require('crypto');
const axios = require('axios');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendVendorNotification } = require('../utils/emailService');

// Helper to send WhatsApp via CallMeBot
const sendWhatsApp = async (order) => {
  const number = process.env.WHATSAPP_NUMBER; // Format: 23480...
  const apikey = process.env.WHATSAPP_API_KEY;

  if (!number || !apikey) {
    console.warn('WhatsApp credentials missing. Skipping notification.');
    return;
  }

  const message = `🚀 *New Order Alert!*%0A%0A*Name:* ${order.customerName}%0A*Amount:* ₦${order.totalAmount.toLocaleString()}%0A*Items:* ${order.products.length}%0A*Address:* ${order.deliveryAddress}%0A%0AView details in your dashboard!`;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${number}&text=${message}&apikey=${apikey}`;
    await axios.get(url);
    console.log('WhatsApp notification sent successfully');
  } catch (error) {
    console.error('WhatsApp notification failed:', error.message);
  }
};

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

  const payload = JSON.parse(rawBody.toString());

  try {
    if (payload.event === 'charge.success') {
      const { reference, metadata } = payload.data;
      const orderId = metadata ? metadata.order_id : null;

      if (!orderId) {
        console.warn(`Webhook received for reference ${reference} but no order_id in metadata.`);
        return res.status(200).send('OK'); 
      }

      // Find order
      const order = await Order.findById(orderId).populate('products.productId');
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
          const newStock = Math.max(0, product.stock - item.quantity);
          product.stock = newStock;
          await product.save();
        }
      }

      await order.save(); // Save order status

      // Send Notifications
      await sendVendorNotification(order); // Email
      await sendWhatsApp(order); // WhatsApp
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
