const Order = require('../models/Order');
const Product = require('../models/Product');
const { initializePayment } = require('../utils/paystackService');

// @desc    Checkout / Create order
// @route   POST /api/orders/checkout
// @access  Public
const checkout = async (req, res) => {
  try {
    const { customerName, phone, email, deliveryAddress, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderProducts = [];

    // Verify products and calculate total
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create pending order
    const order = await Order.create({
      customerName,
      phone,
      deliveryAddress,
      products: orderProducts,
      totalAmount,
      paymentStatus: 'pending',
      orderStatus: 'processing'
    });

    // Initialize Paystack payment
    // Amount is in kobo (multiply by 100)
    const paystackForm = {
      email: email || 'customer@example.com', // Paystack requires an email. If customer didn't provide, use a default or mandate it.
      amount: totalAmount * 100,
      metadata: {
        order_id: order._id
      }
    };

    const paystackResponse = await initializePayment(paystackForm);

    if (!paystackResponse.status) {
      return res.status(400).json({ success: false, message: paystackResponse.message });
    }

    // Save paystack reference to order
    order.paystackReference = paystackResponse.data.reference;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Checkout initialized',
      orderId: order._id,
      authorization_url: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('products.productId', 'name image');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

        if(!validStatuses.includes(orderStatus)) {
             return res.status(400).json({ success: false, message: 'Invalid order status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            { orderStatus },
            { new: true, runValidators: true }
        );

        if(!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });

    } catch (error) {
         console.error('Update order status error:', error);
         res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
  checkout,
  getOrders,
  updateOrderStatus
};
