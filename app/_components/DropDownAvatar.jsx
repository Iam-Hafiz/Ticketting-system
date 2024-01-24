import { UserRound } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./ui/avatar"
  
  export function DropDownAvatar({user_id}) {
    return (
      <Avatar>
        <AvatarImage src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + user_id + 
            process.env.NEXT_PUBLIC_IMAGE_EXTENSION } alt="User photo" />
        <AvatarFallback><UserRound /></AvatarFallback>
      </Avatar>
    )
  }
  