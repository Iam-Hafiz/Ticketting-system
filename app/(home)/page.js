import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import supabase from '../_lib/subapase'

// components
import Loading from './Loading'
import SideBar from './SideBar'

//disable prerendering on GetTickets client component
const GetTickets = dynamic(() => import('./GetTickets'), { ssr: false })

export default async function Tickets() {
  const sessionSupabase = createServerComponentClient({ cookies })
  const { data, error: sessionError  } = await sessionSupabase.auth.getSession()
  
  // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 1000));
  const { data: initTickets, error }  = await supabase
  .from('tickets')
  .select();

  return (
    <div className='grid grid-cols-12'>
        <SideBar/>
      <div className="cardShrink cardStretch" id="ticketWrapper"> 
        <Suspense fallback={<Loading />}>
          <GetTickets initTickets={initTickets} error={error} user_metadata={data.session?.user?.user_metadata}/>
        </Suspense>
      </div>
    </div>
  )
}
