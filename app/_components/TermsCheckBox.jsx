import { Checkbox } from "./ui/checkbox";
import Link from 'next/link'

export function TermsCheckBox() {
  return (
    <div className="items-top flex space-x-2 my-4">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept Terms of Use and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our 
          <Link href="/policy/conditions"
                target="_blank" rel="noopener noreferrer" className='text-blue-700 hover:text-blue-800 dark:hover:text-purple-600 dark:text-purple-500 pl-1'>
                Terms of Service </Link> and
          <Link href="https://www.termsfeed.com/live/24044e3b-2ce5-4188-b9c5-25729873b6a5" 
                target="_blank" rel="noopener noreferrer" className='text-blue-700 hover:text-blue-800 dark:hover:text-purple-600 dark:text-purple-500 pl-1'>
                Privacy Policy. </Link>
        </p>
      </div>
    </div>
  )
}
