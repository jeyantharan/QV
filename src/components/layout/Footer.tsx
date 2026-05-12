import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--border)] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/QV Final Logo.svg"
                alt="QV Trattoria Logo"
                width={140}
                height={175}
                priority
                unoptimized
                className="w-auto h-24"
              />
            </Link>
            <p className="text-neutral-400 font-serif italic text-lg text-center md:text-left">
              “Freshly made pasta • Simple ingredients • Authentic flavors”
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-xl mb-6 text-[var(--accent)]">Contact</h4>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5 shrink-0 text-[var(--accent-dark)] mt-0.5" />
                <span>
                  20497 Leslie St,<br />
                  Queensville, Ontario,<br />
                  Canada L0G 1R0
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-5 h-5 shrink-0 text-[var(--accent-dark)]" />
                <a href="tel:+19054788801" className="hover:text-[var(--accent)] transition-colors">
                  +1 905 478 8801
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-xl mb-6 text-[var(--accent)]">Hours</h4>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Clock className="w-5 h-5 shrink-0 text-[var(--accent-dark)] mt-0.5" />
                <div>
                  <p className="text-neutral-300 mb-1">Wednesday – Sunday</p>
                  <p>4:00 PM – 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-neutral-500 text-sm mt-4">
                <em>Reservations Recommended</em>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-xl mb-6 text-[var(--accent)]">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/qvtrattoria?igsh=dmxvYjEwbzZ1cm9s" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-neutral-400 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61583439329026" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-neutral-400 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-600 gap-4">
          <p>© {new Date().getFullYear()} QV Trattoria. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
