"use client"

import Link from 'next/link'
import { ModeToggle } from './Mode-toggle-btn'
import { UserDropDown } from './UserDropDown'
import { AlignJustify, XSquare } from 'lucide-react'
import { useState } from 'react'

export default function Header() { 
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
    <header className='mx-auto bg-red-400'>
      <div className='flex items-center m-0 p-0'>
        <div className='hidden sm:inline-block'>
          { !showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
          { showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
        </div>
        <div className='sm:hidden'>
          { showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
          { !showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
        </div>
        <Link href="/" className='mr-auto p-1'>HelpDesk</Link>
        <Link href="/login" className='p-1'>login</Link>
        <Link href="/signup" className='p-1'>signup</Link>
        <Link href="/ticket/create" className='p-1'>New ticket</Link>
        <ModeToggle />
        <UserDropDown/>
      </div>
    </header>
  )
}
