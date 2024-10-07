import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Hello world</h1>
      <Link href="/users">Users</Link>
    </main>
  )
}