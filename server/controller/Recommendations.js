import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import User from "../models/User.js";

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBOt6J7Tyg8kuo8zYwtKFw455MLCmHoVXI";

export const getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;

    const userOrders = await Order.find({ customer: id });

    const menuItems = await MenuItem.find();

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: `
              These are the items the user has previously ordered:
              on their previous orders:
              ${userOrders}

              and these are the items available in the menu:
              ${menuItems.map((item) => item.name).join(", ")}

              find the relavant items and recommend them to the user.
             Give the result as an array of ids of the recommended items.
             
          `,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const idsArray = result.response.candidates[0].content.parts[0].text.match(/"(\w+)"/g)?.map(id => id.replace(/"/g, ''));

    console.log(idsArray);

    const recommendedItems = await MenuItem.find({ _id: { $in: idsArray } });

    res.status(200).json(recommendedItems);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json([]); // Sending empty array in case of error
  }
};
