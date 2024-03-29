import Link from "next/link";

export default function SideBar({data: { status , priority, assign }}) {
  return (
    <div id="sidebar" className="open close">
      <div className=" font-bold my-3">
        <Link href="/ticket/create" className='py-1 hover:text-blue-600 w-full'>New ticket</Link>
      </div>
      <div className=" grid grid-cols-2">
        <a className=' w-full hover:text-blue-600' href="/">Total Tickets</a>
        <p>{status.count}</p>
      </div>

      <h3 className=" font-bold mt-3">Status</h3>

      <div className=" grid grid-cols-2">
        <nav className="flex flex-col items-start">
          <a className=' w-full hover:text-blue-600' href='/?query=Open&filterBy=status'>Open</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Closed&filterBy=status'>Closed</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Solved&filterBy=status'>Solved</a>
        </nav>
        <ul className="flex flex-col items-start">
          <li>{status.open}</li>
          <li>{status.close}</li>
          <li>{status.solved}</li>
        </ul>
      </div>

      <h3 className=" font-bold mt-3">Priority</h3>

      <div className=" grid grid-cols-2">
        <nav className="flex flex-col items-start">
          <a className=' w-full hover:text-blue-600' href='/?query=High&filterBy=priority'>High</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Medium&filterBy=priority'>Medium</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Low&filterBy=priority'>Low</a>
        </nav>
        <ul className="flex flex-col items-start">
          <li>{priority.high}</li>
          <li>{priority.medium}</li>
          <li>{priority.low}</li>
        </ul>
      </div>

      <h3 className=" font-bold mt-3">Assignment</h3>

      <div className=" grid grid-cols-2">
        <nav className="flex flex-col items-start">
          <a className=' w-full hover:text-blue-600' href='/?query=Engineer&filterBy=assign'>AI Engineer</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Technician&filterBy=assign'>IT Technician</a>
          <a className=' w-full hover:text-blue-600' href='/?query=Network&filterBy=assign'>Network administrator</a>
        </nav>
        <ul className="flex flex-col items-start">
          <li>{assign.engineer}</li>
          <li>{assign.technician}</li>
          <li>{assign.network}</li>
        </ul>
      </div>
    </div>
  )
}
