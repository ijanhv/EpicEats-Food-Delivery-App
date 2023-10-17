import Order from '../models/Order.js';
import User from '../models/User.js';
import { format } from "date-fns";


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

    await User.updateOne(
      { _id: customer },
      { $push: { orders: order._id } }
    );

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
    
    // Format the date and time in each order
    const formattedOrders = orders.map((order) => {
      const formattedCreatedAtDate = format(order.createdAt, "dd MMM yyyy");
      const formattedCreatedAtTime = format(order.createdAt, "hh:mm a");

      return {
        ...order._doc,
        createdAtDate: formattedCreatedAtDate,
        createdAtTime: formattedCreatedAtTime,
      };
    });

    res.status(200).json(formattedOrders);
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


export const getTodaysOrders = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Set the start and end times for today
    currentDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: currentDate,
        $lte: endOfDay,
      },
    })
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("items.menuItem");

    // Format the date and time in each order
    const formattedOrders = orders.map((order) => {
      const formattedCreatedAtDate = format(order.createdAt, "dd MMM yyyy");
      const formattedCreatedAtTime = format(order.createdAt, "HH:mm:ss a");

      return {
        ...order._doc,
        createdAtDate: formattedCreatedAtDate,
        createdAtTime: formattedCreatedAtTime,
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

