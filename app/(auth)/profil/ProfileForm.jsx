"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';

// icons
import { Frown, Smile, X } from "lucide-react";

// components
import { Input } from "@/app/_components/ui/input";
import { updateProfileAction } from "../actions";
import SubmitBtn from "@/app/_components/SubmitBtn";
import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

export default function ProfileForm({user_metadata}) {
    const [fname, setFname] = useState(user_metadata?.fname)
    const [lname, setLname] = useState(user_metadata?.lname)
    const [age, setAge] = useState(user_metadata?.age)

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateProfileAction, initialState);

  return (
    <form action={dispatch} className="dark:bg-slate-800 px-2 rounded-md bg-gray-200">
      <label htmlFor="profileFname">First name:</label>
      <Input
        type="text"
        id="profileFname"
        name="fname"
        value={fname}
        onChange={(e) => { setFname(e.target.value)}}
        aria-describedby="profileFnameErr"
        autoFocus
      />
      <div id="profileFnameErr" aria-live="polite" aria-atomic="true">
        {state.errors?.fname &&
          state.errors.fname.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>
          
      <label htmlFor="profileLname">Last name:</label>
      <Input
        type="text"
        id="profileLname"
        name="lname"
        value={lname}
        onChange={(e) => { setLname(e.target.value)}}
        aria-describedby="profileLnameErr"
      />
      <div id="profileLnameErr" aria-live="polite" aria-atomic="true">
        {state.errors?.lname &&
          state.errors.lname.map(error => (
            <p className="formErrors" key={error}>
              {error}
            </p>
          ))}
      </div>
          
      <label htmlFor="profileAge">Age:</label>
      <Input
        type="number"
        id="profileAge"
        name="age"
        value={age}
        onChange={(e) => { setAge(e.target.value)}}
        aria-describedby="profileAgeErr"
        autocomplete="on"
        inputmode="numeric" 
      />
      <div id="profileAgeErr" aria-live="polite" aria-atomic="true">
        {state.errors?.age &&
          state.errors.age.map(error => (
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
    </form>
  )
}

