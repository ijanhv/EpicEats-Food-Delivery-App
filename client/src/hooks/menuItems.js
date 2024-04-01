// create hook for getting menu items http://localhost:8800/api/menu/get

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/menu/get`);
        setMenuItems(response.data);
      } catch (error) {
        console.log("error getting menu items", error);
      }
    };
    getMenuItems();
  }, []);

  return menuItems;
};


