import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/app/_components/ui/alert-dialog"
  import { Button } from "@/app/_components/ui/button"
import DeleteBtn from "./DeleteBtn"

  export function DeleteAccount(){
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Confirm</AlertDialogAction> */}
            <DeleteBtn />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  