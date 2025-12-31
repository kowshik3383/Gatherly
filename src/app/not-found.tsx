import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl">Page Not Found</h2>
        <p className="mb-8 text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="rounded-md bg-[#0E78F9] px-6 py-3 text-white transition-colors hover:bg-[#0E78F9]/90"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}