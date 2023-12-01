import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function MainFooter() {
  return (
    <footer className='max-w-screen-2xl mx-auto grid grid-cols-3 gap-3 my-4 px-4'>
        <div className='max-w-sm'> 
            <h4 className='font-bold'>Abonnez-vous à notre newsletter:</h4>
            <form action="/newsletter">
                <div>
                    <label htmlFor="newsletter-firstname" className="pt-2 pb-1"> Prénom:</label>
                    <Input type="text" id="newsletter-firstname" name="firstname" />
                </div>
                <div>
                    <label htmlFor="newsletter-email" className="pt-2 pb-1"> E-mail:</label>
                    <Input type="email" id="newsletter-email" name="email" />
                </div>
                <Button className="hover:bg-violet-700 my-2">Submit</Button>
            </form>
        </div>
        <div>
            <p className='mb-6'>Copywrite &copy; HelpDesk 12/2023</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde quasi obcaecati quisquam quo earum quod eaque voluptas nemo atque!</p>
        </div>
        <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. lor sit amet consectetur adipisicing elit Enim unde quasi obcaecati quisquam quo earum quod eaque voluptas nemo atque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde quasi obcaecati quisquam quo earum quod eaque voluptas nemo atque!</p>
        </div>
    </footer>
  )
}
