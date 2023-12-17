"use client"
import { logOut } from "../(auth)/actions";

export default function LogOut() {
  return (
    <button onClick={async () => logOut()}>Sign out</button>
  )
}
