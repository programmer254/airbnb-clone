// CREATING A SAFE USER
import {User} from "@prisma/client"

// REPLACING THE VALUES IN SCHEMA.PRISMA
//  WITH OUR CUSTOM ONES IN GETCURRENTUSER.TS
export type SafeUser = Omit<
User,
"createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string,
    updateAt: string,
    emailVerified: string | null
}