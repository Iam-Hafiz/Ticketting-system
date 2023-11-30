import Link from "next/link"
import supabase from "../_lib/subapase";

export default async function TicketList() {
    // imitate delay to see the loading page
  await new Promise(resolve => setTimeout(resolve, 1000));
  const { data: tickets, error }  = await supabase
    .from('tickets')
    .select()

  return (
    <div>
      {tickets && tickets.map((ticket) => (
          <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
              <div className="card my-5">
                <div>
                </div>
                <div>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.body.slice(0, 200)}...</p>
                </div>
                <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div>
                <div></div>
                <div>Assigned to</div>
                <div>Status</div>
              </div>
        </Link>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </div>
  )
}
