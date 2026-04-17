const Subscriber = require('../models/Subscriber');
const { sendSubscriptionWelcomeEmail } = require('../utils/emailService');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if user already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: 'This email is already subscribed! 🌟' });
    }

    // Save to DB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send the welcome email
    await sendSubscriptionWelcomeEmail(email);

    res.status(201).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while subscribing. Please try again.' });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send('<h3>Email is required to unsubscribe.</h3>');
    }

    const subscriber = await Subscriber.findOneAndDelete({ email });
    
    res.status(200).send(`
      <div style="text-align: center; font-family: sans-serif; padding: 50px;">
        <h2 style="color: #ea580c;">Unsubscribed Successfully</h2>
        <p>You will no longer receive emails from Rayblend Treats at <strong>${email}</strong>.</p>
        <p>We're sorry to see you go! You can always rejoin us from our website.</p>
      </div>
    `);
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).send('<h3>An error occurred. Please try again later.</h3>');
  }
};

module.exports = {
  subscribe,
  unsubscribe
};
