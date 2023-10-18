"use client";

import * as z from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image: z.string().min(2).max(50),
  quantity: z.number(),
  featured: z.boolean(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item)),
  price: z.number(),
});
