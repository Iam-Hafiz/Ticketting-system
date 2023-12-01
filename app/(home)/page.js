
import React, { Suspense } from 'react'

// components
import GetTickets from './GetTickets'
import Loading from './Loading'


export default function Tickets() {
  return (
    <div>
      <p><small>Currently open Tickets</small></p>
      <Suspense fallback={<Loading />}>
        <GetTickets />
      </Suspense>
    </div>
  )
}
