import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ChevronRight, Wind, Snowflake, Mountain } from 'lucide-react';
import { RESORT_INFO, ROOMS_CATALOG } from '../data/resortData';

interface HeroSectionProps {
  onStartBooking: (params: { checkIn: string; checkOut: string; guests: number; roomId: string }) => void;
  onExploreRooms: () => void;
  onExploreExperiences: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooking,
  onExploreRooms,
  onExploreExperiences,
}) => {
  // Default to sensible future dates
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 7);
  const defaultCheckOut = new Date(defaultCheckIn);
  defaultCheckOut.setDate(defaultCheckIn.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState('all');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBooking({
      checkIn,
      checkOut,
      guests,
      roomId: selectedRoomId === 'all' ? ROOMS_CATALOG[0].id : selectedRoomId,
    });
  };

  return (
    <div className="relative">
      {/* Hero Visual Area with Measured Scrim */}
      <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#151918]">
        <img
          src="/src/assets/images/hero_kashmir_resort_1794329963444.jpg"
          alt="The Khyber Chinar Resort nestled in Kashmir pine valley facing snow-capped Pir Panjal peaks"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151918] via-[#151918]/60 to-[#151918]/30" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-36 space-y-6">
          {/* Subtle Editorial Kicker (No Pill) */}
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-[#E5B555]">
            <Mountain className="w-4 h-4" />
            <span>Highland Sanctuary of Kashmir · Pir Panjal Range</span>
          </div>

          {/* Headline - Balanced */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.15] max-w-4xl mx-auto text-balance">
            Where Himalayan Snow Peaks Meet Royal Kashmiri Warmth
          </h1>

          {/* Value Proposition */}
          <p className="text-base sm:text-lg text-[#EDE7DD] max-w-2xl mx-auto font-light leading-relaxed">
            Perched at 8,690 feet, indulge in hand-carved cedar timber suites, steaming saffron
            Kahwa by crackling fireplaces, and ski-in access to the majestic Apharwat slopes.
          </p>

          {/* Dual Exploration Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreRooms}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1C2221] bg-[#FAF8F5] hover:bg-white rounded transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Suites & Chalets</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreExperiences}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 hover:border-white/70 hover:bg-white/10 rounded transition-all backdrop-blur-sm"
            >
              Curated Experiences
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mountain Status & Online Booking Engine Quick Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        {/* Weather & Mountain Stats Strip */}
        <div className="bg-[#1C2220] text-[#D8D2C6] rounded-t-xl px-6 py-2.5 border-t border-x border-[#333D3A] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#E5B555]">
              <Snowflake className="w-3.5 h-3.5" />
              <span className="font-medium">{RESORT_INFO.weather.tempC}°C / {RESORT_INFO.weather.tempF}°F</span>
              <span className="text-[#8D887E]">· {RESORT_INFO.weather.condition}</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[#C4BEB2]">
              <Wind className="w-3.5 h-3.5 text-[#E5B555]" />
              <span>Snow Base: <strong className="text-white font-mono">{RESORT_INFO.weather.snowDepth}</strong></span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#A8A196]">
            <span>Gondola: <strong className="text-emerald-400">{RESORT_INFO.weather.gondolaStatus}</strong></span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Elevation: {RESORT_INFO.altitude}</span>
          </div>
        </div>

        {/* Contiguous Booking Bar Card */}
        <form
          onSubmit={handleQuickBook}
          className="bg-white rounded-b-xl rounded-tr-xl md:rounded-tr-none shadow-xl border border-[#E3DBD0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Check-In */}
          <div className="space-y-1.5">
            <label htmlFor="quick-checkin" className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A8791C]" />
              <span>Check-in Date</span>
            </label>
            <input
              id="quick-checkin"
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label htmlFor="quick-checkout" className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A8791C]" />
              <span>Check-out Date</span>
            </label>
            <input
              id="quick-checkout"
              type="date"
              value={checkOut}
              min={checkIn || formatDate(today)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
              required
            />
          </div>

          {/* Room Selection */}
          <div className="space-y-1.5">
            <label htmlFor="quick-room" className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#A8791C]" />
              <span>Room Preference</span>
            </label>
            <select
              id="quick-room"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
            >
              <option value="all">Any Available Luxury Suite</option>
              {ROOMS_CATALOG.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label htmlFor="quick-guests" className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#A8791C]" />
              <span>Guests</span>
            </label>
            <select
              id="quick-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
            >
              <option value={1}>1 Guest (Solo Traveler)</option>
              <option value={2}>2 Guests (Couple)</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests (Family Suite)</option>
              <option value={5}>5+ Guests (Penthouse)</option>
            </select>
          </div>

          {/* CTA Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[42px] inline-flex items-center justify-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#A8791C] hover:bg-[#8D6415] rounded transition-all shadow-sm"
            >
              <span>Check Rates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
