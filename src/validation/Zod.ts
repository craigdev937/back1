import { z, ZodType } from "zod";
import { ICust, IProd } from "../models/Interfaces";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const cschema: ZodType<ICust> = z.object({
    name: z.string().trim()
        .min(2, "Name must be at least 2 characters."),
    email: z.email("Invalid email address."),
    phone: z.string().regex(phoneRegex, "Invalid Number!"),
    address: z.string().trim()
        .min(5, "Address must be at least 5 characters.")
});

export const pschema: ZodType<IProd> = z.object({
    name: z.string().trim()
        .min(3, "Name must be at least 2 characters."),
    description: z.string().trim()
        .min(10, "Description must be at least 10 characters."),
    image: z.string(),
    price: z.number()
        .positive("Price must be a positive number") 
        .min(0.01, "Price must be at least 0.01"),
    customer_id: z.number()
        .positive("ID must be a positive number") 
        .min(1, "ID must be at least 1"),
});



