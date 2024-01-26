"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';

// icons
import { Frown, Smile } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { SignUpAction } from "../actions";
import { useRouter } from "next/navigation";
import SubmitBtn from "@/app/_components/SubmitBtn";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter()

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(SignUpAction, initialState);

    if(state.message == 'Account created successfully!'){
      setTimeout(() => {
        router.push('/verify')
      }, 1500);
    }
    
  return (
  <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Sign up</h2>
      <p><small>Fields marked with <span className=" text-red-500">*</span> are required</small></p>

      <label htmlFor="signUpFname">First name *:</label>
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

      <label htmlFor="signUpLname">Last name *:</label>
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

      <label htmlFor="signUpAge">Age:</label>
      <Input
        type="number"
        id="signUpAge"
        name="age"
        value={age}
        onChange={(e) => { setAge(e.target.value)}}
        aria-describedby="signUpAgeErr"
        autocomplete="on"
        inputmode="numeric" 
      />
      <div id="signUpAgeErr" aria-live="polite" aria-atomic="true">
        {state.errors?.age &&
          state.errors.age.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="signUpEmail">Email *:</label>
      <Input
        type="text"
        id="signUpEmail"
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value)}}
        aria-describedby="signUpEmailErr"
      />
      <div id="signUpEmailErr" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="signUpPassword">Password *:</label>
      <Input
        type="password"
        id="signUpPassword"
        name="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value)}}
        aria-describedby="signUpPasswordErr"
        autocomplete="new-password" 
      />
      <div id="signUpPasswordErr" aria-live="polite" aria-atomic="true">
        {state.errors?.password &&
          state.errors.password.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>

      {!state.message?.includes("successfully") && state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      {state.message?.includes("successfully")  && (<p className=" flex justify-center items-center text-green-500"> <Smile /> {state.message}</p>)}
      <Link href="/login" className=" text-blue-600 p-1 block mt-2 font-bold">Already have account? Sign in</Link>

      <SubmitBtn initValue={"Sign up"} loadingValue={"Wait..."}/>
    </form>
  </div>
  )
}
