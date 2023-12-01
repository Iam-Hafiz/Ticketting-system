"use client"

import { Button } from "@/app/_components/ui/button";
import { SelectPriority } from "../../create/SelectPriority";
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";
import { updateTicket } from "../../actions";
import supabase from "@/app/_lib/subapase";

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

export default async function Update({ params }) {
    const ticket = await getTicket(params.id)
    const UpdateTicketWithId = updateTicket.bind(null, ticket.id); 
    return (
     <div className="centre-a-form">
       <form action={UpdateTicketWithId} className="form">
         <h2 className="font-bold text-lg">Add a new Ticket:</h2>
         <label htmlFor="uTicketTitle">Title:</label>
         <Input
           type="text"
           id="uTicketTitle"
           name="title"
           value={ticket.title}
         />
    
         <label htmlFor="uTicketBody">Description:</label>
         <Textarea
           placeholder="Describe your Ticket here."
           type="text" 
           id="uTicketBody"
           name="description"
           value={ticket.description}
         />
         
         <label htmlFor="uTicketPriority">Priority:</label>
         <SelectPriority
           type="select" 
           name="priority" 
           id="uTicketPriority"
         />

         <Button
         /*   disabled={isLoading} */
           className="submit-btn"
         >
            update
{/*            {!isLoading && ("Update Ticket")}
           {isLoading && ("Updatting")} */}
         </Button>
       </form>
     </div>
    ) 
}