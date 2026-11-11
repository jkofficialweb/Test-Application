import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/resortData';
import { Mountain, MapPin, Maximize2, X, Compass } from 'lucide-react';

export const MountainViewsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Mountain Perspectives' },
    { id: 'resort', label: 'Resort Architecture' },
    { id: 'suites', label: 'Luxury Suites' },
    { id: 'dining', label: 'Hearth & Kahwa' },
    { id: 'lakes', label: 'Lakes & Waterways' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#A8791C]">
            <Mountain className="w-4 h-4" />
            <span>Himalayan Vistas & Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2221]">
            Scenic Mountain Views of Kashmir
          </h2>
          <p className="text-sm text-[#5D574C] leading-relaxed">
            Every window at The Khyber Chinar opens to an alpine canvas. Experience the dramatic
            transitions of light over the Pir Panjal range, from golden sunrise alpenglow to twilight snow mist.
          </p>

          {/* Interactive Filter Tabs (Functional Button Controls Allowed by Constitution) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#EFE9DF] rounded-lg max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#1C2221] shadow-sm font-semibold'
                    : 'text-[#635C50] hover:text-[#1C2221]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#242A28] border border-[#E3DBD0] transition-all hover:shadow-xl ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* View Fullscreen Affordance */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption and Location Strip */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-1.5">
                <div className="flex items-center gap-3 text-[11px] text-[#E5B555]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                  {item.altitude && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" />
                        {item.altitude}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-[#EDE7DD] line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mountain Geography & Panoramas Callout */}
        <div className="bg-[#1C2220] rounded-xl p-8 sm:p-10 text-white border border-[#333D3A] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#E5B555] font-semibold">
              Peak Geography
            </span>
            <h4 className="font-serif text-2xl font-bold">Apharwat Mountain</h4>
            <p className="text-xs text-[#C4BEB2] leading-relaxed">
              Rising to 14,403 ft (4,390 m), Apharwat stands directly before our west-facing suites.
              Home to the Gulmarg Gondola and high-altitude alpine bowls.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#E5B555] font-semibold">
              Valley Panorama
            </span>
            <h4 className="font-serif text-2xl font-bold">Pir Panjal Cedar Glades</h4>
            <p className="text-xs text-[#C4BEB2] leading-relaxed">
              Over 2,000 acres of protected deodar, fir, and pine forests surrounding the resort,
              providing clean mountain air with zero industrial pollution.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#E5B555] font-semibold">
              Lake Waterways
            </span>
            <h4 className="font-serif text-2xl font-bold">Dal & Nigeen Lakes</h4>
            <p className="text-xs text-[#C4BEB2] leading-relaxed">
              Just 90 minutes down in the summer capital of Srinagar, offering timeless Shikara
              dawn journeys and historic floating gardens.
            </p>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxItem(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#151918] rounded-xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 text-white space-y-2 bg-[#1C2220]">
                <div className="flex items-center gap-3 text-xs text-[#E5B555]">
                  <span>{lightboxItem.location}</span>
                  {lightboxItem.altitude && <span>· Altitude: {lightboxItem.altitude}</span>}
                </div>
                <h3 className="font-serif text-2xl font-bold">{lightboxItem.title}</h3>
                <p className="text-xs text-[#C4BEB2]">{lightboxItem.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
