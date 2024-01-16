import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import supabase from '../_lib/subapase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// components
import Loading from './loading'
import SideBar from './SideBar'

//disable prerendering on GetTickets client component
const GetTickets = dynamic(() => import('./GetTickets'), { ssr: false })

export default async function Tickets({searchParams}) {
  const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;

  const supabaseAuth = createServerComponentClient({cookies})
  const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
  if(!sessionData?.session?.user){
    //redirect('/login'); const userid = sessionData?.session?.user.id;

  }
  const ac = new AbortController()

  // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 3000));
  let initTickets
  let error
  if(!(query && (query?.length > 2))){
    const { data, error: err }  = await supabase
    .from('tickets')
    .select()
    .order('created_at', { ascending: false })
    .range(0, 1)
    .abortSignal(ac.signal);
    error = err
    initTickets = data
  }

  if(query && (query?.length > 2)){
    const terms = '%' + query + '%'
    const ac = new AbortController()
    const { data, error: errors }  = await supabase
    .from('tickets')
    .select()
    .ilike('title', terms)
    .abortSignal(ac.signal);
    error = errors
    initTickets = data
  }

  let data = { status: {}, priority: {}}
  const  { data: open, error: openErr } = await supabase.from('tickets')
    .select('status').eq('status', 'Open').abortSignal(ac.signal)
  const  { data: close, error: closeErr } = await  supabase.from('tickets')
    .select('status').eq('status', 'Closed').abortSignal(ac.signal)
  const  { data: solved, error: solvedErr } = await supabase.from('tickets')
    .select('status').eq('status', 'Solved').abortSignal(ac.signal)

  const  { data: high, error: highErr } = await supabase.from('tickets')
    .select('priority').eq('priority', 'High').abortSignal(ac.signal)
  const  { data: medium, error: mediumErr } = await supabase.from('tickets')
    .select('priority').eq('priority', 'Medium').abortSignal(ac.signal)
  const  { data: low, error: lowErr } = await supabase.from('tickets')
    .select('priority').eq('priority', 'Low') .abortSignal(ac.signal)
    if(!(openErr || closeErr || solvedErr || highErr || mediumErr || lowErr)){
    data.status.count = initTickets?.length

    data.status.open = open?.length
    data.status.close = close?.length
    data.status.solved = solved?.length
 
    data.priority.high = high?.length
    data.priority.medium = medium?.length
    data.priority.low = low?.length
  }
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
