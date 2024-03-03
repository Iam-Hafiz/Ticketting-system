"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"

// icons
import { Frown, Smile, X } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { updateEmailAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";
import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";
import { animationsProps } from "@/app/_lib/animations";

export default function UpdateEmail({user_email}) {
    const router = useRouter()
    const [email, setEmail] = useState(user_email)
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateEmailAction, initialState);
    if(state.message?.includes('successfully')){
        router.push('/verify')
    }
  return (
    <motion.form action={dispatch} className="dark:bg-slate-800 px-2 rounded-md bg-gray-200"
    initial={animationsProps.initial}
    animate={animationsProps.animate}
    transition={animationsProps.transition}
    >
      <label htmlFor="loginEmail">Email:</label>
      <Input
        type="text"
        id="loginEmail"
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value)}}
        autoFocus
        aria-describedby="loginEmailErr"
      />
      <div id="loginEmailErr" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      {!state.message?.includes("successfully") && state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      {state.message?.includes("successfully")  && (<p className=" flex justify-center items-center text-green-500"> <Smile /> {state.message}</p>)}
          
      <DialogFooter>
        <DialogClose className="px-2 flex items-center mr-auto hover:text-red-500">
          <X /> <span>Close</span>
        </DialogClose>
        <SubmitBtn initValue={"Save changes"} loadingValue={"Saving..."}/>
      </DialogFooter>
    </motion.form>
  )
}

