
export default function TicketHeader() {
  return (
    <div className="my-1 p-1 shadow-sm rounded-md bg-sky-100 lg:grid lg:grid-cols-8 lg:gap-2 hidden">
        <h3 className="font-bold text-sm">Customer</h3>
        <h3 className="font-bold text-sm col-span-2 col-start-2">Title</h3>
        <h3 className="font-bold text-sm">Priority</h3>
        <h3 className="font-bold text-sm">Assign to</h3>
        <h3 className="font-bold text-sm">Status</h3>
        <h3 className="font-bold text-sm">Created at</h3>
        <h3 className="font-bold text-sm">Updated at</h3>
    </div>
  )
}
