
import { Suspense } from "react";
import Loading from "./Loading";
import TicketDetails from "./TicketDetails";
import supabase from "@/app/_lib/subapase";
import { notFound } from "next/navigation";

// dynamic meta data
export async function generateMetadata({params}){
    const { data: ticket, error } = await supabase
    .from('tickets')
    .select()
    .eq('id', params.id)
    .single()
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
    <div>
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <Suspense fallback={<Loading />}>
            <TicketDetails params={params}/>
        </Suspense>
    </div>
  )
}
