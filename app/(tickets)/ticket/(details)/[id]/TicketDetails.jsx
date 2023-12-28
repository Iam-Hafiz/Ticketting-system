
import Link from "next/link";
import { notFound } from "next/navigation"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cookies } from 'next/headers'

// components
//import DeleteTicket from "../../../../_components/DeleteTicket";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { FolderEdit } from "lucide-react";
import supabase from "@/app/_lib/subapase";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import clsx from "clsx";
import ConfirmDialog from "@/app/_components/ConfirmDialog";


// configs
export const dynamic = 'force-dynamic'

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

export default async function TicketDetails({params}) {

    // Make a delay for Scaleton
    //await new Promise(resolve => setTimeout(resolve, 4000));
    const ticket = await getTicket(params.id)
    const ticketId = ticket.id

    const sessionSupabase = createServerComponentClient({ cookies })
    const { data, error: sessionError  } = await sessionSupabase.auth.getSession()
    const user_metadata = data?.session?.user?.user_metadata;

    // Display time as ex: "31 years ago" 
    dayjs.extend(relativeTime)
  return (
    <div>
        <div className="my-1 p-1 shadow-sm rounded-md lg:grid lg:grid-cols-12 lg:gap-2 hidden">
            <div className="font-bold text-sm col-span-2 col-start-1">Customer</div>
            <div className="font-bold text-sm col-span-3 col-start-3">Title</div>
            <div className="font-bold text-sm">Priority</div>
            <div className="font-bold text-sm">Assign to</div>
            <div className="font-bold text-sm">Status</div>
            <div className="font-bold text-sm">Created at</div>
            <div className="font-bold text-sm">Updated at</div>
            <div className="font-bold text-sm">Update</div>
            <div className="font-bold text-sm">Delete</div>
        </div>
        <div className="m-0.5 shadow-md rounded-md p-0.5 lg:grid lg:grid-cols-12 lg:gap-2 
            bg-slate-100 dark:bg-slate-900 dark:border-b-2 hover:bg-slate-200 dark:hover:bg-slate-800 ">
            <div className="flex items-start overflow-hidden col-span-2 col-start-1">
              <Avatar>
                  <Link href="/profil"><AvatarImage src="https://github.com/shadcn.png" /> </Link>
                  <AvatarFallback>
                    {user_metadata && (user_metadata.fname.charAt(0).toUpperCase())}
                    {user_metadata && (user_metadata.lname.charAt(0).toUpperCase())}
                  </AvatarFallback>
              </Avatar>
              <div className="pl-2">
                  <Link href="/profil">{user_metadata && (user_metadata.fname.charAt(0).toUpperCase() + user_metadata.fname.slice(1) + ' ' )}
                   {user_metadata && (user_metadata.lname.charAt(0).toUpperCase() + user_metadata.lname.slice(1) )}
                  </Link>
                  <Link href="/profil" className=" block">{ticket.user_email}</Link>
              </div>
            </div>
            <div className=" col-span-3 col-start-3">
                <h4 className=" font-bold"> {ticket.title}</h4>
                <p>{ticket.description}</p>
            </div>
            <div>
              <p className={clsx('rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent',
                  { ' text-blue-600  ': ticket.priority === 'Low',
                    ' text-orange-500 ': ticket.priority === "Medium",
                    ' text-red-600 ': ticket.priority === "High",
                  }
                )}>{ticket.priority}</p>
            </div>
            <div className="overflow-hidden">
              <p>{ticket.assign}</p>
            </div>
            <div className = "overflow-hidden">
              <p className={clsx('rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent',
                  { ' text-blue-600  ': ticket.status === 'Open',
                    ' text-green-600 ': ticket.status === "Solved",
                    ' text-slate-600': ticket.status === "Closed",
                  }
                )}>
                {ticket.status}
              </p>
            </div>
            <div >{ dayjs().to(dayjs(ticket.created_at)) }</div>
            <div >{ dayjs().to(dayjs(ticket.updated_at)) }</div>
            <p className="flex items-center">
              <Link href={`/ticket/update/${ticket.id}`} className="py-1 px-3 hover:text-red-400">
                  <FolderEdit /> 
              </Link>
            </p>
            <ConfirmDialog ticketId={ticketId}/>
        </div>
    </div>
  )
}
