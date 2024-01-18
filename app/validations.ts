import { z } from 'zod'

export const OrderSchema = z.object({
    title: z.string().min(3, "Order title is required").max(255),
    description: z.string().min(10, "Order description is required").max(4500).optional(),
})

export const UserSchema = z.object({
    name: z.string().min(3, "Name is required").max(15),
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password is required"),
    role: z.string().min(0, "Role is required").optional()
})

export const LoginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(3, "Password is required"),
})