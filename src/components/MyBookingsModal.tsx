import React, { useState } from 'react';
import { ConfirmedReservation } from './BookingEngine';
import { formatCurrency } from '../utils/bookingCalculations';
import { X, Search, BookmarkCheck, Calendar, MapPin, AlertCircle, Printer } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConfirmedReservation[];
  onCancelBooking: (code: string) => void;
  currency: 'INR' | 'USD';
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  currency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingCode, setSelectedBookingCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter(
    (b) =>
      b.code.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const activeBooking =
    bookings.find((b) => b.code === selectedBookingCode) ||
    (filteredBookings.length > 0 ? filteredBookings[0] : null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-bookings-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E3DBD0] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-[#E8E1D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[#A8791C]" />
            <h2 id="my-bookings-title" className="font-serif text-2xl font-bold text-[#1C2221]">
              Manage Your Mountain Reservations
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A7469] hover:text-[#1C2221] hover:bg-[#FAF8F5] rounded"
            aria-label="Close reservations modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Lookup Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A8376] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by reservation code (e.g. KSH-...) or guest name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DDD5C7] rounded focus:outline-none focus:border-[#A8791C]"
            />
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3 bg-white rounded-lg border border-[#E8E1D7]">
              <Calendar className="w-10 h-10 text-[#C4BEB2] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#1C2221]">
                No Active Reservations Found
              </h3>
              <p className="text-xs text-[#7A7469] max-w-md mx-auto">
                You haven’t completed a booking yet in this session. Explore our luxury suites
                and book your Himalayan retreat to manage it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* List of Bookings (Col 5) */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8376]">
                  Your Reservations ({bookings.length})
                </span>
                <div className="space-y-2">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.code}
                      onClick={() => setSelectedBookingCode(b.code)}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                        activeBooking?.code === b.code
                          ? 'border-[#A8791C] bg-white shadow-sm'
                          : 'border-[#E3DBD0] bg-[#FAF8F5] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-[#1C2221]">
                          {b.code}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="font-serif text-sm font-bold text-[#1C2221] truncate">
                        {b.room.name}
                      </div>
                      <div className="text-[11px] text-[#7A7469] flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 text-[#A8791C]" />
                        <span>
                          {b.checkInDate} to {b.checkOutDate} ({b.nights}n)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Booking Detailed View (Col 7) */}
              {activeBooking && (
                <div className="md:col-span-7 bg-white rounded-lg border border-[#E3DBD0] p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-3">
                    <div>
                      <span className="text-[10px] text-[#8A8376] uppercase tracking-wider block">
                        Reservation Ref
                      </span>
                      <span className="font-mono text-lg font-bold text-[#1C2221]">
                        {activeBooking.code}
                      </span>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#4A453C] border border-[#DDD5C7] rounded hover:bg-[#FAF8F5]"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <strong className="text-[#1C2221] block font-serif text-base">
                        {activeBooking.room.name}
                      </strong>
                      <p className="text-[#7A7469] text-xs">
                        {activeBooking.room.viewType} · {activeBooking.room.sqft} sq ft
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-3 rounded border border-[#E8E1D7]">
                      <div>
                        <span className="text-[#8A8376] block text-[10px] uppercase">
                          Check-in Date
                        </span>
                        <strong className="text-[#1C2221]">{activeBooking.checkInDate}</strong>
                      </div>
                      <div>
                        <span className="text-[#8A8376] block text-[10px] uppercase">
                          Check-out Date
                        </span>
                        <strong className="text-[#1C2221]">{activeBooking.checkOutDate}</strong>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#7A7469]">Primary Guest:</span>
                        <strong className="text-[#1C2221]">{activeBooking.guestName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A7469]">Guest Contact:</span>
                        <span className="text-[#1C2221]">{activeBooking.guestEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A7469]">Phone:</span>
                        <span className="text-[#1C2221]">{activeBooking.guestPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A7469]">Total Amount:</span>
                        <strong className="font-mono text-sm text-[#A8791C]">
                          {formatCurrency(activeBooking.grandTotal, currency)}
                        </strong>
                      </div>
                    </div>

                    {activeBooking.status === 'Confirmed' && (
                      <div className="pt-3 border-t border-[#E8E1D7] flex items-center justify-between">
                        <div className="text-[11px] text-[#7A7469]">
                          Flexible cancellation allowed.
                        </div>

                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you wish to cancel reservation ${activeBooking.code}?`
                              )
                            ) {
                              onCancelBooking(activeBooking.code);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded transition-colors"
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
