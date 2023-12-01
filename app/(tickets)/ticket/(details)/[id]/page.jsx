import supabase from "@/app/_lib/subapase";
import { notFound } from "next/navigation"

async function getTicket(id){
   const { data: ticket, error } = await supabase
       .from('tickets')
       .select()
       .eq('id', id)
       .single()
   if(error){
       return notFound()
   }
   return ticket;
}

// dynamic meta data
export async function generateMetadata({params}){
    const ticket = await getTicket(params.id);
    return {
      title: `${ticket.title || 'Ticket' } | HelpDesk }`,
      description: ticket.body,
    };
}

export default async function page({params}) {
    const ticket = await getTicket(params.id)
  return (
    <div>
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <div className="my-2 shadow-sm rounded-md py-2 px-4 relative overflow-hidden bg-sky-100">
            <h3>{ticket.title}</h3>
            <p><small>Created by {ticket.user_email}</small></p>
            <p>{ticket.description}</p>
            <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
            </div>
        </div>
    </div>
  )
}
