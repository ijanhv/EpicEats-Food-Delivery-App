import Order from '../models/Order.js';

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    // Get order details from the request body
    const { customer, items, total } = req.body;

    // Create a new order
    const order = new Order({
      customer,
      items,
      total,
    });

    // Save the order to the database
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('items.menuItem');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the status of an order
export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a specific customer

export const getCustomerOrders = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ customer: userId }).populate('customer').populate('items.menuItem');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

