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

  const { data: initTickets, error }  = await supabase
  .from('tickets')
  .select();

/* 
Change received! {
  schema: 'public',
  table: 'tickets',
  commit_timestamp: '2023-12-16T20:03:52.510Z',
  eventType: 'UPDATE',
  new: {
    assign: '',
    created_at: '2023-12-16T19:53:14.418742+00:00',
    description: 'ppppppppppppp',
    id: 11,
    priority: 'low',
    status: 'open',
    title: 'rrrrrrrrrrrr',
    updated_at: '2023-12-16T19:53:14.418742+00:00',
    user_id: null
  },
  old: { id: 11 },
  errors: null
}
 */
  return (
    <div className='grid grid-cols-12'>
        <SideBar/>
      <div className="cardShrink cardStretch" id="ticketWrapper"> 
        <Suspense fallback={<Loading />}>
          <GetTickets initTickets={initTickets} error={error} />
        </Suspense>
      </div>
    </div>
  )
}
