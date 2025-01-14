// import  bcrypt from 'bcrypt';
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';
import  bcrypt  from 'bcrypt';

export async function POST(
    request: Request
){
    const body = await request.json();
    const{
        email,
        name,
        password
    } = body;

    const hashPassword = await bcrypt.hash(password, 12);

    // WE ARE STORING BELOW TO THE DB
    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashPassword
        }
    })
    
    return NextResponse.json(user)

    // NOW ALL ROUTES SHOULD BE READY
}