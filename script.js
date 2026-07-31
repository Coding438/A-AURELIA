/* ===========================================================
   AURELIA — App Logic
   =========================================================== */

/* ============================================================
   ⬇⬇⬇  PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE  ⬇⬇⬇
   ------------------------------------------------------------
   1. Deploy the Apps Script (code + steps are in SETUP.md).
   2. Copy the URL Google gives you — it ends in .../exec
   3. Replace the text between the quotes below with that URL.
      Example:
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec";
   ============================================================ */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpMk3xGOHc8q54KIaIPrvRY2BqaC88IQmEl-s4po83bvogvcZ2pyM8VpdygeINRE3P8Q/exec";

/* Optional: your store's WhatsApp number (country code, no +
   or spaces, e.g. "923001234567") to auto-open a WhatsApp tab
   with the order summary after checkout. Leave blank to skip. */
const STORE_WHATSAPP_NUMBER = "";

/* ---------- STATE ------------------------------------------ */
let CART = JSON.parse(localStorage.getItem("aurelia_cart") || "[]");
let currentOrderContext = null; // { items: [{id,name,price,qty}], mode: 'buy'|'cart' }

function saveCart(){
  localStorage.setItem("aurelia_cart", JSON.stringify(CART));
  updateCartCount();
}
function updateCartCount(){
  const count = CART.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cartCount").textContent = count;
}
function money(n){ return "Rs. " + Number(n).toLocaleString("en-PK"); }
function findProduct(id){ return PRODUCTS.find(p=>p.id === id); }

/* ---------- TOAST ------------------------------------------ */
let toastTimer;
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 2600);
}

/* ---------- ROUTER ------------------------------------------
   Hash routes:
   #/home
   #/collection
   #/jewelry            (optional ?cat=rings)
   #/watches            (optional ?cat=watches-men)
   #/about
   #/cart
   #/search
   #/product/<id>
--------------------------------------------------------------*/
function parseHash(){
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, qs] = raw.split("?");
  const params = new URLSearchParams(qs || "");
  const parts = path.split("/").filter(Boolean);
  return { root: parts[0] || "home", sub: parts[1] || null, params };
}

function navigate(hash){ location.hash = hash; }

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", async () => {
  updateCartCount();
  await loadProductsFromSheet();
  if(!location.hash) location.hash = "#/home";
  render();
  setTimeout(()=> document.getElementById("preloader").classList.add("hide"), 500);
});

/* ---------- JSONP HELPER ---------------------------------------
   Apps Script's GET responses don't include the CORS header that
   fetch() needs to read a cross-origin response, so plain fetch()
   fails here even though the server is reachable. Loading the
   response as a <script> tag sidesteps CORS entirely. -----------*/
