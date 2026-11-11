import React from 'react';
import { Room } from '../data/resortData';
import { formatCurrency } from '../utils/bookingCalculations';
import { Eye, Calendar, Sparkles } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  currency: 'INR' | 'USD';
  onSelectRoom: (roomId: string) => void;
  onViewDetails: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  currency,
  onSelectRoom,
  onViewDetails,
}) => {
  return (
    <article className="group bg-white rounded-xl border border-[#E3DBD0] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
      {/* Visual Slot (65-75% height) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#242A28]">
        <img
          src={room.image}
          alt={`${room.name} with view of ${room.viewType}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet View Tag (Subtle unboxed or quiet label, no garish pill) */}
        <div className="absolute top-3 left-3 bg-[#151918]/85 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-medium tracking-wide rounded">
          {room.viewType}
        </div>

        {room.featured && (
          <div className="absolute top-3 right-3 bg-[#A8791C] text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>Featured Suite</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-[#7A7469]">
            <span>{room.sqft} sq ft</span>
            <span aria-hidden="true">·</span>
            <span>Up to {room.maxGuests} Guests</span>
            <span aria-hidden="true">·</span>
            <span>{room.bedType}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2221] group-hover:text-[#A8791C] transition-colors leading-snug">
            {room.name}
          </h3>

          <p className="text-xs text-[#5D574C] line-clamp-2 leading-relaxed">
            {room.tagline}
          </p>
        </div>

        {/* Key Inclusions List */}
        <div className="pt-2 border-t border-[#F0EAE1]">
          <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-[#655E52]">
            {room.amenities.slice(0, 4).map((amenity, idx) => (
              <li key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-1 h-1 rounded-full bg-[#A8791C]" />
                <span className="truncate">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A8376] block">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xl font-bold text-[#1C2221] tabular-nums">
                {formatCurrency(room.pricePerNightINR, currency)}
              </span>
              <span className="text-xs text-[#7A7469]">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(room)}
              className="p-2.5 text-xs text-[#4A453C] hover:text-[#1C2221] hover:bg-[#FAF8F5] border border-[#DDD5C7] rounded transition-colors"
              title="View room details, photos and amenities"
              aria-label={`View details for ${room.name}`}
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectRoom(room.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm"
              aria-label={`Reserve ${room.name}`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
