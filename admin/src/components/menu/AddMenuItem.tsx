import React, { useRef, useState } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useForm } from "react-hook-form";
import { menuItemSchema } from "@/schema/zodSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMenuItem } from "@/hooks/useMenuItems";
import MenuItemForm from "./MenuItemForm";

const AddMenuItem = () => {
  const { mutate: addMenuItem, isLoading } = useCreateMenuItem();

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      image: "",
      tags: [],
      featured: false,
    },
  });

  function onSubmit(values: z.infer<typeof menuItemSchema>) {
    console.log("values", values);
    addMenuItem({
      name: values.name,
      description: values.description,
      price: values.price as number,
      quantity: values.quantity as number,
      category: values.category,
      image: values.image as string,
      tags: values.tags as string[],
      featured: values.featured as boolean,
    });
  }

  return (

      <MenuItemForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        menuItem={null}
      />

  );
};

export default AddMenuItem;
