import React, { useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { UploadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { UseFormReturn } from "react-hook-form";
import { menuItemSchema } from "@/schema/zodSchema";
import z from "zod";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface MenuItemFormProps {
  form: UseFormReturn<z.infer<typeof menuItemSchema>>;
  onSubmit: (values: z.infer<typeof menuItemSchema>) => void;
  isLoading: boolean;
  menuItem: MenuItem | null;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  form,
  onSubmit,
  isLoading,
  menuItem,
}) => {
  const items = [
    {
      id: "popular",
      label: "Poplular",
      value: "popular",
    },
    {
      id: "veg",
      label: "Vegetarian",
      value: "veg",
    },
    {
      id: "non-veg",
      label: "Non-Vegetarian",
      value: "non-veg",
    },
    {
      id: "todays-special",
      label: "Today's Special",
      value: "todays-special",
    },

    {
      id: "chef-special",
      label: "Chef's Special",
      value: "chef-special",
    },
    {
        id: "none",
        label: "None",
        value: "none",
    }
  ] as const;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [itemImage, setItemImage] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = "";
    const randomString = Math.random().toString(36).substring(6);
    const imageRef = ref(
      storage,
      `images/${randomString + "_" + fileObj.name}`
    );
    const res = await uploadBytes(imageRef, fileObj);
    const resImage = await getDownloadURL(imageRef);
    setItemImage(true);

    form.setValue("image", resImage);
  };

  return (
    <SheetContent className="dark:border-l border-gray-700 pt-10 overflow-y-auto scrollbar scrollbar-w-0 ">
      <SheetHeader>
        <SheetTitle className="text-2xl">
          {menuItem ? "Edit" : "Add"}
        </SheetTitle>
      </SheetHeader>
      <SheetDescription>
        {menuItem ? "Edit menu Item" : "Add a new Menu Item"}
      </SheetDescription>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 mt-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pav Bhaji" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:border-gray-700">
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="south-indian">South Indian</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Pav Bhaji" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Image</FormLabel>
                <FormControl>
                  <div className="relative flex gap-3">
                    {itemImage && (
                      <Avatar>
                        <AvatarImage src={field.value} alt="Menu Item Image" />
                      </Avatar>
                    )}
                    <Input placeholder="Menu Item Image" {...field} />
                    <div className="absolute z-10  text-white bg-black rounded-full cursor-pointer right-2 dark:bg-white dark:text-black top-2">
                      <input
                        style={{ display: "none" }}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                      />
                      <UploadIcon
                        className="p-[4px]"
                        type="file"
                        onClick={() => inputRef.current?.click()}
                      />
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="veg"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">Vegetarian</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}

                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">Featured</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                    //   defaultValue={field.value?.toString()}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="40"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Tags</FormLabel>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rs 50"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="outline" type="submit">
            <Loader className={isLoading ? "animate-spin" : "hidden"} />
            Add Menu Item
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default MenuItemForm;
