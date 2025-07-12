import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, ArrowRight, X, Home } from 'lucide-react';

interface Rug {
  id: number;
  name: string;
  size: string;
  price: string;
  images: string[];
  description: string;
  material: string;
  origin: string;
  collectionKey?: string;
  productNumber: string;
}

interface CollectionRug {
  id: string;
  name: string;
  images: string[];
  price: string;
  material: string;
  origin: string;
  stock?: number;
  productNumber: string;
}

function App() {
  const [activeSection, setActiveSection] = useState('160x230');
  const [selectedRug, setSelectedRug] = useState<Rug | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewingCollection, setViewingCollection] = useState<string | null>(null);
  const [selectedCollectionRug, setSelectedCollectionRug] = useState<CollectionRug | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'collection' | 'rug-detail'>('home');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const sizeCategories = [
    { id: '80x600', name: '80×600 cm', description: 'Elegant runners for hallways and corridors' },
    { id: '120x180', name: '120×180 cm', description: 'Compact elegance for smaller spaces' },
    { id: '160x230', name: '160×230 cm', description: 'Perfect for living rooms and bedrooms' },
    { id: '200x300', name: '200×300 cm', description: 'Ideal for larger spaces and dining areas' },
    { id: '240x340', name: '240×340 cm', description: 'Premium statement pieces for grand spaces' },
    { id: '300x400', name: '300×400 cm', description: 'Statement pieces for grand rooms' },
    { id: '300x500', name: '300×500 cm', description: 'Magnificent oversized masterpieces for palatial spaces' }
  ];

  // Collections for each main rug
  const rugCollectionDetails = {
    'hallway-runner': {
      name: 'Hallway Runner Collection',
      description: 'Elegant runner rugs perfect for hallways, corridors, and narrow spaces that need a touch of sophistication.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '80×600 cm',
      rugs: [
        {
          id: 'runner-70',
          name: 'Hallway Runner Design 1',
          images: [
            'https://tbrhub.com/aladdinsride/images/80x600/70.jpg'
          ],
          price: 'R 16,999',
          material: 'Silk & Cashmere',
          origin: 'Iran',
          stock: Math.floor(Math.random() * 8) + 3,
          productNumber: 'AR-070'
        }
      ]
    },
    'compact-elegance': {
      name: 'Compact Elegance Collection',
      description: 'Beautifully crafted smaller rugs perfect for intimate spaces, entryways, and accent areas.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '120×180 cm',
      rugs: Array.from({ length: 5 }, (_, i) => ({
        id: `compact-${i + 65}`,
        name: `Compact Elegance Design ${i + 1}`,
        images: [
          `https://tbrhub.com/aladdinsride/images/120x180/${i + 65}.jpg`,
          `https://tbrhub.com/aladdinsride/images/120x180/${i + 65}-1.jpg`,
          `https://tbrhub.com/aladdinsride/images/120x180/${i + 65}-2.jpg`,
          `https://tbrhub.com/aladdinsride/images/120x180/${i + 65}-3.jpg`
        ],
        price: 'R 18,999',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        stock: Math.floor(Math.random() * 8) + 3,
        productNumber: `AR-${String(i + 65).padStart(3, '0')}`
      }))
    },
    'persian-silk': {
      name: 'Persian Silk Elegance Collection',
      description: 'Exquisite handwoven rugs crafted with premium silk and cashmere, featuring intricate Persian patterns.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '160×230 cm',
      rugs: Array.from({ length: 12 }, (_, i) => ({
        id: `persian-${i + 1}`,
        name: `Persian Silk Design ${i + 1}`,
        images: [
          `https://tbrhub.com/aladdinsride/images/160x230/${i + 1}.jpg`,
          `https://tbrhub.com/aladdinsride/images/160x230/${i + 1}-1.jpg`
        ],
        price: 'R 24,999',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        stock: Math.floor(Math.random() * 8) + 3, // Random stock between 3-10
        productNumber: `AR-${String(i + 1).padStart(3, '0')}`
      }))
    },
    'arabian-cashmere': {
      name: 'Arabian Cashmere Luxury Collection',
      description: 'Luxurious cashmere rugs with traditional Arabian craftsmanship, offering unparalleled softness and sophisticated design.',
      material: 'Cashmere',
      origin: 'Saudi Arabia',
      size: '160×230 cm',
      rugs: [
        {
          id: 'arabian-1',
          name: 'Arabian Cashmere Design 1',
          images: [
            'https://tbrhub.com/aladdinsride/images/160x230/13.jpg',
            'https://tbrhub.com/aladdinsride/images/160x230/13-1.jpg'
          ],
          price: 'R 23,999',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          stock: Math.floor(Math.random() * 8) + 3,
          productNumber: 'AR-013'
        },
        {
          id: 'ar-056',
          name: 'Arabian Cashmere Design 3',
          price: 'R 23,999',
          productNumber: 'AR-056',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/56.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-3.jpg']
        },
        {
          id: 'ar-057',
          name: 'Arabian Cashmere Design 4',
          price: 'R 23,999',
          productNumber: 'AR-057',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/57.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-3.jpg']
        },
        {
          id: 'ar-058',
          name: 'Arabian Cashmere Design 5',
          price: 'R 23,999',
          productNumber: 'AR-058',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/58.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-3.jpg']
        },
        {
          id: 'ar-059',
          name: 'Arabian Cashmere Design 6',
          price: 'R 23,999',
          productNumber: 'AR-059',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/59.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-3.jpg']
        },
        {
          id: 'ar-060',
          name: 'Arabian Cashmere Design 7',
          price: 'R 23,999',
          productNumber: 'AR-060',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/60.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-3.jpg']
        },
        {
          id: 'ar-061',
          name: 'Arabian Cashmere Design 8',
          price: 'R 23,999',
          productNumber: 'AR-061',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/61.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-3.jpg']
        },
        {
          id: 'ar-062',
          name: 'Arabian Cashmere Design 9',
          price: 'R 23,999',
          productNumber: 'AR-062',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/62.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-3.jpg']
        },
        {
          id: 'ar-063',
          name: 'Arabian Cashmere Design 10',
          price: 'R 23,999',
          productNumber: 'AR-063',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/63.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-3.jpg']
        },
        {
          id: 'ar-064',
          name: 'Arabian Cashmere Design 11',
          price: 'R 23,999',
          productNumber: 'AR-064',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/64.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/64-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/64-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/64-3.jpg']
        },
        {
          id: 'arabian-2',
          name: 'Arabian Cashmere Design 2',
          images: [
            'https://tbrhub.com/aladdinsride/images/160x230/14.jpg',
            'https://tbrhub.com/aladdinsride/images/160x230/14-1.jpg'
          ],
          price: 'R 23,999',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          stock: Math.floor(Math.random() * 8) + 3,
          productNumber: 'AR-014'
        }
      ]
    },
    'royal-heritage-medium': {
      name: 'Royal Heritage Medium Collection',
      description: 'Magnificent medium-sized rugs perfect for creating a luxurious focal point in spacious rooms and dining areas.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '200×300 cm',
      rugs: Array.from({ length: 15 }, (_, i) => ({
        id: `royal-medium-${i + 1}`,
        name: `Royal Heritage Medium ${i + 1}`,
        images: [
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 15}.jpg`,
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 15}-1.jpg`
        ],
        price: 'R 42,999',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        stock: Math.floor(Math.random() * 8) + 3,
        productNumber: `AR-${String(i + 15).padStart(3, '0')}`
      }))
    },
    'arabian-cashmere-medium': {
      name: 'Arabian Cashmere Medium Collection',
      description: 'Luxurious cashmere rugs with traditional Arabian craftsmanship, offering unparalleled softness and sophisticated design for spacious rooms.',
      material: 'Cashmere',
      origin: 'Saudi Arabia',
      size: '200×300 cm',
      rugs: Array.from({ length: 14 }, (_, i) => ({
        id: `arabian-medium-${i + 40}`,
        name: `Arabian Cashmere Medium ${i + 1}`,
        images: [
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 40}.jpg`,
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 40}-1.jpg`,
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 40}-2.jpg`,
          `https://tbrhub.com/aladdinsride/images/200x300/${i + 40}-3.jpg`
        ],
        price: 'R 45,999',
        material: 'Cashmere',
        origin: 'Saudi Arabia',
        stock: Math.floor(Math.random() * 8) + 3,
        productNumber: `AR-${String(i + 40).padStart(3, '0')}`
      }))
    },
    'grand-majesty': {
      name: 'Grand Majesty Collection',
      description: 'Extraordinary statement pieces that transform any room into a palace of elegance and sophistication.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '300×400 cm',
      rugs: Array.from({ length: 7 }, (_, i) => ({
        id: `grand-majesty-${i + 1}`,
        name: `Grand Majesty ${i + 1}`,
        images: [
          `https://tbrhub.com/aladdinsride/images/300x400/${i + 30}.jpg`,
          `https://tbrhub.com/aladdinsride/images/300x400/${i + 30}-1.jpg`,
          `https://tbrhub.com/aladdinsride/images/300x400/${i + 30}-2.jpg`
        ],
        price: 'R 74,999',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        stock: Math.floor(Math.random() * 8) + 3,
        productNumber: `AR-${String(i + 30).padStart(3, '0')}`
      }))
    },
    'premium-statement': {
      name: 'Premium Statement Collection',
      description: 'Exceptional statement pieces crafted for grand spaces that demand the finest in luxury and sophistication.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '240×340 cm',
      rugs: Array.from({ length: 2 }, (_, i) => ({
        id: `premium-statement-${i + 54}`,
        name: `Premium Statement ${i + 1}`,
        images: [
          i === 0 ? 'https://tbrhub.com/aladdinsride/images/240x340/54.jpg' : 'https://tbrhub.com/aladdinsride/images/240x340/55.jpg',
          i === 0 ? 'https://tbrhub.com/aladdinsride/images/240x340/54-1.jpg' : 'https://tbrhub.com/aladdinsride/images/240x340/55-1.jpg',
          i === 0 ? 'https://tbrhub.com/aladdinsride/images/240x340/54-2.jpg' : 'https://tbrhub.com/aladdinsride/images/240x340/55-2.jpg',
          i === 0 ? 'https://tbrhub.com/aladdinsride/images/240x340/54-3.jpg' : 'https://tbrhub.com/aladdinsride/images/240x340/55-3.jpg'
        ],
        price: 'R 64,999',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        stock: Math.floor(Math.random() * 8) + 3,
        productNumber: `AR-${String(i + 54).padStart(3, '0')}`
      }))
    },
    'palatial-masterpiece': {
      name: 'Palatial Masterpiece Collection',
      description: 'Magnificent oversized rugs that define luxury and grandeur, perfect for the most prestigious spaces and grand halls.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '300×500 cm',
      rugs: [
        {
          id: 'palatial-masterpiece-71',
          name: 'Palatial Masterpiece 1',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x500/71.jpg',
            'https://tbrhub.com/aladdinsride/images/300x500/71-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x500/71-2.jpg',
            'https://tbrhub.com/aladdinsride/images/300x500/71-3.jpg'
          ],
          price: 'R 89,999',
          material: 'Silk & Cashmere',
          origin: 'Iran',
          stock: Math.floor(Math.random() * 8) + 3,
          productNumber: 'AR-071'
        }
      ]
    },
  };

  // Generate rugs for each size category
  const rugCollections = {
    '80x600': [
      {
        id: '80x600-1',
        name: 'Hallway Runner',
        size: '80×600 cm',
        price: 'R 16,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/80x600/70.jpg'
        ],
        description: 'Elegant runner rugs perfect for hallways, corridors, and narrow spaces that need a touch of sophistication.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'hallway-runner',
        productNumber: 'AR-070'
      }
    ],
    '120x180': [
      {
        id: '120x180-1',
        name: 'Compact Elegance',
        size: '120×180 cm',
        price: 'R 18,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/120x180/65.jpg',
          'https://tbrhub.com/aladdinsride/images/120x180/65-1.jpg'
        ],
        description: 'Beautifully crafted smaller rugs perfect for intimate spaces, entryways, and accent areas where elegance meets functionality.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'compact-elegance',
        productNumber: 'AR-065'
      }
    ],
    '160x230': [
      {
        id: '160x230-1',
        name: 'Persian Silk Elegance',
        size: '160×230 cm',
        price: 'R 24,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/home/h2.jpg',
          'https://tbrhub.com/aladdinsride/images/160x230/1-1.jpg'
        ],
        description: 'Exquisite handwoven rug crafted with premium silk and cashmere, featuring intricate Persian patterns that bring timeless elegance to any space.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'persian-silk',
        productNumber: 'AR-001'
      },
      {
        id: '160x230-2',
        name: 'Arabian Cashmere Luxury',
        size: '160×230 cm',
        price: 'R 23,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/160x230/2.jpg',
          'https://tbrhub.com/aladdinsride/images/160x230/2-1.jpg'
        ],
        description: 'Luxurious cashmere rug with traditional Arabian craftsmanship, offering unparalleled softness and sophisticated design for discerning homes.',
        material: 'Cashmere',
        origin: 'Saudi Arabia',
        collectionKey: 'arabian-cashmere',
        productNumber: 'AR-013'
      }
    ],
    '200x300': [
      {
        id: '200x300-1',
        name: 'Royal Heritage Medium',
        size: '200×300 cm', 
        price: 'R 42,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/home/h3.jpg',
          'https://tbrhub.com/aladdinsride/images/200x300/25.jpg'
        ],
        description: 'Magnificent medium-sized rugs perfect for creating a luxurious focal point in spacious rooms and dining areas.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'royal-heritage-medium',
        productNumber: 'AR-015'
      },
      {
        id: '200x300-2', 
        name: 'Arabian Cashmere Medium',
        size: '200×300 cm',
        price: 'R 45,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/200x300/40.jpg',
          'https://tbrhub.com/aladdinsride/images/200x300/40-1.jpg'
        ],
        description: 'Luxurious cashmere rugs with traditional Arabian craftsmanship, perfect for creating an elegant focal point in dining areas and spacious rooms.',
        material: 'Cashmere',
        origin: 'Saudi Arabia',
        collectionKey: 'arabian-cashmere-medium',
        productNumber: 'AR-040'
      }
    ],
    '240x340': [
      {
        id: '240x340-1',
        name: 'Premium Statement',
        size: '240×340 cm',
        price: 'R 64,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/240x340/54.jpg',
          'https://tbrhub.com/aladdinsride/images/240x340/54-1.jpg',
          'https://tbrhub.com/aladdinsride/images/240x340/54-2.jpg',
          'https://tbrhub.com/aladdinsride/images/240x340/54-3.jpg'
        ],
        description: 'Exceptional statement pieces crafted for grand spaces that demand the finest in luxury and sophistication.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'premium-statement',
        productNumber: 'AR-054'
      }
    ],
    '300x400': [
      {
        id: '300x400-1',
        name: 'Grand Majesty',
        size: '300×400 cm',
        price: 'R 74,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/home/h9.jpg',
          'https://tbrhub.com/aladdinsride/images/300x400/30-1.jpg',
          'https://tbrhub.com/aladdinsride/images/300x400/30-2.jpg'
        ],
        description: 'Extraordinary statement pieces that transform any room into a palace of elegance and sophistication.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'grand-majesty',
        productNumber: 'AR-030'
      },
    ],
    '300x500': [
      {
        id: '300x500-1',
        name: 'Palatial Masterpiece',
        size: '300×500 cm',
        price: 'R 89,999',
        images: [
          'https://tbrhub.com/aladdinsride/images/300x500/71.jpg',
          'https://tbrhub.com/aladdinsride/images/300x500/71-1.jpg',
          'https://tbrhub.com/aladdinsride/images/300x500/71-2.jpg',
          'https://tbrhub.com/aladdinsride/images/300x500/71-3.jpg'
        ],
        description: 'Magnificent oversized rugs that define luxury and grandeur, perfect for the most prestigious spaces and grand halls.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'palatial-masterpiece',
        productNumber: 'AR-071'
      }
    ]
  };

  const nextImage = () => {
    if (selectedRug) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRug.images.length);
    } else if (selectedCollectionRug) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCollectionRug.images.length);
    }
  };

  const prevImage = () => {
    if (selectedRug) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRug.images.length) % selectedRug.images.length);
    } else if (selectedCollectionRug) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCollectionRug.images.length) % selectedCollectionRug.images.length);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCollection = (collectionKey: string) => {
    setViewingCollection(collectionKey);
    setSelectedRug(null);
    setSelectedCollectionRug(null);
    setCurrentView('collection');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setCurrentView('home');
    setViewingCollection(null);
    setSelectedRug(null);
    setSelectedCollectionRug(null);
    window.scrollTo(0, 0);
  };

  const openCollectionRug = (rug: CollectionRug) => {
    setSelectedCollectionRug(rug);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
    setCurrentView('rug-detail');
    window.scrollTo(0, 0);
  };

  const openRegularRug = (rug: Rug) => {
    setSelectedRug(rug);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
    setCurrentView('rug-detail');
    window.scrollTo(0, 0);
  };

  const goBackToCollection = () => {
    setSelectedCollectionRug(null);
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
    setCurrentView('collection');
    window.scrollTo(0, 0);
  };

  const generateWhatsAppMessage = (rug: Rug | CollectionRug) => {
    const rugDetails = selectedRug || selectedCollectionRug;
    const isFromCollection = !!selectedCollectionRug;
    const size = isFromCollection && viewingCollection 
      ? rugCollectionDetails[viewingCollection as keyof typeof rugCollectionDetails].size
      : selectedRug?.size || '160×230 cm';
    
    return `Hi, I'm interested in this product:

Product: ${rugDetails?.name}
Product Number: ${rugDetails?.productNumber}
Size: ${size}
Material: ${rugDetails?.material}
Origin: ${rugDetails?.origin}
Price: ${rugDetails?.price}

Please provide more information about availability and purchase options.`;
  };

  const openWhatsApp = (contact: 'jerome' | 'stephan') => {
    const rugDetails = selectedRug || selectedCollectionRug;
    if (!rugDetails) return;
    
    const message = generateWhatsAppMessage(rugDetails);
    const phoneNumbers = {
      jerome: '+27615880192',
      stephan: '+27798724778'
    };
    
    const whatsappUrl = `https://wa.me/${phoneNumbers[contact]}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowContactOptions(false);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer flex-1 min-w-0" onClick={goHome}>
            <img 
              src="https://tbrhub.com/aladdinsride/images/logo.png" 
              alt="Aladdin's Ride"
              className="h-8 sm:h-10 md:h-12 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 truncate">Aladdin's Ride</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden md:block">Premium Rug Collection</p>
            </div>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 flex-shrink-0">
            {currentView !== 'home' && (
              <button 
                onClick={goHome}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-gray-50"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
            <a href="#catalog" className="text-gray-700 hover:text-blue-600 transition-colors text-sm sm:text-base hidden md:inline px-2 py-1 rounded-lg hover:bg-gray-50">Catalog</a>
            <button 
              onClick={() => setShowContactModal(true)}
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm sm:text-base hidden md:inline px-2 py-1 rounded-lg hover:bg-gray-50"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  // Home Page
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        {/* Size Navigation */}
        <section id="catalog" className="py-6 sm:py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            {/* Logo Section */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <img 
                src="https://tbrhub.com/aladdinsride/images/logo.png" 
                alt="Aladdin's Ride"
                className="h-24 sm:h-32 md:h-48 lg:h-64 w-auto mx-auto mb-4 sm:mb-6 md:mb-8"
              />
            </div>
            
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">Our Premium Collection</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
                Choose from our carefully curated sizes, each designed for different spaces and occasions
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-2">
              {sizeCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 touch-manipulation ${
                    activeSection === category.id
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm sm:text-base md:text-lg font-bold">{category.name}</div>
                    <div className="text-xs sm:text-sm opacity-80 hidden sm:block">{category.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Size Sections */}
        {sizeCategories.map(category => (
          <section 
            key={category.id}
            id={`section-${category.id}`}
            className="py-6 sm:py-8 md:py-12 lg:py-16 border-b border-gray-100"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 px-4">{category.name} Collection</h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 leading-relaxed">{category.description}</p>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
                {rugCollections[category.id as keyof typeof rugCollections].map(rug => (
                  <div
                    key={rug.id}
                    className={`group cursor-pointer touch-manipulation ${
                      rugCollections[category.id as keyof typeof rugCollections].length === 1 
                        ? 'lg:col-span-2 max-w-2xl mx-auto' 
                        : ''
                    }`}
                    onClick={() => {
                      if (rug.collectionKey) {
                        openCollection(rug.collectionKey);
                      } else {
                        openRegularRug(rug);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 sm:duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3 active:scale-95">
                      {/* Image Container */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                        <img
                          src={rug.images[0]}
                          alt={rug.name}
                          className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500 sm:duration-700"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop';
                          }}
                        />
                        
                        {/* Size Badge */}
                        <div className="absolute top-2 sm:top-3 md:top-6 left-2 sm:left-3 md:left-6">
                          <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full">
                            <span className="text-xs sm:text-sm font-bold text-gray-800">{rug.size}</span>
                          </div>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 sm:from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Hover Action */}
                        <div className="absolute bottom-2 sm:bottom-3 md:bottom-6 left-2 sm:left-3 md:left-6 right-2 sm:right-3 md:right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 text-center">
                            <span className="text-blue-600 font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                              {rug.collectionKey ? 'View Collection' : 'View Details'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1">
                            <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                              {rug.name}
                            </h5>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{rug.description}</p>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 sm:mb-1.5">Material</div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-800">{rug.material}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 sm:mb-1.5">Origin</div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-800">{rug.origin}</div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="max-w-md mx-auto">
                <img 
                  src="https://tbrhub.com/aladdinsride/images/logo.png" 
                  alt="Aladdin's Ride"
                  className="h-6 sm:h-8 md:h-10 w-auto mb-3 sm:mb-4 brightness-0 invert mx-auto"
                />
                <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed text-center">
                  Premium handwoven rugs bringing timeless elegance to your home.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center text-gray-400 text-xs sm:text-sm">
              <p>&copy; 2024 Aladdin's Ride. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Collection Page
  if (currentView === 'collection' && viewingCollection) {
    const collection = rugCollectionDetails[viewingCollection as keyof typeof rugCollectionDetails];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 md:mb-8 overflow-x-auto">
            <button onClick={goHome} className="hover:text-blue-600 transition-colors">Home</button>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate">{collection.name}</span>
          </div>

          {/* Collection Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4 leading-tight">{collection.name}</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6 px-4 leading-relaxed">{collection.description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2 md:gap-8 text-xs sm:text-sm text-gray-500 px-4">
              <span><strong>Material:</strong> {collection.material}</span>
              <span><strong>Origin:</strong> {collection.origin}</span>
              <span><strong>Size:</strong> {collection.size}</span>
            </div>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>
          
          {/* Collection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {collection.rugs.map(rug => (
              <div
                key={rug.id}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer touch-manipulation active:scale-95 overflow-hidden group"
                onClick={() => openCollectionRug(rug)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={rug.images[0]}
                    alt={rug.name}
                    className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2 leading-tight line-clamp-2">{rug.name}</h3>
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <span className="text-xs sm:text-sm text-gray-500">{rug.material}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 md:mb-4">Origin: {rug.origin}</div>
                  <div className="text-center">
                    <span className="text-blue-600 font-medium text-xs sm:text-sm md:text-base">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Rug Detail Page
  if (currentView === 'rug-detail' && (selectedCollectionRug || selectedRug)) {
    const rug = selectedCollectionRug || selectedRug;
    const isFromCollection = !!selectedCollectionRug;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        {/* Contact Options Modal */}
        {showContactOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">Choose Contact</h3>
                <p className="text-sm sm:text-base text-gray-600">Select who you'd like to contact about this product</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => openWhatsApp('jerome')}
                  className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors font-semibold text-sm sm:text-base touch-manipulation active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contact Jerome
                </button>
                
                <button
                  onClick={() => openWhatsApp('stephan')}
                  className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors font-semibold text-sm sm:text-base touch-manipulation active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contact Stephan
                </button>
                
                <button
                  onClick={() => setShowContactOptions(false)}
                  className="w-full bg-gray-200 text-gray-800 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-gray-300 active:bg-gray-400 transition-colors font-semibold text-sm sm:text-base touch-manipulation active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-sm sm:text-base text-gray-600">Get in touch with our sales team</p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Jerome Contact */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-800">Jerome</h4>
                      <p className="text-sm text-gray-600">Sales Representative</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="tel:+27615880192"
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      +27 61 588 0192
                    </a>
                    <a 
                      href="https://wa.me/27615880192"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm sm:text-base text-green-600 hover:text-green-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Stephan Contact */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-800">Stephan</h4>
                      <p className="text-sm text-gray-600">Sales Representative</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="tel:+27798724778"
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      +27 79 872 4778
                    </a>
                    <a 
                      href="https://wa.me/27798724778"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm sm:text-base text-green-600 hover:text-green-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-gray-300 active:bg-gray-400 transition-colors font-semibold text-sm sm:text-base touch-manipulation active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 md:mb-8 flex-wrap overflow-x-auto">
            <button onClick={goHome} className="hover:text-blue-600 transition-colors">Home</button>
            <span>/</span>
            {isFromCollection && viewingCollection && (
              <>
                <button 
                  onClick={goBackToCollection} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {rugCollectionDetails[viewingCollection as keyof typeof rugCollectionDetails].name}
                </button>
                <span>/</span>
              </>
            )}
            <span className="text-gray-800 font-medium truncate">{rug?.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={rug?.images[currentImageIndex]}
                  alt={rug?.name}
                  className="w-full h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop';
                  }}
                />
                {rug && rug.images.length > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2 sm:p-3 md:p-4">
                    <button
                      onClick={prevImage}
                      className="bg-white bg-opacity-80 p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-opacity-100 transition-all shadow-lg touch-manipulation active:scale-95"
                    >
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-white bg-opacity-80 p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-opacity-100 transition-all shadow-lg touch-manipulation active:scale-95"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {rug && rug.images.length > 1 && (
                <div className="flex justify-center space-x-1.5 sm:space-x-2 md:space-x-3 overflow-x-auto pb-2 px-2">
                  {rug.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 touch-manipulation active:scale-95 ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${rug.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">{rug?.name}</h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">{rug?.price}</p>
                
                {selectedRug && (
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">{selectedRug.description}</p>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Product Number</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{rug?.productNumber}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Size</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {isFromCollection && viewingCollection 
                        ? rugCollectionDetails[viewingCollection as keyof typeof rugCollectionDetails].size
                        : '160×230 cm'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Material</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{rug?.material}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Origin</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{rug?.origin}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => setShowContactOptions(true)}
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors font-semibold text-sm sm:text-base md:text-lg touch-manipulation active:scale-95"
                >
                  Contact for Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;