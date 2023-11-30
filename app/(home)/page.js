import Navbar from '../_components/Main-nav';

import React, { Suspense } from 'react'
import GetTickets from './GetTickets'
import Loading from './Loading'

export default function Tickets() {
  return (
    <div>
      <Navbar/>
      <p><small>Currently open Tickets</small></p>
      <Suspense fallback={<Loading />}>
        <GetTickets />
      </Suspense>
    </div>
  )
}
