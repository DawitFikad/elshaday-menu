import { Language } from "./translations";

export interface MenuItem {
  id: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  isFasting: boolean;
  name: Record<Language, string>;
  description: Record<Language, string>;
  ingredients: Record<Language, string[]>;
  image: string;
  rating: number;
  price: number;
  arModel?: string;
  iosArModel?: string;
  hasArAssets?: boolean;
}

export const menuItems: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: "b1",
    category: "breakfast",
    isFasting: false,
    name: { en: "Chechebsa", am: "ጨጨብሳ", or: "Chechebsa / Qitta Firfir" },
    description: { en: "Golden spiced flatbread kissed with butter and tradition.", am: "በባህላዊ መንገድ የተዘጋጀ ጨጨብሳ በቂቤ እና በማር።", or: "Caccabsaa aadaa qibaa fi dammaan qophaa'e." },
    ingredients: { en: ["Flatbread", "Spiced butter", "Honey"], am: ["ጨጨብሳ", "ቂቤ", "ማር"], or: ["Qitta", "Qibaa", "Dammaan"] },
     image: "/images/chechebsa.png",
    rating: 4.9,
    price: 120,
    arModel: "/models/dessert.glb", // Using dessert as a generic model for now
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "b2",
    category: "breakfast",
    isFasting: false,
    name: { en: "Egg Firfir", am: "እንቁላል ፍርፍር", or: "Hanqaaquu Firfir" },
    description: { en: "Scrambled eggs infused with herbs, layered with soft flatbread elegance.", am: "በሽንኩርት፣ ቲማቲም እና ቃሪያ የተዘጋጀ የእንቁላል ፍርፍር።", or: "Inqulaala basalii, timaatimii fi qaariyaan qophaa'e." },
    ingredients: { en: ["Eggs", "Onions", "Tomatoes", "Green peppers"], am: ["እንቁላል", "ሽንኩርት", "ቲማቲም", "ቃሪያ"], or: ["Hanqaaquu", "Basalii", "Timaatimii", "Qaariyaa"] },
     image: "/images/Egg_firfir.png",
    rating: 4.8,
    price: 150,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "b3",
    category: "breakfast",
    isFasting: true,
    name: { en: "Kinche", am: "ቂንጬ", or: "Qincee" },
    description: { en: "Wholesome grains, delicately garnished with fresh herbs — a fasting delight.", am: "በዘይት ወይም በቂቤ የተዘጋጀ ቂንጬ።", or: "Qincee zayita ykn qibaan qophaa'e." },
    ingredients: { en: ["Cracked wheat", "Oil or butter"], am: ["ቂንጬ", "ዘይት ወይም ቂቤ"], or: ["Qincee", "Zayita ykn qibaa"] },
     image: "/images/kinche.png",
    rating: 4.6,
    price: 80,
    hasArAssets: false
  },
  {
    id: "b4",
    category: "breakfast",
    isFasting: true,
    name: { en: "Beso / Chuko", am: "በሶ / ጭኮ", or: "Chuuco / Chuko" },
    description: { en: "Roasted barley flour mixed with water/honey (Beso) or spiced butter (Chuko).", am: "በባህላዊ መንገድ የተዘጋጀ በሶ ወይም ጭኮ።", or: "Chuuco ykn Chuko aadaa." },
    ingredients: { en: ["Roasted barley flour", "Water or honey", "Spiced butter"], am: ["የበራሊ ዱቄት", "ውሃ ወይም ማር", "ቂቤ"], or: ["Daabboo barlee", "Bishaan ykn damma", "Qibaa"] },
     image: "/images/chico.png",
    rating: 4.7,
    price: 100,
    hasArAssets: false
  },
  {
    id: "b5",
    category: "breakfast",
    isFasting: true,
    name: { en: "Foul Medames", am: "ፉል", or: "Fuul" },
    description: { en: "Cooked fava beans with oil, cumin, and garnished with onions/peppers.", am: "በዘይት፣ በሽንኩርት እና በቃሪያ የተዘጋጀ ፉል።", or: "Fuul basalii fi qaariyaan qophaa'e." },
    ingredients: { en: ["Fava beans", "Oil", "Cumin", "Onions", "Peppers"], am: ["ፉል ባቄላ", "ዘይት", "ኩሚን", "ሽንኩርት", "ቃሪያ"], or: ["Baabaa fuulii", "Zayita", "Kuuminii", "Basalii", "Qaariyaa"] },
     image: "/images/foul.png",
    rating: 4.5,
    price: 90,
    hasArAssets: false
  },
  {
    id: "b6",
    category: "breakfast",
    isFasting: false,
    name: { en: "Genfo (Porridge)", am: "ገንፎ", or: "Marqaa" },
    description: { en: "Traditional thick porridge served with spiced butter and berbere.", am: "በባህላዊ መንገድ የተዘጋጀ ገንፎ በቂቤ እና በበርበሬ።", or: "Marqaa aadaa qibaa fi barbarreen." },
    ingredients: { en: ["Wheat flour", "Spiced butter", "Berbere spice"], am: ["ዱቄት ስንዴ", "ቂቤ", "በርበሬ"], or: ["Daabboo sinde", "Qibaa", "Barbarree"] },
     image: "/images/genfo.png",
    rating: 4.9,
    price: 180,
    hasArAssets: false
  },
  {
    id: "b7",
    category: "breakfast",
    isFasting: false,
    name: { en: "Fatira", am: "ፋቲራ", or: "Fatira" },
    description: { en: "Thin pancake with eggs and honey.", am: "በእንቁላል እና በማር የተዘጋጀ ፋቲራ።", or: "Fatira hanqaaquu fi dammaan." },
    ingredients: { en: ["Flour", "Eggs", "Honey"], am: ["ዱቄት", "እንቁላል", "ማር"], or: ["Daabboo", "Hanqaaquu", "Dammaan"] },
     image: "/images/fetira.png",
    rating: 4.8,
    price: 110,
    hasArAssets: false
  },
  {
    id: "b8",
    category: "breakfast",
    isFasting: false,
    name: { en: "Continental Breakfast", am: "ኮንቲኔንታል ቁርስ", or: "Qursii Warra Awurooppaa" },
    description: { en: "Modern breakfast featuring omelet, toast, and jam.", am: "ኦሜሌት፣ ቶስት እና ጃም የያዘ ዘመናዊ ቁርስ።", or: "Qursii ammayyaa hanqaaquu fi toostii." },
    ingredients: { en: ["Omelet", "Toast", "Jam"], am: ["ኦሜሌት", "ቶስት", "ጃም"], or: ["Oomelee", "Toostii", "Jaamii"] },
     image: "/images/Continental_Breakfast.png",
    rating: 4.4,
    price: 250,
    hasArAssets: false
  },

  // --- LUNCH & DINNER ---
  {
    id: "l1",
    category: "lunch",
    isFasting: false,
    name: { en: "Doro Wat", am: "ዶሮ ወጥ", or: "Ittoo Lukkuu" },
    description: { en: "Spicy chicken stew with hard-boiled eggs—the 'King of Dishes'.", am: "በጣም የታወቀ የዶሮ ወጥ ከእንቁላል ጋር።", or: "Lukkuun aadaa killa waliin." },
    ingredients: { en: ["Chicken", "Hard-boiled eggs", "Berbere spice", "Onions", "Garlic"], am: ["ዶሮ", "እንቁላል", "በርበሬ", "ሽንኩርት", "ነጭ ሽንኩርት"], or: ["Lukkuu", "Hanqaaquu", "Barbarree", "Basalii", "Qullubbii adii"] },
    image: "/images/doro_wat.png",
    rating: 5.0,
    price: 450,
    arModel: "/models/dorowot.glb",
    iosArModel: "/models/dorowot.usdz",
    hasArAssets: true
  },
  {
    id: "l2",
    category: "lunch",
    isFasting: false,
    name: { en: "Kitfo", am: "ክትፎ", or: "Kitfo" },
    description: { en: "Minced beef seasoned with mitmita and spiced butter.", am: "በሚጥሚጣ እና በቂቤ የተዘጋጀ ምርጥ የጎጃም ክትፎ።", or: "Kitfoo foon loonii qophaa'e." },
    ingredients: { en: ["Minced beef", "Mitmita spice", "Spiced butter", "Onions"], am: ["ስጋ", "ሚጥሚጣ", "ቂቤ", "ሽንኩርት"], or: ["Foon loonii", "Mitmitaa", "Qibaa", "Basalii"] },
    image: "/images/kitfo.png",
    rating: 5.0,
    price: 550,
    arModel: "/models/kitfo.glb",
    iosArModel: "/models/kitfo.usdz",
    hasArAssets: true
  },
  {
  id: "l3",
  category: "lunch",
  isFasting: false,
  name: { en: "Special Tibs", am: "ልዩ ጥብስ", or: "Tibsii Addaa" },
  description: { en: "Premium beef cubes sautéed with onions and peppers.", am: "ልዩ የበሬ ስጋ ጥብስ በሽንኩርት እና በቃሪያ።", or: "Xibsi addaa basalii fi qaariyaan." },
  ingredients: { en: ["Beef cubes", "Onions", "Peppers"], am: ["የበሬ ስጋ ቅሬቶች", "ሽንኩርት", "ቃሪያ"], or: ["Xibsi foonii", "Basalii", "Qaariyaa"] },
  image: "/images/tibs.png",   // ✅ changed
  rating: 4.9,
  price: 400,
  hasArAssets: false
  },
  {
    id: "l4",
    category: "lunch",
    isFasting: false,
    name: { en: "Zilzil Tibs", am: "ዝልዝል ጥብስ", or: "Cicciree" },
    description: { en: "Striped beef sautéed to perfection.", am: "ዝልዝል ተደርጎ የተጠበሰ የበሬ ስጋ።", or: "Cicciree foon loonii." },
    ingredients: { en: ["Beef strips", "Spices"], am: ["የበሬ ስጋ ቅጽቅጾች", "ቅመማ ቅመም"], or: ["Xibsi foonii", "Qimamaan"] },
    image: "/images/zilzil_tibs.png",
    rating: 4.7,
    price: 380,
    hasArAssets: false
  },
  {
    id: "l5",
    category: "lunch",
    isFasting: false,
    name: { en: "Gomen be Siga", am: "ጎመን በስጋ", or: "Raafuu fooniin" },
    description: { en: "Collard greens cooked with beef cubes and spices.", am: "ጎመን በስጋ እና በቅመማ ቅመም።", or: "Raafuu foonii fi qimamaan." },
    ingredients: { en: ["Collard greens", "Beef cubes", "Spices"], am: ["ጎመን", "የበሬ ስጋ ቅሬቶች", "ቅመማ ቅመም"], or: ["Raafuu", "Xibsi foonii", "Qimamaan"] },
   image: "/images/gomen_be_siga.png",
    rating: 4.6,
    price: 320,
    hasArAssets: false
  },
  {
    id: "l6",
    category: "lunch",
    isFasting: true,
    name: { en: "Beyaynetu", am: "በያይነቱ", or: "Beyaynetu" },
    description: { en: "Assorted vegan platter of lentils, chickpeas, and vegetables.", am: "የተለያዩ የጾም ወጦች በያይነቱ።", or: "Beyaynetuu nyaata soomaa garaagaraa." },
    ingredients: { en: ["Lentils", "Chickpeas", "Vegetables"], am: ["ምስር", "ሽሮ", "አትክልቶች"], or: ["Misira", "Shiroo", "Atakaalaa"] },
    image: "/images/Beyaynetu.png",
    rating: 4.9,
    price: 280,
    hasArAssets: false
  },
  {
    id: "l7",
    category: "lunch",
    isFasting: true,
    name: { en: "Shiro Tegabino", am: "ሽሮ ተጋቢኖ", or: "Shiro Tegabino" },
    description: { en: "Thick, bubbling chickpea stew served in a clay pot.", am: "በባህላዊ መንገድ የሚዘጋጅ ጣፋጭ ሽሮ።", or: "Shiroo aadaa jabanaan qophaa'e." },
    ingredients: { en: ["Chickpea flour", "Spices", "Oil"], am: ["ሽሮ ዱቄት", "ቅመማ ቅመም", "ዘይት"], or: ["Daabboo shiroo", "Qimamaan", "Zayita"] },
    image: "/images/shiro.png",
    rating: 4.8,
    price: 180,
    hasArAssets: false
  },
  {
    id: "l8",
    category: "lunch",
    isFasting: true,
    name: { en: "Misir Wot", am: "ምስር ወጥ", or: "Ittoo Misira" },
    description: { en: "Spicy red lentil stew.", am: "በበርበሬ የተዘጋጀ የምስር ወጥ።", or: "Ittoo misira barbarreen." },
    ingredients: { en: ["Red lentils", "Berbere spice", "Onions"], am: ["ቀይ ምስር", "በርበሬ", "ሽንኩርት"], or: ["Misira diimaa", "Barbarree", "Basalii"] },
    image: "/images/mesir_wot.png",
    rating: 4.5,
    price: 150,
    hasArAssets: false
  },
  {
    id: "l9",
    category: "lunch",
    isFasting: true,
    name: { en: "Atkilt Wot", am: "የአትክልት ወጥ", or: "Ittoo Atakaalaa" },
    description: { en: "Steamed vegetable stew with carrots and potatoes.", am: "የተለያዩ አትክልቶች ወጥ።", or: "Ittoo atakaalaa garaagaraa." },
    ingredients: { en: ["Carrots", "Potatoes", "Other vegetables"], am: ["ካሮት", "ያና እና ሌሎች አትክልቶች"], or: ["Kaarootii", "Yaana fi atakaalaa biroo"] },
    image: "/images/atkilt_Wot.png",
    rating: 4.4,
    price: 140,
    hasArAssets: false
  },
  {
    id: "l10",
    category: "lunch",
    isFasting: true,
    name: { en: "Asa Tibs", am: "ዓሣ ጥብስ", or: "Qurxummii Fiitii" },
    description: { en: "Fried fish seasoned with traditional spices.", am: "የተጠበሰ ዓሣ በቅመማ ቅመም።", or: "Qurxummii fiitii aadaa." },
    ingredients: { en: ["Fish", "Traditional spices"], am: ["ዓሣ", "ባህላዊ ቅመማ ቅመም"], or: ["Qurxummii", "Qimamaan aadaa"] },
    image: "/images/Asa_Tibs.png",
    rating: 4.7,
    price: 350,
    hasArAssets: false
  },
  {
    id: "l11",
    category: "lunch",
    isFasting: true,
    name: { en: "Traditional Dessert", am: "ባህላዊ ጣፋጭ", or: "Dessert Aadaa" },
    description: { en: "A sweet traditional Ethiopian delight.", am: "ጣፋጭ ባህላዊ የኢትዮጵያ ምግብ።", or: "Nyaata mi'aawaa aadaa." },
    ingredients: { en: ["Honey", "Grains", "Fruits"], am: ["ማር", "ጥራጥሬ", "ፍራፍሬ"], or: ["Damma", "Midhaan", "Fuduraa"] },
    image: "/images/continental_breakfast.png", // Placeholder image
    rating: 4.9,
    price: 150,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  }
];

