import Link from "next/link"

export default function notfound() {
  return (
    <main>
        <h2 className="text-3xl">Sorry there was a problem</h2>
        <p>We couldn&apos;t find the tickets you were looking for!</p>
        <p>Go back to the <Link href="/tickets" className="text-2xl">tickets</Link></p>
    </main>
  )
}