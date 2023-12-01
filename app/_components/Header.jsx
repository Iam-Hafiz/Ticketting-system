import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'

export default function Header() { 
  return (
    <header className='max-w-screen-2xl mx-auto'>
      <nav className='flex py-0'>
        <Link href="/" className='mr-auto'><h1>Customer service</h1></Link>
        <Link href="/login" className='px-2'>login</Link>
        <Link href="/signup" className='px-2'>signup</Link>
        <Link href="/ticket/create" className='px-2'>New ticket</Link>
        <ModeToggle />
      </nav>
    </header>
  )
}
