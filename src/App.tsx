import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { RoomCard } from './components/RoomCard';
import { RoomModal } from './components/RoomModal';
import { BookingEngine, ConfirmedReservation } from './components/BookingEngine';
import { MyBookingsModal } from './components/MyBookingsModal';
import { MountainViewsGallery } from './components/MountainViewsGallery';
import { ExperiencesSection } from './components/ExperiencesSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ROOMS_CATALOG, Room, RESORT_INFO } from './data/resortData';
import {
  Mountain,
  ChevronRight,
  ShieldCheck,
  Flame,
  Coffee,
  Sparkles,
  Filter,
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Selected room for detailed modal
  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);

  // Pre-selected parameters for booking engine
  const [bookingParams, setBookingParams] = useState<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  // Room catalog filter in "Rooms & Suites" page
  const [roomFilter, setRoomFilter] = useState<'all' | 'suite' | 'chalet' | 'penthouse'>('all');

  // Saved bookings (stored in localStorage)
  const [savedBookings, setSavedBookings] = useState<ConfirmedReservation[]>(() => {
    try {
      const stored = localStorage.getItem('khyber_chinar_reservations');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    // Default sample reservation for immediate testability & luxury preview
    return [
      {
        code: 'KSH-84291',
        room: ROOMS_CATALOG[0],
        checkInDate: '2026-12-24',
        checkOutDate: '2026-12-28',
        nights: 4,
        adultsCount: 2,
        childrenCount: 0,
        selectedAddOns: [
          {
            id: 'addon-wazwan',
            name: 'Royal Wazwan 7-Course Gastronomy',
            pricePerStay: 4800,
            description: 'Authentic Kashmiri royal banquet on engraved copper Traami.',
            category: 'dining',
          },
          {
            id: 'addon-gondola',
            name: 'VIP Gulmarg Gondola Fast-Track Passes',
            pricePerStay: 3800,
            description: 'Phase 1 & Phase 2 priority cable car passes to Apharwat Peak.',
            category: 'adventure',
          },
        ],
        discountCode: 'HIMALAYAS15',
        discountAmount: 32490,
        taxAmount: 22093,
        heritageCess: 2762,
        grandTotal: 208965,
        guestName: 'Khanday Jeelani',
        guestEmail: 'khandayjeelani00@gmail.com',
        guestPhone: '+91 94190 12345',
        specialRequests: 'High floor suite with unobstructed sunrise view of Apharwat Peak.',
        bookingTimestamp: '2026-11-05T10:00:00.000Z',
        status: 'Confirmed',
      },
    ];
  });

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Sync saved bookings with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khyber_chinar_reservations', JSON.stringify(savedBookings));
    } catch {
      // ignore
    }
  }, [savedBookings]);

  // Handle URL hash changes for easy deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'rooms', 'gallery', 'experiences', 'booking', 'location'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add confirmed reservation
  const handleBookingSuccess = (newReservation: ConfirmedReservation) => {
    setSavedBookings((prev) => [newReservation, ...prev]);
  };

  const handleCancelBooking = (code: string) => {
    setSavedBookings((prev) =>
      prev.map((b) => (b.code === code ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  // Quick book trigger from Hero
  const handleQuickBook = (params: { checkIn: string; checkOut: string; guests: number; roomId: string }) => {
    setBookingParams({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests,
      roomId: params.roomId,
    });
    navigateTo('booking');
  };

  // Direct room selection from catalog
  const handleSelectRoomToBook = (roomId: string) => {
    setBookingParams({ roomId });
    navigateTo('booking');
  };

  // Filtered rooms in rooms view
  const filteredRooms =
    roomFilter === 'all'
      ? ROOMS_CATALOG
      : ROOMS_CATALOG.filter((r) => r.category === roomFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2221]">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'INR' ? 'USD' : 'INR'))}
        savedBookingsCount={savedBookings.filter((b) => b.status === 'Confirmed').length}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* PAGE 1: HOME (OVERVIEW) */}
        {currentPage === 'home' && (
          <div className="space-y-16">
            <HeroSection
              onStartBooking={handleQuickBook}
              onExploreRooms={() => navigateTo('rooms')}
              onExploreExperiences={() => navigateTo('experiences')}
            />

            {/* Kashmiri Heritage & Mountain Craft Section */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#A8791C]">
                    <Mountain className="w-4 h-4" />
                    <span>The Essence of Kashmir</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2221] leading-tight text-balance">
                    Handcrafted in Deodar Cedar, Warmed by Kashmiri Soul
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A453C] leading-relaxed">
                    Set against the sheer amphitheater of the Pir Panjal mountains, The Khyber Chinar
                    is an architectural homage to Kashmir’s royal past. Master artisans spent years
                    carving the geometric Khatamband ceilings from fragrant deodar wood, laying local
                    sandstone fireplaces, and curating antique brass samovars that steep golden saffron tea.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#3E382E]">
                    <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E3DBD0] rounded-lg">
                      <Flame className="w-5 h-5 text-[#A8791C] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C2221] font-medium">Stone Hearth Fireplaces</strong>
                        <span className="text-[#655E52]">Authentic crackling pine logs in every suite and salon</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E3DBD0] rounded-lg">
                      <Coffee className="w-5 h-5 text-[#A8791C] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1C2221] font-medium">Pampore Saffron Kahwa</strong>
                        <span className="text-[#655E52]">Brewed freshly in traditional copper samovars</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo('gallery')}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8791C] hover:text-[#8D6415] transition-colors"
                    >
                      <span>Explore Mountain Perspectives & Craft</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Visual Composition */}
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#E3DBD0] bg-black">
                    <img
                      src="/src/assets/images/room_presidential_suite_1794329963452.jpg"
                      alt="Luxury Kashmiri presidential suite with panoramic mountain window"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-[#151918]/85 backdrop-blur-md p-4 rounded-xl text-white flex items-center justify-between text-xs">
                      <div>
                        <strong className="block font-serif text-sm">The Royal Chinar Presidential Suite</strong>
                        <span className="text-[#EDE7DD] text-[11px]">Uninterrupted vistas of Apharwat Peak</span>
                      </div>
                      <button
                        onClick={() => handleSelectRoomToBook(ROOMS_CATALOG[0].id)}
                        className="px-3 py-1.5 bg-[#A8791C] text-white rounded text-[11px] font-semibold uppercase tracking-wider hover:bg-[#8D6415]"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Luxury Suites Strip */}
            <section className="py-12 bg-white border-y border-[#E8E1D7]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold">
                      Accommodations
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C2221]">
                      Featured Luxury Suites & Chalets
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('rooms')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8791C] hover:underline whitespace-nowrap"
                  >
                    <span>View All 5 Room Categories</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {ROOMS_CATALOG.slice(0, 3).map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      currency={currency}
                      onSelectRoom={handleSelectRoomToBook}
                      onViewDetails={setViewingRoom}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Dining & Experiences Spotlight */}
            <ExperiencesSection
              currency={currency}
              onBookExperience={() => {
                navigateTo('booking');
              }}
            />

            {/* Scenic Views Teaser */}
            <MountainViewsGallery />

            {/* Social Proof & Testimonials */}
            <ReviewsSection />

            {/* Direct Booking CTA Block */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="relative rounded-2xl overflow-hidden bg-[#151918] text-white p-8 sm:p-14 text-center space-y-6 border border-[#2F3735]">
                <div className="max-w-2xl mx-auto space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#E5B555] font-semibold">
                    The Highland Winter & Summer Seasons
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    Awaken in the Heart of the Kashmir Himalayas
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D1CCC4] leading-relaxed">
                    Book directly with our mountain concierge for complimentary airport pickup coordination,
                    saffron tea ceremonies, and direct ski-pass arrangements.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C2221] bg-[#FAF8F5] hover:bg-white rounded transition-all shadow-md"
                  >
                    Check Availability & Book Online
                  </button>
                  <button
                    onClick={() => navigateTo('location')}
                    className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 hover:border-white/70 rounded transition-all"
                  >
                    View Resort Location & Ski Slopes
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: ROOMS & SUITES */}
        {currentPage === 'rooms' && (
          <div className="py-12 space-y-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold">
                  Alpine Accommodations
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2221]">
                  Luxury Rooms, Chalets & Suites
                </h1>
                <p className="text-sm text-[#5D574C]">
                  Each sanctuary at The Khyber Chinar is oriented to capture the majestic Pir Panjal
                  range, fitted with radiant underfloor heating, carved walnut wood, and deep soaking tubs.
                </p>

                {/* Filter Tabs */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#EFE9DF] rounded-lg max-w-lg mx-auto">
                  <button
                    onClick={() => setRoomFilter('all')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                      roomFilter === 'all'
                        ? 'bg-white text-[#1C2221] shadow-sm font-semibold'
                        : 'text-[#635C50] hover:text-[#1C2221]'
                    }`}
                  >
                    All Suites ({ROOMS_CATALOG.length})
                  </button>
                  <button
                    onClick={() => setRoomFilter('suite')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                      roomFilter === 'suite'
                        ? 'bg-white text-[#1C2221] shadow-sm font-semibold'
                        : 'text-[#635C50] hover:text-[#1C2221]'
                    }`}
                  >
                    Palatial Suites
                  </button>
                  <button
                    onClick={() => setRoomFilter('chalet')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                      roomFilter === 'chalet'
                        ? 'bg-white text-[#1C2221] shadow-sm font-semibold'
                        : 'text-[#635C50] hover:text-[#1C2221]'
                    }`}
                  >
                    Timber Chalets
                  </button>
                  <button
                    onClick={() => setRoomFilter('penthouse')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                      roomFilter === 'penthouse'
                        ? 'bg-white text-[#1C2221] shadow-sm font-semibold'
                        : 'text-[#635C50] hover:text-[#1C2221]'
                    }`}
                  >
                    Alpine Penthouse
                  </button>
                </div>
              </div>

              {/* Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    currency={currency}
                    onSelectRoom={handleSelectRoomToBook}
                    onViewDetails={setViewingRoom}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: MOUNTAIN VIEWS & GALLERY */}
        {currentPage === 'gallery' && <MountainViewsGallery />}

        {/* PAGE 4: DINING & EXPERIENCES */}
        {currentPage === 'experiences' && (
          <ExperiencesSection
            currency={currency}
            onBookExperience={() => navigateTo('booking')}
          />
        )}

        {/* PAGE 5: ONLINE BOOKING ENGINE */}
        {currentPage === 'booking' && (
          <BookingEngine
            rooms={ROOMS_CATALOG}
            initialRoomId={bookingParams.roomId}
            initialCheckIn={bookingParams.checkIn}
            initialCheckOut={bookingParams.checkOut}
            initialGuests={bookingParams.guests}
            currency={currency}
            onBookingSuccess={handleBookingSuccess}
            onExploreMore={() => navigateTo('home')}
          />
        )}

        {/* PAGE 6: LOCATION & CONCIERGE */}
        {currentPage === 'location' && <LocationSection />}
      </main>

      {/* Room Details Modal */}
      <RoomModal
        room={viewingRoom}
        currency={currency}
        onClose={() => setViewingRoom(null)}
        onBookNow={handleSelectRoomToBook}
      />

      {/* My Bookings / Reservations Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={savedBookings}
        onCancelBooking={handleCancelBooking}
        currency={currency}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
