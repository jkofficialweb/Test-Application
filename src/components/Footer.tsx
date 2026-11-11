import React from 'react';
import { RESORT_INFO } from '../data/resortData';
import { MapPin, Phone, Mail, Mountain, Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#151918] text-[#D1CCC4] border-t border-[#2A3130] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[#2A3130]">
          {/* Brand & Kashmiri Legacy */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
              {RESORT_INFO.name}
            </h3>
            <p className="text-xs text-[#A8A196] leading-relaxed">
              An alpine sanctuary at 8,690 feet in the Pir Panjal range of Kashmir.
              Centuries of handcrafted Khatamband architecture, roaring pine hearths,
              and authentic Himalayan hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E5B555]">
              <Mountain className="w-4 h-4 shrink-0" />
              <span>Pir Panjal Himalayan Range · Kashmir Valley</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Discover Resort
            </h4>
            <ul className="space-y-2 text-sm text-[#A8A196]">
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-white transition-colors"
                >
                  Luxury Suites & Timber Chalets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Scenic Mountain Views Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors"
                >
                  Saffron Kahwa & Royal Wazwan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-white transition-colors"
                >
                  Apharwat Peak & Gulmarg Gondola
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="text-[#E5B555] hover:underline"
                >
                  Online Room Availability & Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Arrival */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Concierge & Arrival
            </h4>
            <div className="space-y-2.5 text-xs text-[#A8A196]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5B555] shrink-0 mt-0.5" />
                <span>{RESORT_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5B555] shrink-0" />
                <span>{RESORT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5B555] shrink-0" />
                <span>{RESORT_INFO.conciergeEmail}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#8C867C]">
                <Compass className="w-4 h-4 text-[#A8A196] shrink-0 mt-0.5" />
                <span>{RESORT_INFO.airportDistance}</span>
              </div>
            </div>
          </div>

          {/* Stay Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Guest Privilege & Trust
            </h4>
            <div className="p-3.5 rounded bg-[#1C2220] border border-[#2F3735] space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-[#E5B555]" />
                <span>Best Mountain Rate Guaranteed</span>
              </div>
              <p className="text-[11px] text-[#A8A196] leading-relaxed">
                Direct online booking provides complimentary airport pickup coordination,
                welcome saffron Kahwa service, and priority ski pass concierge.
              </p>
            </div>
            <div className="text-[11px] text-[#7A7469]">
              Check-in: 2:00 PM · Check-out: 11:00 AM · Heated 4x4 Snow Fleet On Standby
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7469]">
          <p>© {new Date().getFullYear()} {RESORT_INFO.name}, Kashmir. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Sustainable Himalayan Tourism</span>
            <span>·</span>
            <span>Kashmiri Heritage Preserved</span>
            <span>·</span>
            <span>Certified Mountain Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
