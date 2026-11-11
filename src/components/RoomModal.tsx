import React, { useState } from 'react';
import { Room } from '../data/resortData';
import { formatCurrency } from '../utils/bookingCalculations';
import { X, Check, Calendar, Mountain, Maximize2, Users, Flame } from 'lucide-react';

interface RoomModalProps {
  room: Room | null;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onBookNow: (roomId: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  currency,
  onClose,
  onBookNow,
}) => {
  if (!room) return null;

  const [activeImage, setActiveImage] = useState(room.image);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E3DBD0] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close suite details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Main Visual Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black">
              <img
                src={activeImage}
                alt={room.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#151918]/85 text-white px-3 py-1 text-xs rounded backdrop-blur-sm">
                Scenic View: {room.viewType}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {room.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {room.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#A8791C] ring-2 ring-[#A8791C]/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Photo ${idx + 1} of ${room.name}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="border-b border-[#E8E1D7] pb-6 space-y-2">
            <div className="flex items-center gap-3 text-xs text-[#7A7469]">
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#A8791C]" />
                {room.sqft} sq ft ({Math.round(room.sqft * 0.0929)} m²)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#A8791C]" />
                Up to {room.maxGuests} Guests
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-[#A8791C]" />
                {room.viewType}
              </span>
            </div>

            <h2 id="room-modal-title" className="font-serif text-3xl sm:text-4xl font-bold text-[#1C2221]">
              {room.name}
            </h2>
            <p className="text-sm text-[#7A7469] font-medium italic">
              {room.tagline}
            </p>
          </div>

          {/* Narrative & Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8791C]">
              The Suite Experience
            </h3>
            <p className="text-sm text-[#3E382E] leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-[#F2ECE1] p-5 rounded-lg space-y-2 border border-[#E3DBD0]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C2221] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#A8791C]" />
              <span>Signature Kashmiri Architectural Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#4A453C]">
              {room.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#A8791C] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Amenities */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8791C]">
              Suite Amenities & Comforts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-[#E3DBD0] rounded text-xs text-[#3E382E] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8791C] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E8E1D7] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#7A7469] block">Nightly Rate</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-bold text-[#1C2221] tabular-nums">
                {formatCurrency(room.pricePerNightINR, currency)}
              </span>
              <span className="text-xs text-[#7A7469]">/ night + taxes</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A453C] hover:bg-[#FAF8F5] border border-[#DDD5C7] rounded"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(room.id);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A8791C] hover:bg-[#8D6415] rounded transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve This Suite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
