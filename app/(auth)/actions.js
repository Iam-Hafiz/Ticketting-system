'use server'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

import { z } from 'zod';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// password regex /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/
// Forms validation with Zod
const SignUpSchema = z.object({
    fname: z.string().trim().toLowerCase()
        .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {message: "Please enter a valid name!" })
        .min(1, {message: "Name must contain at least 1 character(s)" })
        .max(50, {message: "Name must contain at most 50 character(s)" }),
    lname: z.string().trim().toLowerCase()
        .regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {message: "Please enter a valid name" })
        .min(1, {message: "Name must contain at least 1 character(s)" })
        .max(50, {message: "Name must contain at most 50 character(s)" }),
    age: z.number({ required_error: "Age is required", invalid_type_error: "Age must be a number" })
        .lt(150, { message: "Age must be 150 at most" })
        .gt(18, { message: "Minimum required age is 18" })
        .int().nonnegative().optional().nullable(),
    email: z.string().trim().toLowerCase().email({ message: "Invalid email address" })
        .min(5, {message: "Email must contain at least 5 character(s)" })
        .max(100, {message: "Email must contain at most 100 character(s)" }),
    password: z.string().trim().toLowerCase()
        .min(6, {message: "Password must contain at least 6 character(s)" })
        .max(100, { message: "Password must contain at most 100 character(s)" }),
})

async function SignUpAction(prevState, formData) {

    // make sure the user is not logged in first
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(sessionData?.session){
        redirect('/profil');
    }
    const rawFormData = Object.fromEntries(formData.entries())
    rawFormData.age = parseInt(rawFormData.age)

    const validatedFields = SignUpSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to register!',
        };
    }
    const { email, password, fname, lname, age } = validatedFields.data;
    const { error } = await supabase.auth.signUp({ 
          email, password,
          options: { data: { fname, lname, age } },
          emailRedirectTo: process.env.EMAIL_REDIRECT_TO_AFTER_SIGN_UP,
        })
    if(!error){
        return {message: 'Account created successfully!'}
    } else {
        console.log('Supabase sign up error:', error)
        return ({message: error.message} ?? {message: 'Could not create account please try again!'});
    }   
}

// update user meta data
async function updateProfileAction(prevState, formData) {

    // make sure the user is logged in first
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(!sessionData?.session){
        redirect('/login');
    }
    const rawFormData = Object.fromEntries(formData.entries())
    rawFormData.age = parseInt(rawFormData.age)

    const updateProfileSchema = SignUpSchema.pick({fname: true, lname: true, age: true});
    const validatedFields = updateProfileSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to update!',
        };
    }    
    const { data, error } = await supabase.auth.updateUser({
        data: validatedFields.data
    }) 
    if(!error){
        return {message: 'Updated successfully!'}
    } else {
        console.log('Supabase sign up error:', error)
        return ({message: error.message} ?? {message: 'Could not update profil please try again!'});
    }   
}

async function loginAction(prevState, formData) {

    // make sure the user is not logged in first
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(sessionData?.session){
        redirect('/profil');
    }
    const rawFormData = Object.fromEntries(formData.entries())
    const LoginSchema = SignUpSchema.pick({ email: true,  password: true});
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
        redirect('/profil')
    } else {
        console.log('Supabase update error:', error)
        return ({message: error.message} ?? {message: 'Invalid credentials!'});
    }   
}

async function updateEmailAction(prevState, formData) {
    
    // make sure the user is logged in first
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(!sessionData?.session?.user){
        redirect('/login');
    }
    const rawFormData = Object.fromEntries(formData.entries())
    const UpdateEmailSchema = SignUpSchema.pick({ email: true});
    const validatedFields = UpdateEmailSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to update!',
        };
    }
    const { email } = validatedFields.data;

    // Update logged in user email
    const { data, error } = await supabase.auth.updateUser({email}) 
    if(!error){
        return {message: "Email updated successfully!"}
    } else {
        console.log('Supabase update error:', error)
        return ({message: error.message} ?? {message: 'Invalid credentials!'});
    }    
}

