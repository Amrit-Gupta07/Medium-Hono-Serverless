import z from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()

})
export type SignupInput = z.infer<typeof signupInput>


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
    
})
export type SigninInput = z.infer<typeof signinInput>


export const createdBlogInput = z.object({
    title:z.string(),
    content:z.string(),
})
export type CreatedBlogInput = z.infer<typeof createdBlogInput>


export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id: z.string()
})
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
