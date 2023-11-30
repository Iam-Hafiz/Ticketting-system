import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'

export default function Navbar() { 
  return (
    <nav>
        <h1>Customer service</h1>
        <Link href="/">HelpDesk</Link>
        <Link href="/tickets">Tickets</Link>
        <Link href="/ticket/create">Add tickets</Link>
        <ModeToggle/>
    </nav>
  )
}
