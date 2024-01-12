import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import supabase from '../_lib/subapase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// components
import Loading from './loading'
import SideBar from './SideBar'

//disable prerendering on GetTickets client component
const GetTickets = dynamic(() => import('./GetTickets'), { ssr: false })

export default async function Tickets() {
  const supabaseAuth = createServerComponentClient({cookies})
  const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
  if(!sessionData?.session?.user){
    //redirect('/login');
  }
  const userid = sessionData?.session?.user.id;
  
  // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 3000));
  const { data: initTickets, error }  = await supabase
  .from('tickets')
  .select();

  let data = { status: {}, priority: {}}
  const  { data: open, error: openErr } = await supabase.from('tickets').select().eq('status', 'Open')
  const  { data: close, error: closeErr } = await  supabase.from('tickets').select().eq('status', 'Closed')
  const  { data: solved, error: solvedErr } = await supabase.from('tickets').select().eq('status', 'Solved')

  const  { data: high, error: highErr } = await supabase.from('tickets').select().eq('priority', 'High')
  const  { data: medium, error: mediumErr } = await supabase.from('tickets').select().eq('priority', 'Medium')
  const  { data: low, error: lowErr } = await supabase.from('tickets').select().eq('priority', 'Low')

   data.status.count = initTickets.length

   data.status.open = open.length
   data.status.close = close.length
   data.status.solved = solved.length

   data.priority.high = high.length
   data.priority.medium = medium.length
   data.priority.low = low.length


  console.log("staussss:", data)

  
  return (
    <div className='grid grid-cols-12'>
        <SideBar data={data}/>
      <div className="cardShrink cardStretch" id="ticketWrapper"> 
        <Suspense fallback={<Loading />}>
          <GetTickets initTickets={initTickets} error={error} />
        </Suspense>
      </div>
    </div>
  )
}
