"use client"
import { useFormState } from 'react-dom';
import { useState } from 'react';

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";

// actions
import { updateTicket } from "../../actions";
import { Frown } from 'lucide-react';

export default function UpdateForm({ticket}) {
    const initialState = { message: null, errors: {} };
    const UpdateTicketWithId = updateTicket.bind(null, ticket.id);
    const [state, dispatch] = useFormState(UpdateTicketWithId, initialState);

    const [title, setTitle] = useState(ticket.title)
    const [description, setDescription] = useState(ticket.description)
    const [priority, setPriority] = useState('low')

  return (
    <div className="centre-a-form">
    <form action={dispatch} className="form">
      <h2 className="font-bold text-lg">Add a new Ticket:</h2>
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
      
      <label htmlFor="uTicketPriority">Priority:</label>
      <Select>
         <SelectTrigger className="w-[8rem]" name="priority" id="uTicketPriority">
           <SelectValue placeholder="Priority" />
         </SelectTrigger>
         <SelectContent>
           <SelectItem value="low">Low</SelectItem>
           <SelectItem value="medium">Medium</SelectItem>
           <SelectItem value="high">High</SelectItem>
         </SelectContent>
      </Select>

      {state.message && (<p className="formErrors flex justify-center items-center"><Frown /> {state.message}</p>)}
      
      <Button
      /*   disabled={isLoading} */
        className="submit-btn"
      >
         Update
{/*            {!isLoading && ("Update Ticket")}
        {isLoading && ("Updatting")} */}
      </Button>
    </form>
  </div>
  )
}
