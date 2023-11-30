"use client"
import supabase from "@/app/_lib/subapase";
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Form() {
    const router = useRouter();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)
  
    const handleSubmit = async (e)  => {
      //console.log("supa:", supabase);
      e.preventDefault()
      setIsLoading(true);
  
      const newTicket = { title, body, priority, user_email: 'dooney@k.dev' }
      const {error} = await supabase
        .from('tickets')
        .insert(newTicket)
        console.log('supa: ', supabase)
  
/*       if (error) {
        router.refresh();
        router.push('/tickets')
      } */
      
    }
  return (
    <form onSubmit={handleSubmit} className="w-1/2">
        <label htmlFor="cTicketTitle">Title</label>
        <input 
            type="text" 
            id="cTicketTitle"
            value={title}
            onChange={(e) => { setTitle(e.target.value)}}
        />
        <label htmlFor="cTicketBody">Body:</label>
        <input 
            type="text" 
            id="cTicketBody"
            value={body}
            onChange={(e) => { setBody(e.target.value)}}
        />
        <label htmlFor="cTicketPriority">Priority:</label>
        <select
            type="select" 
            name="priority" 
            id="cTicketPriority"
            value={priority}
            onChange={(e) => { setPriority(e.target.value)}}  
        >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
        </select>
        <button
            disabled={isLoading}
            className="bg-primary text-gray-800 rounded-3xl hover:bg-gray-300 hover:text-red-800"
        >
            {!isLoading && ("Create Ticket")}
            {isLoading && ("Creating")}
        </button>
    </form>
  )
}
