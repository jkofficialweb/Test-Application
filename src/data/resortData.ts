/**
 * The Khyber Chinar Resort & Spa data catalog.
 * Luxury Kashmiri mountain resort data, rooms, scenic views, dining, and activities.
 */

export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'suite' | 'chalet' | 'premier' | 'penthouse';
  viewType: 'Snow Peak' | 'Pine Forest' | 'Valley' | 'Dual Mountain View';
  sqft: number;
  maxGuests: number;
  bedType: string;
  pricePerNightINR: number;
  image: string;
  galleryImages: string[];
  description: string;
  amenities: string[];
  highlights: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  category: 'dining' | 'adventure' | 'wellness' | 'culture';
  image: string;
  duration: string;
  pricePerPersonINR: number;
  description: string;
  included: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'peaks' | 'suites' | 'dining' | 'lakes' | 'resort';
  image: string;
  location: string;
  caption: string;
  altitude?: string;
}

export interface Review {
  id: string;
  guestName: string;
  city: string;
  country: string;
  rating: number;
  stayDate: string;
  roomBooked: string;
  comment: string;
}

export const RESORT_INFO = {
  name: 'The Khyber Chinar',
  subheading: 'Himalayan Luxury Resort & Spa',
  tagline: 'Where Pir Panjal Snow Peaks Meet Ancient Kashmiri Elegance',
  location: 'Gulmarg Highland Ridge, Kashmir, 193403',
  altitude: '8,690 ft (2,650 m) above sea level',
  phone: '+91 (1954) 254-8800',
  conciergeEmail: 'concierge@thekhyberchinar.com',
  airportDistance: '56 km from Srinagar International Airport (approx. 90 mins by 4x4 snow cruiser)',
  weather: {
    tempC: -2,
    tempF: 28,
    condition: 'Powder Snow & Sunny Breaks',
    snowDepth: '165 cm base',
    gondolaStatus: 'Phase 1 & 2 Open',
    airQuality: 'Pristine (AQI 14)',
  },
};

