"use client"
import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function DeleteBtn() {
    const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className=" flex">
        <Trash2 /><span className="ml-1">{ !pending ? "Delete": "Deletting..." }</span>
    </button>
  )
}
