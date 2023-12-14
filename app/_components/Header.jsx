
import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'
import { UserDropDown } from './UserDropDown'
import LogOut from './LogOut'
import DropDownBtn from './DropDownBtn'

export default function Header({user}) {

  return (
    <header className='max-w-[2000px] mx-auto font-bold
     bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 dark:text-slate-300'>
      <div className='flex items-center'>
        <DropDownBtn />
        <Link href="/" className='mr-auto p-1 font-bold uppercase'>HelpDesk</Link>
        {!user && (<Link href="/login" className='p-1'>login</Link>)}
        {!user && (<Link href="/signup" className='p-1'>signup</Link>)}
        {user && (<Link href="/signup" className='p-1'>{user.email}</Link>)}
        {user && (<LogOut />)}
        <Link href="/ticket/create" className='p-1'>New ticket</Link>
        <ModeToggle />
        <UserDropDown />
      </div>
    </header>
  )
}
