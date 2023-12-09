import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

export default function MainFooter() {
  return (
    <footer className='sm:grid grid-cols-3 gap-3 my-2 px-1 max-w-[2000px] mx-auto flex flex-col justify-center items-center'>
        <div className='max-w-sm px-2'> 
            <div className='flex items-start flex-col justify-start'>
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
        </div>
        <div className='flex justify-center items-center flex-col'>
            <p className='mb-4'>Copywrite&copy;HelpDesk 12/2023</p>
            <div>
                <h4>Suivez-nous sur les réseaux sociaux</h4>
                <nav className='flex flex-wrap justify-around mt-2'>
                    <a href="https://fr.linkedin.com/" aria-label="lien linkedin" target="_blank" rel="noopener noreferrer" className='p-1 bg-blue-800 rounded-md m-1'>
                        <Linkedin color='white'/></a>
                    <a href="https://fr-fr.facebook.com/" aria-label="lien facebook" target="_blank" rel="noopener noreferrer" className=' p-1 bg-blue-800 rounded-md m-1'>
                        <Facebook color='white'/>
                    </a>
                    <a href="https://www.instagram.com/" aria-label="lien instagram" target="_blank" rel="noopener noreferrer" className=' p-1 bg-fuchsia-600 rounded-md m-1'>
                        <Instagram color='white'/>
                    </a>
                    <a href="https://twitter.com/?lang=fr" aria-label="lien twitter" target="_blank" rel="noopener noreferrer" className='p-1 bg-blue-800 rounded-md m-1'>
                        <Twitter color='white'/>
                    </a>
                    <a href="https://www.youtube.com/" aria-label="lien youtube" target="_blank" rel="noopener noreferrer" className='p-1 bg-red-600 rounded-md m-1'>
                        <Youtube color='white'/>
                    </a>
                </nav>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
            <p>Lorem ipsum dolor sit amet consectetur a adipiearum quod eaque voluptas nemo atque!</p>
            <p>Lorem ipsum dolor si obcaecati quisquam quo earum quod eaque voluptas nemo atque!</p>
        </div>
    </footer>
  )
}
