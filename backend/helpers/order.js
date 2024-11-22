const OrderModel = require('../models/Order');

const generateOrderId = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `order_${timestamp}_${randomString}`;
};

const checkIfOrderExists = async (orderId) => {
  const order = await OrderModel.findOne({ order_id: orderId });
  return !!order; 
};

const generateUniqueOrderId = async () => {
  let orderId;
  let orderExists = true;

  while (orderExists) {
    orderId = generateOrderId();
    orderExists = await checkIfOrderExists(orderId);
  }

  return orderId;
};

module.exports = { generateUniqueOrderId };
