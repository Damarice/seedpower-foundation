const WHATSAPP_URL =
  'https://wa.me/254758585750?text=Hello%20SeedPower%20Foundation.%20I%20would%20like%20to%20learn%20more%20about%20your%20work%20and%20how%20I%20can%20get%20involved.';

export function WhatsAppContactButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SeedPower Foundation on WhatsApp"
      className={[
        'group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center',
        'desktop:bottom-[calc(5rem+env(safe-area-inset-bottom))]',
        'rounded-full bg-[#25D366] text-[#075E54]',
        'shadow-[0_4px_14px_rgba(0,0,0,0.24)]',
        'transition-[transform,box-shadow,background-color] duration-[var(--transition-std)]',
        'hover:scale-105 hover:bg-[#20BD5A] hover:shadow-[0_6px_18px_rgba(0,0,0,0.28)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
        'focus-visible:outline-[#075E54]',
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
      ].join(' ')}
    >
      <svg
        className="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 3.5a12.3 12.3 0 0 0-10.6 18.5L4 28l6.2-1.6A12.3 12.3 0 1 0 16 3.5Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M12.1 10.2c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.5 1.5-1.5 3.7s1.5 4.3 1.7 4.6c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6-.5-.2-2.6-1.3-3-1.4-.4-.1-.7-.2-1 .3-.3.5-1.1 1.4-1.3 1.7-.2.3-.5.4-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.1-2.2-2.5-2.5-2.9-.3-.5 0-.7.2-.9.2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8l-1.3-3.1Z"
          fill="currentColor"
        />
      </svg>
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap desktop:block',
          'rounded-md bg-[var(--color-bg-dark)] px-3 py-2',
          'text-sm font-semibold text-white shadow-[var(--shadow-dropdown)]',
          'opacity-0 transition-opacity duration-[var(--transition-fast)]',
          'group-hover:opacity-100 group-focus-visible:opacity-100',
          'motion-reduce:transition-none',
        ].join(' ')}
      >
        Chat with us
      </span>
    </a>
  );
}
