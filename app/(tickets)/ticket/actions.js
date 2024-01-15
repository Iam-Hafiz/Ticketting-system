'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'

// Server Component
import { z } from 'zod';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

const FormSchema = z.object({
    title: z.string().trim().toLowerCase()
        .min(10, {message: "Title must contain at most 10 character(s)" })
        .max(100, {message: "Title must contain at most 100 character(s)" }),
    description: z.string().trim().toLowerCase()
        .min(20, {message: "Description must contain at most 20 character(s)" })
        .max(1000, { message: "Description must contain at most 1000 character(s)" }),
})

async function createTicket(prevState, formData) {

    /*const rawFormData = { title: formData.get('title'), description: formData.get('description'), priority: formData.get('priority'),}; */
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = FormSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to Create Ticket!.',
        };
    }
    const { title, description } = validatedFields.data; 
    const supabaseAuth = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
    if(sessionError){
        retrun ({message: "Please sign in first!"});
    }
    const user_id = sessionData.session?.user.id;
    const user_email = sessionData?.session?.user?.email;
    const user_fname = sessionData?.session?.user?.user_metadata?.fname;
    const user_lname = sessionData?.session?.user?.user_metadata?.lname;
    const { data, error } = await supabaseAuth
        .from("tickets")
        .insert({ title, description, assign: "IT Technician", 
                  status: "Open", priority: "Low", user_id, 
                  user_fname, user_lname, user_email })
    if(!error){

        // Revalidate the cache for the Tickets page and redirect the user.
        revalidatePath('/')
        redirect('/')
    }
    if(error){
        console.log('Supabase insert error:', error)
        return {message: 'Could not create Ticket, please log in then try again!'}
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
    const { title, description } = validatedFields.data;
    const supabaseAuth = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
    if(sessionError){
        retrun ({errors: "Please sign in first!"});
    }
    const updated_at = new Date();
    const {data, error } = await supabaseAuth
        .from("tickets")
        .update({title, description, updated_at})
        .eq('id', id)
    if(!error){
        redirect('/ticket/' + id)
    } else {
        console.log('Supabase update error:', error)
        return {errors: 'Could not update Ticket please try again!'}
    }   
}

async function updateSelectValues(data) {
    let dataSchema
    if(data.priority){
        dataSchema = z.object({ priority: z.enum(['High', 'Medium', 'Low']) })
    } else if(data.assign){
        dataSchema = z.object({ assign: z.enum(['AI Engineer', 'IT Technician', 'Network administrator']) })
    } else if(data.status){
        dataSchema = z.object({ status: z.enum(['Open', 'Solved', 'Closed']) })
    } else {
        return {message: 'Invalid field!'};
    }
    const validatedData = dataSchema.safeParse(data);
    if (!validatedData.success) {
        return {message: 'Invalid value!'};
    }
    const supabaseAuth = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
    if(sessionError){
        retrun ({message: "Please sign in first!"});
    }
    const updated_at = new Date();
    const {data: updateData, error } = await supabaseAuth
        .from("tickets")
        .update({...validatedData.data, updated_at})
        .eq('id', data.id)
    if(!error){

        // Revalidate the cache for the Tickets home page.
        revalidatePath('/')
    } else {
        console.log('Supabase update error:', error)
        return {message: 'Failed! please try again!'}
    }   
}

async function deleteTicket(id, prevState, formData) {
  const supabase = createServerActionClient({ cookies })
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if(!sessionData?.session || sessionError){
    return {errors: " Please sign in first!"};
  }
  const {error} = await supabase
    .from("tickets")
    .delete()
    .eq('id', id)
  if(!error){
    revalidatePath('/');
    redirect('/')
  } else {
    return ({errors: " Could not delete the Ticket!"});
  }
}

export {
    createTicket,
    updateTicket,
    updateSelectValues,
    deleteTicket,
}
