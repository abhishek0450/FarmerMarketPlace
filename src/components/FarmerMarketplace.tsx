import  { useState } from 'react';
import { ShoppingCart, Leaf, Apple, Carrot, Wheat, Languages } from 'lucide-react';

// Explicitly define Language type
type Language = 'english' | 'hindi';

// Detailed interface for translations
interface TranslationContent {
  header: {
    title: string;
    cart: string;
  };
  hero: {
    title: string;
    description: string;
  };
  categories: {
    fruits: {
      name: string;
      items: string[];
    };
    vegetables: {
      name: string;
      items: string[];
    };
    grains: {
      name: string;
      items: string[];
    };
    shopNow: string;
  };
  carousel: Array<{
    caption: string;
    alt: string;
  }>;
  footer: string;
}

// Strongly typed translations object
const translations: { [key in Language]: TranslationContent } = {
  english: {
    header: {
      title: "Farmer Direct Market",
      cart: "Cart"
    },
    hero: {
      title: "Connect Directly with Local Farmers",
      description: "Fresh, locally sourced agricultural products delivered straight from farm to your table. Support local farmers and enjoy the freshest produce."
    },
    categories: {
      fruits: {
        name: "Fresh Fruits",
        items: ['Apples', 'Bananas', 'Oranges', 'Strawberries', 'Mangoes']
      },
      vegetables: {
        name: "Fresh Vegetables",
        items: ['Tomatoes', 'Carrots', 'Spinach', 'Peppers', 'Broccoli']
      },
      grains: {
        name: "Grains & Cereals",
        items: ['Wheat', 'Rice', 'Corn', 'Oats', 'Barley']
      },
      shopNow: "Shop Now"
    },
    carousel: [
      {
        caption: "Supporting Local Farmers",
        alt: "Farmer working in lush green field"
      },
      {
        caption: "Farm-Fresh Produce",
        alt: "Fresh organic vegetables harvest"
      },
      {
        caption: "Community-Driven Agriculture",
        alt: "Farmers working together"
      }
    ],
    footer: "© 2024 Farmer Direct Market. Supporting Local Agriculture."
  },
  hindi: {
    header: {
      title: "किसान प्रत्यक्ष बाजार",
      cart: "कार्ट"
    },
    hero: {
      title: "स्थानीय किसानों से सीधे जुड़ें",
      description: "ताजा, स्थानीय रूप से उगाई गई कृषि उत्पाद सीधे खेत से आपकी मेज पर। स्थानीय किसानों का समर्थन करें और ताजा उत्पाद का आनंद लें।"
    },
    categories: {
      fruits: {
        name: "ताजा फल",
        items: ['सेब', 'केला', 'संतरा', 'स्ट्रॉबेरी', 'आम']
      },
      vegetables: {
        name: "ताजा सब्जियां",
        items: ['टमाटर', 'गाजर', 'पालक', 'शिमला मिर्च', 'ब्रोकोली']
      },
      grains: {
        name: "अनाज और अनाज",
        items: ['गेहूं', 'चावल', 'मक्का', 'ओट्स', 'जौ']
      },
      shopNow: "अभी खरीदें"
    },
    carousel: [
      {
        caption: "स्थानीय किसानों का समर्थन",
        alt: "हरे-भरे खेत में काम करते किसान"
      },
      {
        caption: "खेत से ताजा उत्पाद",
        alt: "ताजा जैविक सब्जियों की फसल"
      },
      {
        caption: "समुदाय-संचालित कृषि",
        alt: "एक साथ काम करते किसान"
      }
    ],
    footer: "© 2024 किसान प्रत्यक्ष बाजार. स्थानीय कृषि का समर्थन."
  }
};

// Type-safe translation getter
function getTranslation(lang: Language, path: string) {
  const keys = path.split('.');
  return keys.reduce((obj, key) => obj[key], translations[lang] as any);
}

const FarmerMarketplace: React.FC = () => {
  const [language, setLanguage] = useState<Language>('english');
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const carouselImages = translations[language].carousel.map(item => ({
    src: `/api/placeholder/1200/600?text=${encodeURIComponent(item.caption)}`,
    alt: item.alt,
    caption: item.caption
  }));

  const productCategories = [
    { 
      name: translations[language].categories.fruits.name, 
      items: translations[language].categories.fruits.items,
      icon: <Apple className="text-green-600" size={40} />
    },
    { 
      name: translations[language].categories.vegetables.name, 
      items: translations[language].categories.vegetables.items,
      icon: <Carrot className="text-orange-600" size={40} />
    },
    { 
      name: translations[language].categories.grains.name, 
      items: translations[language].categories.grains.items,
      icon: <Wheat className="text-yellow-600" size={40} />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Leaf size={40} />
          <h1 className="text-2xl font-bold">
            {translations[language].header.title}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            className="hover:bg-green-700 p-2 rounded-full transition flex items-center"
            title="Toggle Language"
          >
            <Languages size={24} className="mr-2" />
            {language === 'english' ? 'हि' : 'EN'}
          </button>

          <button className="hover:bg-green-700 p-2 rounded-full transition">
            <ShoppingCart size={24} />
          </button>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-in-out" 
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {carouselImages.map((image, index) => (
            <div 
              key={index} 
              className="absolute w-full h-full flex items-center justify-center"
              style={{ 
                left: `${index * 100}%`,
                transform: 'translateX(0)'
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                <p className="text-xl font-semibold">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full"
        >
          &#10095;
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-green-600' : 'bg-green-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            {translations[language].hero.title}
          </h2>
          <p className="text-center text-green-700 max-w-2xl mx-auto">
            {translations[language].hero.description}
          </p>
        </section>

        {/* Product Categories */}
        <section className="grid md:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-800 text-center mb-4">
                {category.name}
              </h3>
              <ul className="text-green-700 text-center">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-2">{item}</li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                  {translations[language].categories.shopNow}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>{translations[language].footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default FarmerMarketplace;