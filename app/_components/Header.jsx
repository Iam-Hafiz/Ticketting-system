
import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'
import { UserDropDown } from './UserDropDown'
import DropDownBtn from './DropDownBtn'
import { Plus } from 'lucide-react'

export default function Header({localUser}) {

  return (
    <header className='max-w-[2000px] mx-auto font-bold
     bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 dark:text-slate-300 shadow-xl'>
      <div className='flex items-center'>
        <DropDownBtn />
        <Link href="/" className='mr-auto p-1 font-bold uppercase hover:text-blue-600'>HelpDesk</Link>
        <Link href="/ticket/create" className='p-1 hover:text-blue-600' aria-label='add new ticket'>
          <Plus strokeWidth={2} />
        </Link>
        <ModeToggle />
        <UserDropDown localUser={localUser}/>
      </div>
    </header>
  )
}
