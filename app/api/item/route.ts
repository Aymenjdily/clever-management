import { OrderSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const checkValidations = OrderSchema.safeParse(body)

    if(!checkValidations.success){
        return NextResponse.json(checkValidations.error.format(), { status:401 })
    }

    const { name, price, ordersId, userId } = body

    const newItem = await prisma.items.create({
        data: {
            name: name,
            price: price,
            ordersId: ordersId,
            userId: userId,
            
        }
    })

    return NextResponse.json(newItem, { status:201 })
}