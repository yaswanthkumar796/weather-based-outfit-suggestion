const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('./models/Outfit');

dotenv.config();

// Image IDs (Verified)
// Men Summer Casual: cV58ouCA7dU, ro81IGqGtwY
// Women Summer Casual: IEakboWH0hk, 9lS5Bvr2T3g
// Men Winter Casual: Ocb3KD56qRk, nFP8zIPH9Ls
// Women Winter Casual: 8Uc8_4YVbns, QkjZggYBT6M
// Men Business: zCSlmX3-98I, yMpZJvTEspk
// Women Business: 9MoQKZW0nGU, DOXaUBo59Y8
// Women Party: 7mmJBBdhbE8, gd63m4X2zE0
// Men Party: VBwA79hD5Os, UhK_3O5eQHU

const outfits = [

  // summer -> casual -> male
  {
    name: "Coastal Linen Vibe",
    category: "Casual",
    items: ["Linen Button-Down", "White Chinos", "Leather Sandals"],
    imageUrl: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Urban Weekend Style",
    category: "Casual",
    items: ["Basic White Tee", "Khaki Shorts", "Canvas Sneakers", "Baseball Cap"],
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Tropical Evening Look",
    category: "Casual",
    items: ["Printed Resort Shirt", "Dark Denim Shorts", "Espadrilles"],
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Summer"],
    gender: "Male"
  },
  //  summer -> casual -> female
  {
    name: "Boho Summer Chic",
    category: "Casual",
    items: ["Patterned Summer Dress", "Straw Hat", "Minimalist Jewelry"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1668896123844-be3aec7a4776?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Classic White Sundress",
    category: "Casual",
    items: ["White Midi Dress", "Woven Bag", "Flat Sandals"],
    imageUrl: "https://images.unsplash.com/photo-1599309329365-0a9ed45a1da3?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Tropical Print Breeze",
    category: "Casual",
    items: ["Floral Wrap Dress", "Sunglasses", "Ankle Bracelet"],
    imageUrl: "https://images.unsplash.com/photo-1584998316204-3b1e3b1895ae?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  // winter -> casual -> male

  {
    name: "Classic Overcoat Layer",
    category: "Casual",
    items: ["Beige Overcoat", "White Turtleneck", "Black Trousers"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1670623042512-1a5ecebc3f42?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Minimalist Winter Knit",
    category: "Casual",
    items: ["Cream Knit Sweater", "Dark Jeans", "Chelsea Boots"],
    imageUrl: "https://images.unsplash.com/photo-1612476176652-d51072000e57?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Urban Puffer Comfort",
    category: "Casual",
    items: ["Quilted Puffer Jacket", "Knit Scarf", "Beanie", "Gloves"],
    imageUrl: "https://media.gettyimages.com/id/1288189469/photo/one-handosme-man-dressed-in-warm-winter-clothing-walking-outdoors-in-the-city.jpg?s=1024x1024&w=gi&k=20&c=HMMD6RsUe949t2Ze8lSO5eTU41UTywooYXlDTgngUpA=",
    season: ["Winter"],
    gender: "Male"
  },

  // winter -> casual -> female
  {
    name: "Pink Puffer Streetwear",
    category: "Casual",
    items: ["Pink Puffer Jacket", "White Turtleneck", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Emerald Knit Cozy",
    category: "Casual",
    items: ["Green Knit Sweater", "Beanie", "Silver Hoops"],
    imageUrl: "https://images.unsplash.com/photo-1612096536102-93f503aa2419?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Classic Beige Trench",
    category: "Casual",
    items: ["Beige Trench Coat", "Black Undershirt", "Minimalist Watch"],
    imageUrl: "https://images.unsplash.com/photo-1632965551046-052f2d3394ca?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  // Spring Casual male

  {
    name: "Spring Tailored Casual",
    category: "Casual",
    items: ["Cream Knit Polo", "Light Trousers", "Silver Watch"],
    imageUrl: "https://images.unsplash.com/photo-1611507692634-6fd5e10e8900?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Lavender Layered Look",
    category: "Casual",
    items: ["Pastel Cardigan", "White Undershirt", "Chino Pants"],
    imageUrl: "https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Garden Party Style",
    category: "Casual",
    items: ["Patterned Shirt", "Lightweight Slacks", "Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1695485121912-25c7ea05119c?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },

  // Spring -> Casual -> Female
  {
    name: "Spring Blazer Chic",
    category: "Casual",
    items: ["Neutral Blazer", "White Tee", "Blue Jeans", "Gold Necklace"],
    imageUrl: "https://images.unsplash.com/photo-1557776639-0208033c9112?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Classic Denim Layering",
    category: "Casual",
    items: ["Denim Jacket", "Black Top", "White Trousers", "Shoulder Bag"],
    imageUrl: "https://images.unsplash.com/photo-1595270320786-94dd95d4a1db?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Pastel Spring Knit",
    category: "Casual",
    items: ["Light Blue Sweater", "White Skirt", "Floral Accessories"],
    imageUrl: "https://images.unsplash.com/photo-1523260578934-e9318da58c8d?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },

  // Fall -> Casual -> Male
  {
    name: "Autumn Earth Tones",
    category: "Casual",
    items: ["Tan Jacket", "White Tee", "Dark Trousers", "Casual Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1545959308-3f4b859ad821?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Male"
  },
  {
    name: "Streetwear Layering",
    category: "Casual",
    items: ["Oversized Hoodie", "Utility Vest", "Cargo Pants", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1662011966875-e4678fe1f7c3?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Male"
  },
  {
    name: "Urban Fall Style",
    category: "Casual",
    items: ["Checked Overshirt", "Black Shirt", "Beanie", "Chinos"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1727976490110-e3d6e13399c8?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Male"
  },

  // Fall -> Casual -> Female
  {
    name: "Autumn Street Layering",
    category: "Casual",
    items: ["Oversized Hoodie", "Puffer Vest", "Black Leggings", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1638485581193-a7a88f60ff7a?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Female"
  },
  {
    name: "Classic Fall Knit",
    category: "Casual",
    items: ["Cream Cable-Knit Sweater", "Blue Jeans", "Casual Watch"],
    imageUrl: "https://images.unsplash.com/photo-1570298529069-2ca77646dd89?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Female"
  },
  {
    name: "Edgy Autumn Vibe",
    category: "Casual",
    items: ["Leather Jacket", "Graphic Tee", "Dark Wash Denim"],
    imageUrl: "https://images.unsplash.com/photo-1656074166642-c1c22b309d9a?q=80&w=500&auto=format&fit=crop",
    season: ["Fall"],
    gender: "Female"
  },
  // Winter -> Casual -> Unisex
  {
    name: "Winter Minimalist Layer",
    category: "Casual",
    items: ["Neutral Beanie", "Oversized Scarf", "Heavy Knit Sweater"],
    imageUrl: "https://images.unsplash.com/photo-1457545195570-67f207084966?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Unisex"
  },
  {
    name: "Cozy Winter Evening",
    category: "Casual",
    items: ["Puffer Coat", "Knit Gloves", "Thermal Trousers"],
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Unisex"
  },

  // Summer -> Formal -> Male
  {
    name: "Classic Navy Tailoring",
    category: "Formal",
    items: ["Navy Slim-Fit Suit", "Crisp White Shirt", "Silk Tie", "Leather Belt"],
    imageUrl: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Professional Executive Look",
    category: "Formal",
    items: ["Grey Business Suit", "Light Blue Dress Shirt", "Patterned Tie", "Oxford Shoes"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1661328296168-a176df63bcfc?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Modern Formal Statement",
    category: "Formal",
    items: ["Burgundy Tailored Suit", "White Button-Down", "Black Dress Shoes", "Silver Cufflinks"],
    imageUrl: "https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },

  // Summer -> Formal -> Female
  {
    name: "Classic Corporate Blazer",
    category: "Formal",
    items: ["Navy Structured Blazer", "White Silk Blouse", "Tailored Trousers"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1661661921619-f5230e6902f2?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Modern Executive White",
    category: "Formal",
    items: ["White Power Suit", "Silver Watch", "Minimalist Studs"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1757582183391-446cc565e9c9?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Professional Minimalist",
    category: "Formal",
    items: ["Black Tailored Vest", "White Dress Shirt", "Gold Hoop Earrings"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },

  // Summer -> Formal -> Unisex
  {
    name: "Urban Professional Collaboration",
    category: "Formal",
    items: ["Lightweight Blazer", "Neutral Dress Shirt", "Tailored Trousers", "Digital Tablet"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Unisex"
  },
  {
    name: "Modern Boardroom Style",
    category: "Formal",
    items: ["Cotton Button-Down", "Slim-Fit Slacks", "Leather Watch", "Minimalist Briefcase"],
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Unisex"
  },
  {
    name: "Minimalist Business Duo",
    category: "Formal",
    items: ["Classic Tailored Shirt", "High-Waisted Trousers", "Oxford Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Unisex"
  },
  // Winter -> Formal -> Male
  {
    name: "Classic Overcoat Elegance",
    category: "Formal",
    items: ["Black Overcoat", "White Dress Shirt", "Black Tie", "Formal Trousers"],
    imageUrl: "https://images.unsplash.com/photo-1550424824-b3b330569fb4?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },

  // Winter -> Formal -> Female

  {
    name: "Urban Executive Bridge",
    category: "Formal",
    items: ["Longline Wool Coat", "Tailored Trousers", "Pointed Heels", "Business Bag"],
    imageUrl: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },

  // Winter -> Formal -> Unisex
  {
    name: "Architectural Business Minimalist",
    category: "Formal",
    items: ["Structured Charcoal Blazer", "White Dress Shirt", "Slim-Fit Trousers"],
    imageUrl: "https://images.unsplash.com/photo-1593032470861-4509830938cb?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Unisex"
  },
  {
    name: "Modern Executive Slate",
    category: "Formal",
    items: ["Slate Grey Suit", "Button-Down Shirt", "Professional Watch"],
    imageUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Unisex"
  },
  {
    name: "Monochrome Professional Power",
    category: "Formal",
    items: ["Deep Grey Blazer", "Mock Neck Layer", "Tailored Slacks"],
    imageUrl: "https://images.unsplash.com/photo-1592878798022-3be8fcd44b1b?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Unisex"
  },

  // Spring -> Formal -> Male
  {
    name: "Spring Charcoal Professional",
    category: "Formal",
    items: ["Textured Charcoal Suit", "White Dress Shirt", "Silk Tie", "Silver Watch"],
    imageUrl: "https://images.unsplash.com/photo-1620511450270-47162b983078?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Modern Executive Slate",
    category: "Formal",
    items: ["Slate Grey Tailored Suit", "Crisp White Shirt", "Dark Tie", "Oxford Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1611470748921-539d32443457?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Bright Spring Business",
    category: "Formal",
    items: ["Beige Textured Blazer", "Light Blue Shirt", "Patterned Pocket Square", "Tan Chinos"],
    imageUrl: "https://images.unsplash.com/photo-1625502709763-f5f3880c17ba?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },

  // Spring -> Formal -> Female
  {
    name: "Spring Multi-Ethnic Professional",
    category: "Formal",
    items: ["Pastel Blazer", "Cotton Dress Shirt", "Tailored Slacks", "Silver Watch"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Modern Executive Neutral",
    category: "Formal",
    items: ["Beige Structured Suit", "Silk Blouse", "Minimalist Earrings", "Pointed Heels"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140963873-ca31ee2c22b9?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Classic Corporate White",
    category: "Formal",
    items: ["White Tailored Blazer", "Navy Trousers", "Pearl Studs", "Leather Portfolio"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1658506656752-4f1b1c1d5916?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  // Spring -> Formal -> Unisex
  {
    name: "Modern Professional Duo",
    category: "Formal",
    items: ["Slim-Fit Blazer", "Crisp White Shirt", "Tailored Trousers", "Formal Tie"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    season: ["Spring"],
    gender: "Unisex"
  },
  {
    name: "Korean-Style Executive",
    category: "Formal",
    items: ["Lightweight Business Suit", "Classic Button-Down", "Professional Badge", "Straight-Leg Slacks"],
    imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Spring"],
    gender: "Unisex"
  },
  {
    name: "High-Quality Office Uniform",
    category: "Formal",
    items: ["Premium Black Blazer", "White Dress Shirt", "Matching Dress Pants", "Uniform Tie"],
    imageUrl: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Spring"],
    gender: "Unisex"
  },
  // Work -> Summer -> Male
  {
    name: "Linen Summer Professional",
    category: "Work",
    items: ["Linen Button-Down Shirt", "Tailored Trousers", "Leather Watch", "Sunglasses"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1709865803550-240a0c1bcb41?w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Modern Minimalist Workwear",
    category: "Work",
    items: ["Cotton Polo Shirt", "Slim-Fit Chinos", "Clean Minimalist Watch", "Leather Belt"],
    imageUrl: "https://images.unsplash.com/photo-1697319452360-ee47502e39f6?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Relaxed Business Commuter",
    category: "Work",
    items: ["Short-Sleeve Dress Shirt", "Lightweight Slacks", "Loafers", "Laptop Bag"],
    imageUrl: "https://images.unsplash.com/photo-1730651424770-a27017708af2?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },

  // Work -> Summer -> Female
  {
    name: "Summer Smart-Casual Professional",
    category: "Work",
    items: ["White Cotton Shirt", "Olive Chinos", "Leather Belt", "Minimalist Jewelry"],
    imageUrl: "https://images.unsplash.com/photo-1669491477000-6e4ccc35a4ca?w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Crisp Business Minimalist",
    category: "Work",
    items: ["Oversized White Button-Down", "Black Tailored Shorts", "Leather Handbag", "Sandals"],
    imageUrl: "https://images.unsplash.com/photo-1762833656828-a73eafca152f?w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Structured Neutral Executive",
    category: "Work",
    items: ["Tan Structured Blazer", "Cream Trousers", "Gold Statement Watch", "Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1679485322984-4270db63261e?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  // Work -> Winter -> Male
  {
    name: "Winter Corporate Overcoat",
    category: "Work",
    items: ["Navy Wool Overcoat", "Grey Suit Jacket", "White Shirt", "Leather Briefcase"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1765304739227-71b6ee7747d6?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Modern Professional Knit",
    category: "Work",
    items: ["Charcoal Turtleneck", "Tailored Wool Trousers", "Smart Watch", "Leather Boots"],
    imageUrl: "https://images.unsplash.com/photo-1612476176254-c6f922aaba41?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Layered Office Heritage",
    category: "Work",
    items: ["Textured Wool Blazer", "Denim Shirt", "Knit Tie", "Camel Chinos"],
    imageUrl: "https://images.unsplash.com/photo-1614785343220-d151228b1633?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  // Work -> Winter -> Female
  {
    name: "Winter Corporate Minimalism",
    category: "Work",
    items: ["High-Waisted Grey Trousers", "Cream Silk Blouse", "Minimalist Belt", "Pointed Heels"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1705091308348-980dec6e0c06?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Modern Executive Layer",
    category: "Work",
    items: ["Longline Wool Coat", "Black Mock Neck", "Tailored Slacks", "Leather Tote"],
    imageUrl: "https://images.unsplash.com/photo-1633792701276-f34fcd42c361?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Polished Winter Professional",
    category: "Work",
    items: ["Double-Breasted Blazer", "White Button-Down", "Grey Trousers", "Silver Watch"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1765304738934-90125876bb92?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  // Work -> Spring -> Male
  {
    name: "Spring Tailored Professional",
    category: "Work",
    items: ["Beige Cotton Blazer", "White Dress Shirt", "Navy Trousers", "Brown Leather Belt"],
    imageUrl: "https://images.unsplash.com/photo-1593032470861-4509830938cb?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Modern Business Neutral",
    category: "Work",
    items: ["Tan Lightweight Jacket", "Cream Knit Polo", "Khaki Slacks", "Minimalist Watch"],
    imageUrl: "https://images.unsplash.com/photo-1739169585911-1ad4376bf85e?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Casual Friday Spring",
    category: "Work",
    items: ["Light Blue Button-Down", "Grey Chinos", "White Leather Sneakers", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1635447272203-92e6fdf27245?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  // Work -> Spring -> Female
  {
    name: "Classic Striped Professional",
    category: "Work",
    items: ["Blue Striped Button-Down", "High-Waisted Navy Trousers", "Minimalist Jewelry", "Leather Belt"],
    imageUrl: "https://images.unsplash.com/photo-1736939623999-c7921bf28fd2?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Modern Executive Stripe",
    category: "Work",
    items: ["Tucked Striped Shirt", "Black Tailored Slacks", "Gold Watch", "Smart Eyewear"],
    imageUrl: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Refined Office Minimalist",
    category: "Work",
    items: ["Silk Blouse", "Tailored Pencil Skirt", "Nude Heels", "Structured Tote"],
    imageUrl: "https://images.unsplash.com/photo-1601132611522-c5643fe8ef2e?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  // Party -> Summer -> Male
  {
    name: "Summer Night Social",
    category: "Party",
    items: ["Patterned Rayon Shirt", "Black Slim Trousers", "Silver Chain", "Leather Boots"],
    imageUrl: "https://images.unsplash.com/photo-1634149133208-8214e788aaf3?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Bold Summer Statement",
    category: "Party",
    items: ["Vibrant Floral Button-Down", "Light Wash Denim", "Retro Sunglasses", "Casual Watch"],
    imageUrl: "https://images.unsplash.com/photo-1617671346770-f28bba01d874?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Male"
  },
  {
    name: "Tropical Evening Look",
    category: "Party",
    items: ["Open Floral Shirt", "White Undershirt", "Linen Chinos", "Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Summer"],
    gender: "Male"
  },

  // Party -> Summer -> Female
  {
    name: "Summer Chic Social",
    category: "Party",
    items: ["White Tank Top", "High-Waisted Denim Shorts", "Gold Watch", "Minimalist Rings"],
    imageUrl: "https://images.unsplash.com/photo-1763971922552-fa9cbe06db7a?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Vibrant Summer Glamour",
    category: "Party",
    items: ["Red Satin Slip Dress", "Gold Statement Jewelry", "Clutch Bag", "Strappy Heels"],
    imageUrl: "https://images.unsplash.com/photo-1719811431073-0b573efd4166?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },
  {
    name: "Golden Hour Party Wear",
    category: "Party",
    items: ["White Crochet Dress", "Layered Gold Necklaces", "Sun-Kissed Makeup Look", "Woven Sandals"],
    imageUrl: "https://images.unsplash.com/photo-1749096290354-0f4099f148b2?q=80&w=500&auto=format&fit=crop",
    season: ["Summer"],
    gender: "Female"
  },

  // Party -> Winter -> Male
  {
    name: "Winter Pattern Statement",
    category: "Party",
    items: ["Leopard Print Coat", "Black Button-Down", "Slim Black Trousers", "Silver Rings"],
    imageUrl: "https://images.unsplash.com/photo-1718790418606-9b4f75422e26?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Edgy Midnight Party",
    category: "Party",
    items: ["Leather Biker Jacket", "Black Graphic Tee", "Dark Denim", "Combat Boots"],
    imageUrl: "https://images.unsplash.com/photo-1669700019543-cee7922ce449?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Festive Outdoor Social",
    category: "Party",
    items: ["Puffer Jacket", "Cable Knit Sweater", "Beanie", "Rugged Leather Boots"],
    imageUrl: "https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  // Party -> Winter -> Female
  {
    name: "Winter Night Glamour",
    category: "Party",
    items: ["Long-Sleeve Satin Gown", "Statement Earrings", "Faux Fur Wrap", "Stiletto Heels"],
    imageUrl: "https://images.unsplash.com/photo-1763829650518-bcee177752f4?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Edgy Festive Edge",
    category: "Party",
    items: ["Leather Trench Coat", "Mini Dress", "Sheer Tights", "Combat Boots"],
    imageUrl: "https://images.unsplash.com/photo-1579188781334-870145821a7d?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Holiday Cocktail Look",
    category: "Party",
    items: ["Velvet Mini Dress", "Gold Clutch", "Metallic Sandals", "Bold Red Lip"],
    imageUrl: "https://images.unsplash.com/photo-1590457559377-2807faadc7b9?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  // Party -> Spring -> Male
  {
    name: "Spring Denim Social",
    category: "Party",
    items: ["Light Wash Denim Jacket", "White Crewneck Tee", "Black Slim Jeans", "Classic Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1614871604311-bec251997c2b?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Pastel Layered Edge",
    category: "Party",
    items: ["Pink Denim Jacket", "Beige Hoodie", "Light Grey Chinos", "Silver Chain"],
    imageUrl: "https://images.unsplash.com/photo-1578773729184-1cc53e43c7e5?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  {
    name: "Urban Spring Evening",
    category: "Party",
    items: ["Lightweight Utility Vest", "Black Long Sleeve", "Cargo Pants", "High-Top Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1612452984060-757bbca69fd0?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Male"
  },
  // Party -> Spring -> Female
  {
    name: "Spring Celebration Group",
    category: "Party",
    items: ["Floral Lace Dress", "Sleeveless Blouse", "Soft Curls", "Statement Smile"],
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Modern Spring Social",
    category: "Party",
    items: ["Sheer Overlay Top", "Silver Statement Rings", "Glossy Lips", "Tailored Trousers"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1683145841072-14c61cd3e7c9?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },
  {
    name: "Golden Hour Party Vibe",
    category: "Party",
    items: ["Metallic Thread Top", "Gold Hoop Earrings", "Dewy Makeup", "Clutch Bag"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1683143644857-b3a48cf89b9e?q=80&w=500&auto=format&fit=crop",
    season: ["Spring"],
    gender: "Female"
  },

  // Sports/Active -> Winter -> Female

  {
    name: "Winter Training Essential",
    category: "Sports/Active",
    items: ["High-Compression Leggings", "Moisture-Wicking Base Layer", "Cross-Training Sneakers", "Sports Bra"],
    imageUrl: "https://images.unsplash.com/photo-1676312926181-3c7b20f55347?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Alpine Ski Professional",
    category: "Sports/Active",
    items: ["Insulated Ski Jacket", "Ski Goggles", "Thermal Balaclava", "Snowproof Gloves"],
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Female"
  },
  // Sports/Active -> Winter -> Male (ADDED)
  {
    name: "Winter Run Layering",
    category: "Sports/Active",
    items: ["Thermal Running Tights", "Windbreaker Jacket", "Running Gloves", "Beanie"],
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  // Date -> Winter -> Female
  {
    name: "Golden Hour Glow",
    category: "Date",
    items: ["Sheer Black Top", "Gold Hoop Earrings", "High-Waist Trousers", "Warm Glam Makeup"],
    imageUrl: "https://images.unsplash.com/photo-1609387116764-5d5be978a974?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Festive Holiday Date",
    category: "Date",
    items: ["Emerald Satin Dress", "Cozy Knit Cardigan", "Delicate Gold Necklace", "Christmas Market Vibes"],
    imageUrl: "https://media.istockphoto.com/id/2190669053/photo/cheerful-young-standing-next-to-xmas-tree-and-enjoying-christmas-festival.jpg?s=1024x1024&w=is&k=20&c=yP7xIgin1oq1KaHlRZZFDBWFliD-2_wpeRxJ15IUcsY=",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Urban Evening Chic",
    category: "Date",
    items: ["Lace Detailed Bodysuit", "Tailored Overcoat", "Silver Jewelry", "Sleek Bun Hairstyle"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRsKRvlgEkqWPrB-_vJ4_5fauCOSIZTr54GxUrDVBUJy09EErDDWPw6Qxylgq9rcS035MZE4zQRFe6aP85psSYwQULqCa2_C57OMWq-mLyY2zq3uR3ifqkZ",
    season: ["Winter"],
    gender: "Female"
  },
  // Date -> Winter -> Male
  {
    name: "Elevated Monochrome Night",
    category: "Date",
    items: ["Black Tailored Overcoat", "Grey Mock Neck Sweater", "Slim Black Trousers", "Polished Chelsea Boots"],
    imageUrl: "https://www.beigebrown.com/cdn/shop/files/BB-blog_night-outfits_men-3.jpg?v=1727103230&width=800",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Sharp Urban Layering",
    category: "Date",
    items: ["Charcoal Wool Peacoat", "White Dress Shirt", "Dark Wash Denim", "Leather Dress Boots"],
    imageUrl: "https://i.pinimg.com/736x/0a/9c/bb/0a9cbb6e735ee766458d353d994a2ece.jpg",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Refined Overcoat Minimalist",
    category: "Date",
    items: ["Camel Overcoat", "Black Crewneck Cashmere", "Wool Dress Pants", "Leather Gloves"],
    imageUrl: "https://lh3.googleusercontent.com/qQbbPipFiE7vO2RJbWLxVsFElolHB9JHnCFZvzYsGpMJCOFGm-crHrJotivj08E7NMKJbHo5h0W0F6BIXxfXpNqHnIhy5kxJP1tHyvCCuA=w360-rw",
    season: ["Winter"],
    gender: "Male"
  },
  // Travel -> Winter -> Female
  {
    name: "Winter Park Arrival",
    category: "Travel",
    items: ["Fitted White Turtleneck", "Dark Slim Jeans", "Tan Leather Gloves", "Cozy Pom-Pom Beanie"],
    imageUrl: "https://images.unsplash.com/photo-1678489855906-843cdb3dbc8d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Transit Layered Warmth",
    category: "Travel",
    items: ["Grey Wool Scarf", "Cream Knit Sweater", "Thermal Base Layer", "Insulated Winter Hat"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1679088032275-b4fb24933d5a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Alpine Explorer Style",
    category: "Travel",
    items: ["High-Loft Puffer Jacket", "Red Knit Beanie", "Weather-Resistant Trousers", "Winter Hiking Boots"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1663133641272-9319d0416ca8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    season: ["Winter"],
    gender: "Female"
  },
  // Travel -> Winter -> Male
  {
    name: "Urban Explorer Layering",
    category: "Travel",
    items: ["Heavyweight Wool Cardigan", "Cotton Henley", "Slim Fit Denim", "Leather Messenger Bag"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1683133783059-042e32068be9?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Refined Winter Commuter",
    category: "Travel",
    items: ["Tailored Charcoal Overcoat", "Beige Turtleneck Sweater", "Wool Trousers", "Duffel Bag"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1732118610542-5f3e1a3c2d7e?q=80&w=500&auto=format&fit=crop",
    season: ["Winter"],
    gender: "Male"
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
    await Outfit.deleteMany();
    console.log('🗑️  Old Data Cleared');
    await Outfit.insertMany(outfits);
    console.log('🌱 Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();