'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';
import supabase from '../_lib/subapase';
// password /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/
const SignUpSchema = z.object({
    fname: z.string().trim().toLowerCase()
        .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {message: "Please enter a valid name!" })
        .min(1, {message: "Title must contain at least 1 character(s)" })
        .max(50, {message: "Title must contain at most 50 character(s)" }),
    lname: z.string().trim().toLowerCase()
        .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {message: "Please enter a valid name" })
        .min(1, {message: "Title must contain at least 1 character(s)" })
        .max(50, {message: "Title must contain at most 50 character(s)" }),
    age: z.number({ required_error: "Age is required", invalid_type_error: "Age must be a number" })
        .lt(150, { message: "Age must be 150 at most" })
        .int().nonnegative().optional().nullable(),
    email: z.string().trim().toLowerCase().email({ message: "Invalid email address" })
        .min(5, {message: "Title must contain at least 5 character(s)" })
        .max(100, {message: "Title must contain at most 100 character(s)" }),
    password: z.string().trim().toLowerCase()
        .min(6, {message: "Description must contain at least 6 character(s)" })
        .max(100, { message: "Description must contain at most 100 character(s)" }),
})

async function SignUpAction(prevState, formData) {
    const rawFormData = Object.fromEntries(formData.entries())
    rawFormData.age = parseInt(rawFormData.age)
    console.log(rawFormData)

    const validatedFields = SignUpSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to register!',
        };
    }

    const { email, password, fname, lname, age } = validatedFields.data;
    const { data, error } = await supabase.auth.signUp({ 
          email, password,
          options: { data: { fname, lname, age } },
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        })
    
    if(!error){
        return {message: 'Account created successfully!'}
    } else {
        console.log('Supabase sign up error:', error)
        return {message: error.message} /* {message: 'Could not create account please try again!'} */
    }   
}

async function loginAction(prevState, formData) {
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = LoginSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to login!',
        };
    }

    const { email, password } = validatedFields.data;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
          
    if(!error){
        redirect('/ticket/' + id)
    } else {
        console.log('Supabase update error:', error)
        return {message: 'Could not update Ticket please try again!'}
    }   
}

export {
    loginAction,
    SignUpAction,
}
