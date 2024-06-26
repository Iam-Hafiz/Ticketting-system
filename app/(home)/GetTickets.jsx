"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import supabase from "../_lib/subapase";
import clsx from "clsx";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSearchParams,  usePathname, useRouter } from 'next/navigation';
import { motion } from "framer-motion"

// components
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import TicketHeader from "../_components/TicketHeader";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../_components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_components/ui/select";
import { updateSelectValues } from "../(tickets)/ticket/actions";
import { Button } from "../_components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { Input } from '../_components/ui/input';
import {animationsProps, fadeInAnimationVariants} from "../_lib/animations";

// configs
export const dynamic = 'force-dynamic'

export default function TicketList({initTickets, error, query, currentPage}) {
  const [tickets, setTickets] = useState(initTickets)
  const [rerender, setRerender] = useState(false)
  const [err, setErr] = useState(error)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectErr, setSelectErr] = useState(false)

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    term?  params.set('query', term): params.delete('query');
    replace(`${pathname}?${params.toString()}`);
    const ac = new AbortController()
    if(term && (term?.length > 2)){
      const terms = '%' + term + '%'
      const { data, error: errors }  = await supabase
      .from('tickets')
      .select()
      .ilike('title', terms)
      .abortSignal(ac.signal);
      error = errors
      setTickets(data)
    } else {
      const { data, error: errors }  = await supabase
      .from('tickets')
      .select()
      .range(0, 7)
      .order('created_at', { ascending: false })
      .abortSignal(ac.signal);
      error = errors
      setTickets(data)
    }
  }

  function getFromAndTo() {
    const tickets_per_page = 4
    let from = page * tickets_per_page
    let to = from + tickets_per_page - 1
    return {from, to}
  }

  async function fetchMoreTickets() {
    setLoading(true)
    const ac = new AbortController()
    const {from, to} = getFromAndTo()
    const { data, error }  = await supabase
    .from('tickets')
    .select()
    .range(from, to)
    .order('created_at', { ascending: false })
    .abortSignal(ac.signal);
    if(data?.length === 0){setErr('There are no more Tickets!')}
    setPage(page + 1)
    setTickets((currentTickets)=>[...currentTickets, ...data])
    if(error){setErr(error)}
    setLoading(false)
  }

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

