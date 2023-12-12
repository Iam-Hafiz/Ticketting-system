'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';
import supabase from '../_lib/subapase';

const LoginSchema = z.object({
    email: z.string().trim().toLowerCase().email()
        .min(5, {message: "Title must contain at most 5 character(s)" })
        .max(100, {message: "Title must contain at most 100 character(s)" }),
    password: z.string().trim().toLowerCase()
        .min(6, {message: "Description must contain at most 6 character(s)" })
        .max(100, { message: "Description must contain at most 100 character(s)" }),
    priority: z.enum(['high', 'medium', 'low']),
})

async function SignUpAction(prevState, formData) {
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
