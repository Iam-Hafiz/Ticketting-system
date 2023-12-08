
import React, { Suspense } from 'react'

// components
import GetTickets from './GetTickets'
import Loading from './Loading'
import SideBar from './SideBar'


export default function Tickets() {
  return (
    <div className='grid grid-cols-12'>
        <SideBar/>
      <div className="cardShrink" id="ticketWrapper"> 
        <Suspense fallback={<Loading />}>
          <GetTickets />
        </Suspense>
      </div>
    </div>
  )
}
