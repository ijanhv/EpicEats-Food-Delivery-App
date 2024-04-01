import Service from "../models/Service.js";

export const callForUtensils = async (req, res) => {
  try {
    const { userId, location } = req.body;
    const service = new Service({
      userId,
      location,
      serviceType,
      status: "recieved",
    });
    const result = await service.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCallForUtensils = async (req, res) => {
  try {
    // populate the user field give it name user

    const service = await Service.find().populate(
      "userId",
      "name email mobile"
    );

    const formattedService = service.map((service) => ({
      _id: service._id,
      user: service.userId,
      location: service.location,
    }));

    res.status(200).json(formattedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getAllTodaysServices

export const getTodaysService = async (req, res) => {
  try {
    const service = await Service.find({
      createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
    }).populate("userId", "name email mobile");

    const formattedService = service.map((service) => ({
      _id: service._id,
      user: service.userId,
      location: service.location,
    }));

    res.status(200).json(formattedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//   } catch (error) {
