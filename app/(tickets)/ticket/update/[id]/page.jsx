
// components
import supabase from "@/app/_lib/subapase";
import UpdateForm from "./UpdateForm";

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
    return (
      <UpdateForm ticket={ticket}/>
    ) 
}