export const ROOMS_CATALOG: Room[] = [
  {
    id: 'royal-chinar-suite',
    name: 'The Royal Chinar Presidential Suite',
    tagline: 'Palatial Kashmiri elegance with uninterrupted panoramic vistas of Apharwat Peak',
    category: 'suite',
    viewType: 'Snow Peak',
    sqft: 1450,
    maxGuests: 4,
    bedType: 'Super King Featherbed + Daybed',
    pricePerNightINR: 52000,
    image: '/src/assets/images/room_presidential_suite_1794329963452.jpg',
    galleryImages: [
      '/src/assets/images/room_presidential_suite_1794329963452.jpg',
      '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
      '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    ],
    description:
      'Immerse yourself in authentic royal Kashmiri heritage. Featuring hand-carved Khatamband cedar ceilings, walnut wood furnishings, an authentic sandstone fireplace, private butler pantry, and floor-to-ceiling soundproof thermal glass frames gazing directly at the Pir Panjal mountain range.',
    amenities: [
      'Panoramic 180° Mountain View',
      'Handcrafted Sandstone Fireplace',
      'Underfloor Radiant Heating',
      'Private Butler Service 24/7',
      'Italian Marble Bath & Rain Shower',
      'Cashmere & Silk Throws',
      'Pashmina Welcome Scent & Kahwa Bar',
      'High-Speed Satellite Wi-Fi',
    ],
    highlights: [
      'Private south-facing mountain balcony',
      'Custom carved walnut wood dressing salon',
      'Bang & Olufsen sound acoustics',
    ],
    featured: true,
  },
  {
    id: 'pir-panjal-chalet',
    name: 'Pir Panjal Timber Chalet',
    tagline: 'Hand-hewn alpine timber sanctuary with freestanding copper soaking tub',
    category: 'chalet',
    viewType: 'Dual Mountain View',
    sqft: 980,
    maxGuests: 3,
    bedType: 'Himalayan Cedar King Bed',
    pricePerNightINR: 41000,
    image: '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    galleryImages: [
      '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
      '/src/assets/images/room_presidential_suite_1794329963452.jpg',
      '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
    ],
    description:
      'A true Himalayan mountain retreat crafted with aged deodar cedar and local granite. Step from your king bed directly to a timber balcony breathing fresh pine mist, or soak in the hand-hammered copper bathtub while watching evening clouds roll across the snow peaks.',
    amenities: [
      'Freestanding Copper Soaking Tub',
      'Private Timber Balcony',
      'Wood-Burning Stove & Hearth',
      'Heated Wooden Plank Floors',
      'Bespoke Woolen Bed Linens',
      'Mountain Mineral Water Bar',
      'Espresso & Kashmiri Saffron Bar',
      'Dyson Supersonic Amenities',
    ],
    highlights: [
      'Sensory cedar aromatherapy bath salts',
      'Direct pine trail access from private entryway',
      'Acoustic silence with triple-glazed glass',
    ],
    featured: true,
  },
  {
    id: 'gulmarg-highland-suite',
    name: 'Gulmarg Highland Premier Suite',
    tagline: 'Airy mountain-facing retreat with cozy bay-window daybed and private terrace',
    category: 'suite',
    viewType: 'Pine Forest',
    sqft: 760,
    maxGuests: 2,
    bedType: 'King Bed with Goose Down Duvet',
    pricePerNightINR: 32000,
    image: '/src/assets/images/room_presidential_suite_1794329963452.jpg',
    galleryImages: [
      '/src/assets/images/room_presidential_suite_1794329963452.jpg',
      '/src/assets/images/dining_kashmiri_lounge_1794329964778.jpg',
    ],
    description:
      'Overlooking the tranquil deodar pine forest slopes, the Highland Premier Suite blends crisp contemporary mountain comfort with delicate papier-mâché artistry and woven pashmina warmth. Features a glass alcove reading nook bathed in morning light.',
    amenities: [
      'Bay Window Sunlit Daybed',
      'Aromatherapy Steam Shower',
      'Floor Radiant Climate Control',
      'Kashmiri Walnut Writing Desk',
      'Mini Bar with Local Walnuts & Honey',
      'Smart 4K Frame TV with Mountain Cams',
      'Twice-Daily Housekeeping',
      'Complimentary Afternoon Tea',
    ],
    highlights: [
      'Golden sunrise light through morning pine canopies',
      'Quiet corner placement ideal for writers and couples',
    ],
    featured: false,
  },
  {
    id: 'apharwat-penthouse',
    name: 'Apharwat Alpine Penthouse',
    tagline: 'Top-tier luxury penthouse with dual fireplaces and open-air cedar hot tub',
    category: 'penthouse',
    viewType: 'Snow Peak',
    sqft: 1850,
    maxGuests: 5,
    bedType: 'Two Master King Bedrooms',
    pricePerNightINR: 76000,
    image: '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
    galleryImages: [
      '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
      '/src/assets/images/room_presidential_suite_1794329963452.jpg',
      '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    ],
    description:
      'Perched at the highest ridge of our resort, the Penthouse offers unmatched 360-degree views of both Apharwat Peak and the cascading pine valleys below. Includes two palatial bedrooms, a grand dining salon, private outdoor hot tub on the snow terrace, and dedicated ski equipment staging.',
    amenities: [
      'Private Outdoor Heated Cedar Hot Tub',
      'Dual Fireplaces (Living & Master)',
      'Ski-In / Ski-Out Private Locker',
      'Dedicated Private Chef & Butler',
      'Grand Salon with Khatamband Ceiling',
      'Bespoke Kashmiri Bar Cabinet',
      'Two En-Suite Marble Bathrooms',
      'Private Chauffeur on Property',
    ],
    highlights: [
      'Heated snow terrace with unobstructed sunset views',
      'Curated private wine and single-malt collection',
      'Personal ski guide coordination',
    ],
    featured: true,
  },
  {
    id: 'chinar-heritage-room',
    name: 'Chinar Classic Heritage Room',
    tagline: 'Intimate mountain sanctuary celebrating authentic Kashmiri craft and warmth',
    category: 'premier',
    viewType: 'Valley',
    sqft: 580,
    maxGuests: 2,
    bedType: 'Plush King Bed',
    pricePerNightINR: 24000,
    image: '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    galleryImages: [
      '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
      '/src/assets/images/dining_kashmiri_lounge_1794329964778.jpg',
    ],
    description:
      'Richly appointed with walnut timber paneling and traditional Kashmiri motifs, this intimate room captures the soulful essence of valley life. Enjoy sweeping views of the terraced gardens and the lower valley glistening in morning frost.',
    amenities: [
      'Terrace Garden & Valley Vistas',
      'Soaking Tub with Pine Forest View',
      'Floor Heating & Climate System',
      'Artisanal Kahwa Brewing Station',
      'Handcrafted Woolen Slippers',
      'Organic Herbal Bath Amenities',
      'Evening Turn-down Service with Hot Water Bags',
    ],
    highlights: [
      'Tranquil garden access and quiet setting',
      'Perfect blend of price and five-star luxury',
    ],
    featured: false,
  },
];

