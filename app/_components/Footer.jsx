import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function MainFooter() {
  return (
    <footer className='grid grid-cols-1 sm:grid-cols-3 sm:gap-3 p-2 max-w-[2000px] mx-auto
        bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800 dark:text-slate-300'>
        <div className='max-w-sm px-2'> 
            <div className='flex flex-col justify-center items-center sm:justify-start sm:items-start'>
                <p className='font-bold'>Abonnez-vous à notre newsletter:</p>
                <form action="/newsletter">
                    <div>
                        <label htmlFor="newsletter-firstname" className="pt-2 pb-1"> Prénom:</label>
                        <Input type="text" id="newsletter-firstname" name="firstname" />
                    </div>
                    <div>
                        <label htmlFor="newsletter-email" className="pt-2 pb-1"> E-mail:</label>
                        <Input type="email" id="newsletter-email" name="email" />
                    </div>
                    <Button className="my-2 hover:bg-gradient-to-r
                    hover:from-blue-600 hover:via-purple-600 hover:to-red-500 hover:scale-110 transition-all duration-500">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
            <p className='mb-4'>Copywrite&copy;HelpDesk 12/2023</p>
            <div>
                <p>Suivez-nous sur les réseaux sociaux</p>
                <nav className='flex flex-wrap justify-around mt-2'>
                    <Link href="https://fr.linkedin.com/" aria-label="icon of linkedin" target="_blank" rel="noopener noreferrer" className='p-1 bg-blue-800 rounded-md m-1 hover:scale-110 transition-all duration-500'>
                        <Linkedin color='white'/>
                    </Link>
                    <Link href="https://fr-fr.facebook.com/" aria-label="icon of facebook" target="_blank" rel="noopener noreferrer" className=' p-1 bg-blue-800 rounded-md m-1 hover:scale-110 transition-all duration-500'>
                        <Facebook color='white'/>
                    </Link>
                    <Link href="https://www.instagram.com/" aria-label="icon of instagram" target="_blank" rel="noopener noreferrer" className=' p-1 bg-fuchsia-600 rounded-md m-1 hover:scale-110 transition-all duration-500'>
                        <Instagram color='white'/>
                    </Link>
                    <Link href="https://twitter.com/?lang=fr" aria-label="icon of twitter" target="_blank" rel="noopener noreferrer" className='p-1 bg-blue-800 rounded-md m-1 hover:scale-110 transition-all duration-500'>
                        <Twitter color='white'/>
                    </Link>
                    <Link href="https://www.youtube.com/" aria-label="icon of youtube" target="_blank" rel="noopener noreferrer" className='p-1 bg-red-600 rounded-md m-1 hover:scale-110 transition-all duration-500'>
                        <Youtube color='white'/>
                    </Link>
                </nav>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
            <Link href="/">Terms of Use and Privacy</Link>
            <p>Payment options</p>
            <div>
                <svg className="w-6 h-6 m-2 text-purple-800 bg-purple-500 inline-block hover:scale-110 p-1 rounded-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"/>
                    <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"/>
                </svg>
                <svg className="w-6 h-6 m-2 text-pink-800 bg-pink-500 inline-block hover:scale-110 p-1 rounded-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h2m3 0h5M1 5h18M2 1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
        </div>
    </footer>
  )
}
