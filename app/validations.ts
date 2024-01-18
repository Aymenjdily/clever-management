import { z } from 'zod'

export const OrderSchema = z.object({
    title: z.string().min(3, "Order title is required").max(255),
    description: z.string().min(10, "Order description is required").max(4500).optional(),
})