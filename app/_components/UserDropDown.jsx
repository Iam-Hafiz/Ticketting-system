import Link from "next/link"

import {
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    PlusCircle,
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
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
import { DropDownAvatar } from "./DropDownAvatar"
import LogOutComp from "./LogOut"
  
  export function UserDropDown({user}) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="user profile photo" className="p-1"><DropDownAvatar/></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {user && (<Link href="/profil" className='w-full'>
              Hello, {user?.user_metadata?.fname.charAt(0).toUpperCase() + user?.user_metadata?.fname.slice(1)}
            </Link>)}
          </DropdownMenuLabel>
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
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <Link href="/contact" className="w-full">Support</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!user && (          
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/login" className='px-1'>Sign in</Link>
          </DropdownMenuItem>)}
          {!user && (          
          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <Link href="/signup" className='px-1'>Sign up</Link>
          </DropdownMenuItem>)}
          { user && (<DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <LogOutComp />
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  