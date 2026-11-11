import React, { useState } from 'react';
import { Room, BOOKING_ADDONS_LIST } from '../data/resortData';
import {
  calculateBookingTotal,
  formatCurrency,
  validateGuestDetails,
  generateReservationCode,
  BookingAddOn,
  VALID_DISCOUNT_CODES,
} from '../utils/bookingCalculations';
import {
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Tag,
  Printer,
  Sparkles,
  Mountain,
  Phone,
  Mail,
  User,
  Clock,
  Check,
} from 'lucide-react';

export interface ConfirmedReservation {
  code: string;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adultsCount: number;
  childrenCount: number;
  selectedAddOns: BookingAddOn[];
  discountCode?: string;
  discountAmount: number;
  taxAmount: number;
  heritageCess: number;
  grandTotal: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  bookingTimestamp: string;
  status: 'Confirmed' | 'Cancelled';
}

interface BookingEngineProps {
  rooms: Room[];
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  currency: 'INR' | 'USD';
  onBookingSuccess: (reservation: ConfirmedReservation) => void;
  onExploreMore: () => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  rooms,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  currency,
  onBookingSuccess,
  onExploreMore,
}) => {
  // Dates initialization
  const today = new Date();
  const defIn = new Date(today);
  defIn.setDate(today.getDate() + 7);
  const defOut = new Date(defIn);
  defOut.setDate(defIn.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Dates & Room, 2: Add-ons, 3: Guest Info, 4: Confirmed Voucher

  const [checkIn, setCheckIn] = useState(initialCheckIn || formatDate(defIn));
  const [checkOut, setCheckOut] = useState(initialCheckOut || formatDate(defOut));
  const [adults, setAdults] = useState(initialGuests);
  const [children, setChildren] = useState(0);

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || rooms[0]?.id || ''
  );

  const [selectedAddOns, setSelectedAddOns] = useState<BookingAddOn[]>([
    BOOKING_ADDONS_LIST[0], // default Wazwan experience pre-checked
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Guest fields
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedReservation | null>(null);

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Price calculations
  const priceBreakdown = calculateBookingTotal({
    checkInDate: checkIn,
    checkOutDate: checkOut,
    basePricePerNight: currentRoom ? currentRoom.pricePerNightINR : 30000,
    adultsCount: adults,
    childrenCount: children,
    maxBaseGuests: currentRoom?.maxGuests || 2,
    selectedAddOns,
    discountCode: appliedPromo,
  });

  const toggleAddOn = (addon: BookingAddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (!clean) return;

    if (VALID_DISCOUNT_CODES[clean]) {
      setAppliedPromo(clean);
      setPromoMessage({
        text: `Promo applied: ${VALID_DISCOUNT_CODES[clean].label}`,
        isError: false,
      });
    } else {
      setPromoMessage({
        text: 'Invalid or expired privilege voucher code. Try "HIMALAYAS15" or "KASHMIR2026"',
        isError: true,
      });
    }
  };

  const handleProceedToStep2 = () => {
    if (!priceBreakdown.isDateValid) {
      alert(priceBreakdown.errorMessage || 'Please select valid check-in and check-out dates.');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleProceedToStep3 = () => {
    setStep(3);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateGuestDetails({
      fullName: guestName,
      email: guestEmail,
      phone: guestPhone,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});

    const newReservation: ConfirmedReservation = {
      code: generateReservationCode(),
      room: currentRoom,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights: priceBreakdown.nights,
      adultsCount: adults,
      childrenCount: children,
      selectedAddOns,
      discountCode: appliedPromo || undefined,
      discountAmount: priceBreakdown.discountAmount,
      taxAmount: priceBreakdown.taxAmount,
      heritageCess: priceBreakdown.heritageCess,
      grandTotal: priceBreakdown.grandTotal,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequests: specialRequests.trim() || undefined,
      bookingTimestamp: new Date().toISOString(),
      status: 'Confirmed',
    };

    // Save in state & localStorage
    setConfirmedBooking(newReservation);
    onBookingSuccess(newReservation);
    setStep(4);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#A8791C]">
            <Mountain className="w-4 h-4" />
            <span>Direct Reservation & Mountain Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C2221]">
            Reserve Your Himalayan Sanctuary
          </h2>
          <p className="text-xs sm:text-sm text-[#5D574C]">
            Direct booking benefits: Guaranteed best rates, complimentary saffron Kahwa welcome,
            and priority Gulmarg ski & Gondola concierge coordination.
          </p>
        </div>

        {/* Step Indicator (Non-pill clean tabs) */}
        {step !== 4 && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between border-b border-[#E3DBD0] pb-3 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 pb-1 transition-colors ${
                  step === 1 ? 'text-[#A8791C] font-semibold border-b-2 border-[#A8791C]' : 'text-[#7A7469]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#1C2221] text-white text-[11px] flex items-center justify-center font-mono">
                  1
                </span>
                <span>Select Dates & Suite</span>
              </button>

              <button
                onClick={() => (priceBreakdown.isDateValid ? setStep(2) : null)}
                className={`flex items-center gap-2 pb-1 transition-colors ${
                  step === 2 ? 'text-[#A8791C] font-semibold border-b-2 border-[#A8791C]' : 'text-[#7A7469]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#1C2221] text-white text-[11px] flex items-center justify-center font-mono">
                  2
                </span>
                <span>Kashmiri Add-ons</span>
              </button>

              <button
                onClick={() => (priceBreakdown.isDateValid ? setStep(3) : null)}
                className={`flex items-center gap-2 pb-1 transition-colors ${
                  step === 3 ? 'text-[#A8791C] font-semibold border-b-2 border-[#A8791C]' : 'text-[#7A7469]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#1C2221] text-white text-[11px] flex items-center justify-center font-mono">
                  3
                </span>
                <span>Guest Details</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed Voucher View */}
        {step === 4 && confirmedBooking && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[#E3DBD0] shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 print:border-none print:shadow-none">
            {/* Header Voucher Banner */}
            <div className="text-center space-y-3 border-b border-[#E8E1D7] pb-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold block">
                Official Reservation Voucher
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1C2221]">
                Reservation Confirmed
              </h3>
              <p className="text-xs text-[#5D574C] max-w-md mx-auto">
                We look forward to welcoming you to the Pir Panjal ranges of Kashmir.
                A confirmation has been saved and coordinated with our mountain concierge.
              </p>

              {/* Reference Code Tag */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded">
                  <span className="text-xs text-[#7A7469]">Booking Reference:</span>
                  <span className="font-mono text-lg font-bold text-[#1C2221] tracking-wider">
                    {confirmedBooking.code}
                  </span>
                </div>
              </div>
            </div>

            {/* Reservation Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF8F5] p-6 rounded-lg border border-[#E8E1D7] text-xs">
              <div className="space-y-3">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#A8791C]">
                  Stay Details
                </h4>
                <div className="space-y-1.5 text-[#3E382E]">
                  <div>
                    <strong className="text-[#1C2221]">Suite:</strong> {confirmedBooking.room.name}
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">View:</strong> {confirmedBooking.room.viewType}
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Duration:</strong> {confirmedBooking.nights} Night(s)
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Check-in:</strong> {confirmedBooking.checkInDate} (From 2:00 PM)
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Check-out:</strong> {confirmedBooking.checkOutDate} (Until 11:00 AM)
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Guests:</strong> {confirmedBooking.adultsCount} Adult(s)
                    {confirmedBooking.childrenCount > 0 ? `, ${confirmedBooking.childrenCount} Child(ren)` : ''}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#A8791C]">
                  Guest & Concierge Coordination
                </h4>
                <div className="space-y-1.5 text-[#3E382E]">
                  <div>
                    <strong className="text-[#1C2221]">Primary Guest:</strong> {confirmedBooking.guestName}
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Email:</strong> {confirmedBooking.guestEmail}
                  </div>
                  <div>
                    <strong className="text-[#1C2221]">Phone:</strong> {confirmedBooking.guestPhone}
                  </div>
                  {confirmedBooking.specialRequests && (
                    <div className="pt-1">
                      <strong className="text-[#1C2221]">Special Requests:</strong>{' '}
                      <span className="italic">{confirmedBooking.specialRequests}</span>
                    </div>
                  )}
                  <div className="pt-1 text-[11px] text-[#7A7469]">
                    Free cancellation up to 7 days prior to check-in.
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Add-ons */}
            {confirmedBooking.selectedAddOns.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C2221]">
                  Selected Himalayan Experiences
                </h4>
                <div className="divide-y divide-[#EFE8DD] border border-[#E8E1D7] rounded-lg overflow-hidden bg-white">
                  {confirmedBooking.selectedAddOns.map((addon) => (
                    <div key={addon.id} className="p-3 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-medium text-[#1C2221]">{addon.name}</span>
                        <p className="text-[11px] text-[#7A7469]">{addon.description}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#1C2221]">
                        {formatCurrency(addon.pricePerStay, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Ledger */}
            <div className="space-y-2 border-t border-[#E8E1D7] pt-4 text-xs">
              <div className="flex justify-between text-[#5D574C]">
                <span>Room charges ({confirmedBooking.nights} night(s)):</span>
                <span className="font-mono">
                  {formatCurrency(confirmedBooking.room.pricePerNightINR * confirmedBooking.nights, currency)}
                </span>
              </div>
              {confirmedBooking.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Voucher ({confirmedBooking.discountCode}):</span>
                  <span className="font-mono">-{formatCurrency(confirmedBooking.discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5D574C]">
                <span>Luxury Hospitality GST (12%):</span>
                <span className="font-mono">{formatCurrency(confirmedBooking.taxAmount, currency)}</span>
              </div>
              <div className="flex justify-between text-[#5D574C]">
                <span>Kashmir Eco & Heritage Cess (1.5%):</span>
                <span className="font-mono">{formatCurrency(confirmedBooking.heritageCess, currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1C2221] text-base pt-2 border-t border-[#E8E1D7]">
                <span>Total Amount:</span>
                <span className="font-mono text-xl text-[#A8791C]">
                  {formatCurrency(confirmedBooking.grandTotal, currency)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E1D7] print:hidden">
              <button
                onClick={handlePrintVoucher}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A453C] border border-[#DDD5C7] rounded hover:bg-[#FAF8F5]"
              >
                <Printer className="w-4 h-4" />
                <span>Print Reservation Voucher</span>
              </button>

              <button
                onClick={onExploreMore}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm"
              >
                <span>Explore Mountain Views & Dining</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Steps 1, 2, 3 Layout: Form on Left, Sticky Real-Time Ledger on Right */}
        {step !== 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Interactive Flow (Col-Span-8) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Step 1: Dates & Room Selection */}
              {step === 1 && (
                <div className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 space-y-8 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#1C2221] flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#A8791C]" />
                      <span>Select Your Dates & Guests</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Check-In */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#4A453C]">Check-in Date</label>
                        <input
                          type="date"
                          value={checkIn}
                          min={formatDate(today)}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        />
                      </div>

                      {/* Check-Out */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#4A453C]">Check-out Date</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || formatDate(today)}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        />
                      </div>

                      {/* Adults */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#4A453C]">Adults (12+ yrs)</label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        >
                          <option value={1}>1 Adult</option>
                          <option value={2}>2 Adults</option>
                          <option value={3}>3 Adults</option>
                          <option value={4}>4 Adults</option>
                          <option value={5}>5 Adults</option>
                        </select>
                      </div>

                      {/* Children */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#4A453C]">Children (0-11 yrs)</label>
                        <select
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                          className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        >
                          <option value={0}>0 Children</option>
                          <option value={1}>1 Child</option>
                          <option value={2}>2 Children</option>
                          <option value={3}>3 Children</option>
                        </select>
                      </div>
                    </div>

                    {!priceBreakdown.isDateValid && (
                      <p className="text-xs text-rose-600 font-medium">
                        {priceBreakdown.errorMessage}
                      </p>
                    )}
                  </div>

                  {/* Room Selection Grid */}
                  <div className="space-y-4 border-t border-[#E8E1D7] pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#1C2221]">
                        Select Your Luxury Suite
                      </h3>
                      <span className="text-xs text-[#7A7469]">
                        {rooms.length} Suites & Chalets Available
                      </span>
                    </div>

                    <div className="space-y-4">
                      {rooms.map((room) => {
                        const isSelected = room.id === selectedRoomId;
                        return (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoomId(room.id)}
                            className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between ${
                              isSelected
                                ? 'border-[#A8791C] bg-[#FAF7F2] shadow-sm'
                                : 'border-[#E3DBD0] hover:border-[#C7BEAF] bg-white'
                            }`}
                          >
                            <div className="flex gap-4 items-center">
                              <img
                                src={room.image}
                                alt={room.name}
                                className="w-24 h-20 rounded-lg object-cover shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[11px] text-[#7A7469]">
                                  <span>{room.sqft} sq ft</span>
                                  <span>·</span>
                                  <span>{room.viewType}</span>
                                  <span>·</span>
                                  <span>Up to {room.maxGuests} Guests</span>
                                </div>
                                <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C2221]">
                                  {room.name}
                                </h4>
                                <p className="text-xs text-[#635C50] line-clamp-1">
                                  {room.tagline}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8E1D7]">
                              <div className="text-left sm:text-right">
                                <div className="font-mono text-base font-bold text-[#1C2221] tabular-nums">
                                  {formatCurrency(room.pricePerNightINR, currency)}
                                </div>
                                <span className="text-[10px] text-[#7A7469]">/ night</span>
                              </div>

                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-[#A8791C] bg-[#A8791C] text-white'
                                    : 'border-[#CCC3B6]'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 1 Submit */}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleProceedToStep2}
                      disabled={!priceBreakdown.isDateValid}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#A8791C] hover:bg-[#8D6415] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all shadow-sm"
                    >
                      <span>Proceed to Add-ons</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Bespoke Add-ons */}
              {step === 2 && (
                <div className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold">
                      Tailor Your Kashmiri Stay
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C2221]">
                      Select Bespoke Himalayan Add-ons
                    </h3>
                    <p className="text-xs text-[#5D574C]">
                      Enhance your stay with authentic Kashmiri gastronomy, private dawn excursions,
                      and mountain spa rituals.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {BOOKING_ADDONS_LIST.map((addon) => {
                      const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'border-[#A8791C] bg-[#FAF7F2]'
                              : 'border-[#E3DBD0] hover:border-[#CCC3B6] bg-white'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-[#1C2221]">
                                {addon.name}
                              </span>
                              <span className="text-[10px] uppercase font-mono text-[#8D887E]">
                                ({addon.category})
                              </span>
                            </div>
                            <p className="text-xs text-[#635C50]">
                              {addon.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <span className="font-mono text-sm font-bold text-[#1C2221]">
                                +{formatCurrency(addon.pricePerStay, currency)}
                              </span>
                              <span className="block text-[10px] text-[#7A7469]">total stay</span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-[#A8791C] bg-[#A8791C] text-white'
                                  : 'border-[#CCC3B6]'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#E8E1D7]">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7A7469] hover:text-[#1C2221]"
                    >
                      ← Back to Suite Selection
                    </button>

                    <button
                      onClick={handleProceedToStep3}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#A8791C] hover:bg-[#8D6415] rounded transition-all shadow-sm"
                    >
                      <span>Proceed to Guest Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Guest Details Form */}
              {step === 3 && (
                <form
                  onSubmit={handleConfirmReservation}
                  className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 space-y-6 shadow-sm"
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold">
                      Guest Information & Concierge Coordination
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C2221]">
                      Guest Details
                    </h3>
                    <p className="text-xs text-[#5D574C]">
                      Please provide your contact details so our concierge can arrange your
                      welcome saffron tea and mountain access.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#A8791C]" />
                        <span>Primary Guest Full Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mehak Farooq"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className={`w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C] ${
                          formErrors.fullName ? 'border-rose-500' : 'border-[#DDD5C7]'
                        }`}
                        required
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-rose-600">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#A8791C]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. mehak@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className={`w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C] ${
                          formErrors.email ? 'border-rose-500' : 'border-[#DDD5C7]'
                        }`}
                        required
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-600">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#A8791C]" />
                        <span>Phone / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className={`w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C] ${
                          formErrors.phone ? 'border-rose-500' : 'border-[#DDD5C7]'
                        }`}
                        required
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-600">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#4A453C]">
                        Dietary Preferences & Special Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Vegetarian Wazwan preference, flight arrival time at Srinagar Airport (SXR), extra down pillows..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                      />
                    </div>
                  </div>

                  {/* Booking Guarantee Statement */}
                  <div className="p-4 bg-[#F5EFE6] rounded-lg border border-[#E3DBD0] flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#A8791C] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#5D574C] space-y-1">
                      <strong className="text-[#1C2221]">No Upfront Card Prepayment Required</strong>
                      <p>
                        Your reservation is guaranteed immediately. Payment can be settled upon check-in
                        at the resort via Credit/Debit card, UPI, or Cash on Arrival.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#E8E1D7]">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7A7469] hover:text-[#1C2221]"
                    >
                      ← Back to Add-ons
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#A8791C] hover:bg-[#8D6415] rounded transition-all shadow-md"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sticky Real-Time Price Ledger (Col-Span-4) */}
            <div className="lg:col-span-4 sticky top-28 bg-white rounded-xl border border-[#E3DBD0] shadow-md p-6 space-y-6">
              <div className="border-b border-[#E8E1D7] pb-4 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8376]">
                  Reservation Summary
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1C2221]">
                  {currentRoom.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#7A7469]">
                  <Mountain className="w-3.5 h-3.5 text-[#A8791C]" />
                  <span>{currentRoom.viewType}</span>
                  <span>·</span>
                  <span>{priceBreakdown.nights} Night(s)</span>
                </div>
              </div>

              {/* Room Image in Ledger */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <img
                  src={currentRoom.image}
                  alt={currentRoom.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Date & Guest Capsule */}
              <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E8E1D7] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#5D574C]">
                  <span>Check-in:</span>
                  <strong className="text-[#1C2221]">{checkIn}</strong>
                </div>
                <div className="flex items-center justify-between text-[#5D574C]">
                  <span>Check-out:</span>
                  <strong className="text-[#1C2221]">{checkOut}</strong>
                </div>
                <div className="flex items-center justify-between text-[#5D574C]">
                  <span>Guests:</span>
                  <strong className="text-[#1C2221]">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</strong>
                </div>
              </div>

              {/* Add-ons List if Selected */}
              {selectedAddOns.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8376]">
                    Included Add-ons:
                  </span>
                  {selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-[#4A453C]">
                      <span className="truncate pr-2">{addon.name}</span>
                      <span className="font-mono tabular-nums shrink-0">
                        {formatCurrency(addon.pricePerStay, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-[#E8E1D7]">
                <label className="text-xs font-semibold text-[#4A453C] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#A8791C]" />
                  <span>Privilege Voucher Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. HIMALAYAS15"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-xs uppercase font-mono bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2 focus:outline-none focus:border-[#A8791C]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-semibold uppercase bg-[#1C2221] text-white rounded hover:bg-[#A8791C] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Itemized Calculation */}
              <div className="space-y-2 border-t border-[#E8E1D7] pt-4 text-xs">
                <div className="flex justify-between text-[#5D574C]">
                  <span>Room ({priceBreakdown.nights} nights × {formatCurrency(currentRoom.pricePerNightINR, currency)}):</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(priceBreakdown.baseRoomTotal, currency)}
                  </span>
                </div>

                {priceBreakdown.extraGuestsCharge > 0 && (
                  <div className="flex justify-between text-[#5D574C]">
                    <span>Extra Guest Surcharge:</span>
                    <span className="font-mono tabular-nums">
                      {formatCurrency(priceBreakdown.extraGuestsCharge, currency)}
                    </span>
                  </div>
                )}

                {priceBreakdown.addOnsTotal > 0 && (
                  <div className="flex justify-between text-[#5D574C]">
                    <span>Add-ons Total:</span>
                    <span className="font-mono tabular-nums">
                      {formatCurrency(priceBreakdown.addOnsTotal, currency)}
                    </span>
                  </div>
                )}

                {priceBreakdown.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount ({appliedPromo}):</span>
                    <span className="font-mono tabular-nums">
                      -{formatCurrency(priceBreakdown.discountAmount, currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#5D574C]">
                  <span>Luxury Hospitality GST (12%):</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(priceBreakdown.taxAmount, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-[#5D574C]">
                  <span>Kashmir Eco Preservation Cess (1.5%):</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(priceBreakdown.heritageCess, currency)}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-[#1C2221] text-base pt-3 border-t border-[#E8E1D7]">
                  <span>Total Rate:</span>
                  <span className="font-mono text-xl text-[#A8791C] tabular-nums">
                    {formatCurrency(priceBreakdown.grandTotal, currency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#7A7469]">
                <Clock className="w-3.5 h-3.5 text-[#A8791C] shrink-0" />
                <span>Includes all taxes, heritage charges & daily buffet breakfast</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
