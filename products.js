/* ===========================================================
   AURELIA — Product Catalog
   Replace `img` values with your real product photo URLs,
   and update prices, names & descriptions to match your stock.
   =========================================================== */

let PRODUCTS = [
  {
    id: "ring-solitaire-gold",
    name: "Solitaire Halo Ring",
    category: "rings",
    group: "jewelry",
    price: 24500,
    tag: "Bestseller",
    img: "https://picsum.photos/seed/aurelia-ring-1/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-ring-1/700/700","https://picsum.photos/seed/aurelia-ring-1b/700/700"],
    desc: "A single brilliant-cut stone cradled in a halo of pavé detailing, set on a slim 18k gold-plated band. Timeless, elegant, made for everyday luxury."
  },
  {
    id: "ring-eternity-band",
    name: "Eternity Band",
    category: "rings",
    group: "jewelry",
    price: 18900,
    img: "https://picsum.photos/seed/aurelia-ring-2/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-ring-2/700/700"],
    desc: "A continuous line of hand-set stones symbolising unending elegance. Polished to a mirror finish, comfortable for daily wear."
  },
  {
    id: "necklace-teardrop",
    name: "Teardrop Pendant Necklace",
    category: "necklaces",
    group: "jewelry",
    price: 21900,
    tag: "New",
    img: "https://picsum.photos/seed/aurelia-neck-1/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-neck-1/700/700"],
    desc: "A delicate teardrop pendant on a fine cable chain — subtle enough for daytime, striking enough for evening."
  },
  {
    id: "necklace-layered-chain",
    name: "Layered Chain Necklace",
    category: "necklaces",
    group: "jewelry",
    price: 16500,
    img: "https://picsum.photos/seed/aurelia-neck-2/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-neck-2/700/700"],
    desc: "Two chains of varying weight layered into one piece for effortless, modern styling."
  },
  {
    id: "earrings-drop-pearl",
    name: "Pearl Drop Earrings",
    category: "earrings",
    group: "jewelry",
    price: 13900,
    img: "https://picsum.photos/seed/aurelia-ear-1/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-ear-1/700/700"],
    desc: "Freshwater pearl drops suspended from gold-plated studs. Light, graceful, and endlessly wearable."
  },
  {
    id: "earrings-stud-cluster",
    name: "Cluster Stud Earrings",
    category: "earrings",
    group: "jewelry",
    price: 11200,
    tag: "New",
    img: "https://picsum.photos/seed/aurelia-ear-2/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-ear-2/700/700"],
    desc: "A cluster of round-cut stones set closely together for maximum sparkle in a compact stud."
  },
  {
    id: "bracelet-tennis",
    name: "Tennis Bracelet",
    category: "bracelets",
    group: "jewelry",
    price: 27800,
    tag: "Bestseller",
    img: "https://picsum.photos/seed/aurelia-brc-1/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-brc-1/700/700"],
    desc: "A single row of matched stones in a secure link setting — the definition of classic sparkle."
  },
  {
    id: "bracelet-bangle-set",
    name: "Stacked Bangle Set",
    category: "bracelets",
    group: "jewelry",
    price: 15400,
    img: "https://picsum.photos/seed/aurelia-brc-2/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-brc-2/700/700"],
    desc: "Three slim bangles in a mixed-finish trio, designed to be worn stacked or separately."
  },
  {
    id: "watch-men-classic-steel",
    name: "Classic Steel Chronograph",
    category: "watches-men",
    group: "watches",
    price: 42500,
    tag: "Bestseller",
    img: "https://picsum.photos/seed/aurelia-watch-1/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-watch-1/700/700"],
    desc: "A stainless-steel chronograph with sapphire-coated crystal and a brushed link bracelet. Water resistant to 50m."
  },
  {
    id: "watch-men-leather-minimal",
    name: "Minimalist Leather Watch",
    category: "watches-men",
    group: "watches",
    price: 22900,
    img: "https://picsum.photos/seed/aurelia-watch-2/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-watch-2/700/700"],
    desc: "A clean, uncluttered dial on a genuine leather strap. Understated design for everyday wear."
  },
  {
    id: "watch-women-rosegold",
    name: "Rose Gold Mesh Watch",
    category: "watches-women",
    group: "watches",
    price: 31900,
    tag: "New",
    img: "https://picsum.photos/seed/aurelia-watch-3/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-watch-3/700/700"],
    desc: "A rose-gold finished case on a fine mesh bracelet, with a mother-of-pearl dial that catches the light."
  },
  {
    id: "watch-women-bangle",
    name: "Bangle Cuff Watch",
    category: "watches-women",
    group: "watches",
    price: 26400,
    img: "https://picsum.photos/seed/aurelia-watch-4/700/700",
    gallery: ["https://picsum.photos/seed/aurelia-watch-4/700/700"],
    desc: "A sculptural cuff-style watch that doubles as a statement bracelet."
  }
];

/* Instagram-style reels shown on the home page.
   Replace `poster` with your real reel thumbnails, and `link`
   with the actual Instagram reel URL. */
const REELS = [
  { poster: "https://picsum.photos/seed/aurelia-reel-1/400/700", link: "https://coding438.github.io/leopards-courier-services/index.html" },
  { poster: "https://picsum.photos/seed/aurelia-reel-2/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-3/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-4/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-5/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-6/400/700", link: "https://instagram.com" }
];

const CATEGORY_META = {
  "rings":          { label: "Rings",            img: "https://picsum.photos/seed/aurelia-cat-rings/600/750" },
  "necklaces":      { label: "Necklaces",        img: "https://picsum.photos/seed/aurelia-cat-necklaces/600/750" },
  "earrings":       { label: "Earrings",         img: "https://picsum.photos/seed/aurelia-cat-earrings/600/750" },
  "bracelets":      { label: "Bracelets",        img: "https://picsum.photos/seed/aurelia-cat-bracelets/600/750" },
  "watches-men":    { label: "Watches — Men",    img: "https://picsum.photos/seed/aurelia-cat-watchmen/600/750" },
  "watches-women":  { label: "Watches — Women",  img: "https://picsum.photos/seed/aurelia-cat-watchwomen/600/750" }
};
