import { Inter } from 'next/font/google'
import './globals.css'
//import { UserProvider } from '@auth0/nextjs-auth0/client';

// components
import { ThemeProvider } from '@/app/_components/Theme-provider';
import Header from './_components/Header';
import MainFooter from './_components/Footer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import PageTransitionEffect from './_pageTransitionEffect';

// configs
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tickets management System',
  description: 'Our Help desk ticketing system empowers you to manage service tickets by tracking their lifecycles from ticket creation to resolution.',
}

export default async function RootLayout({ children }) {
const supabase = createServerComponentClient({ cookies })
const { data: { session }} = await supabase.auth.getSession();
const localUser = session?.user
const fname = localUser?.user_metadata?.fname
const email = localUser?.email
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header localUser={localUser} />
            <main
              className="min-h-[80vh] max-w-[2000px] mx-auto 
                  bg-gradient-to-r from-gray-200 to-slate-100  dark:from-slate-900 dark:from-10% dark:via-indigo-950 dark:via-80% dark:to-slate-800 dark:to-100% dark:text-slate-300"
            >
              <PageTransitionEffect>{children}</PageTransitionEffect>
            </main>
            <MainFooter fname={fname} email={email} />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
