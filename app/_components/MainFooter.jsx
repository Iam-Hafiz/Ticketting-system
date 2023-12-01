import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function MainFooter() {
  return (
    <footer className='flex justify-between'>
        <div>
            <h4>Abonnez-vous à notre newsletter:</h4>
            <form action="/newsletter">
                <div>
                    <label for="newsletter-firstname" className="pt-2 pb-1"> Prénom:</label>
                    <Input type="text" id="newsletter-firstname" name="firstname" />
                </div>
                <div>
                    <label for="newsletter-email" className="pb-1 pb-1"> E-mail:</label>
                    <Input type="email" id="newsletter-email" name="email" />
                </div>
                <Button className="hover:bg-violet-700">Submit</Button>
            </form>
        </div>
        <div>
            <p lang="en">Copywrite &copy; HelpDesk 12/2023</p>
        </div>
    </footer>
  )
}
