import Link from "next/link"

import {
    LogOut,
    Settings,
    User,
    UserPlus,
  } from "lucide-react"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
import { DropDownAvatar } from "./DropDownAvatar"
import LogOut from "./LogOut"
  
  export async function UserDropDown({localUser}) {
    const auth0User = null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="User profile photo" className="p-1 relative">
            {localUser && (<div className=" absolute left-1 top-1 w-3 h-3 bg-green-500 rounded-full z-10"></div>)}
            {!localUser && (<div className=" absolute left-1 top-1 w-3 h-3 bg-gray-400 rounded-full z-10"></div>)}            
            <DropDownAvatar user_id={localUser?.id}/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {localUser && (
            <DropdownMenuLabel>
              <Link href="/profil" className='w-full'>
                Hello, {localUser?.user_metadata?.fname.charAt(0).toUpperCase() + localUser?.user_metadata?.fname.slice(1)}
              </Link>
            </DropdownMenuLabel>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
                <Link href="/profil" className="w-full">Profile</Link>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
                <Link href="/profil" className="w-full">Settings</Link>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {!localUser && !auth0User && (          
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/login" className='px-1'>Sign in</Link>
          </DropdownMenuItem>)}
          {!localUser && !auth0User && (          
          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <Link href="/signup" className='px-1'>Sign up</Link>
          </DropdownMenuItem>)}
          { localUser && !auth0User && (<DropdownMenuItem>
{/*               <LogOut className="mr-2 h-4 w-4" />
 */}            <LogOut />
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  