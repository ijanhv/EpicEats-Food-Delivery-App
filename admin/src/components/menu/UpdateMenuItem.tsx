import React, { useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useForm } from "react-hook-form";
import { menuItemSchema } from "@/schema/zodSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMenuItem, useUpdateMenuItem } from "@/hooks/useMenuItems";
import MenuItemForm from "./MenuItemForm";
import { Button } from "../ui/button";

interface UpdateMenuItemProps {
  menuItem: MenuItem;
}

const UpdateMenuItem: React.FC<UpdateMenuItemProps> = ({ menuItem }) => {
  const { mutate: updateMenuItem, isLoading } = useUpdateMenuItem();

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      quantity: menuItem.quantity,
      category: menuItem.category as string,
      image: menuItem.image,
      tags: menuItem.tags as string[],
      featured: menuItem.featured,
    },
  });

  function onSubmit(values: z.infer<typeof menuItemSchema>) {
    console.log("values", values);
    updateMenuItem({
      _id: menuItem._id,
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
    <Sheet>
      <SheetTrigger className="w-full text-left mt-2">
        <div className="px-2 py-1.5 w-full rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            Edit
        </div>
      </SheetTrigger>

      <div className=" ">
        <MenuItemForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          menuItem={menuItem}
        />
      </div>
    </Sheet>
  );
};

export default UpdateMenuItem;
