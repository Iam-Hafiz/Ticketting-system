import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./ui/avatar"
  
  export function DropDownAvatar({user_id}) {
    return (
      <Avatar>
        <AvatarImage src={"https://fxjyfigvmmricrqlyywl.supabase.co/storage/v1/object/public/profile-photos/avatars/"
                        + user_id + ".jpg"} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  