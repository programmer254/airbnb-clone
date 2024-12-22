import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try{
        //THIS IS THE ABOVE SESSION WE CREATED WITH 
        // THE OUT OPTIONS
        // THIS IS HOW WE GET OUR SESSION IN OUR
        // SERVER COMPONENTS
        const session = await getSession()
        // WE WILL USE THAT SESSION TO GET THE CURRENT 
        // USER
        if(!session?.user?.email){
            // THIS SESSION DOES NOT EXIST
            return null;
        }
        // FINDING CURRENT USER
        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        });
        
        if(!currentUser){
            return null;
        }
        return {
            // MODIFYING TO PREVENT HYDRATION DUE TO DYNAMIC 
            // OBJECT IN SERVER SIDE. CHANGING DATES
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    }catch(error: any){
        
        // NOT THROWING ANY ERRORS BECAUSE THIS IS 
        // NOT AN API CALL
        // THIS IS A DIRECT COMMUNICATION WITH THE 
        // DATABASE THRU OUR SERVER COMPONENT
        // SO NOT THROWING AN ERROR TO UNNECESSARY BREAK IT
        // WE'D USE CONDITIONS TO FIX THAT
        return null;
    }
}