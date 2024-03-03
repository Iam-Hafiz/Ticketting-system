"use client"
import { useFormState } from 'react-dom';
import { deleteAcount } from "../actions"
import SubmitBtn from "@/app/_components/SubmitBtn";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { motion } from "framer-motion"
import { animationsProps } from '@/app/_lib/animations';

export default function DeleteBtn() {
    const router = useRouter()
    const initialState = { message: null, error: null };
    const [state, dispatch] = useFormState(deleteAcount, initialState);
    if(state.message?.includes("successfully")){
        setTimeout( async () => {
            const supabase = createClientComponentClient()
            const { error } = await supabase.auth.signOut()
            router.push('/login')
        }, 3000);
    }
  return (
    <motion.form action={dispatch}
    initial={animationsProps.initial}
    animate={animationsProps.animate}
    transition={animationsProps.transition}
    >
        <SubmitBtn initValue="Confirm" loadingValue={"Deleting..."}/>
        {state?.message && !state.message?.includes("successfully") && (<p className="formErrors">{state.message}</p>)}
        {state?.message && state.message?.includes("successfully") && 
            (<p className=" text-green-600 flex"> <Check color="#3e9392" />{state.message}</p>)}
        {state?.error && (<p className="formErrors">{state.error}</p>)}
    </motion.form>
  )
}
