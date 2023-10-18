import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";

export const getMenuItems = async (req, res) => {
  try {
    const menuItem = await MenuItem.find();
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// name: { type: String, required: true },
// category: { type: String, required: true },
// description: { type: String },
// image: { type: String, required: true },
// quantity: { type: Number, required: true },
// featured: { type: Boolean, default: false, required: true },
// price: { type: Number, required: true },
// createdAt: { type: Date, default: Date.now, required: true },
// updatedAt: { type: Date, default: Date.now, required: true },

export const createMenuItem = async (req, res) => {
  const menuItem = req.body;
  const newMenuItem = new MenuItem(menuItem);
  try {
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createManyMenuItems = async (req, res) => {
  const menuItems = req.body;
  console.log(menuItems);
  try {
    const newMenuItems = await MenuItem.insertMany(menuItems);
    res.status(201).json(newMenuItems);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  const _id = req.params.id;

  const item = await MenuItem.findById(_id);
  if (!item) return res.status(404).send("No menu item with that id");

  const menuItem = req.body;

  const updatedMenuItem = await MenuItem.findByIdAndUpdate(_id, menuItem, {
    new: true,
  });
  res.json(updatedMenuItem);
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No menu item with that id");
  await MenuItem.findByIdAndRemove(id);
  res.json({ message: "Menu item deleted successfully" });
};

export const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
