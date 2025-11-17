
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="group transition-all hover:drop-shadow-neon-primary" aria-label="Atelier Home UK, Homepage">
      <div className="flex items-center gap-2 transform transition-transform duration-200 group-hover:scale-105">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary transition-colors"
        >
          <path
            d="M14 2.33331L2.33333 8.16665V19.8333L14 25.6666L25.6667 19.8333V8.16665L14 2.33331Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.33333 8.16665L14 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 25.6666V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.6667 8.16665L14 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.4167 5.25L7.58333 11.0833"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-headline text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          Atelier
        </span>
      </div>
    </Link>
  );
}
