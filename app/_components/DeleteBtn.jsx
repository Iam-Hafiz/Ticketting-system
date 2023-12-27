"use client"
import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function DeleteBtn() {
    const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className="rounded-md flex py-1 px-3 hover:text-red-400">
        <Trash2 /><span className="ml-1">{ !pending ? "Confirm": "Deleting..." }</span>
    </button>
  )
}
