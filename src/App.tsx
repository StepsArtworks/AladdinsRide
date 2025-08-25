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

  // Rug Detail View Component
  const RugDetailView = () => {
    const currentRug = selectedRug || selectedCollectionRug;
    if (!currentRug) return null;

    const nextImage = () => {
      setCurrentImageIndex((prev) => 
        prev === currentRug.images.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentRug.images.length - 1 : prev - 1
      );
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Navigation Header */}
        <header className="bg-white shadow-lg border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (selectedCollectionRug) {
                      setCurrentView('collection');
                      setSelectedCollectionRug(null);
                    } else {
                      setCurrentView('home');
                      setSelectedRug(null);
                    }
                    setCurrentImageIndex(0);
                    setIsZoomed(false);
                  }}
                  className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              </div>
              <div className="text-2xl font-bold text-amber-800">Aladdin's Ride</div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <div 
                  className="relative aspect-square cursor-zoom-in"
                  onClick={() => setIsZoomed(!isZoomed)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={currentRug.images[currentImageIndex]}
                    alt={`${currentRug.name} - Image ${currentImageIndex + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : {}
                    }
                  />
                  
                  {/* Navigation Arrows */}
                  {currentRug.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  {currentRug.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {currentRug.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {currentRug.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {currentRug.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-amber-500 shadow-lg'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${currentRug.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
                  {currentRug.name}
                </h1>
                <p className="text-lg text-amber-700">
                  Product Number: {currentRug.productNumber}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium text-gray-800">{currentRug.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium text-gray-800">{currentRug.origin}</span>
                  </div>
                  {selectedRug?.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium text-gray-800">{selectedRug.size}</span>
                    </div>
                  )}
                  {selectedCollectionRug?.stock && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stock:</span>
                      <span className="font-medium text-green-600">{selectedCollectionRug.stock} available</span>
                    </div>
                  )}
                </div>
              </div>

              {(selectedRug?.description || (selectedCollectionRug && rugCollectionDetails[viewingCollection]?.description)) && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedRug?.description || rugCollectionDetails[viewingCollection]?.description}
                  </p>
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-900 mb-4">Interested in this piece?</h3>
                <p className="text-amber-700 mb-4">
                  Contact us for pricing, availability, and custom sizing options.
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Get Quote & Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          material: 'Silk & Cashmere',
          origin: 'Iran',
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
        material: 'Silk & Cashmere',
        origin: 'Iran',
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
        material: 'Silk & Cashmere',
        origin: 'Iran',
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
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          productNumber: 'AR-013'
        },
        {
          id: 'ar-056',
          name: 'Arabian Cashmere Design 3',
          productNumber: 'AR-056',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/56.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/56-3.jpg']
        },
        {
          id: 'ar-057',
          name: 'Arabian Cashmere Design 4',
          productNumber: 'AR-057',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/57.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/57-3.jpg']
        },
        {
          id: 'ar-058',
          name: 'Arabian Cashmere Design 5',
          productNumber: 'AR-058',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/58.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/58-3.jpg']
        },
        {
          id: 'ar-059',
          name: 'Arabian Cashmere Design 6',
          productNumber: 'AR-059',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/59.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/59-3.jpg']
        },
        {
          id: 'ar-060',
          name: 'Arabian Cashmere Design 7',
          productNumber: 'AR-060',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/60.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/60-3.jpg']
        },
        {
          id: 'ar-061',
          name: 'Arabian Cashmere Design 8',
          productNumber: 'AR-061',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/61.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/61-3.jpg']
        },
        {
          id: 'ar-062',
          name: 'Arabian Cashmere Design 9',
          productNumber: 'AR-062',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/62.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/62-3.jpg']
        },
        {
          id: 'ar-063',
          name: 'Arabian Cashmere Design 10',
          productNumber: 'AR-063',
          material: 'Cashmere',
          origin: 'Saudi Arabia',
          images: ['https://tbrhub.com/aladdinsride/images/160x230/63.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-1.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-2.jpg', 'https://tbrhub.com/aladdinsride/images/160x230/63-3.jpg']
        },
        {
          id: 'ar-064',
          name: 'Arabian Cashmere Design 11',
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
          material: 'Cashmere',
          origin: 'Saudi Arabia',
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
        material: 'Silk & Cashmere',
        origin: 'Iran',
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
        material: 'Cashmere',
        origin: 'Saudi Arabia',
        productNumber: `AR-${String(i + 40).padStart(3, '0')}`
      }))
    },
    'grand-majesty': {
      name: 'Grand Majesty Collection',
      description: 'Extraordinary statement pieces that transform any room into a palace of elegance and sophistication.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '300×400 cm',
      rugs: [
        {
          id: 'grand-majesty-30',
          name: 'Grand Majesty 1',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/30.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/30-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/30-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-030'
        },
        {
          id: 'grand-majesty-31',
          name: 'Grand Majesty 2',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/31.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/31-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/31-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-031'
        },
        {
          id: 'grand-majesty-32',
          name: 'Grand Majesty 3',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/32.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/32-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/32-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-032'
        },
        {
          id: 'grand-majesty-33',
          name: 'Grand Majesty 4',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/33.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/33-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/33-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-033'
        },
        {
          id: 'grand-majesty-34',
          name: 'Grand Majesty 5',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/34.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/34-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/34-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-034'
        },
        {
          id: 'grand-majesty-35',
          name: 'Grand Majesty 6',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/35.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/35-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/35-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-035'
        },
        {
          id: 'grand-majesty-36',
          name: 'Grand Majesty 7',
          images: [
            'https://tbrhub.com/aladdinsride/images/300x400/36.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/36-1.jpg',
            'https://tbrhub.com/aladdinsride/images/300x400/36-2.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-036'
        }
      ]
    },
    'premium-statement': {
      name: 'Premium Statement Collection',
      description: 'Exceptional statement pieces crafted for grand spaces that demand the finest in luxury and sophistication.',
      material: 'Silk & Cashmere',
      origin: 'Iran',
      size: '240×340 cm',
      rugs: [
        {
          id: 'premium-statement-54',
          name: 'Premium Statement 1',
          images: [
            'https://tbrhub.com/aladdinsride/images/240x340/54.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/54-1.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/54-2.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/54-3.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-054'
        },
        {
          id: 'premium-statement-55',
          name: 'Premium Statement 2',
          images: [
            'https://tbrhub.com/aladdinsride/images/240x340/55.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/55-1.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/55-2.jpg',
            'https://tbrhub.com/aladdinsride/images/240x340/55-3.jpg'
          ],
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-055'
        }
      ]
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
          material: 'Silk & Cashmere',
          origin: 'Iran',
          productNumber: 'AR-071'
        }
      ]
    },
    '200x300-combined': {
      name: '200×300 cm Collections',
      description: 'Discover our exquisite medium-sized collections, perfect for creating luxurious focal points in spacious rooms and dining areas.',
      material: 'Silk & Cashmere / Cashmere',
      origin: 'Iran / Saudi Arabia',
      size: '200×300 cm',
      rugs: [] // This will be handled specially in the CollectionView
    }
  };

  // Generate rugs for each size category
  const rugCollections = {
    '80x600': [],
    '120x180': [
      // Direct navigation to collection - no intermediate card
    ],
    '160x230': [
      // Direct navigation to combined collections view
    ],
    '200x300': [
      // Direct navigation to combined collections view
    ],
    '240x340': [],
    '300x400': [
      {
        id: '300x400-1',
        name: 'Grand Majesty',
        size: '300×400 cm',
        images: [
          'https://tbrhub.com/aladdinsride/images/300x400/30.jpg',
          'https://tbrhub.com/aladdinsride/images/300x400/30-1.jpg'
        ],
        description: 'Extraordinary statement pieces that transform any room into a palace of elegance and sophistication.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'grand-majesty',
        productNumber: 'AR-030'
      }
    ],
    '300x500': [
      {
        id: '300x500-1',
        name: 'Palatial Masterpiece',
        size: '300×500 cm',
        images: [
          'https://tbrhub.com/aladdinsride/images/300x500/71.jpg',
          'https://tbrhub.com/aladdinsride/images/300x500/71-1.jpg'
        ],
        description: 'Magnificent oversized rugs that define luxury and grandeur, perfect for the most prestigious spaces and grand halls.',
        material: 'Silk & Cashmere',
        origin: 'Iran',
        collectionKey: 'palatial-masterpiece',
        productNumber: 'AR-071'
      }
    ]
  };

  // Collection View Component
  const CollectionView = () => {
    if (!viewingCollection || !rugCollectionDetails[viewingCollection]) return null;

    const collection = rugCollectionDetails[viewingCollection];

    // Special handling for combined 200x300 collections
    if (viewingCollection === '200x300-combined') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          {/* Navigation Header */}
          <header className="bg-white shadow-lg border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setCurrentView('home');
                      setViewingCollection(null);
                    }}
                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Collections</span>
                  </button>
                </div>
                <div className="text-2xl font-bold text-amber-800">Aladdin's Ride</div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Combined Collections Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                200×300 cm Collections
              </h1>
              <p className="text-lg text-amber-700 max-w-3xl mx-auto mb-6">
                Discover our exquisite medium-sized collections, perfect for creating luxurious focal points in spacious rooms and dining areas.
              </p>
            </div>

            {/* Royal Heritage Medium Collection */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-3">Royal Heritage Medium Collection</h2>
                <p className="text-amber-600 max-w-2xl mx-auto mb-4">
                  Magnificent medium-sized rugs perfect for creating a luxurious focal point in spacious rooms and dining areas.
                </p>
                <div className="flex justify-center space-x-6 text-sm text-amber-600">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Material:</span>
                    <span>Silk & Cashmere</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Origin:</span>
                    <span>Iran</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rugCollectionDetails['royal-heritage-medium'].rugs.map((rug) => (
                  <div
                    key={rug.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCollectionRug(rug);
                      setCurrentImageIndex(0);
                      setCurrentView('rug-detail');
                    }}
                  >
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                      <img
                        src={rug.images[0]}
                        alt={rug.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{rug.name}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>{rug.material}</span>
                        <span>{rug.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Product: {rug.productNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-amber-200 my-16"></div>

            {/* Arabian Cashmere Medium Collection */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-3">Arabian Cashmere Medium Collection</h2>
                <p className="text-amber-600 max-w-2xl mx-auto mb-4">
                  Luxurious cashmere rugs with traditional Arabian craftsmanship, offering unparalleled softness and sophisticated design for spacious rooms.
                </p>
                <div className="flex justify-center space-x-6 text-sm text-amber-600">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Material:</span>
                    <span>Cashmere</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Origin:</span>
                    <span>Saudi Arabia</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rugCollectionDetails['arabian-cashmere-medium'].rugs.map((rug) => (
                  <div
                    key={rug.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCollectionRug(rug);
                      setCurrentImageIndex(0);
                      setCurrentView('rug-detail');
                    }}
                  >
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                      <img
                        src={rug.images[0]}
                        alt={rug.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{rug.name}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>{rug.material}</span>
                        <span>{rug.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Product: {rug.productNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Special handling for combined 160x230 collections
    if (viewingCollection === '160x230-combined') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          {/* Navigation Header */}
          <header className="bg-white shadow-lg border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setCurrentView('home');
                      setViewingCollection(null);
                    }}
                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Collections</span>
                  </button>
                </div>
                <div className="text-2xl font-bold text-amber-800">Aladdin's Ride</div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Combined Collections Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                160×230 cm Collections
              </h1>
              <p className="text-lg text-amber-700 max-w-3xl mx-auto mb-6">
                Discover our exquisite compact collections, perfect for living rooms, bedrooms, and creating elegant focal points.
              </p>
            </div>

            {/* Persian Silk Elegance Collection */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-3">Persian Silk Elegance Collection</h2>
                <p className="text-amber-600 max-w-2xl mx-auto mb-4">
                  Exquisite handwoven rugs crafted with premium silk and cashmere, featuring intricate Persian patterns.
                </p>
                <div className="flex justify-center space-x-6 text-sm text-amber-600">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Material:</span>
                    <span>Silk & Cashmere</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Origin:</span>
                    <span>Iran</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rugCollectionDetails['persian-silk'].rugs.map((rug) => (
                  <div
                    key={rug.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCollectionRug(rug);
                      setCurrentImageIndex(0);
                      setCurrentView('rug-detail');
                    }}
                  >
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                      <img
                        src={rug.images[0]}
                        alt={rug.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{rug.name}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>{rug.material}</span>
                        <span>{rug.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Product: {rug.productNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-amber-200 my-16"></div>

            {/* Arabian Cashmere Luxury Collection */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-3">Arabian Cashmere Luxury Collection</h2>
                <p className="text-amber-600 max-w-2xl mx-auto mb-4">
                  Luxurious cashmere rugs with traditional Arabian craftsmanship, offering unparalleled softness and sophisticated design.
                </p>
                <div className="flex justify-center space-x-6 text-sm text-amber-600">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Material:</span>
                    <span>Cashmere</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Origin:</span>
                    <span>Saudi Arabia</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rugCollectionDetails['arabian-cashmere'].rugs.map((rug) => (
                  <div
                    key={rug.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCollectionRug(rug);
                      setCurrentImageIndex(0);
                      setCurrentView('rug-detail');
                    }}
                  >
                    <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                      <img
                        src={rug.images[0]}
                        alt={rug.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{rug.name}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>{rug.material}</span>
                        <span>{rug.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Product: {rug.productNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Navigation Header */}
        <header className="bg-white shadow-lg border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setViewingCollection(null);
                  }}
                  className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Collections</span>
                </button>
              </div>
              <div className="text-2xl font-bold text-amber-800">Aladdin's Ride</div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Collection Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {collection.name}
            </h1>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto mb-6">
              {collection.description}
            </p>
            <div className="flex justify-center space-x-8 text-sm text-amber-600">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Material:</span>
                <span>{collection.material}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Origin:</span>
                <span>{collection.origin}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Size:</span>
                <span>{collection.size}</span>
              </div>
            </div>
          </div>

          {/* Collection Rugs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.rugs.map((rug) => (
              <div
                key={rug.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => {
                  setSelectedCollectionRug(rug);
                  setCurrentImageIndex(0);
                  setCurrentView('rug-detail');
                }}
              >
                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <img
                    src={rug.images[0]}
                    alt={rug.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{rug.name}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{rug.material}</span>
                    <span>{rug.origin}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Product: {rug.productNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Home View Component
  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation Header */}
      <header className="bg-white shadow-lg border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-amber-800">Aladdin's Ride</div>
              <div className="hidden md:block text-sm text-amber-600">Premium Persian & Arabian Rugs</div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-amber-700 hover:text-amber-900 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Exquisite Handwoven Rugs
          </h1>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto">
            Discover our curated collection of premium Persian and Arabian rugs, 
            each piece a masterwork of traditional craftsmanship and timeless elegance.
          </p>
        </div>

        {/* Size Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {sizeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveSection(category.id)}
                onClickCapture={() => {
                  if (category.id === '120x180') {
                    setViewingCollection('compact-elegance');
                    setCurrentView('collection');
                  } else if (category.id === '80x600') {
                    setViewingCollection('hallway-runner');
                    setCurrentView('collection');
                  } else if (category.id === '240x340') {
                    setViewingCollection('premium-statement');
                    setCurrentView('collection');
                  } else if (category.id === '300x400') {
                    setViewingCollection('grand-majesty');
                    setCurrentView('collection');
                  } else if (category.id === '300x500') {
                    setViewingCollection('palatial-masterpiece');
                    setCurrentView('collection');
                  } else if (category.id === '200x300') {
                    setViewingCollection('200x300-combined');
                    setCurrentView('collection');
                  } else if (category.id === '160x230') {
                    setViewingCollection('160x230-combined');
                    setCurrentView('collection');
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === category.id
                    ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Category Description */}
          <div className="text-center">
            <p className="text-amber-600 italic">
              {sizeCategories.find(cat => cat.id === activeSection)?.description}
            </p>
          </div>
        </div>

        {/* Rug Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rugCollections[activeSection]?.map((rug) => (
            <div
              key={rug.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                if (rug.collectionKey) {
                  setViewingCollection(rug.collectionKey);
                  setCurrentView('collection');
                } else {
                  setSelectedRug(rug);
                  setCurrentImageIndex(0);
                  setCurrentView('rug-detail');
                }
              }}
            >
              <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                <img
                  src={rug.images[0]}
                  alt={rug.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{rug.name}</h3>
                  <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    {rug.size}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rug.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{rug.material}</span>
                  <span>{rug.origin}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'rug-detail') {
    return <RugDetailView />;
  }

  if (currentView === 'collection') {
    return <CollectionView />;
  }

  return <HomeView />;
}

export default App;