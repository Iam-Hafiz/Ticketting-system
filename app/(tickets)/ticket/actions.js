'use server'
import supabase from '@/app/_lib/subapase';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Server Component
import { z } from 'zod';

const FormSchema = z.object({
    title: z.string().trim().toLowerCase()
        .min(10, {message: "Title must contain at most 10 character(s)" })
        .max(100, {message: "Title must contain at most 100 character(s)" }),
    description: z.string().trim().toLowerCase()
        .min(20, {message: "Description must contain at most 20 character(s)" })
        .max(200, { message: "Description must contain at most 200 character(s)" }),
    priority: z.enum(['high', 'medium', 'low']),
})

async function createTicket(prevState, formData) {

    /*const rawFormData = { title: formData.get('title'), description: formData.get('description'), priority: formData.get('priority'),}; */
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = FormSchema.safeParse(rawFormData);

    //console.log('Zod cus err:', validatedFields.error);
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to Create Ticket!.',
        };
    }

    const { title, description, priority } = validatedFields.data;
    const {data, error } = await supabase
        .from("tickets")
        .insert({ title, description, priority, user_email: "add@d.com"})

    if(!error){
        // Revalidate the cache for the Tickets page and redirect the user.
        revalidatePath('/')
        redirect('/')
    }
    if(error){
        console.log('Supabase insert error:', error)
        return {message: 'Could not create Ticket please try again!'}
    }         
}

async function updateTicket(id, prevState, formData) {
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = FormSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to update Ticket!.',
        };
    }

    const { title, description, priority } = validatedFields.data;
    const {data, error } = await supabase
        .from("tickets")
        .update({title, description, priority, user_email: "add@d.com"})
        .eq('id', id)

    if(!error){
        redirect('/ticket/' + id)
    } else {
        console.log('Supabase update error:', error)
        return {message: 'Could not update Ticket please try again!'}
    }   
}

async function deleteTicket({ id }) {

}

export {
    createTicket,
    updateTicket,
    deleteTicket,
}
