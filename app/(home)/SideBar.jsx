
export default function SideBar() {
  return (
    <div id="sidebar" className="open close">
      <div className="flex flex-col items-start">
        <button>New Ticket</button>
        <button>Open</button>
        <button>Closed</button>
        <button>Solved</button>
        <button>Unassigned</button>
        <button>Total Tickets</button>
      </div>
    </div>
  )
}
