// NEXT AUTH CONFIG FILE

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider  from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:  [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials");
                }
                // USER DOESN'T EXIST
                const user = await prisma.user.findUnique({
                    where: { 
                        email: credentials.email, 
                    }, 
                    select: { 
                        id: true, 
                        email: true, 
                        hashPassword: true, 
                        name: true, 
                        image: true, },
                });
                // MISTAKE HOW USER IS TRYING TO LOGIN
                if(!user || !user?.hashPassword){
                    throw new Error("Invalid Credentials")
                }
                // CHECK PASSWORD USER ENTERED IS ACTUALLY CORRECT
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashPassword
                );
                if(!isCorrectPassword){
                    throw new Error("Invalid credentials");
                }
                // GIVING USER BACK TO OUR CLIENT
                return user;
            }
        })

    ],

    // WHENEVER ANY ERROR HAPPENS OR IF WE USE WEIRD TYPE OF CALLBACKS
    // IT'S GOING TO REDIRECT TO OUR SLASH PAGE WHICH IS OUR OUT PAGE
    // BECAUSE WE DONT HAVE A SPECIFIC OUT PAGE
    // WE USE THIS MAIN PAGE WITH THE NAVBAR TO SEE OUR LOGIN AND REGISTER 
    // MODELS 2:03:00
    pages: {
        signIn: '/'
    },
    // ONLY ENABLE DEBUG IF YOU ARE IN DEVELOPEMENT
    // THIS WILL HELP YOU SINCE YOU WILL SEE SOME ERRORS IN THE TERMINAL 
    // OTHERWISE YOU WILL NOT SEE
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// AUTHOPTIONS IS THE OBJECT WE CREATED
export default NextAuth(authOptions);