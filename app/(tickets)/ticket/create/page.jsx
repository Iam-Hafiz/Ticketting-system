"use client"

import supabase from "@/app/_lib/subapase";
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as React from "react"
import { useFormState } from 'react-dom';

// components
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { createTicket } from "../actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../_components/ui/select"
import { Frown } from "lucide-react";

export default function Form() {
    const router = useRouter();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createTicket, initialState);
    const handleSubmit = async (e)  => {

/*       //console.log("supa:", supabase);
      e.preventDefault()
      setIsLoading(true);
  
      const newTicket = { title, body, priority, user_email: 'dooney@k.dev' }
      const {error} = await supabase
        .from('tickets')
        .insert(newTicket)
        console.log('supa: ', supabase) */
    }

  return (
    <div className="centre-a-form">
      <form action={dispatch} className="form">
        <h2 className="font-bold text-lg">Add a new Ticket:</h2>
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
            state.errors.title.map(error => (
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
            state.errors.description.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
        </div>
        
        <label htmlFor="cTicketPriority">Priority:</label>
        <Select
          type="select" 
          name="priority" 
          id="cTicketPriority"
          onChange={(e) => { setPriority(e.target.value)}}  
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Ticket priority"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}

        <Button
          disabled={isLoading}
          className="submit-btn"
        >
          {!isLoading && ("Create Ticket")}
          {isLoading && ("Creating")}
        </Button>
      </form>
    </div>
  )
}


/*         <input 
            type="text" 
            id="cTicketTitle"
            value={title}
            onChange={(e) => { setTitle(e.target.value)}}
        /> */

        /*         <input 
            type="text" 
            id="cTicketBody"
            value={body}
            onChange={(e) => { setBody(e.target.value)}}
        /> */

    