export const RESORT_EXPERIENCES: Experience[] = [
  {
    id: 'samovar-kahwa-ritual',
    title: 'The Saffron & Samovar Kahwa Ceremony',
    subtitle: 'Afternoon tea tradition in the snow-view walnut salon',
    category: 'dining',
    image: '/src/assets/images/dining_kashmiri_lounge_1794329964778.jpg',
    duration: '2 hours (Daily 3:30 PM - 5:30 PM)',
    pricePerPersonINR: 1800,
    description:
      'Gather by the roaring hearth as our tea master prepares authentic Kashmiri Kahwa from a brass samovar hand-carved in downtown Srinagar. Brewed with green tea leaves, whole green cardamom, cinnamon quills, crushed almonds, and freshly harvested Pampore saffron strands. Paired with freshly baked Sheermal, Bakarkhani, and walnut cookies.',
    included: [
      'Unlimited artisanal samovar-brewed saffron Kahwa',
      'Traditional Kashmiri bakery bread basket',
      'Candied walnuts and roasted almond selection',
      'Hearthside seating with mountain panoramas',
    ],
  },
  {
    id: 'royal-wazwan-banquet',
    title: 'Royal Wazwan Seven-Course Gastronomy',
    subtitle: 'The celebrated multi-course culinary masterwork of Kashmir',
    category: 'dining',
    image: '/src/assets/images/dining_kashmiri_lounge_1794329964778.jpg',
    duration: '2.5 hours (Dinner seating)',
    pricePerPersonINR: 4800,
    description:
      'Experience the pinnacle of royal Kashmiri cuisine prepared by our 3rd-generation Waza master chefs. Served on ornate engraved copper Traami plates. Feasts include Rogan Josh infused with dried cockscomb blossom (Mawal), silken Goshtaba poached in aromatic yogurt broth, spiced Rista meatballs, Tabak Maaz, and Kashmiri saffron Phirni dessert.',
    included: [
      'Authentic copper Tash-t-Naer hand-washing ceremony',
      'Curated 7-course or vegetarian Wazwan selection',
      'Basmati rice, walnut chutney, and Kashmiri radish relish',
      'Live classical Santoor and Rabab background melodies',
    ],
  },
  {
    id: 'dal-lake-sunrise-shikara',
    title: 'Dawn Shikara Expedition on Dal Lake',
    subtitle: 'Private wooden Shikara gliding on mirror water beneath mountain mist',
    category: 'adventure',
    image: '/src/assets/images/experience_dal_shikara_1794329964911.jpg',
    duration: '4 hours (Early morning departure)',
    pricePerPersonINR: 5500,
    description:
      'Depart in our private chauffeured 4x4 to Srinagar’s quietest lake canals before sunrise. Step aboard a velvet-cushioned wooden Shikara with a heated Kangri charcoal pot. Witness the centuries-old floating vegetable and flower market where traders bargain on open waters, against the misty silhouette of the Zabarwan mountains.',
    included: [
      'Private return transfer in heated 4x4 cruiser',
      'Private cushioned Shikara with skilled boatman',
      'Hot saffron Kahwa & fresh breakfast hamper on board',
      'Guided visit to the floating lotus gardens & craft house',
    ],
  },
  {
    id: 'gulmarg-gondola-skiing',
    title: 'Gulmarg Gondola & Alpine Powder Ski',
    subtitle: 'World’s highest operating cable car to Apharwat Ridge (13,780 ft)',
    category: 'adventure',
    image: '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
    duration: 'Full or Half Day',
    pricePerPersonINR: 6200,
    description:
      'Gulmarg is globally revered for the world’s driest, fluffiest alpine champagne powder snow. Our ski concierge equips you with top-tier Rossignol ski gear and facilitates VIP fast-track Gondola passes ascending to Phase 2 at 13,780 ft. Ski down through pristine bowls and fir forest glades with certified local mountain guides.',
    included: [
      'Priority Gondola Phase 1 & 2 boarding coordination',
      'Top-tier ski or snowboard equipment rental',
      'Certified avalanche-safety equipment & radio check',
      'Hot thermoses of herbal mountain tea and energy snacks',
    ],
  },
  {
    id: 'himalayan-cedar-spa',
    title: 'Himalayan Cedar & Saffron Herbal Spa Ritual',
    subtitle: 'Ancient healing therapies using wild Himalayan botanicals',
    category: 'wellness',
    image: '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    duration: '90 minutes',
    pricePerPersonINR: 4200,
    description:
      'Surrender to deep mountain rejuvenation in our heated cedar-lined spa pavilion. Begins with a foot cleanse using warm river stones and saffron milk, followed by an invigorating deodar pine and walnut shell body scrub, and a full-body massage using warm Kashmiri almond oil infused with juniper and wild lavender.',
    included: [
      'Foot ritual with saffron water & Himalayan pink salt',
      'Organic deodar pine & walnut body exfoliation',
      'Deep tissue warm herbal oil body massage',
      'Access to panoramic heated hydrotherapy plunge pool',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Khyber Chinar at Sunset',
    category: 'resort',
    image: '/src/assets/images/hero_kashmir_resort_1794329963444.jpg',
    location: 'Gulmarg Ridge, Kashmir',
    caption: 'Golden alpine light bathing the cedar timber terraces as evening fires are lit.',
    altitude: '8,690 ft',
  },
  {
    id: 'g-2',
    title: 'The Royal Chinar Presidential Bedroom',
    category: 'suites',
    image: '/src/assets/images/room_presidential_suite_1794329963452.jpg',
    location: 'West Wing, 3rd Floor',
    caption: 'Expansive picture window facing snow-draped Pir Panjal slopes with hand-carved walnut woodwork.',
    altitude: '8,710 ft',
  },
  {
    id: 'g-3',
    title: 'Alpine Copper Soaking Tub Overlook',
    category: 'suites',
    image: '/src/assets/images/room_alpine_chalet_1794329964226.jpg',
    location: 'Pir Panjal Timber Chalet',
    caption: 'Basking in warm cedar steam while looking out into dense misty pine valleys.',
    altitude: '8,650 ft',
  },
  {
    id: 'g-4',
    title: 'Hearthside Saffron Kahwa Service',
    category: 'dining',
    image: '/src/assets/images/dining_kashmiri_lounge_1794329964778.jpg',
    location: 'The Chinar Lounge & Hearth',
    caption: 'Traditional brass samovar pouring steaming saffron tea with snow peaks in the bay window.',
    altitude: '8,690 ft',
  },
  {
    id: 'g-5',
    title: 'Dawn Shikara on Serene Waters',
    category: 'lakes',
    image: '/src/assets/images/experience_dal_shikara_1794329964911.jpg',
    location: 'Dal Lake, Srinagar',
    caption: 'Golden hour reflections on glassy waters beneath the towering Himalayan foothills.',
    altitude: '5,200 ft',
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Vikram & Radhika Mehta',
    city: 'Mumbai',
    country: 'India',
    rating: 5,
    stayDate: 'October 2026',
    roomBooked: 'The Royal Chinar Presidential Suite',
    comment:
      'Waking up to the Pir Panjal mountains covered in fresh snow through the floor-to-ceiling glass was life-changing. The handcrafted walnut woodwork and the roaring fireplace made our anniversary unforgettable. The staff’s warmth and the saffron Kahwa were unmatched.',
  },
  {
    id: 'rev-2',
    guestName: 'Eleanor Sterling',
    city: 'London',
    country: 'United Kingdom',
    rating: 5,
    stayDate: 'November 2026',
    roomBooked: 'Pir Panjal Timber Chalet',
    comment:
      'The copper soaking tub facing the pine valley is easily the most breathtaking hotel room amenity in Asia. Impeccable ski concierge service—our passes and guides were organized seamlessly. The Wazwan dinner was pure art.',
  },
  {
    id: 'rev-3',
    guestName: 'Tariq Al-Mansoor',
    city: 'Dubai',
    country: 'UAE',
    rating: 5,
    stayDate: 'September 2026',
    roomBooked: 'Apharwat Alpine Penthouse',
    comment:
      'Five-star hospitality at its finest. The private outdoor heated tub on our snow terrace while clouds drifted over Apharwat peak was simply majestic. The resort handles airport 4x4 transfers with total precision.',
  },
];

export const BOOKING_ADDONS_LIST = [
  {
    id: 'addon-wazwan',
    name: 'Royal Wazwan 7-Course Gastronomy',
    pricePerStay: 4800,
    description: 'Authentic Kashmiri royal banquet on engraved copper Traami with live Santoor recital.',
    category: 'dining' as const,
  },
  {
    id: 'addon-shikara',
    name: 'Private Dawn Shikara Tour & 4x4 Transfer',
    pricePerStay: 5500,
    description: 'Chauffeured sunrise excursion to Dal Lake with hot breakfast hamper on the water.',
    category: 'adventure' as const,
  },
  {
    id: 'addon-spa',
    name: 'Himalayan Cedar & Saffron Spa (90 min)',
    pricePerStay: 4200,
    description: 'Deep tissue botanical oil massage with heated river stone therapy for 2 guests.',
    category: 'wellness' as const,
  },
  {
    id: 'addon-gondola',
    name: 'VIP Gulmarg Gondola Fast-Track Passes',
    pricePerStay: 3800,
    description: 'Phase 1 & Phase 2 priority cable car passes to Apharwat Peak with ski guide meet.',
    category: 'adventure' as const,
  },
  {
    id: 'addon-transfer',
    name: 'Chauffeured 4x4 Airport Snow Cruiser Transfer',
    pricePerStay: 3500,
    description: 'Round-trip private luxury SUV from Srinagar International Airport (SXR).',
    category: 'transit' as const,
  },
];
