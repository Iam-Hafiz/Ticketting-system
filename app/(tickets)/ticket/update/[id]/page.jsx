"use client"

// components
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";
import { updateTicket } from "../../actions";
import supabase from "@/app/_lib/subapase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";

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
           autofocus
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