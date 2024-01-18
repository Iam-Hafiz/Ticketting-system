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
  const filterBy = searchParams?.filterBy || 'title';
  const supabaseAuth = createServerComponentClient({cookies})
  const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();
  if(!sessionData?.session?.user){
    //redirect('/login'); const userid = sessionData?.session?.user.id;
  }
  const ac = new AbortController()
  let data = { 
    status: {open: 0, close: 0, solved: 0, count: 0},
    priority: {high: 0, medium: 0, low: 0},
    assign : {engineer: 0, technician: 0, network: 0}
  }

  // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 3000));
  let initTickets = []
  let error
  const { data: tickets, error: err }  = await supabase
  .from('tickets')
  .select()
  .order('created_at', { ascending: false })
  .abortSignal(ac.signal);
  tickets?.forEach((ticket) =>{
    ticket.status === 'Open' ? data.status.open += 1
    : ticket.status === 'Closed' ? data.status.close += 1
    : ticket.status === 'Solved' ? data.status.solved += 1
    : console.log('There are no status tickets')

    ticket.priority === 'High' ? data.priority.high += 1
    : ticket.priority === 'Medium' ? data.priority.medium += 1
    : ticket.priority === 'Low' ? data.priority.low += 1
    : console.log('There are no priority tickets');

    ticket.assign === 'AI Engineer' ? data.assign.engineer += 1
    : ticket.assign === 'IT Technician' ? data.assign.technician += 1
    : ticket.assign === 'Network administrator' ? data.assign.network += 1
    : console.log('There are no assign tickets');
  })
  error = err
  initTickets.push(tickets[0], tickets[1])
  data.status.count = tickets?.length

  if(query && (query?.length > 2)){
    const terms = '%' + query + '%'
    const { data, error: errors }  = await supabase
    .from('tickets')
    .select()
    .ilike(filterBy, terms)
    .abortSignal(ac.signal);
    error = errors
    initTickets = data
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
