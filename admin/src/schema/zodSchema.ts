"use client";

import * as z from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(2),
  image: z.string().min(2).optional(),
  quantity: z.number().optional(),
  featured: z.boolean().optional(),
  veg:  z.boolean().optional(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item)),
  price: z.number().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});