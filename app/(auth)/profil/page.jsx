import { cookies } from 'next/headers'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from 'next/dynamic'

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Button } from "@/app/_components/ui/button"
import UpdateEmail from './UpdateEmail';
import { Upload } from './Upload';

//import ProfileForm from "./ProfileForm"
//disable prerendering on GetTickets client component
const ProfileForm = dynamic(() => import("./ProfileForm"), { ssr: false })

export default async function Profil() {
  const supabase = createServerComponentClient({cookies})
  const { data: { user } } = await supabase.auth.getUser()
  const user_metadata = user?.user_metadata
  const user_email = user?.email
  const user_id = user?.id
  return (
    <div className=' flex justify-center'>
      <div className='bg-gray-200 dark:bg-slate-800 p-2 lg:w-1/2'>
        <h2 className=' font-bold text-xl mb-2'>My profil</h2>
        <h3 className=' font-bold text-lg mb-2'>Avater</h3>
        <Upload />
        <h3 className=' font-bold text-lg'>Personal Info</h3>
        <ul className='ml-2'>
          <li>First name: {user_metadata?.fname}</li>
          <li>Last name: {user_metadata?.lname}</li>
          <li>Age: {user_metadata?.age}</li>
        </ul>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
                <ProfileForm user_metadata={user_metadata}/>
          </DialogContent>
        </Dialog>
        <h3 className=' font-bold text-lg mt-4'>Address</h3>
        <p>Email: {user_email}</p>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
                <UpdateEmail user_email={user_email}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

