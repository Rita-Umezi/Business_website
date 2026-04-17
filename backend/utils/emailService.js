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

const sendSubscriptionWelcomeEmail = async (userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    const mailOptions = {
      from: `"Rayblend Treats" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Welcome to the Rayblend Treats Community! 🌟`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #ea580c;">Welcome to Our Health Journey!</h2>
          <p>Hi there,</p>
          <p>Thank you for subscribing to Rayblend Treats! We're excited to have you join our community built around wholesome, delicious eating.</p>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #ffedd5;">
            <h3 style="margin-top: 0; color: #ea580c;">💡 Today's Food Rule: Balance is Key</h3>
            <p style="margin-bottom: 0;">Eating well isn't about strict limitations—it's about feeling great and having more energy. Try to include a source of protein, healthy fats, and fiber-rich greens in every meal. Need a quick, balanced snack? Our signature parfaits perfectly combine fresh fruits, protein-packed yogurt, and energy-boosting nuts!</p>
          </div>

          <p>We'll be sure to update you with any new special menus, sweet offers, and more expert health tips.</p>
          <br/>
          <p>Stay vibrant,</p>
          <p><strong>- The Rayblend Treats Team</strong></p>

          <hr style="border: none; border-top: 1px solid #eee; margin-top: 40px; margin-bottom: 20px;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
             If you wish to stop receiving these emails, you can 
             <a href="${baseUrl}/api/subscribe/unsubscribe?email=${encodeURIComponent(userEmail)}" style="color: #ea580c; text-decoration: underline;">unsubscribe here</a>.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
};

module.exports = { sendVendorNotification, sendSubscriptionWelcomeEmail };
