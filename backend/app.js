const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
// const orderRoutes = require('./routes/order');
// const subscriptionRoutes = require('./routes/subscribe');

// Initialize Express
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Capture the raw body for signature verification
  }
}));

app.set('view engine', 'ejs');
app.set('views', './views');  // Ensure views folder exists
app.use('/api/auth', authRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/subscription', subscriptionRoutes);
// app.use('/', (req, res) => {
//   res.send("API is working");
// })




app.get('/api/checkout/:paymentSessionId', (req, res) => {
  const { paymentSessionId } = req.params;
  res.render('checkout', { paymentSessionId }); 
})


// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(`mongodb+srv://expertApp:BQSWL2VO7r9tBoBF@cluster0.ni5tr.mongodb.net/highWealth?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on http://0.0.0.0:6000');
});