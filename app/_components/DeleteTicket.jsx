"use client"

import { Frown } from "lucide-react";
import { useFormState } from 'react-dom';
import { deleteTicket } from "../(tickets)/ticket/actions";
import { useRouter } from "next/navigation";
import DeleteBtn from "./DeleteBtn";

export default function DeleteTicket({ticketId}) {
  const router = useRouter()
  const initialState = { errors: null };
  const deleteTicketWithId = deleteTicket.bind(null, ticketId);
  const [state, dispatch] = useFormState(deleteTicketWithId, initialState);
  if(state.message){
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
  return (
    <form action={dispatch}>
      <DeleteBtn />
      {state.errors && (<p className="formErrors flex justify-center items-center"><Frown /> {state.errors}</p>)}
    </form>
  )
}
