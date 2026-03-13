const nodemailer = require('nodemailer');

const sendVendorNotification = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let productDetails = '';
    order.products.forEach(p => {
      // populate needs to be handled or we need product names in order
      productDetails += `- Product ID: ${p.productId}, Qty: ${p.quantity}, Price: ${p.price}\n`;
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.VENDOR_EMAIL,
      subject: `New Order Received - ${order._id}`,
      text: `
Hello Vendor,

You have received a new order!

Order Details:
Order ID: ${order._id}
Customer Name: ${order.customerName}
Phone: ${order.phone}
Delivery Address: ${order.deliveryAddress}
Total Amount: NGN ${order.totalAmount}

Products:
${productDetails}

Please process this order.

Thank you,
Your Store System
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Vendor notified for order ${order._id}`);
  } catch (error) {
    console.error('Failed to send vendor notification:', error);
  }
};

module.exports = { sendVendorNotification };
