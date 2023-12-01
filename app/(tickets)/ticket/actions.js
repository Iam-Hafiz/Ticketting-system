'use server'
import supabase from '@/app/_lib/subapase';
import { redirect } from 'next/navigation';

// Server Component
import { z } from 'zod';

// ticket validation schema
const FormSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
});

// Action
export default async function createTicket(formData) {

    //Extract the data from formData
    const rawFormData = {
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
    };
      console.log(rawFormData);
    const {title, description, priority} = FormSchema.parse(rawFormData);
    const {data, error } = await supabase.from("tickets")
        .insert({title, description, priority, user_email: "add@d.com"})
        .select()
    if (error) {
        console.log('supa insert error:', error)
        redirect('/');
    } 
}