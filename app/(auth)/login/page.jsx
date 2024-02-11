'use client';
import { useState } from "react"
import { useFormState } from 'react-dom';

// icons
import { Frown } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { loginAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";
import Link from "next/link";

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(loginAction, initialState);

  return (
  <div className="centre-a-form">
    <div className="w-5/6 sm:w-4/5 lg:w-1/2">
{/*       <a href="/api/auth/login" 
      className="p-2 rounded-md m-4 font-bold inline-block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-slate-800 dark:via-indigo-800 dark:to-slate-700 dark:text-slate-300">
        Continue with Google</a> */}
      <form action={dispatch} className="dark:bg-slate-800 p-4 rounded-md bg-gray-200">
        <h2 className="font-bold text-xl my-4">Sign in</h2>
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
          autoComplete="current-password" 
        />
        <div id="loginPasswordErr" aria-live="polite" aria-atomic="true">
          {state.errors?.password &&
            state.errors.password.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
        </div>
        <Link href="/reset_password" className=" text-blue-600 p-1 block mt-2 font-bold">I forgot my password!</Link>
        <Link href="/signup" className=" text-blue-600 p-1 block mt-2 font-bold">Sign up</Link>
        {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}

        <SubmitBtn initValue={"Sign in"} loadingValue={"Logging..."}/>
      </form>
    </div>
  </div>
  )
}
