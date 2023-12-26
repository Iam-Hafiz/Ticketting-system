'use client';
import { useState } from "react"
import { useFormState } from 'react-dom';

// icons
import { Frown } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { loginAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";

export default function page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(loginAction, initialState);

  return (
  <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Sign in:</h2>
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

      {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}

      <SubmitBtn initValue={"Sign in"} loadingValue={"Logging"}/>
    </form>
  </div>
  )
}
