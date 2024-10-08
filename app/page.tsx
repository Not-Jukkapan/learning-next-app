import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Page() {
  return (
    <main>
      <h1 className="font-bold">Hello world</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
