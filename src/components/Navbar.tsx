import React, { useState } from 'react';
import { Calendar, Menu, X, BookmarkCheck } from 'lucide-react';
import { RESORT_INFO } from '../data/resortData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  savedBookingsCount: number;
  onOpenMyBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currency,
  onToggleCurrency,
  savedBookingsCount,
  onOpenMyBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'gallery', label: 'Mountain Views' },
    { id: 'experiences', label: 'Dining & Experiences' },
    { id: 'location', label: 'Location & Ski' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D7] transition-all">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-none"
          aria-label="The Khyber Chinar Resort Home"
        >
          <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#1C2221] group-hover:text-[#A8791C] transition-colors">
            {RESORT_INFO.name}
          </span>
          <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#7A7469]">
            Kashmir · 8,690 FT
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A453C]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                currentPage === link.id
                  ? 'text-[#A8791C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#A8791C]'
                  : 'hover:text-[#1C2221]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + utility badges */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-medium border border-[#D5CABB] rounded text-[#4A453C] hover:bg-[#F2ECE1] transition-colors"
            title="Toggle Currency"
            aria-label={`Switch currency. Current is ${currency}`}
          >
            <span className="font-mono">{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
          </button>

          {/* My Reservations Button */}
          <button
            onClick={onOpenMyBookings}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4A453C] hover:text-[#1C2221] border border-[#D5CABB] rounded hover:bg-[#F2ECE1] transition-colors whitespace-nowrap"
            aria-label="View My Bookings"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-[#A8791C]" />
            <span>My Bookings</span>
            {savedBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#A8791C] text-white text-[10px] flex items-center justify-center font-mono">
                {savedBookingsCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('booking')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm whitespace-nowrap shrink-0"
            aria-label="Book Your Stay"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Your Stay</span>
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm whitespace-nowrap shrink-0"
            aria-label="Book Your Stay"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A453C] hover:text-[#1C2221] rounded"
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D7] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#F2ECE1] text-[#A8791C] font-semibold'
                    : 'text-[#4A453C] hover:bg-[#F2ECE1]/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E1D7] flex items-center justify-between">
            <button
              onClick={onToggleCurrency}
              className="px-3 py-1.5 text-xs font-medium border border-[#D5CABB] rounded text-[#4A453C]"
            >
              Currency: {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>
            <button
              onClick={() => {
                onOpenMyBookings();
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4A453C] border border-[#D5CABB] rounded"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-[#A8791C]" />
              <span>My Bookings ({savedBookingsCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
