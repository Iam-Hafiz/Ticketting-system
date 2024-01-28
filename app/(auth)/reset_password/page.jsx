'use client';
import { useState } from "react"
import { useFormState } from 'react-dom';

// icons
import { Frown, Smile } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { sendPasswordResetLinkAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";

export default function Page() {
    const [email, setEmail] = useState('')
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(sendPasswordResetLinkAction, initialState);

  return (
  <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Password reset:</h2>
      <label htmlFor="restPasswordEmail">Email:</label>
      <Input
        type="text"
        id="restPasswordEmail"
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value)}}
        autoFocus
        aria-describedby="restPasswordEmailErr"
      />
      <div id="restPasswordEmailErr" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>
      {state.message?.includes("A link has been send to")  && (<p className=" flex justify-center items-center text-green-500"> <Smile /> {state.message}</p>)}
      {state.message && !state.message?.includes("A link has been send to") && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      <SubmitBtn initValue={"Submit"} loadingValue={"Submiting..."}/>
    </form>
  </div>
  )
}
