import { cookies } from 'next/headers'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import ProfileForm from "./ProfileForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Button } from "@/app/_components/ui/button"

export default async function Profil() {
  const supabase = createServerComponentClient({cookies})
  const { data, error } = await supabase.auth.getSession();
  let user_metadata = data?.session?.user?.user_metadata
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Edit Profile</Button>
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
  )
}

