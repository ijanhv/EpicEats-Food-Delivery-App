import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    // console.log(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, mobile });

    user.verificationToken = crypto.randomBytes(20).toString("hex");

    const savedUser = await user.save();

    console.log("New User Registered:", savedUser);

    sendVerificationEmail(savedUser.email, savedUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration Failed" });
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "patiljanhavi69@gmail.com",
      pass: "avlr wpvo ecgp basa",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "Janhavi Patil",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8800/api/user/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Set the verified property of the user to true
    // updateOne() returns an object with the status of the operation

    const result = await User.updateOne(
      { verificationToken: token },
      { verified: true, verificationToken: null }
    );
    console.log(result);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
};

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

// Login Controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    console.log(user);

    // check if the user has verified their email
    if (!user.verified) {
      return res.status(401).json({ message: "Please verify your email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch || !user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //generate a token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      secretKey
    );
    console.log(token);

    res.status(200).json({ message: "Login Successfull", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

// get user orders

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("orders").exec();
    const orders = user.orders;
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
