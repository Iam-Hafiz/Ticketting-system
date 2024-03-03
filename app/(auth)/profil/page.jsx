import { cookies } from 'next/headers'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar';
import { DeleteAccount } from './DeleteAccount';

//disable prerendering on GetTickets client component
const ProfileForm = dynamic(() => import("./ProfileForm"), { ssr: false })

export default async function Profil() {
  const supabase = createServerComponentClient({cookies})
  const { data: { user } } = await supabase.auth.getUser()
  if(!user){ redirect('/login')}
  const user_metadata = user?.user_metadata
  const user_email = user?.email
  const user_id = user?.id
  return (
    <div className=' flex justify-center'>
      <div className='bg-gray-300 dark:bg-slate-900 py-2 lg:w-1/2 shadow-lg'>
        <div className='bg-gray-200 dark:bg-slate-800 px-2'>
          <Avatar>
              <div className="">
              <AvatarImage src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + user_id + 
                          process.env.NEXT_PUBLIC_IMAGE_EXTENSION }/>
              </div>
              <AvatarFallback>
                  {user_metadata?.fname?.charAt(0).toUpperCase()}
                  {user_metadata?.lname?.charAt(0).toUpperCase()}
              </AvatarFallback>
          </Avatar>
          <Upload />
        </div>
        <div className='bg-gray-200 dark:bg-slate-800 px-2'>
          <h3 className=' font-bold text-lg mt-2'>Personal Info</h3>
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
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
                  <ProfileForm user_metadata={user_metadata}/>
            </DialogContent>
          </Dialog>
        </div>
        <div className='bg-gray-200 dark:bg-slate-800 px-2'>
          <h3 className=' font-bold text-lg mt-2'>Address</h3>
          <p>Email: {user_email}</p>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
                  <UpdateEmail user_email={user_email}/>
            </DialogContent>
          </Dialog>
        </div>
        <div className='bg-gray-200 dark:bg-slate-800 px-2'>
          <h3 className=' font-bold text-lg mt-2'>Settings</h3>
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}

