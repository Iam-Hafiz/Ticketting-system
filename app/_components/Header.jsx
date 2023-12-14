"use client"

import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'
import { UserDropDown } from './UserDropDown'
import { AlignJustify, XSquare } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx';

export default function Header({user}) {
  const pathname = usePathname();
  //console.log("pathn:", pathname)
  const [showBar, setShowBar] = useState(false)
  function handleClick(e){
    const sidebar = document.getElementById('sidebar');
    const ticketWrapper = document.getElementById('ticketWrapper');
    if(showBar && sidebar && ticketWrapper){
      setShowBar(false);
      sidebar.classList.toggle('close');
      ticketWrapper.classList.toggle('cardStretch');
    } else {
      setShowBar(true)
      if(sidebar && ticketWrapper){
        sidebar.classList.toggle('close');
        ticketWrapper.classList.toggle('cardStretch');
      }
    }
  }

  return (
    <header className='max-w-[2000px] mx-auto font-bold
     bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 dark:text-slate-300'>
      <div className='flex items-center'>
        <div className='hidden sm:inline-block'>
          { (pathname == "/") && !showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
          { (pathname == "/") && showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
        </div>
        <div className='sm:hidden'>
          { (pathname == "/") && showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
          { (pathname == "/") && !showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
        </div>
        <Link href="/" className='mr-auto p-1 font-bold uppercase'>HelpDesk</Link>
        {!user && (<Link href="/login" className='p-1'>login</Link>)}
        {!user && (<Link href="/signup" className='p-1'>signup</Link>)}
        {user && (<Link href="/signup" className='p-1'>{user.email}</Link>)}

        <Link href="/ticket/create" className='p-1'>New ticket</Link>
        <ModeToggle />
        <UserDropDown />
      </div>
    </header>
  )
}
