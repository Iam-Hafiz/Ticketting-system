import supabase from "@/app/_config/supabase";
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
    <main>
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <p><small>Created by {ticket.user_email}</small></p>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
            </div>
        </div>
    </main>
  )
}
