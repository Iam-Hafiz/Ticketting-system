import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import supabase from "@/app/_lib/subapase";
import Link from "next/link";
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
        <div className="my-2 shadow-sm rounded-md p-1 bg-sky-100 grid grid-cols-5">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg><span>Edit</span>
                </Link>
            </p>
            <p>
                <Link href={`/ticket/delete/${ticket.id}`} className="flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>  Delete</span>
                </Link>
            </p>
        </div>
    </div>
  )
}