function jsonpGet(url){
  return new Promise((resolve, reject) => {
    const cbName = "aureliaCb_" + Date.now() + "_" + Math.floor(Math.random()*100000);
    const script = document.createElement("script");
    const cleanup = () => { delete window[cbName]; script.remove(); };
    window[cbName] = (data) => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error("JSONP request failed")); };
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${cbName}`;
    document.body.appendChild(script);
  });
}

/* ---------- LOAD PRODUCTS FROM GOOGLE SHEET -------------------
   Fetches whatever is in the "Products" tab of the sheet and
   replaces the hardcoded PRODUCTS list from products.js with it.
   If the sheet is empty, unreachable, or the URL isn't set yet,
   the hardcoded products.js list is used as a fallback so the
   site never shows blank. ---------------------------------------*/
async function loadProductsFromSheet(){
  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) return;
  try{
    const data = await jsonpGet(`${GOOGLE_SCRIPT_URL}?action=getProducts`);
    if(Array.isArray(data) && data.length){
      PRODUCTS = data.map(p => ({
        ...p,
        price: Number(p.price) || 0,
        gallery: (Array.isArray(p.gallery) && p.gallery.length) ? p.gallery : [p.img]
      }));
    }
  }catch(err){
    console.warn("Could not load products from Google Sheet — showing default catalog.", err);
  }
}

function render(){
  const { root, sub, params } = parseHash();
  document.querySelectorAll(".nav-link").forEach(a=>{
    a.classList.toggle("active", a.dataset.route === root);
  });
  closeMobileNav();

  const app = document.getElementById("app");
  let html = "";

  if(root === "home") html = renderHome();
  else if(root === "collection") html = renderCollection(null, "All Collections");
  else if(root === "jewelry") html = renderCollection("jewelry", "Jewelry", params.get("cat"));
  else if(root === "watches") html = renderCollection("watches", "Watches", params.get("cat"));
  else if(root === "about") html = renderAbout();
  else if(root === "cart") html = renderCartPage();
  else if(root === "product") html = renderProductDetail(sub);
  else html = renderHome();

  app.innerHTML = html;
  window.scrollTo({top:0, behavior:"instant"});
  bindPageEvents(root);
  initReveal();
}

/* ---------- HOME PAGE ---------------------------------------*/
function renderHome(){
  const featured = PRODUCTS.filter(p=>p.tag === "Bestseller").concat(PRODUCTS.slice(0,8-PRODUCTS.filter(p=>p.tag==="Bestseller").length));
  const uniqueFeatured = [...new Map(featured.map(p=>[p.id,p])).values()].slice(0,8);

  return `
  <section class="hero">
    <div class="hero-inner">
      <span class="hero-eyebrow">Fine Jewelry &amp; Timepieces</span>
      <h1>Adorn every <em>moment</em> in gold, stone &amp; time.</h1>
      <p>Handset jewelry and precision watches, crafted for those who wear
      their story with quiet confidence.</p>
      <div class="hero-cta">
        <a href="#/jewelry" class="btn-gold">Shop Jewelry</a>
        <a href="#/watches" class="btn-outline">Shop Watches</a>
      </div>
    </div>
  </section>

  <div class="marquee">
    <div class="marquee-track">
      <span>Free Delivery Across Pakistan</span><span>◆</span>
      <span>Cash On Delivery Available</span><span>◆</span>
      <span>Certified Materials</span><span>◆</span>
      <span>New Arrivals Weekly</span><span>◆</span>
      <span>Free Delivery Across Pakistan</span><span>◆</span>
      <span>Cash On Delivery Available</span><span>◆</span>
      <span>Certified Materials</span><span>◆</span>
      <span>New Arrivals Weekly</span><span>◆</span>
    </div>
  </div>

  <section class="section wrap reveal">
    <div class="section-head">
      <span class="eyebrow">Shop By Category</span>
      <h2>Find Your Piece</h2>
      <div class="divider"></div>
    </div>
    <div class="cat-grid">
      ${Object.entries(CATEGORY_META).map(([key,meta])=>`
        <a class="cat-card" href="#/${key.startsWith('watches')?'watches':'jewelry'}?cat=${key}">
          <img src="${meta.img}" alt="${meta.label}" loading="lazy">
          <span>${meta.label}</span>
        </a>
      `).join("")}
    </div>
  </section>

  <section class="section wrap reveal" style="padding-top:0;">
    <div class="section-head">
      <span class="eyebrow">@aurelia.pk</span>
      <h2>From Our Instagram</h2>
      <div class="divider"></div>
    </div>
    <div class="reels-strip">
      ${REELS.map(r=>`
        <a class="reel-card" href="${r.link}" target="_blank" rel="noopener">
          <img src="${r.poster}" alt="Instagram reel" loading="lazy">
          <div class="reel-play">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="rgba(255,255,255,0.92)"><circle cx="12" cy="12" r="11" fill="rgba(13,15,13,0.4)"/><path d="M10 8.5l6 3.5-6 3.5v-7Z"/></svg>
          </div>
          <span class="reel-tag">Reel</span>
        </a>
      `).join("")}
    </div>
  </section>

  <section class="section wrap reveal">
    <div class="section-head">
      <span class="eyebrow">Handpicked</span>
      <h2>Bestsellers</h2>
      <div class="divider"></div>
    </div>
    <div class="product-grid">
      ${uniqueFeatured.map(productCardHTML).join("")}
    </div>
  </section>

  <section class="section wrap reveal">
    <div class="about-band">
      <img src="https://picsum.photos/seed/aurelia-about-home/700/900" alt="Aurelia atelier" loading="lazy">
      <div>
        <span class="eyebrow">Our Story</span>
        <h2>Crafted with intention, worn with meaning.</h2>
        <p>Aurelia began with a simple idea: jewelry and watches should feel
        personal, not mass-produced. Every piece in our collection is chosen
        for its quality, its finish, and the way it makes you feel when you
        put it on.</p>
        <div style="margin-top:26px;"><a href="#/about" class="btn-ghost">Read Our Story →</a></div>
      </div>
    </div>
  </section>

  ${footerHTML()}
  `;
}

/* ---------- PRODUCT CARD -------------------------------------*/
function productCardHTML(p){
  return `
  <div class="product-card reveal in" data-id="${p.id}">
    <div class="product-media">
      ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <button class="quick-add" data-quickadd="${p.id}">Add to Cart</button>
    </div>
    <div class="product-info">
      <h4>${p.name}</h4>
      <span class="price">${money(p.price)}</span>
    </div>
  </div>`;
}

/* ---------- COLLECTION / JEWELRY / WATCHES PAGES -------------*/
function renderCollection(group, title, activeCat){
  let cats = Object.keys(CATEGORY_META);
  if(group === "jewelry") cats = cats.filter(c=>!c.startsWith("watches"));
  if(group === "watches") cats = cats.filter(c=>c.startsWith("watches"));

  let list = PRODUCTS;
  if(group) list = list.filter(p=>p.group === group);
  if(activeCat) list = list.filter(p=>p.category === activeCat);

  return `
  <section class="page-hero">
    <span class="eyebrow">Collections</span>
    <h1>${title}</h1>
    <div class="breadcrumb"><a href="#/home">Home</a> / ${title}</div>
  </section>
  <section class="section wrap">
    <div class="filter-tabs">
      <button class="filter-tab ${!activeCat?'active':''}" data-filter="" data-group="${group||''}">All</button>
      ${cats.map(c=>`<button class="filter-tab ${activeCat===c?'active':''}" data-filter="${c}" data-group="${group||''}">${CATEGORY_META[c].label}</button>`).join("")}
    </div>
    <div class="product-grid" id="collectionGrid">
      ${list.length ? list.map(productCardHTML).join("") : `<p class="search-empty">No products in this category yet.</p>`}
    </div>
  </section>
  ${footerHTML()}
  `;
}

/* ---------- PRODUCT DETAIL PAGE ------------------------------*/
function renderProductDetail(id){
  const p = findProduct(id);
  if(!p){
    return `<section class="section wrap"><div class="empty-state"><h3>Product not found</h3>
    <a href="#/collection" class="btn-gold">Back to Collections</a></div></section>${footerHTML()}`;
  }
  const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);

  return `
  <section class="page-hero" style="padding-bottom:0; border:none;">
    <div class="breadcrumb">
      <a href="#/home">Home</a> / <a href="#/${p.group==='watches'?'watches':'jewelry'}">${p.group==='watches'?'Watches':'Jewelry'}</a> / ${p.name}
    </div>
  </section>
  <section class="section wrap">
    <div class="product-detail">
      <div class="pd-gallery">
        <img id="pdMainImg" src="${p.gallery[0]}" alt="${p.name}">
        ${p.gallery.length>1 ? `<div class="pd-thumbs">${p.gallery.map((g,i)=>`<img src="${g}" class="${i===0?'active':''}" data-thumb="${g}">`).join("")}</div>` : ""}
      </div>
      <div class="pd-info">
        <span class="eyebrow">${CATEGORY_META[p.category] ? CATEGORY_META[p.category].label : p.category}</span>
        <h1>${p.name}</h1>
        <span class="pd-price">${money(p.price)}</span>
        <p class="pd-desc">${p.desc}</p>

        <div class="pd-qty">
          <span>Quantity</span>
          <div class="qty-control">
            <button type="button" id="qtyMinus">−</button>
            <input type="text" id="qtyInput" value="1" readonly>
            <button type="button" id="qtyPlus">+</button>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn-outline" id="addToCartBtn" data-id="${p.id}">Add to Cart</button>
          <button class="btn-gold" id="buyNowBtn" data-id="${p.id}">Buy Now</button>
        </div>

        <div class="pd-meta">
          <div><span>Category</span><span>${CATEGORY_META[p.category] ? CATEGORY_META[p.category].label : p.category}</span></div>
          <div><span>Delivery</span><span>3–6 business days</span></div>
          <div><span>Payment</span><span>Cash on Delivery</span></div>
        </div>
      </div>
    </div>
  </section>

  ${related.length ? `
  <section class="section wrap" style="padding-top:0;">
    <h3 class="related-title">You May Also Like</h3>
    <div class="product-grid">${related.map(productCardHTML).join("")}</div>
  </section>` : ""}

  ${footerHTML()}
  `;
}

/* ---------- CART PAGE -----------------------------------------*/
function renderCartPage(){
  if(!CART.length){
    return `
    <section class="section wrap">
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p style="margin-bottom:26px;">Explore our collections and find something beautiful.</p>
        <a href="#/collection" class="btn-gold">Continue Shopping</a>
      </div>
    </section>
    ${footerHTML()}`;
  }

  const subtotal = CART.reduce((s,i)=> s + i.qty * i.price, 0);

  return `
  <section class="page-hero">
    <span class="eyebrow">Your Bag</span>
    <h1>Shopping Cart</h1>
  </section>
  <section class="section wrap">
    <div class="cart-layout">
      <div class="cart-items">
        ${CART.map(item=>{
          const p = findProduct(item.id);
          return `
          <div class="cart-item">
            <img src="${p ? p.img : ''}" alt="${item.name}">
            <div>
              <h4>${item.name}</h4>
              <span class="price">${money(item.price)} × ${item.qty}</span>
              <div class="remove" data-remove="${item.id}">Remove</div>
            </div>
            <div class="qty-control">
              <button type="button" data-dec="${item.id}">−</button>
              <input type="text" value="${item.qty}" readonly>
              <button type="button" data-inc="${item.id}">+</button>
            </div>
          </div>`;
        }).join("")}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>Calculated at confirmation</span></div>
        <div class="summary-row total"><span>Total</span><span>${money(subtotal)}</span></div>
        <button class="btn-gold btn-block" id="checkoutBtn" style="margin-top:22px;">Proceed to Checkout</button>
      </div>
    </div>
  </section>
  ${footerHTML()}
  `;
}

/* ---------- ABOUT PAGE -----------------------------------------*/
function renderAbout(){
  return `
  <section class="page-hero">
    <span class="eyebrow">Our Story</span>
    <h1>About Aurelia</h1>
  </section>
  <section class="section wrap">
    <img class="about-hero-img" src="https://picsum.photos/seed/aurelia-about-hero/1400/600" alt="Aurelia workshop">
    <div class="about-content">
      <p>Aurelia was founded on a simple belief — that fine jewelry and
      watches shouldn't be reserved for rare occasions. Every piece we
      curate is chosen for its craftsmanship, its finish, and its ability
      to become part of someone's everyday story.</p>
      <p>From delicate rings to statement timepieces, our collection blends
      classic design with a modern point of view. We work closely with
      artisans who care about detail as much as we do, so every clasp,
      setting and strap is built to last.</p>
      <p>We're based in Pakistan and deliver nationwide, with cash on
      delivery available so you can shop with complete confidence.</p>
    </div>
    <div class="value-grid">
      <div class="value-card reveal">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2Z" stroke="var(--gold)" stroke-width="1.3"/></svg>
        <h4>Considered Design</h4>
        <p>Every piece is selected for lasting style, not passing trends.</p>
      </div>
      <div class="value-card reveal">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" stroke="var(--gold)" stroke-width="1.3"/></svg>
        <h4>Made To Be Worn</h4>
        <p>Comfort and durability guide every material decision we make.</p>
      </div>
      <div class="value-card reveal">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 3 6.2" stroke="var(--gold)" stroke-width="1.3"/><path d="M4 8v4h4" stroke="var(--gold)" stroke-width="1.3"/></svg>
        <h4>Delivered Nationwide</h4>
        <p>Fast, tracked delivery across Pakistan with cash on delivery.</p>
      </div>
    </div>
  </section>
  ${footerHTML()}
  `;
}

/* ---------- FOOTER ---------------------------------------------*/
function footerHTML(){
  return `
  <footer>
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <div class="brand"><span class="brand-mark">A</span><span class="brand-name">AURELIA</span></div>
        <p>Fine jewelry and watches, made for everyday wear. Delivered across Pakistan.</p>
      </div>
      <div>
        <h5>Shop</h5>
        <a href="#/jewelry">Jewelry</a>
        <a href="#/watches">Watches</a>
        <a href="#/collection">All Collections</a>
      </div>
      <div>
        <h5>Company</h5>
        <a href="#/about">About Us</a>
        <a href="#/cart">Your Cart</a>
      </div>
      <div>
        <h5>Stay In Touch</h5>
        <div class="newsletter-row">
          <input type="email" placeholder="Your email address">
          <button id="newsletterBtn">Join</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} Aurelia. All rights reserved.</div>
  </footer>
  `;
}

/* ---------- REVEAL ON SCROLL ------------------------------------*/
function initReveal(){
  const els = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  els.forEach(el=> io.observe(el));
}

/* ---------- EVENT BINDING per page ------------------------------*/
function bindPageEvents(root){
  // product card click -> detail page
  document.querySelectorAll(".product-card").forEach(card=>{
    card.addEventListener("click", (e)=>{
      if(e.target.closest("[data-quickadd]")) return;
      navigate("#/product/" + card.dataset.id);
    });
  });

  // quick add from grid
  document.querySelectorAll("[data-quickadd]").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      addToCart(btn.dataset.quickadd, 1);
      toast("Added to cart");
    });
  });

  // filter tabs
  document.querySelectorAll(".filter-tab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      const group = tab.dataset.group;
      const cat = tab.dataset.filter;
      const base = group === "watches" ? "#/watches" : group === "jewelry" ? "#/jewelry" : "#/collection";
      navigate(cat ? `${base}?cat=${cat}` : base);
    });
  });

  if(root === "product"){
    const { sub } = parseHash();
    const p = findProduct(sub);
    if(!p) return;

    document.querySelectorAll("[data-thumb]").forEach(t=>{
      t.addEventListener("click", ()=>{
        document.getElementById("pdMainImg").src = t.dataset.thumb;
        document.querySelectorAll("[data-thumb]").forEach(x=>x.classList.remove("active"));
        t.classList.add("active");
      });
    });

    const qtyInput = document.getElementById("qtyInput");
    document.getElementById("qtyPlus").addEventListener("click", ()=>{
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    document.getElementById("qtyMinus").addEventListener("click", ()=>{
      qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });

    document.getElementById("addToCartBtn").addEventListener("click", ()=>{
      addToCart(p.id, parseInt(qtyInput.value));
      toast("Added to cart");
    });

    document.getElementById("buyNowBtn").addEventListener("click", ()=>{
      const qty = parseInt(qtyInput.value);
      openOrderModal({
        mode: "buy",
        items: [{ id:p.id, name:p.name, price:p.price, qty }]
      });
    });
  }

  if(root === "cart"){
    document.querySelectorAll("[data-inc]").forEach(b=> b.addEventListener("click", ()=> changeQty(b.dataset.inc, 1)));
    document.querySelectorAll("[data-dec]").forEach(b=> b.addEventListener("click", ()=> changeQty(b.dataset.dec, -1)));
    document.querySelectorAll("[data-remove]").forEach(b=> b.addEventListener("click", ()=> removeFromCart(b.dataset.remove)));
    const checkoutBtn = document.getElementById("checkoutBtn");
    if(checkoutBtn){
      checkoutBtn.addEventListener("click", ()=>{
        openOrderModal({ mode:"cart", items: CART.map(i=>({...i})) });
      });
    }
  }

  const newsletterBtn = document.getElementById("newsletterBtn");
  if(newsletterBtn){
    newsletterBtn.addEventListener("click", ()=>{
      toast("Thanks for subscribing!");
    });
  }
}

/* ---------- CART ACTIONS ----------------------------------------*/
function addToCart(id, qty){
  const p = findProduct(id);
  if(!p) return;
  const existing = CART.find(i=>i.id === id);
  if(existing) existing.qty += qty;
  else CART.push({ id, name:p.name, price:p.price, qty });
  saveCart();
}
function changeQty(id, delta){
  const item = CART.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ CART = CART.filter(i=>i.id!==id); }
  saveCart();
  render();
}
function removeFromCart(id){
  CART = CART.filter(i=>i.id!==id);
  saveCart();
  render();
  toast("Removed from cart");
}

/* ---------- SEARCH -------------------------------------------- */
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
document.getElementById("searchToggle").addEventListener("click", ()=>{
  searchOverlay.classList.add("open");
  setTimeout(()=> searchInput.focus(), 100);
});
document.getElementById("searchClose").addEventListener("click", ()=> searchOverlay.classList.remove("open"));
searchInput.addEventListener("input", ()=>{
  const q = searchInput.value.trim().toLowerCase();
  const box = document.getElementById("searchResults");
  if(!q){ box.innerHTML = ""; return; }
  const results = PRODUCTS.filter(p=> p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  box.innerHTML = results.length
    ? results.map(productCardHTML).join("")
    : `<p class="search-empty">No results for “${searchInput.value}”.</p>`;
  box.querySelectorAll(".product-card").forEach(card=>{
    card.addEventListener("click", (e)=>{
      if(e.target.closest("[data-quickadd]")) return;
      searchOverlay.classList.remove("open");
      navigate("#/product/" + card.dataset.id);
    });
  });
  box.querySelectorAll("[data-quickadd]").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      addToCart(btn.dataset.quickadd, 1);
      toast("Added to cart");
    });
  });
});

/* ---------- MOBILE NAV ------------------------------------------*/
const mobileNav = document.getElementById("mobileNav");
document.getElementById("menuToggle").addEventListener("click", ()=>{
  mobileNav.classList.toggle("open");
});
function closeMobileNav(){ mobileNav.classList.remove("open"); }
mobileNav.querySelectorAll("a").forEach(a=> a.addEventListener("click", closeMobileNav));

/* ---------- ORDER MODAL ------------------------------------------*/
const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");
const orderSuccess = document.getElementById("orderSuccess");
const orderSummaryText = document.getElementById("orderSummaryText");

function openOrderModal(context){
  currentOrderContext = context;
  orderForm.hidden = false;
  orderSuccess.hidden = true;
  orderForm.reset();
  const totalQty = context.items.reduce((s,i)=>s+i.qty,0);
  const names = context.items.map(i=>i.name).join(", ");
  const total = context.items.reduce((s,i)=> s + i.qty*i.price, 0);
  orderSummaryText.textContent = `${totalQty} item${totalQty>1?'s':''} — ${names} — ${money(total)}`;
  orderModal.classList.add("open");
}
document.getElementById("orderClose").addEventListener("click", ()=> orderModal.classList.remove("open"));
document.getElementById("orderDoneBtn").addEventListener("click", ()=> orderModal.classList.remove("open"));

orderForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const fd = new FormData(orderForm);
  const customer = {
    name: fd.get("name").trim(),
    phone: fd.get("phone").trim(),
    whatsapp: fd.get("whatsapp").trim(),
    city: fd.get("city").trim(),
    address: fd.get("address").trim()
  };
  const items = currentOrderContext.items;
  const mode = currentOrderContext.mode;

  // Show the confirmation right away — don't make the customer wait
  // on Google's servers to see it. The order is sent in the
  // background below.
  orderForm.hidden = true;
  orderSuccess.hidden = false;

  if(mode === "cart"){
    CART = [];
    saveCart();
  }

  if(STORE_WHATSAPP_NUMBER){
    const total = items.reduce((s,i)=> s + i.qty*i.price, 0);
    const lines = items.map(i=>`${i.name} x${i.qty} (${money(i.price)})`).join("%0A");
    const msg = `New Order%0AName: ${customer.name}%0APhone: ${customer.phone}%0ACity: ${customer.city}%0AAddress: ${customer.address}%0A%0AItems:%0A${lines}%0A%0ATotal: ${money(total)}`;
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  }

  // Fire-and-forget: send to the sheet in the background. If it
  // fails, log it — the customer has already seen confirmation, so
  // don't interrupt them with an error.
  submitOrderToSheet(customer, items).catch(err=>{
    console.error("Order failed to save to Google Sheet:", err);
  });
});

/* Sends one row per product line to the Google Sheet via
   the Apps Script Web App (see SETUP.md). Uses no-cors mode
   since Apps Script web apps don't return CORS headers to
   fetch from a static page — the request still lands in the sheet. */
async function submitOrderToSheet(customer, items){
  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")){
    console.warn("GOOGLE_SCRIPT_URL is not configured yet — order was not sent to Google Sheets.");
    return;
  }

  const dateStr = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

  const requests = items.map(item=>{
    const payload = {
      type: "order",
      date: dateStr,
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      whatsapp: customer.whatsapp,
      city: customer.city,
      product: item.name,
      price: item.price,
      quantity: item.qty
    };
    return fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
  });

  await Promise.all(requests);
}
