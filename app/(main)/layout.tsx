import Link from 'next/link';
import '../globals.css'; // Adjust this path if globals.css is elsewhere

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link href="/products">All Products</Link>
        </nav>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}