export interface DrinkItem {
  id: string;
  category: 'hot' | 'cold';
  subCategory?: 'soft' | 'beer' | 'whiskey' | 'traditional';
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  rating: number;
  price: number;
  arModel?: string;
  iosArModel?: string;
  hasArAssets?: boolean;
}

export const drinkItems: DrinkItem[] = [
  // --- HOT DRINKS ---
  {
    id: "hd1",
    category: "hot",
    name: { en: "Ethiopian Coffee", am: "የኢትዮጵያ ቡና", or: "Buna Itiyoophiyaa" },
    description: { en: "Traditional ceremony coffee served black or with milk.", am: "በባህላዊ መንገድ የተዘጋጀ ቡና።", or: "Buna aadaa." },
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    price: 40,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "hd2",
    category: "hot",
    name: { en: "Spiced Tea", am: "ቅመም ሻይ", or: "Shayii Qimamaa" },
    description: { en: "Tea infused with cinnamon and cloves.", am: "በቅመማ ቅመም የተዘጋጀ ሻይ።", or: "Shayii qimamaan." },
    image: "/images/tea.png",
    rating: 4.8,
    price: 25,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "hd3",
    category: "hot",
    name: { en: "Macchiato", am: "ማኪያቶ", or: "Maakiyaatoo" },
    description: { en: "Rich espresso with steamed milk.", am: "በወተት የተዘጋጀ ማኪያቶ።", or: "Maakiyaatoo aadaa." },
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    price: 45,
    hasArAssets: false
  },
  {
    id: "hd4",
    category: "hot",
    name: { en: "Hot Chocolate", am: "ቸኮሌት መጠጥ", or: "Chokoleetii Ho'aa" },
    description: { en: "Warm and creamy chocolate drink.", am: "ትኩስ ቸኮሌት መጠጥ።", or: "Chokoleetii ho'aa." },
    image: "/images/hot_chocolate.png",
    rating: 4.7,
    price: 70,
    hasArAssets: false
  },
  {
    id: "hd5",
    category: "hot",
    name: { en: "Milk", am: "ወተት", or: "Annann" },
    description: { en: "Freshly boiled whole milk.", am: "ትኩስ ወተት።", or: "Aannan ho'aa." },
    image: "/images/milk.png",
    rating: 4.5,
    price: 35,
    hasArAssets: false
  },

  // --- COLD DRINKS ---
  {
    id: "cd1",
    category: "cold",
    subCategory: "soft",
    name: { en: "Spris (Mixed Juice)", am: "ስፕሪስ", or: "Isppiriis" },
    description: { en: "Layered avocado, mango, and papaya juice.", am: "የተለያዩ ፍራፍሬዎች ድብልቅ ጭማቂ።", or: "Cuunfaa isppiriis." },
    image: "/images/spris.png",
    rating: 4.9,
    price: 90,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "cd2",
    category: "cold",
    subCategory: "soft",
    name: { en: "Fresh Mango Juice", am: "ማንጎ ጭማቂ", or: "Cuunfaa Maangoo" },
    description: { en: "100% organic seasonal mango juice.", am: "ትኩስ የማንጎ ጭማቂ።", or: "Cuunfaa maangoo haaraa." },
    image: "/images/mango.png",
    rating: 4.8,
    price: 100,
    arModel: "/models/dessert.glb",
    iosArModel: "/models/dessert.usdz",
    hasArAssets: true
  },
  {
    id: "cd3",
    category: "cold",
    subCategory: "soft",
    name: { en: "Ambo Water", am: "አምቦ ውሃ", or: "Bishaan Amboo" },
    description: { en: "Sparkling mineral water.", am: "የአምቦ ማዕድን ውሃ።", or: "Bishaan amboo." },
   image: "/images/ambo.png",
    rating: 4.7,
    price: 35,
    hasArAssets: false
  },
  {
    id: "cd4",
    category: "cold",
    subCategory: "soft",
    name: { en: "Soft Drinks", am: "ለስላሳ መጠጦች", or: "Dhugaatii lallaafaa" },
    description: { en: "Coke, Sprite, Fanta, and more.", am: "ኮካ፣ ስፕራይት፣ ፋንታ እና ሌሎችም።", or: "Kookaa, Sipiraayitii, Faantaa." },
   image: "/images/soft.png",
    rating: 4.6,
    price: 40,
    hasArAssets: false
  },
  {
    id: "cd5",
    category: "cold",
    subCategory: "traditional",
    name: { en: "Birz", am: "ብርዝ", or: "Birzii / Booka" },
    description: { en: "Non-alcoholic honey drink.", am: "አልኮል የሌለው የማር መጠጥ።", or: "Dhugaatii dammaa." },
   image: "/images/birz.png",
    rating: 4.7,
    price: 60,
    hasArAssets: false
  },
  {
    id: "cd6",
    category: "cold",
    subCategory: "traditional",
    name: { en: "Tej (Honey Wine)", am: "ጠጅ", or: "Daaddii" },
    description: { en: "Traditional Ethiopian honey wine.", am: "በባህላዊ መንገድ የተዘጋጀ ጠጅ።", or: "Daaddii aadaa." },
    image: "/images/tij.png",
    rating: 4.8,
    price: 120,
    hasArAssets: false
  }
];