// Send a password reset link to the user's email.
async function sendPasswordResetLinkAction(prevState, formData) {
    const supabase = createServerActionClient({ cookies })
    const rawFormData = Object.fromEntries(formData.entries())
    const EmailSchema = SignUpSchema.pick({ email: true});
    const validatedFields = EmailSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { email } = validatedFields.data;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.RESET_PASSWORD_LINK_CALLBACK_URL,
    }) 
    if(!error){
        return {message: `A link has been send to ${email}! Please verify your email address!`}
    } else {
        console.log('Supabase update error:', error)
        return ({message: error.message} ?? {message: 'Invalid credentials!'});
    }    
}

async function restPasswordAction(prevState, formData) {
    const supabase = createServerActionClient({ cookies })
    const rawFormData = Object.fromEntries(formData.entries())
    const restPasswordSchema = SignUpSchema.pick({ password: true});
    const validatedFields = restPasswordSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { password } = validatedFields.data;
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const { data, error } = await supabase.auth.updateUser({password}) 
    if(!error){
        return {message: "password updated successfully!"}
    } else {
        console.log('Supabase update error:', error)
        return ({message: error.message} ?? {message: 'Invalid credentials!'});
    }    
}

async function logOut() {
    const supabase = createServerActionClient({ cookies })
    const { error } = await supabase.auth.signOut() 
    if(!error){
        redirect('/login')
    } else {
        console.log('Supabase update error:', error)
       return {message: 'Could not sign out!'}
    }   
}

async function newsletterAction(prevState, formData) {
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(!sessionData?.session?.user){
        redirect('/login');
    }
    const rawFormData = Object.fromEntries(formData.entries())
    const newsletterSchema = SignUpSchema.pick({ fname: true, email: true});
    const validatedFields = newsletterSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Failed to register!',
        };
    }
    const {fname, email} = validatedFields.data;
    if(email !== sessionData?.session?.user.email){
        console.log(sessionData?.session?.user.email)
        return { message: 'This email address is not registered!' }; 
    }
    const user_id = sessionData?.session?.user.id
    const { data: record, error: err } = await supabase
    .from("newsletters")
    .select()
    .eq('user_id', user_id)
    if(record?.length){ return {message: 'Already registered!'}}

    const updated_at = new Date();
    const { error } = await supabase
    .from("newsletters")
    .insert({fname, user_email: email, user_id, updated_at})
    if(!error){
        return {message: 'Done successfully!'}
    } else {
        console.log('Supabase sign up error:', error)
        return ({message: error.message} ?? {message: 'Could not subscribe please try again!'});
    }   
}

async function unsubscribeAction(prevState, formData) {
    const supabase = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if(!sessionData?.session?.user){
        redirect('/login');
    }
    const user_id = sessionData?.session?.user.id
    const { error } = await supabase
    .from("newsletters")
    .delete()
    .eq('user_id', user_id)
    if(!error){
        return {message: 'Done successfully!'}
    } else {
        console.log('Supabase sign up error:', error)
        return ({message: error.message} ?? {message: 'Could not unsubscribe please try again!'});
    }   
}

async function deleteAcount() {
    const supabaseAuth = createServerActionClient({ cookies })
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
    if(!sessionData?.session?.user){
        redirect('/login');
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SERVICE_ROLE_SECRET
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const user_id = sessionData?.session?.user.id
    const { data, error } = await supabase.auth.admin.deleteUser(user_id)
    if(!error){
        const { data, error: err } = await supabaseAuth
        .storage
        .from('avatars')
        .remove([`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL + user_id + process.env.NEXT_PUBLIC_IMAGE_EXTENSION}`])
        if(err){ return {message: "Account deleted successfully", error: "Photo not found or could not be deleted!"}}
        return {message: "Account deleted successfully"}
    } else {
        console.log('Supabase update error:', error)
       return {message: 'Could not delete account!', error: error.message}
    } 
}

export {
    loginAction,
    SignUpAction,
    updateProfileAction,
    logOut,
    updateEmailAction,
    restPasswordAction,
    sendPasswordResetLinkAction,
    newsletterAction,
    unsubscribeAction,
    deleteAcount,
}
