
export default function TicketHeader() {
  return (
    <div className="my-1 p-1 shadow-lg rounded-md lg:grid lg:grid-cols-8 lg:gap-2 hidden">
        <div className="font-bold text-sm">Customer</div>
        <div className="font-bold text-sm col-span-2 col-start-2">Title</div>
        <div className="font-bold text-sm">Priority</div>
        <div className="font-bold text-sm">Assign to</div>
        <div className="font-bold text-sm">Status</div>
        <div className="font-bold text-sm">Created</div>
        <div className="font-bold text-sm">Updated</div>
    </div>
  )
}
