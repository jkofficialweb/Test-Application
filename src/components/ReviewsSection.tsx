import React from 'react';
import { REVIEWS_DATA } from '../data/resortData';
import { Star, Quote, Award } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#A8791C]">
            <Award className="w-4 h-4" />
            <span>Guest Praise & Accolades</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C2221]">
            Memories of Kashmir
          </h2>
          <p className="text-sm text-[#5D574C]">
            Read unfiltered impressions from guests who have awakened to the Pir Panjal sunrise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-[#E3DBD0] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#A8791C]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E3DBD0]" />
                </div>

                <p className="text-xs sm:text-sm text-[#3E382E] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] space-y-1 text-xs">
                <strong className="text-sm font-serif font-bold text-[#1C2221] block">
                  {rev.guestName}
                </strong>
                <div className="text-[11px] text-[#7A7469]">
                  <span>{rev.city}, {rev.country}</span>
                  <span className="mx-1.5">·</span>
                  <span>{rev.stayDate}</span>
                </div>
                <div className="text-[11px] text-[#A8791C] font-medium pt-0.5">
                  Stayed in: {rev.roomBooked}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
