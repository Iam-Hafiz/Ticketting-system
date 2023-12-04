import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'
import { UserDropDown } from './UserDropDown'

export default function Header() { 
  return (
    <header className='max-w-screen-2xl mx-auto'>
      <nav className='flex items-center m-0 p-0'>
        <Link href="/" className='mr-auto p-1'><h1>Customer service</h1></Link>
        <Link href="/login" className='p-1'>login</Link>
        <Link href="/signup" className='p-1'>signup</Link>
        <Link href="/ticket/create" className='p-1'>New ticket</Link>
        <ModeToggle />
        <UserDropDown/>
      </nav>
    </header>
  )
}
