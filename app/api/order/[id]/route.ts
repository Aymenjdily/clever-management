import { OrderSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params: { id: string } }){
    const existsOrder = await prisma.order.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsOrder){
        return NextResponse.json({ error: "The Order not found" }, { status: 402 })
    }

    const body = await request.json()
    const checkValidations = OrderSchema.safeParse(body)

    if(!checkValidations.success){
        return NextResponse.json(checkValidations.error.format(), { status:401 })
    }

    const { title, description, status, itemsId } = body

    const updatedOrder = await prisma.order.update({
        where: {
            id: existsOrder.id
        },
        data: {
            title: title,
            description: description,
            status: status,
            itemsId: itemsId
        }
    })

    return NextResponse.json(updatedOrder, { status: 201 })
}

export async function DELETE(request: NextRequest, { params } : { params: {id: string} }){
    const existsOrder = await prisma.order.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsOrder){
        return NextResponse.json({ error: "The Order not found" }, { status: 402 })
    }

    const deletedOrder = await prisma.order.delete({
        where: {
            id: existsOrder.id
        }
    })

    return NextResponse.json({ message: "Order Deleted", deletedOrder }, { status:201 })
}