"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import supabase from "../_lib/subapase";
import clsx from "clsx";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// components
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import TicketHeader from "../_components/TicketHeader";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../_components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_components/ui/select";
import { updateSelectValues } from "../(tickets)/ticket/actions";


// configs
export const dynamic = 'force-dynamic'

export default function TicketList({initTickets, error, user_metadata}) {

  // Display tickets & apply realtime listeners 
  const [tickets, setTickets] = useState(initTickets)
  const [rerender, setRerender] = useState(false)
  
  useEffect(() => {
    const ticketsChannel = supabase
    .channel('tickets')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, payload => {
      if(payload.eventType === 'INSERT'){
        setTickets([...tickets, payload.new])
      } 
      if(payload.eventType === 'UPDATE'){
        const length = tickets.length
        for (let i = 0; i < length; i++) {
          if(tickets[i].id === payload.new?.id){
            tickets[i] = payload.new
            rerender ? setRerender(false): setRerender(true);
            break;
          }
        }
      } 
      if (payload.eventType === 'DELETE'){
        const len = tickets.length
        let restTickets = [];
        for (let i = 0; i < len; i++) {
          if(tickets[i].id !== payload.old?.id){
            restTickets.push(tickets[i])
            setTickets(restTickets)
          }
        }
      }
    })
    .subscribe()
    return () => {
      supabase.removeChannel(ticketsChannel)
    }
  }, [supabase, rerender, setRerender, tickets, setTickets])

  // Display time as ex: "31 years ago" 
  dayjs.extend(relativeTime)

  return (
      <div>
        <TicketHeader />
        {tickets && tickets.map((ticket) => (
          <div key={ticket.id} className="m-0.5 shadow-md rounded-md p-0.5 lg:grid lg:grid-cols-8 lg:gap-2 
              bg-slate-100 dark:bg-slate-900 dark:border-b-2 hover:bg-slate-200 dark:hover:bg-slate-800 ">
              <div className="flex items-start overflow-hidden">
                <Avatar>
                    <Link href="/profil"><AvatarImage src="https://github.com/shadcn.png" /> </Link>
                    <AvatarFallback>
                      {user_metadata && (user_metadata.fname.charAt(0).toUpperCase())}
                      {user_metadata && (user_metadata.lname.charAt(0).toUpperCase())}
                    </AvatarFallback>
                </Avatar>
                <div className="pl-2">
                    <Link href="/profil">{user_metadata && (user_metadata.fname.charAt(0).toUpperCase() + user_metadata.fname.slice(1) + ' ' )}
                     {user_metadata && (user_metadata.lname.charAt(0).toUpperCase() + user_metadata.lname.slice(1) )}
                    </Link>
                    <Link href="/profil" className=" block">{ticket.user_email}</Link>
                </div>
              </div>
              <div className="col-span-2 col-start-2 overflow-hidden ">
                <HoverCard>
                  <HoverCardTrigger>
                      <Link href={`/ticket/${ticket.id}`} className="font-bold overflow-hidden hover:text-blue-800 dark:hover:text-green-500">
                        {`${ticket.title.slice(0, 50)}...`}</Link>
                      <Link href={`/ticket/${ticket.id}`} className="block overflow-hidden hover:text-blue-800 dark:hover:text-green-500">
                        {ticket.description?.slice(0, 30)}...
                      </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                      <Link href={`/ticket/${ticket.id}`} className="font-bold overflow-hidden hover:text-blue-800 dark:hover:text-green-500">
                        {ticket.title}:
                      </Link>
                      <Link href={`/ticket/${ticket.id}`} className="overflow-hidden hover:text-blue-800 dark:hover:text-green-500">
                        {ticket.description}
                      </Link>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="overflow-hidden">
                <Select onValueChange={ async (value) => {
                    await updateSelectValues({priority: value, id: ticket.id})}}
                >
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="priority">
                     <SelectValue placeholder="Select..." />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Low">Low</SelectItem>
                     <SelectItem value="Medium">Medium</SelectItem>
                     <SelectItem value="High">High</SelectItem>
                   </SelectContent>
                </Select>
                <p className={clsx('rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent',
                    { ' text-blue-600  ': ticket.priority === 'Low',
                      ' text-orange-500 ': ticket.priority === "Medium",
                      ' text-red-600 ': ticket.priority === "High",
                    }
                  )}>{ticket.priority}</p>
              </div>
              <div className="overflow-hidden">
                <Select onValueChange={ async (value) => {
                  await updateSelectValues({assign: value, id: ticket.id})}}
                >
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="assign">
                     <SelectValue placeholder="Select..." />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                     <SelectItem value="IT Technician">IT Technician</SelectItem>
                     <SelectItem value="Network administrator">Network administrator</SelectItem>
                   </SelectContent>
                </Select>
                <p>{ticket.assign}</p>
              </div>
              <div className="overflow-hidden">
                <Select onValueChange={ async (value) => {
                  await updateSelectValues({status: value, id: ticket.id})}}
                >
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="status">
                     <SelectValue placeholder="Select..." />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Open">Open</SelectItem>
                     <SelectItem value="Solved">Solved</SelectItem>
                     <SelectItem value="Closed">Closed</SelectItem>
                   </SelectContent>
                </Select>
                <p className={clsx('rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent',
                    { ' text-blue-600  ': ticket.status === 'Open',
                      ' text-green-600 ': ticket.status === "Solved",
                      ' text-slate-600': ticket.status === "Closed",
                    }
                  )}>
                  {ticket.status}
                </p>
              </div>
              <div >{ dayjs().to(dayjs(ticket.created_at)) }</div>
              <div >{ dayjs().to(dayjs(ticket.updated_at)) }</div>
          </div>
        ))}
        {error && (
         <div>
            <p className="text-center">Please Check your Internet connection!</p>
            <p className="text-center">Or maybe there are currently no available tickets, yay!</p>
         </div>
        )}
        {!tickets.length && (
         <div>
            <p className="text-center font-bold text-green-500 text-[1.5em] mt-8">There are currently no available tickets, yay!</p>
         </div>
        )}

      </div>
  )
}

