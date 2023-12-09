"use client"
import Link from "next/link"
import supabase from "../_lib/subapase";
import * as React from "react"

// components
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import TicketHeader from "../_components/TicketHeader";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../_components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_components/ui/select";

export default async function TicketList() {

    // imitate delay to see the loading page
  //await new Promise(resolve => setTimeout(resolve, 1000));
  const { data: tickets, error }  = await supabase
    .from('tickets')
    .select()

  return (
      <>
        <TicketHeader />
        {tickets && tickets.map((ticket) => (
          <div key={ticket.id} className="m-1 lg:m-0 shadow-sm rounded-md p-1 bg-sky-100 lg:grid lg:grid-cols-8 lg:gap-2">
              <div className="flex items-start overflow-hidden m-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="pl-2">
                    <span>Username</span>
                    <p><small>{ticket.user_email}</small></p>
                </div>
              </div>
              <div className="col-span-2 col-start-2 overflow-hidden m-2">
                <Link href={`/ticket/${ticket.id}`}>
                  <HoverCard>
                    <HoverCardTrigger>
                      <h3 className="font-bold overflow-hidden">{`${ticket.title.slice(0, 50)}...`}</h3>
                      <p className="overflow-hidden">{ticket.description?.slice(0, 30)}...</p>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <h3 className="font-bold">{ticket.title}:</h3>
                      <p>{ticket.description}</p>
                    </HoverCardContent>
                  </HoverCard>
                </Link>
              </div>
              <div className="overflow-hidden m-2">
                <Select>
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="priority">
                     <SelectValue placeholder="Priority" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Low">Low</SelectItem>
                     <SelectItem value="Medium">Medium</SelectItem>
                     <SelectItem value="High">High</SelectItem>
                   </SelectContent>
                </Select>
                <p><small className={`pill ${ticket.priority} px-2 rounded-sm`}>{ticket.priority}</small></p>
              </div>
              <div className="overflow-hidden m-2">
                <Select>
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="assign">
                     <SelectValue placeholder="Assign" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                     <SelectItem value="IT Technician">IT Technician</SelectItem>
                     <SelectItem value="Network administrator">Network administrator</SelectItem>
                   </SelectContent>
                </Select>
              </div>
              <div className="overflow-hidden m-2">
                <Select>
                   <SelectTrigger className="w-[50%] md:w-[40%] lg:w-[100%]" name="status">
                     <SelectValue placeholder="Status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Open">Open</SelectItem>
                     <SelectItem value="Solved">Solved</SelectItem>
                     <SelectItem value="Closed">Closed</SelectItem>
                   </SelectContent>
                </Select>
              </div>
              <div className="m-2">create hhggygfytfyfty</div>
              <div className="m-2">update hgfuyftyfytftf--ff-</div>
          </div>
        ))}
        {tickets.length === 0 && (
          <p className="text-center">There are no open tickets, yay!</p>
        )}
      </>
  )
}
