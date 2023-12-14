"use client"

import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { AlignJustify, XSquare } from 'lucide-react'

export default function DropDownBtn() {
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
/*     <div className='sm:hidden'>
    { (pathname == "/") && showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
    { (pathname == "/") && !showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
  </div> */
  return (
    <>
      <div>
        { (pathname == "/") && showBar && (<button className="p-1" onClick={handleClick}><XSquare /></button>)}
        { (pathname == "/") && !showBar && (<button className="p-1" onClick={handleClick}><AlignJustify /></button>)}
      </div>
    </>
  )
}
