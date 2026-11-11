import React, { useState } from 'react';
import { RESORT_INFO } from '../data/resortData';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Snowflake,
  Wind,
  Compass,
  Car,
  Plane,
  CableCar,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    interest: 'General Concierge Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#A8791C]">
            <Compass className="w-4 h-4" />
            <span>Highland Location & Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2221]">
            Getting to The Khyber Chinar
          </h2>
          <p className="text-sm text-[#5D574C] leading-relaxed">
            Perched on Gulmarg Ridge in Baramulla district, Kashmir. Surrounded by ancient pine
            forests and facing the Apharwat mountain peak.
          </p>
        </div>

        {/* Live Weather & Transit Strip */}
        <div className="bg-[#1C2220] rounded-xl text-white p-6 sm:p-8 border border-[#333D3A] grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#E5B555] font-semibold">
              Live Altitude & Temperature
            </span>
            <div className="font-mono text-2xl font-bold">
              {RESORT_INFO.weather.tempC}°C / {RESORT_INFO.weather.tempF}°F
            </div>
            <p className="text-xs text-[#A8A196]">{RESORT_INFO.altitude}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#E5B555] font-semibold">
              Snow Conditions
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {RESORT_INFO.weather.snowDepth}
            </div>
            <p className="text-xs text-[#A8A196]">Champagne Alpine Powder</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#E5B555] font-semibold">
              Gondola Lift Status
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {RESORT_INFO.weather.gondolaStatus}
            </div>
            <p className="text-xs text-[#A8A196]">Ascent up to 13,780 ft</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#E5B555] font-semibold">
              Air Purity
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {RESORT_INFO.weather.airQuality}
            </div>
            <p className="text-xs text-[#A8A196]">Pure Himalayan Pine Canopy</p>
          </div>
        </div>

        {/* Travel Guide & Concierge Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Travel Directions (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#1C2221]">
                Journey to Gulmarg
              </h3>

              <div className="space-y-4 text-xs text-[#4A453C]">
                {/* Flight Arrival */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#DDD5C7] flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5 text-[#A8791C]" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm font-semibold text-[#1C2221] block">
                      Arrival via Srinagar International Airport (SXR)
                    </strong>
                    <p className="leading-relaxed">
                      Daily direct flights connect Srinagar from New Delhi (1h 15m), Mumbai,
                      Bengaluru, and Dubai. Our private airport chauffeur will meet you at arrivals.
                    </p>
                  </div>
                </div>

                {/* 4x4 Snow Cruiser */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#DDD5C7] flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-[#A8791C]" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm font-semibold text-[#1C2221] block">
                      Scenic Mountain Ascent (56 km / ~90 mins)
                    </strong>
                    <p className="leading-relaxed">
                      Ascend through Tangmarg pine hairpin curves. During winter snowfall, our fleet
                      of all-wheel-drive luxury SUVs equipped with winter snow chains ensures total safety.
                    </p>
                  </div>
                </div>

                {/* Cable car */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#DDD5C7] flex items-center justify-center shrink-0">
                    <CableCar className="w-5 h-5 text-[#A8791C]" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm font-semibold text-[#1C2221] block">
                      Gulmarg Gondola Proximity (3 mins)
                    </strong>
                    <p className="leading-relaxed">
                      The resort is located just 800 meters from the Gulmarg Gondola base station.
                      Our ski shuttle operates every 15 minutes during ski season.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="pt-4 border-t border-[#E8E1D7] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5D574C]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A8791C]" />
                  <span>{RESORT_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#A8791C]" />
                  <span>{RESORT_INFO.conciergeEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge Inquiry Form (Col 6) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#A8791C] font-semibold">
                  Personal Concierge Desk
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1C2221]">
                  Inquire or Request Custom Itinerary
                </h3>
                <p className="text-xs text-[#5D574C]">
                  Contact our Himalayan mountain specialists for helicopter charters, private ski guides,
                  wedding inquiries, or customized travel plans.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-emerald-900">
                    Inquiry Received with Warmth
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.name}. Our Head Concierge in Gulmarg will contact you at{' '}
                    <strong>{formData.email}</strong> within 3 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        dates: '',
                        interest: 'General Concierge Inquiry',
                        message: '',
                      });
                    }}
                    className="text-xs text-emerald-700 underline font-medium hover:text-emerald-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-[#4A453C]">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-[#4A453C]">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-[#4A453C]">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-[#4A453C]">Inquiry Topic</label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                      >
                        <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                        <option value="Helicopter Transfer Coordination">Helicopter Transfer Coordination</option>
                        <option value="Ski Pass & Private Guide Coordination">Ski Pass & Private Guide</option>
                        <option value="Royal Wazwan Private Feast">Royal Wazwan Private Feast</option>
                        <option value="Destination Wedding / Private Gathering">Destination Wedding / Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#4A453C]">Your Message & Travel Dates</label>
                    <textarea
                      rows={4}
                      placeholder="Share your planned arrival dates, number of guests, or bespoke requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs font-medium text-[#1C2221] bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-2.5 focus:outline-none focus:border-[#A8791C]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Concierge Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
