import Order from "../models/Order.js";
import User from "../models/User.js";
import { format } from "date-fns";
import axios from "axios";

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

    await User.updateOne({ _id: customer }, { $push: { orders: order._id } });

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
    const orders = await Order.find()
      .populate("customer")
      .populate("items.menuItem");

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

    console.log(order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const postData = {
      appId: 13626,
      appToken: "DmRzoBvBvY8GSptayK40E1",
    };

    let notificationMessage = "";

    switch (status) {
      case "preparing":
        notificationMessage = `Hi, your order is being prepared. 😋`;
        break;
      case "completed":
        notificationMessage = `Hi, your order is ready for pickup. 🚀`;
        break;
    }

    if (notificationMessage) {
      postData.title = "Epic Eats";
      postData.body = notificationMessage;
      postData.dateSent = new Date().toLocaleString(); // Use the current date and time

      // Send the POST request to the specified URL
      await axios.post(
        "https://app.nativenotify.com/api/notification",
        postData
      );
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
    const orders = await Order.find({ customer: userId })
      .populate("customer")
      .populate("items.menuItem")
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const getDashboardDetails = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (total, order) => total + order.total,
      0
    );

    const customers = await Order.distinct("customer");
    const totalCustomers = customers.length;

    const salesPerDay = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      if (salesPerDay[date]) {
        salesPerDay[date] += order.total;
      } else {
        salesPerDay[date] = order.total;
      }
    });
    const dates = Object.keys(salesPerDay);
    const totalSales = dates.reduce(
      (total, date) => total + salesPerDay[date],
      0
    );
    const averageSale = totalSales / dates.length;

    res.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      averageSale,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const getRevnueByDay = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     const salesPerDay = {};
//     orders.forEach((order) => {
//       const date = order.createdAt.toISOString().split('T')[0];
//       if (salesPerDay[date]) {
//         salesPerDay[date] += order.total;
//       } else {
//         salesPerDay[date] = order.total;
//       }
//     });

//     const dayOfWeekData = {};
//     for (let i = 0; i < 7; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const day = date.toLocaleDateString('en-US', { weekday: 'long' });
//       const dateString = date.toISOString().split('T')[0];
//       dayOfWeekData[day] = salesPerDay[dateString] || 0;
//     }

//     res.json(dayOfWeekData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export const getRevnueByDay = async (req, res) => {
  try {
    const orders = await Order.find();

    // Create an object to store revenue data for each day of the week
    const dayRevenue = {
      "Sunday": 0,
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
    };

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
      dayRevenue[dayOfWeek] += order.total;
    });

    // Create an array of objects in the specified format
    const data = Object.keys(dayRevenue).map((day) => ({
      name: day,
      total: dayRevenue[day],
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRevenueByMonth = async (req, res) => {
  try {
    const orders = await Order.find();
    
    // Create an object to store revenue data for each month
    const monthRevenue = {
      "Jan": 0,
      "Feb": 0,
      "Mar": 0,
      "Apr": 0,
      "May": 0,
      "Jun": 0,
      "Jul": 0,
      "Aug": 0,
      "Sep": 0,
      "Oct": 0,
      "Nov": 0,
      "Dec": 0,
    };

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('en-US', { month: 'short' });
      monthRevenue[month] += order.total;
    });

    // Create an array of objects in the specified format
    const data = Object.keys(monthRevenue).map((month) => ({
      name: month,
      total: monthRevenue[month],
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}