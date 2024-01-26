"use client"
import { useFormState } from 'react-dom';
import { useState } from 'react';

// components
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";

// actions
import { updateTicket } from "../../actions";

//icons
import { Frown } from 'lucide-react';
import SubmitBtn from '@/app/_components/SubmitBtn';

export default function UpdateForm({ticket}) {
    const initialState = { message: null, errors: {} };
    const UpdateTicketWithId = updateTicket.bind(null, ticket.id);
    const [state, dispatch] = useFormState(UpdateTicketWithId, initialState);

    const [title, setTitle] = useState(ticket.title)
    const [description, setDescription] = useState(ticket.description)

  return (
    <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Add a new Ticket</h2>
      <label htmlFor="uTicketTitle">Title:</label>
      <Input
        type="text"
        id="uTicketTitle"
        name="title"
        value={title}
        onChange={(e) => { setTitle(e.target.value)}}
        autofocus
        aria-describedby="uTicketTitleErr"
      />
      <div id="uTicketTitleErr" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
      </div>
 
      <label htmlFor="uTicketBody">Description:</label>
      <Textarea
        placeholder="Describe your Ticket here."
        type="text" 
        id="uTicketBody"
        name="description"
        value={description}
        onChange={(e) => { setDescription(e.target.value)}}
        aria-describedby="uTicketBodyErr"
      />
      <div id="uTicketBodyErr" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map(error => (
              <p className="formErrors" key={error}>
                {error}
              </p>
            ))}
      </div>
      
      {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      
      <SubmitBtn initValue={"Update"} loadingValue={"Updating..."}/>
    </form>
  </div>
  )
}
