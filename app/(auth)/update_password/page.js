"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';
import { motion } from "framer-motion"

// icons
import { Frown, Smile } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { restPasswordAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";
import { useRouter } from "next/navigation";
import { animationsProps } from "@/app/_lib/animations";

export default function Page() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(restPasswordAction, initialState);
    
    if(state.message?.includes('successfull!')){
      setTimeout(() => {
        router.push('/profil')
      }, 2000);
    }

  return (
  <motion.div className="centre-a-form"
  initial={animationsProps.initial}
  animate={animationsProps.animate}
  transition={animationsProps.transition}
  >
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">What would you like your new password to be?</h2>
      <label htmlFor="loginPassword">Password:</label>
      <Input
        type="password"
        id="loginPassword"
        name="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value)}}
        aria-describedby="loginPasswordErr"
        autocomplete="current-password" 
      />
      <div id="loginPasswordErr" aria-live="polite" aria-atomic="true">
        {state.errors?.password &&
          state.errors.password.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      {state.message?.includes("successfully")  && 
      (<p className=" flex justify-center items-center text-green-500"> <Smile /> {state.message}</p>)}
      {state.message && !state.message?.includes("successfully") && 
      (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      <SubmitBtn initValue={"Submit"} loadingValue={"Submiting..."}/>
    </form>
  </motion.div>
  )
}
