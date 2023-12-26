"use client"
import { useFormStatus } from 'react-dom';
import { Button } from "@/app/_components/ui/button";

export default function SubmitBtn({initValue, loadingValue}) {
    const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} className="submit-btn">
        {pending ? loadingValue: initValue}
    </Button>
  )
}
