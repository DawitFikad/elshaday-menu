export type Language = 'en' | 'am' | 'or';

export interface Translations {
  title: string;
  subtitle: string;
  menu: string;
  foods: string;
  drinks: string;
  beds: string;
  language: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  fasting: string;
  nonFasting: string;
  hotDrinks: string;
  coldDrinks: string;
  rating: string;
  description: string;
  ingredients: string;
  backToMenu: string;
  amenities: string;
  roomService: string;
  wifi: string;
  hotShower: string;
  standardRoom: string;
  twinBed: string;
  vipSuite: string;
  hotelReview: string;
  submitReview: string;
  selectLanguage: string;
  poweredBy: string;
  all: string;
  search: string;
  exploreServices: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "Elshaday Multipurpose Recreation",
    subtitle: "Experience Premium Hospitality & Traditional Flavors",
    menu: "Digital Menu",
    foods: "Food Menu",
    drinks: "Drink Menu",
    beds: "Rooms & Beds",
    language: "Language",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    fasting: "Fasting Dishes",
    nonFasting: "Non-Fasting Dishes",
    hotDrinks: "Hot Drinks",
    coldDrinks: "Cold Drinks",
    rating: "Rating",
    description: "Description",
    ingredients: "Ingredients",
    backToMenu: "Back to Menu",
    amenities: "Amenities",
    roomService: "24/7 Room Service",
    wifi: "Free High-Speed Wi-Fi",
    hotShower: "Hot Showers",
    standardRoom: "Standard Room",
    twinBed: "Twin Bed",
    vipSuite: "VIP Suite",
    hotelReview: "Hotel Review",
    submitReview: "Submit Review",
    selectLanguage: "Select Language",
    poweredBy: "Powered by Kuraz Digitals",
    all: "All",
    search: "Search",
    exploreServices: "Explore Our Services",
  },
  am: {
    title: "ኤልሻዳይ ሁለገብ መዝናኛ",
    subtitle: "ምርጥ መስተንግዶ እና ባህላዊ ጣዕሞችን ይለማመዱ",
    menu: "ዲጂታል ሜኑ",
    foods: "የምግብ ዝርዝር",
    drinks: "የመጠጥ ዝርዝር",
    beds: "ክፍሎች እና አልጋዎች",
    language: "ቋንቋ",
    breakfast: "ቁርስ",
    lunch: "ምሳ",
    dinner: "እራት",
    fasting: "የጾም ምግቦች",
    nonFasting: "የፍስክ ምግቦች",
    hotDrinks: "ትኩስ መጠጦች",
    coldDrinks: "ቀዝቃዛ መጠጦች",
    rating: "ደረጃ",
    description: "መግለጫ",
    ingredients: "ንጥረ ነገሮች",
    backToMenu: "ወደ ሜኑ ተመለስ",
    amenities: "አገልግሎቶች",
    roomService: "የ24 ሰዓት የክፍል አገልግሎት",
    wifi: "ነፃ ፈጣን ዋይፋይ",
    hotShower: "ትኩስ ሻወር",
    standardRoom: "መደበኛ ክፍል",
    twinBed: "መንትያ አልጋ",
    vipSuite: "ቪአይፒ ስዊት",
    hotelReview: "የሆቴል አስተያየት",
    submitReview: "አስተያየት ስጥ",
    selectLanguage: "ቋንቋ ይምረጡ",
    poweredBy: "በኩራዝ ዲጂታልስ የበለፀገ",
    all: "ሁሉም",
    search: "ፈልግ",
    exploreServices: "አገልግሎቶቻችንን ይመለከቱ",
  },
  or: {
    title: "Elshaday Multipurpose Recreation",
    subtitle: "Simannaa Ol'aanaa fi Mi'aa Aadaa dhandhamaa",
    menu: "Menuu Dijitaalaa",
    foods: "Menuu Nyaataa",
    drinks: "Menuu Dhugaatii",
    beds: "Kutaalee fi Algaa",
    language: "Afaan",
    breakfast: "Ciree",
    lunch: "Laxana",
    dinner: "Irbaata",
    fasting: "Nyaata Soomaa",
    nonFasting: "Nyaata Faasikaa",
    hotDrinks: "Dhugaatii Ho'aa",
    coldDrinks: "Dhugaatii Qabbanaawaa",
    rating: "Sadarkaa",
    description: "Ibsa",
    ingredients: "Qabeentoota",
    backToMenu: "Gara Meenuu deebi'i",
    amenities: "Tajaajiloota",
    roomService: "Tajaajila Kutaa 24/7",
    wifi: "Wi-Fi Ariitii Ol'aanaa",
    hotShower: "Dhiqannaa Ho'aa",
    standardRoom: "Kutaa Idilee",
    twinBed: "Algaa Dachaa",
    vipSuite: "VIP Suite",
    hotelReview: "Yaada Hoteelaa",
    submitReview: "Yaada Kenni",
    selectLanguage: "Afaan Filadhu",
    poweredBy: "Kuraz Digitals tiin kan hojjatame",
    all: "Hundaa",
    search: "Barbaadi",
    exploreServices: "Tajaajiloota Keessan Ilaali",
  },
};
