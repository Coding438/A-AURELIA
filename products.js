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
    price: 2s4500,
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
  { poster: "https://picsum.photos/seed/aurelia-reel-1/400/700", link: "https://www.google.com/imgres?q=headspace&imgurl=https%3A%2F%2Fassets.mofoprod.net%2Fnetwork%2Fimages%2FHeadspace-logo.original_hVDRUaD.jpg&imgrefurl=https%3A%2F%2Fwww.mozillafoundation.org%2Fen%2Fprivacynotincluded%2Fheadspace%2F&docid=GxTMNSjz5dQbBM&tbnid=gdioYnbaC2RVBM&vet=12ahUKEwjHhIq0y_yVAxXWU6QEHWWEMCEQnPAOegQIQxAA..i&w=800&h=800&hcb=2&ved=2ahUKEwjHhIq0y_yVAxXWU6QEHWWEMCEQnPAOegQIQxAA" },
  { poster: "https://picsum.photos/seed/aurelia-reel-2/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-3/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-4/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-5/400/700", link: "https://instagram.com" },
  { poster: "https://picsum.photos/seed/aurelia-reel-6/400/700", link: "https://instagram.com" }
];

const CATEGORY_META = {
  "rings":          { label: "Rings",            img: "https://i.postimg.cc/zf80z96M/480c88e8-c107-41e6-941a-7f411518520b.png" },
  "necklaces":      { label: "Necklaces",        img: "https://i.postimg.cc/bvSkjLNg/7df44869-3bfd-4c2a-9458-b75c56fb1d68.png" },
  "earrings":       { label: "Earrings",         img: "https://i.postimg.cc/PfyL90Qh/baa136c7-afd2-483e-80f5-357d507565ca.png" },
  "bracelets":      { label: "Bracelets",        img: "https://i.postimg.cc/zGs3TN8p/20ea2ff4-7384-4c67-9402-3997f0f0cb7c.png" },
  "watches-men":    { label: "Watches — Men",    img: "https://i.postimg.cc/mZmD8CTQ/5b488852-4bf4-4248-bb11-a9874770efb2.png" },
  "watches-women":  { label: "Watches — Women",  img: "https://i.postimg.cc/CLWwQ4XZ/ed48b07e-1109-47a4-9e61-0c98f1da0a67.png" }
};
