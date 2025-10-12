import z from "zod";

export const logInSchema = z.object({
    email: z.string("Please enter a valid email").email("Please enter a valid email"),
    password: z.string("Please enter a valid password").min(6)
})