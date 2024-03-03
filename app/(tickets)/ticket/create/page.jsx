"use client"
import { useState } from "react"
import { useFormState } from 'react-dom';
import { motion } from "framer-motion"

// components
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { createTicket } from "../actions";
import SubmitBtn from "../../../_components/SubmitBtn";

// icons
import { Frown } from "lucide-react";
import { animationsProps } from "@/app/_lib/animations";
import { TermsCheckBox } from "@/app/_components/TermsCheckBox";

export default function Form() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createTicket, initialState);

  return (
    <motion.div className="centre-a-form"
    initial={animationsProps.initial}
    animate={animationsProps.animate}
    transition={animationsProps.transition}
    >
      <form action={dispatch} className="form">
        <h2 className="font-bold text-lg">Add a new Ticket</h2>
        <label htmlFor="cTicketTitle">Title:</label>
        <Input
          type="text"
          id="cTicketTitle"
          name="title"
          value={title}
          onChange={(e) => { setTitle(e.target.value)}}
          autoFocus
          aria-describedby="cTicketTitleErr"
        />
        <div id="cTicketTitleErr" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors?.title.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
        </div>
  
        <label htmlFor="cTicketBody">Description:</label>
        <Textarea
          placeholder="Describe your Ticket here."
          type="text" 
          id="cTicketBody"
          name="description"
          value={body}
          onChange={(e) => { setBody(e.target.value)}}
          aria-describedby="cTicketBodyErr"
        />
        <div id="cTicketBodyErr" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors?.description.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
        </div>

        {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
        <TermsCheckBox />
        <SubmitBtn initValue={"Create Ticket"} loadingValue={"Creating..."}/>
      </form>
    </motion.div>
  )
}


    