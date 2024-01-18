"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';

// Components
import SubmitBtn from "./SubmitBtn";
import { newsletterAction } from "../(auth)/actions";
import { Input } from './ui/input'
import { Frown, Smile } from "lucide-react";

export default function Newsletter({fname, email}) {
    const [emails, setEmail] = useState(email)
    const [fnames, setFname] = useState((fname?.charAt(0).toUpperCase() + fname?.slice(1)) ?? '')
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(newsletterAction, initialState);
  return (
    <form action={dispatch}>
        <div>
            <label htmlFor="newsletter-firstname" className="pt-2 pb-1">First name::</label>
            <Input
              type="text"
              id="newsletter-firstname"
              name="fname"
              value={fnames}
              onChange={(e) => { setFname(e.target.value)}}
              aria-describedby="newsletter-firstnameErr"
            />
            <div id="newsletter-firstnameErr" aria-live="polite" aria-atomic="true">
              {state.errors?.fname &&
                state.errors.fname.map(error => (
                  <p className="formErrors" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </div>
        <div>
            <label htmlFor="newsletter-email" className="pt-2 pb-1"> E-mail:</label>
            <Input
              type="text"
              id="newsletter-email"
              name="email"
              value={emails}
              onChange={(e) => { setEmail(e.target.value)}}
              aria-describedby="newsletter-emailErr"
            />
            <div id="newsletter-emailErr" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map(error => (
                  <p className="formErrors" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </div>
        {state.message && !state.message?.includes('successfully') && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
        {state.message?.includes('successfully') && (<p className="flex justify-center items-center text-green-600"><Smile /> {state.message}</p>)}
        <SubmitBtn initValue="Submit" loadingValue="Saving..."/>
    </form>
  )
}
