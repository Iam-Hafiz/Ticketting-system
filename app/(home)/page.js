import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

// components
import Loading from './Loading'
import SideBar from './SideBar'
import supabase from '../_lib/subapase'

//disable prerendering on GetTickets client component
const GetTickets = dynamic(() => import('./GetTickets'), { ssr: false })
export default async function Tickets() {
  // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 1000));

  const { data: tickets, error }  = await supabase
  .from('tickets')
  .select()

  return (
    <div className='grid grid-cols-12'>
        <SideBar/>
      <div className="cardShrink cardStretch" id="ticketWrapper"> 
        <Suspense fallback={<Loading />}>
          <GetTickets tickets={tickets} error={error}/>
        </Suspense>
      </div>
    </div>
  )
}
