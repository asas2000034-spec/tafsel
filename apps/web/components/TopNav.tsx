import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/" className="font-bold text-xl">Tafseel</Link>
    </nav>
  );
}
