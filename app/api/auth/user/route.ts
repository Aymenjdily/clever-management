import { UserSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest){
    const body = await request.json()
    const checkValidations = UserSchema.safeParse(body)

    if(!checkValidations.success){
        return NextResponse.json(checkValidations.error.format(), { status:402 })
    }

    const { email, name, password, role, image } = body

    const existsUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(existsUser){
        return NextResponse.json({ error: "Account already exists" }, { status:401 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            image: image,
            password: hashedPassword,
            role: role
            //...body - simplify
        }
    })

    return NextResponse.json(newUser, { status:201 })
}