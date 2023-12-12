"use client"
import { useState } from "react"
import * as React from "react"
import { useFormState, useFormStatus } from 'react-dom';

// icons
import { Frown } from "lucide-react";

// components
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { loginAction } from "../actions";

export default function page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(loginAction, initialState);
    const { pending } = useFormStatus();

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
        onChange={(e) => { setTitle(e.target.value)}}
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
        onChange={(e) => { setTitle(e.target.value)}}
        autoFocus
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

      <Button
        aria-disabled={pending}
        className="submit-btn"
      >
        {!pending && ("Sign in")}
        {pending && ("Logging")}
      </Button>
    </form>
  </div>
  )
}
