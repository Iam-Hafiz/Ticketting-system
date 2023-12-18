import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import supabase from "@/app/_lib/subapase";
import Link from "next/link";
import { notFound } from "next/navigation"
import DeleteTicket from "../../../../_components/DeleteTicket";
import { FolderEdit } from "lucide-react";

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
    const ticketId = ticket.id
  return (
    <div>
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <div className="m-0.5 shadow-md rounded-md p-0.5 lg:grid lg:grid-cols-8 lg:gap-2 
              bg-slate-100 dark:bg-slate-900 dark:border-b-2 hover:bg-slate-200 dark:hover:bg-slate-800 ">
            <div className="flex items-start">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="pl-2">
                    <span>Username</span>
                    <p><small>{ticket.user_email}</small></p>
                </div>
            </div>
            <div>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
            </div>
            <p>
                <span className={`p-1 rounded-md ${ticket.priority}`}>
                    {ticket.priority}
                </span>
            </p>
            <p>
                <Link href={`/ticket/update/${ticket.id}`} className="flex items-end">
                    <FolderEdit /> <span className="ml-1">Edit</span>
                </Link>
            </p>
            <DeleteTicket ticketId={ticketId}/>
        </div>
    </div>
  )
}
