
import React, { Suspense } from 'react'

// components
import GetTickets from './GetTickets'
import Loading from './Loading'


export default function Tickets() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <GetTickets />
      </Suspense>
    </div>
  )
}
