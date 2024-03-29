
import { Suspense } from "react";
import Loading from "./Loading";
import TicketDetails from "./TicketDetails";
import supabase from "@/app/_lib/subapase";
import { notFound } from "next/navigation";

// dynamic meta data
export async function generateMetadata({params}){
  const ac = new AbortController()
    const { data: ticket, error } = await supabase
    .from('tickets')
    .select()
    .eq('id', params.id)
    .single()
    .abortSignal(ac.signal)
    if(error){
        return notFound()
    }
    return {
      title: `${ticket.title || 'Ticket' } | HelpDesk }`,
      description: ticket.body,
    };
}

export default async function page({params}) {

  return (
    <div className=" shadow-lg">
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <Suspense fallback={<Loading />}>
            <TicketDetails params={params}/>
        </Suspense>
    </div>
  )
}
