"use client"

// PRISMA CLIENT WAS GENERATED WHEN WE RAN 
// NPX PRISMADB PUSH SO YOU CAN USE THE VERY
// SAME USER TYPE THAT YOU DEFINED IN YOUR 
// PRISMA SCHEMA WHICH IS REALLY COOL
// import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps{
    // OPTIONAL SINCE IT MAY BE NULL
    // currentUser?: User | null;
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    console.log({currentUser})
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="py-4 border-b-[1px]">

            </div>
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;