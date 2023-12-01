"use client"

import supabase from "@/app/_lib/subapase";
import { useRouter } from "next/navigation"
import { useState } from "react"

// components
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { SelectPriority } from "./SelectPriority";
import { createTicket } from "../actions";


export default function Form() {
    const router = useRouter();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)
  
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
      <form action={createTicket} className="form">
        <h2 className="font-bold text-lg">Add a new Ticket:</h2>
        <label htmlFor="cTicketTitle">Title:</label>
        <Input
          type="text"
          id="cTicketTitle"
          name="title"
          value={title}
          onChange={(e) => { setTitle(e.target.value)}}
        />
  
        <label htmlFor="cTicketBody">Description:</label>
        <Textarea
          placeholder="Describe your Ticket here."
          type="text" 
          id="cTicketBody"
          name="description"
          value={body}
          onChange={(e) => { setBody(e.target.value)}}
        />
        
        <label htmlFor="cTicketPriority">Priority:</label>
        <SelectPriority
          type="select" 
          name="priority" 
          id="cTicketPriority"
          onChange={(e) => { setPriority(e.target.value)}}  
        />

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

    