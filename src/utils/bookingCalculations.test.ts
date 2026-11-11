import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  calculateBookingTotal,
  formatCurrency,
  validateGuestDetails,
  generateReservationCode,
} from './bookingCalculations';

test('calculateNights computes exact number of nights', () => {
  assert.equal(calculateNights('2026-12-20', '2026-12-25'), 5);
  assert.equal(calculateNights('2026-12-25', '2026-12-26'), 1);
  assert.equal(calculateNights('2026-12-26', '2026-12-20'), 0);
  assert.equal(calculateNights('2026-12-20', '2026-12-20'), 0);
  assert.equal(calculateNights('', '2026-12-25'), 0);
});

test('calculateBookingTotal computes base room total, taxes, and grand total', () => {
  const result = calculateBookingTotal({
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-17', // 2 nights
    basePricePerNight: 28000,
    adultsCount: 2,
    childrenCount: 0,
    selectedAddOns: [],
  });

  assert.equal(result.isDateValid, true);
  assert.equal(result.nights, 2);
  assert.equal(result.baseRoomTotal, 56000); // 28000 * 2
  assert.equal(result.extraGuestsCharge, 0);
  assert.equal(result.subtotal, 56000);
  // 12% tax = 6720, 1.5% cess = 840 => grandTotal = 63560
  assert.equal(result.taxAmount, 6720);
  assert.equal(result.heritageCess, 840);
  assert.equal(result.grandTotal, 63560);
});

test('calculateBookingTotal applies promotional discount codes correctly', () => {
  const resultWithPromo = calculateBookingTotal({
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-18', // 3 nights
    basePricePerNight: 20000, // 60,000 subtotal
    adultsCount: 2,
    childrenCount: 0,
    discountCode: 'HIMALAYAS15', // 15% off => 9,000 off => 51,000 subtotal
  });

  assert.equal(resultWithPromo.discountAmount, 9000);
  assert.equal(resultWithPromo.subtotal, 51000);
  assert.equal(resultWithPromo.taxAmount, Math.round(51000 * 0.12));
});

test('calculateBookingTotal handles extra guest fees and add-ons', () => {
  const result = calculateBookingTotal({
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-16', // 1 night
    basePricePerNight: 25000,
    adultsCount: 3, // 1 extra guest
    childrenCount: 0,
    maxBaseGuests: 2,
    extraGuestFeePerNight: 4000,
    selectedAddOns: [
      { id: '1', name: 'Wazwan Dinner', pricePerStay: 4500, description: '7-course feast', category: 'dining' },
    ],
  });

  assert.equal(result.extraGuestsCharge, 4000);
  assert.equal(result.addOnsTotal, 4500);
  assert.equal(result.subtotal, 33500); // 25000 + 4000 + 4500
});

test('calculateBookingTotal rejects invalid date ranges', () => {
  const result = calculateBookingTotal({
    checkInDate: '2026-11-20',
    checkOutDate: '2026-11-18',
    basePricePerNight: 25000,
    adultsCount: 2,
    childrenCount: 0,
  });

  assert.equal(result.isDateValid, false);
  assert.equal(result.grandTotal, 0);
  assert.ok(result.errorMessage);
});

test('formatCurrency formats INR and USD properly', () => {
  assert.equal(formatCurrency(25000, 'INR'), '₹25,000');
  assert.equal(formatCurrency(8600, 'USD'), '$100');
});

test('validateGuestDetails detects missing or short fields', () => {
  const invalid = validateGuestDetails({
    fullName: 'Jo',
    email: 'bademail',
    phone: '123',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);

  const valid = validateGuestDetails({
    fullName: 'Zoya Khan',
    email: 'zoya@example.com',
    phone: '+91 9876543210',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateReservationCode generates properly prefixed code', () => {
  const code = generateReservationCode();
  assert.ok(code.startsWith('KSH-'));
  assert.equal(code.length, 9);
});
