import React, { useState } from 'react';
import { RESORT_EXPERIENCES, Experience } from '../data/resortData';
import { formatCurrency } from '../utils/bookingCalculations';
import { Clock, Check, Calendar, ChevronRight, Sparkles, Utensils, Mountain, Compass } from 'lucide-react';

interface ExperiencesSectionProps {
  currency: 'INR' | 'USD';
  onBookExperience: (experienceId: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  currency,
  onBookExperience,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dining' | 'adventure' | 'wellness'>('all');

  const filtered =
    activeCategory === 'all'
      ? RESORT_EXPERIENCES
      : RESORT_EXPERIENCES.filter((e) => e.category === activeCategory);

  return (
    <section className="py-16 bg-white border-y border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#A8791C]">
            <Utensils className="w-4 h-4" />
            <span>Kashmiri Gastronomy & High-Altitude Adventures</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2221]">
            Curated Resort Experiences
          </h2>
          <p className="text-sm text-[#5D574C] leading-relaxed">
            From slow-brewed saffron Kahwa around copper samovars to skiing powdery alpine bowls
            at 13,780 feet, explore the authentic soul of Kashmir.
          </p>

          {/* Category Filter */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#E3DBD0] rounded-lg max-w-md mx-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#1C2221] text-white shadow-sm'
                  : 'text-[#635C50] hover:text-[#1C2221]'
              }`}
            >
              All Experiences
            </button>
            <button
              onClick={() => setActiveCategory('dining')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCategory === 'dining'
                  ? 'bg-[#1C2221] text-white shadow-sm'
                  : 'text-[#635C50] hover:text-[#1C2221]'
              }`}
            >
              Kashmiri Dining
            </button>
            <button
              onClick={() => setActiveCategory('adventure')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCategory === 'adventure'
                  ? 'bg-[#1C2221] text-white shadow-sm'
                  : 'text-[#635C50] hover:text-[#1C2221]'
              }`}
            >
              Alpine & Ski
            </button>
            <button
              onClick={() => setActiveCategory('wellness')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCategory === 'wellness'
                  ? 'bg-[#1C2221] text-white shadow-sm'
                  : 'text-[#635C50] hover:text-[#1C2221]'
              }`}
            >
              Botanical Spa
            </button>
          </div>
        </div>

        {/* Experiences Showcase */}
        <div className="space-y-12">
          {filtered.map((exp, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={exp.id}
                className={`bg-[#FAF8F5] rounded-2xl border border-[#E3DBD0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image (Col 6) */}
                <div
                  className={`lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#242A28] ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#151918]/85 text-white px-3 py-1 text-[11px] font-medium tracking-wide rounded backdrop-blur-sm">
                    {exp.subtitle}
                  </div>
                </div>

                {/* Details (Col 6) */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-[#7A7469]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#A8791C]" />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2221]">
                      {exp.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A453C] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8791C]">
                      Included in the experience:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5D574C]">
                      {exp.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#A8791C] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rate & Action */}
                  <div className="pt-4 border-t border-[#E8E1D7] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8376] block">
                        Experience Fee
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-xl font-bold text-[#1C2221]">
                          {formatCurrency(exp.pricePerPersonINR, currency)}
                        </span>
                        <span className="text-xs text-[#7A7469]">/ guest</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onBookExperience(exp.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C2221] hover:bg-[#A8791C] rounded transition-all shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Include in Your Stay</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