/*     // Listen to user presence
    let userPresenceState = { online_at: new Date().toISOString() } 
    const roomOne = supabase.channel('room1', {
      config: {
        presence: { key: userid }
      }
    })
    roomOne
      .on('presence', { event: 'sync' }, () => {
        const presenceState = roomOne.presenceState()
        if(Object.keys(presenceState).length !== 0){
          userPresenceState.key = Object.keys(presenceState)[0]
          userPresenceState.online_at = (Object.values(presenceState))[0][0].online_at
          setIsOnline(true)
          console.log( "sync key:", Object.keys(presenceState)[0],"userP:", userPresenceState)
        }
      })
      .on('presence', { event: 'join' }, ({key, newPresences }) => {
        //setJoin(true)
        userPresenceState.online_at = newPresences[0].online_at
        userPresenceState.key = key
        console.log( "New users joined the channel:", userPresenceState)
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        //setLeave(true)
        userPresenceState.online_at = leftPresences[0].online_at
        userPresenceState.key = key
        untrackPresence(userPresenceState);
        console.log( "Users left the channel:", userPresenceState)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await roomOne.track(userPresenceState)
        }
      });
      const untrackPresence = async (user) => {
        const presenceUntrackStatus = await roomOne.untrack(user)
        setIsOnline(false)
        console.log("just unTracked:", presenceUntrackStatus)
      } */

    return () => {
      supabase.removeChannel(ticketsChannel)
    }
  }, [rerender, setRerender, tickets, setTickets, page])

  // Display time as ex: "31 years ago" 
  dayjs.extend(relativeTime)

  return (
    <div>
      <motion.div
        className=" flex items-center mx-auto my-2 relative w-1/3 shadow-lg"
        initial={animationsProps.initial}
        animate={animationsProps.animate}
        transition={{ type: "spring", duration: 1 }}
      >
        <label htmlFor="searchBtn" className="absolute top-1/5 right-1">
          <Search strokeWidth={1} />
        </label>
        <Input
          id="searchBtn"
          className=" h-10"
          placeholder="Search by title..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </motion.div>
      <TicketHeader />
      {tickets &&
        tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            className="m-0.5 rounded-md p-0.5 lg:grid lg:grid-cols-8 lg:gap-2 
              bg-slate-100 dark:bg-slate-900 dark:border-b-2 hover:bg-slate-200 dark:hover:bg-slate-800 shadow-xl"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <div className="flex items-start overflow-hidden relative first-letter:">
              {
                <div className=" absolute left-0 top-0 w-3 h-3 bg-gray-400 rounded-full z-10"></div>
              }
              {/*  count === 1 && (<div className=" absolute left-0 top-0 w-3 h-3 bg-green-500 rounded-full z-10"></div> ) */}
              <Avatar>
                <div>
                  <Link href="/profil">
                    <AvatarImage
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                        ticket.user_id +
                        process.env.NEXT_PUBLIC_IMAGE_EXTENSION
                      }
                      alt="User profil photo"
                    />
                  </Link>
                </div>
                <Link
                  href="/profil"
                  className=" hover:text-blue-500 dark:hover:text-purple-600"
                >
                  <AvatarFallback>
                    {ticket.user_fname?.charAt(0).toUpperCase()}
                    {ticket.user_lname?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Link>
              </Avatar>
              <div className="pl-2">
                <Link
                  href="/profil"
                  className=" hover:text-blue-500 dark:hover:text-purple-600"
                >
                  {ticket.user_fname?.charAt(0).toUpperCase() +
                    ticket.user_fname?.slice(1) +
                    " "}
                  {ticket.user_lname?.charAt(0).toUpperCase() +
                    ticket.user_lname?.slice(1)}
                </Link>
                <Link
                  href="/profil"
                  className=" block  hover:text-blue-500 dark:hover:text-purple-600"
                >
                  {ticket.user_email}
                </Link>
              </div>
            </div>
            <div className="col-span-2 col-start-2 overflow-hidden ">
              <HoverCard>
                <HoverCardTrigger>
                  <Link
                    href={`/ticket/${ticket.id}`}
                    className="font-bold overflow-hidden hover:text-blue-800 dark:hover:text-green-500"
                  >
                    {`${
                      ticket.title?.charAt(0).toUpperCase() +
                      ticket.title.slice(1, 50)
                    }...`}
                  </Link>
                  <Link
                    href={`/ticket/${ticket.id}`}
                    className="block overflow-hidden hover:text-blue-800 dark:hover:text-green-500"
                  >
                    {ticket.description?.charAt(0).toUpperCase() +
                      ticket.description?.slice(1, 30)}
                    ...
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent>
                  <Link
                    href={`/ticket/${ticket.id}`}
                    className="font-bold overflow-hidden hover:text-blue-800 dark:hover:text-green-500"
                  >
                    {ticket.title?.charAt(0).toUpperCase() +
                      ticket.title.slice(1) +
                      " "}
                    :
                  </Link>
                  <Link
                    href={`/ticket/${ticket.id}`}
                    className="overflow-hidden hover:text-blue-800 dark:hover:text-green-500"
                  >
                    {" " +
                      ticket.description?.charAt(0).toUpperCase() +
                      ticket.description.slice(1)}
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="overflow-hidden">
              <Select
                onValueChange={async (value) => {
                  const states = await updateSelectValues({
                    priority: value,
                    id: ticket.id,
                  });
                  setSelectErr(states);
                }}
              >
                <SelectTrigger
                  className="w-[50%] md:w-[40%] lg:w-[100%]"
                  name="priority"
                >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {selectErr?.message && ticket.id == selectErr?.id && (
                <p className="formErrors py-1"> {selectErr?.message}</p>
              )}
              <p
                className={clsx(
                  "rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent",
                  {
                    " text-blue-600  ": ticket.priority === "Low",
                    " text-orange-500 ": ticket.priority === "Medium",
                    " text-red-600 ": ticket.priority === "High",
                  }
                )}
              >
                {ticket.priority}
              </p>
            </div>
            <div className="overflow-hidden">
              <Select
                onValueChange={async (value) => {
                  const states = await updateSelectValues({
                    assign: value,
                    id: ticket.id,
                  });
                  setSelectErr(states);
                }}
              >
                <SelectTrigger
                  className="w-[50%] md:w-[40%] lg:w-[100%]"
                  name="assign"
                >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                  <SelectItem value="IT Technician">IT Technician</SelectItem>
                  <SelectItem value="Network administrator">
                    Network administrator
                  </SelectItem>
                </SelectContent>
              </Select>
              {selectErr?.message && ticket.id == selectErr?.id && (
                <p className="formErrors py-1"> {selectErr?.message}</p>
              )}
              <p>{ticket.assign}</p>
            </div>
            <div className="overflow-hidden">
              <Select
                onValueChange={async (value) => {
                  const states = await updateSelectValues({
                    status: value,
                    id: ticket.id,
                  });
                  setSelectErr(states);
                }}
              >
                <SelectTrigger
                  className="w-[50%] md:w-[40%] lg:w-[100%]"
                  name="status"
                >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Solved">Solved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {selectErr?.message && ticket.id == selectErr?.id && (
                <p className="formErrors py-1"> {selectErr?.message}</p>
              )}
              <p
                className={clsx(
                  "rounded-md px-1 inline-block bg-gray-200 dark:bg-transparent",
                  {
                    " text-blue-600  ": ticket.status === "Open",
                    " text-green-600 ": ticket.status === "Solved",
                    " text-slate-600": ticket.status === "Closed",
                  }
                )}
              >
                {ticket.status}
              </p>
            </div>
            <div>{dayjs().to(dayjs(ticket.created_at))}</div>
            <div>{dayjs().to(dayjs(ticket.updated_at))}</div>
          </motion.div>
        ))}
      {err && (
        <div>
          <p className="text-center text-green-500">
            No more available tickets
          </p>
        </div>
      )}
      {!tickets?.length && (
        <div>
          <p className="text-center font-bold text-green-500 text-[1.5em] mt-8">
            There are currently no available tickets, yay!
          </p>
        </div>
      )}
      <Button
        onClick={fetchMoreTickets}
        aria-disabled={loading}
        className="font-bold flex justify-center mx-auto my-2 bg-gradient-to-r
        from-purple-700 to-blue-700 hover:from-blue-700 hover:via-purple-700
        hover:to-red-600 hover:scale-105 transition-all duration-500"
      >
        {loading ? "Loading..." : "Show more tickets"}
        {!loading && <ChevronDown />}
      </Button>
    </div>
  );
}

