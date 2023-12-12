"use client"
import { useState } from "react"
import * as React from "react"
import { useFormState, useFormStatus } from 'react-dom';

// icons
import { Frown, Smile } from "lucide-react";

// components
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SignUpAction } from "../actions";

export default function SignUp() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(SignUpAction, initialState);
    const { pending } = useFormStatus();

  return (
  <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Sign up:</h2>
      <p><small>Fields marked with <span className=" text-red-500">*</span> are required</small></p>

      <label htmlFor="signUpFname">First name:</label>
      <Input
        type="text"
        id="signUpFname"
        name="fname"
        value={fname}
        onChange={(e) => { setFname(e.target.value)}}
        aria-describedby="signUpFnameErr"
        autoFocus
      />
      <div id="signUpFnameErr" aria-live="polite" aria-atomic="true">
        {state.errors?.fname &&
          state.errors.fname.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="signUpLname">Last name:</label>
      <Input
        type="text"
        id="signUpLname"
        name="lname"
        value={lname}
        onChange={(e) => { setLname(e.target.value)}}
        aria-describedby="signUpLnameErr"
      />
      <div id="signUpLnameErr" aria-live="polite" aria-atomic="true">
        {state.errors?.lname &&
          state.errors.lname.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="loginAge">Age:</label>
      <Input
        type="number"
        id="loginAge"
        name="age"
        value={age}
        onChange={(e) => { setAge(e.target.value)}}
        aria-describedby="loginAgeErr"
        autocomplete="on"
        inputmode="numeric" 
      />
      <div id="loginAgeErr" aria-live="polite" aria-atomic="true">
        {state.errors?.age &&
          state.errors.age.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="loginEmail">Email:</label>
      <Input
        type="text"
        id="loginEmail"
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value)}}
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
        autocomplete="new-password" 
      />
      <div id="loginPasswordErr" aria-live="polite" aria-atomic="true">
        {state.errors?.password &&
          state.errors.password.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      {!state.message?.includes("successfully") &&(<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      {state.message?.includes("successfully")  && (<p className=" flex justify-center items-center text-green-500"> <Smile /> {state.message}</p>)}

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
