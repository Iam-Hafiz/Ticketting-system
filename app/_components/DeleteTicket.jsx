"use client"

import { Frown, Trash2 } from "lucide-react";
import { useFormState, useFormStatus } from 'react-dom';
import { deleteTicket } from "../(tickets)/ticket/actions";
import { useRouter } from "next/navigation";

export default function DeleteTicket({ticketId}) {
  const router = useRouter()
  const initialState = { message: null, errors: null };
  const deleteTicketWithId = deleteTicket.bind(null, ticketId);
  const [state, dispatch] = useFormState(deleteTicketWithId, initialState);
  const { pending } = useFormStatus();
  if(state.message){
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
  return (
    <form action={dispatch}>
      <button aria-disabled={pending} className=" flex">
        {!pending && (<> <Trash2 /><span className="ml-1">Delete</span> </ >)}
        {pending && (<> <Trash2 /><span className="ml-1">Deletting...</span> </ >)}
      </button>
      {state.message && (<p className=" flex justify-center items-center text-green-500">{state.message}</p>)}
      {state.errors && (<p className="formErrors flex justify-center items-center"><Frown /> {state.errors}</p>)}
    </form>
  )
}
