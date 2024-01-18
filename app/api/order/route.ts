import { OrderSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const checkValidations = OrderSchema.safeParse(body)

    if(!checkValidations.success){
        return NextResponse.json(checkValidations.error.format(), { status:401 })
    }

    const { title, description, total, itemsId, userId } = body

    const newOrder = await prisma.order.create({
        data: {
            title: title,
            description: description,
            total: total,
            itemsId: itemsId,
            userId: userId
            //...body - to simplify
        }
    })

    return NextResponse.json(newOrder, { status:201 })
}