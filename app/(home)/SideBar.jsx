import Link from "next/link";

export default function SideBar({data: { status , priority }}) {
  return (
    <div id="sidebar" className="open close">
      <div className=" font-bold my-3">
        <Link href="/ticket/create" className='py-1 hover:text-blue-600 w-full'>New ticket</Link>
      </div>
      <div className=" grid grid-cols-2 gap-1">
        <p>Total Tickets</p>
        <p>{status.count}</p>
      </div>

      <h3 className=" font-bold mt-3">Status</h3>

      <div className=" grid grid-cols-2 gap-1">
        <ul className="flex flex-col items-start">
          <li>Open</li>
          <li>Closed</li>
          <li>Solved</li>
        </ul>
        <ul className="flex flex-col items-start">
          <li>{status.open}</li>
          <li>{status.close}</li>
          <li>{status.solved}</li>
        </ul>
      </div>

      <h3 className=" font-bold mt-3">Priority</h3>

      <div className=" grid grid-cols-2 gap-1">
        <ul className="flex flex-col items-start">
          <li>High</li>
          <li>Medium</li>
          <li>Low</li>
        </ul>
        <ul className="flex flex-col items-start">
          <li>{priority.high}</li>
          <li>{priority.medium}</li>
          <li>{priority.low}</li>
        </ul>
      </div>
    </div>
  )
}
