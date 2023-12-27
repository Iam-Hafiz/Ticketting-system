
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import DeleteTicket from './DeleteTicket';

export default function ConfirmDialog({ticketId}) {

  return (
  <Dialog>
    <DialogTrigger className="py-1 px-3 hover:text-red-400"><Trash2 /></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently 
          remove this Ticket from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
            <DeleteTicket ticketId={ticketId}/>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}