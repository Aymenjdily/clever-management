import { ItemSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params: { id: string } }){
    const existsItem = await prisma.items.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsItem){
        return NextResponse.json({ error: "Item not found" }, { status: 402 })
    }

    const body = await request.json()
    const checkValidations = ItemSchema.safeParse(body)

    if(!checkValidations.success){
        return NextResponse.json(checkValidations.error.format(), { status:401 })
    }

    const { name, price, ordersId, userId } = body

    const updatedItem = await prisma.items.update({
        where: {
            id: existsItem.id
        },
        data: {
            name: name,
            price: price,
            ordersId: ordersId,
            userId: userId
        }
    })

    return NextResponse.json(updatedItem, { status: 201 })
}

export async function DELETE(request: NextRequest, { params } : { params: {id: string} }){
    const existsItem = await prisma.items.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsItem){
        return NextResponse.json({ error: "Item not found" }, { status: 402 })
    }

    const deletedItem = await prisma.items.delete({
        where: {
            id: existsItem.id
        }
    })

    return NextResponse.json({ message: "Item Deleted", deletedItem }, { status:201 })
}