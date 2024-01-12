import Link from "next/link"
import { getSession } from '@auth0/nextjs-auth0';

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
  
  export async function UserDropDown({localUser}) {
   const data  = await getSession();
   const auth0User = data?.user
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="User profile photo" className="p-1"><DropDownAvatar/></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {localUser && (<Link href="/profil" className='w-full'>
              Hello, {localUser?.user_metadata?.fname.charAt(0).toUpperCase() + localUser?.user_metadata?.fname.slice(1)}
            </Link>)}
{/*             {auth0User && (<Link href="/profil" className='w-full'>
              Hello, {auth0User?.given_name.charAt(0).toUpperCase() + auth0User?.given_name.slice(1)}
            </Link>)} */}
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
              <LogOut className="mr-2 h-4 w-4" />
              <LogOutComp />
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>)}
{/*           { !localUser && auth0User && (<DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <a href="/api/auth/logout">Sign out</a>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>)} */}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  