"use client"
import { useState } from "react"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion"
import { animationsProps } from "@/app/_lib/animations";

export function Upload() {
    const [message, setMessage] = useState('')
    const [err, setErr] = useState('')

    async function handleFileUpload(event) {
        const supabase = createClientComponentClient()
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if(!sessionData?.session?.user){
            redirect('/login');
        }
        const user_id = sessionData?.session?.user?.id
        const avatarFile = event.target.files[0]
        const { data, error } = await supabase
          .storage
          .from('profile-photos')
          .upload(`avatars/${user_id}.jpg`, avatarFile, {
            cacheControl: '3600',
            upsert: true
          })
          error? setErr(error.message): setMessage('Uploaded successfully!');
    }
  return (
    <motion.div className="1"
    initial={animationsProps.initial}
    animate={animationsProps.animate}
    transition={animationsProps.transition}
    >
      <div className="grid items-center gap-1 w-full max-w-xs">
        <Label htmlFor="avatar">Upload photo:</Label>
        <Input id="avatar" type="file" name="avatar" onChange={handleFileUpload}/>
      </div>
      {err && (<p className="formErrors">{err}</p>)}
      {message && (<p className=" text-green-600">{message}</p>)}
    </motion.div>
  ) 
}
