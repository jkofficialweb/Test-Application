/**
 * Pure calculation and validation logic for The Khyber Chinar online booking engine.
 */

export interface BookingAddOn {
  id: string;
  name: string;
  pricePerStay: number; // in INR
  description: string;
  category: 'dining' | 'adventure' | 'wellness' | 'transit';
}

export interface BookingCalculationParams {
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  basePricePerNight: number;
  adultsCount: number;
  childrenCount: number;
  maxBaseGuests?: number;
  extraGuestFeePerNight?: number;
  selectedAddOns?: BookingAddOn[];
  discountCode?: string;
}

export interface PriceBreakdown {
  nights: number;
  baseRoomTotal: number;
  extraGuestsCharge: number;
  addOnsTotal: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  heritageCess: number;
  grandTotal: number;
  isDateValid: boolean;
  errorMessage?: string;
}

export const VALID_DISCOUNT_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  HIMALAYAS15: { type: 'percent', value: 15, label: '15% Highland Luxury Privilege' },
  KASHMIR2026: { type: 'percent', value: 10, label: '10% Welcome to Kashmir Privilege' },
  GULMARG5000: { type: 'fixed', value: 5000, label: '₹5,000 Winter Alpine Privilege' },
};

/**
 * Calculates number of nights between two ISO date strings (YYYY-MM-DD).
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Calculates complete price breakdown for a reservation.
 */
export function calculateBookingTotal(params: BookingCalculationParams): PriceBreakdown {
  const {
    checkInDate,
    checkOutDate,
    basePricePerNight,
    adultsCount,
    childrenCount,
    maxBaseGuests = 2,
    extraGuestFeePerNight = 3500,
    selectedAddOns = [],
    discountCode = '',
  } = params;

  const nights = calculateNights(checkInDate, checkOutDate);

  if (nights <= 0) {
    return {
      nights: 0,
      baseRoomTotal: 0,
      extraGuestsCharge: 0,
      addOnsTotal: 0,
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      heritageCess: 0,
      grandTotal: 0,
      isDateValid: false,
      errorMessage: 'Check-out date must be after check-in date.',
    };
  }

  const baseRoomTotal = basePricePerNight * nights;

  // Extra guest charge if total guests > standard base
  const totalGuests = adultsCount + (childrenCount > 1 ? childrenCount - 1 : 0);
  const extraGuests = Math.max(0, totalGuests - maxBaseGuests);
  const extraGuestsCharge = extraGuests * extraGuestFeePerNight * nights;

  // Add-ons total
  const addOnsTotal = selectedAddOns.reduce((acc, addon) => acc + addon.pricePerStay, 0);

  const subtotalBeforeDiscount = baseRoomTotal + extraGuestsCharge + addOnsTotal;

  // Discount computation
  let discountAmount = 0;
  const cleanCode = discountCode.trim().toUpperCase();
  if (cleanCode && VALID_DISCOUNT_CODES[cleanCode]) {
    const promo = VALID_DISCOUNT_CODES[cleanCode];
    if (promo.type === 'percent') {
      discountAmount = Math.round((subtotalBeforeDiscount * promo.value) / 100);
    } else {
      discountAmount = Math.min(subtotalBeforeDiscount, promo.value);
    }
  }

  const netSubtotal = Math.max(0, subtotalBeforeDiscount - discountAmount);

  // 12% GST luxury hospitality tax + 1.5% Heritage & Environment Preservation Cess
  const taxAmount = Math.round(netSubtotal * 0.12);
  const heritageCess = Math.round(netSubtotal * 0.015);
  const grandTotal = netSubtotal + taxAmount + heritageCess;

  return {
    nights,
    baseRoomTotal,
    extraGuestsCharge,
    addOnsTotal,
    subtotal: netSubtotal,
    discountAmount,
    taxAmount,
    heritageCess,
    grandTotal,
    isDateValid: true,
  };
}

/**
 * Format currency amount with commas in INR (₹) or approximate USD.
 */
export function formatCurrency(amount: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (currency === 'USD') {
    const inUsd = Math.round(amount / 86);
    return `$${inUsd.toLocaleString('en-US')}`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Form validation helper for guest details.
 */
export function validateGuestDetails(data: {
  fullName: string;
  email: string;
  phone: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full name (minimum 3 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address for your reservation confirmation.';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (!data.phone || phoneDigits.length < 8) {
    errors.phone = 'Please provide a valid phone number for concierge coordination.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an authentic Kashmiri reservation voucher reference code.
 */
export function generateReservationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KSH-${randomStr}`;
}
