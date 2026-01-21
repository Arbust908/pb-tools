import Link from "next/link"

export const MainNav = () => {
  return (
    <nav className="bg-zinc-800 p-4 flex items-center justify-between">
      <Link href="/">
        Navbar
      </Link>
      <ul>
        <li>
          <Link href="/tools/dollar">Dollar Stats</Link>
        </li>
      </ul>
    </nav>
  )
}