'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ─── Hero preview — diverse mix, no overlap with portfolio ─── */
const heroItems = [
  { id: 'h0', label: 'Black Tote Bag',       category: 'Bags',                  bg: '#1E1E1E', src: '/images/black-tote-bag.jpg',       price: '$20', contain: true  },
  { id: 'h1', label: 'Bee',                  category: 'Plushies',              bg: '#FFF3C4', src: '/images/bee.png',                  price: '$8'  },
  { id: 'h2', label: 'Bikini Bag Pink',       category: 'Bags',                  bg: '#F0D8E4', src: '/images/bikini-bag-pink.jpg',       price: '$20', contain: true  },
  { id: 'h3', label: 'Crochet Flower',        category: 'Accessories & Flowers', bg: '#F0E8D0', src: '/images/flower.jpg',               price: '$25', contain: true  },
  { id: 'h4', label: 'Dino',                  category: 'Plushies',              bg: '#D4EDD8', src: '/images/dino.jpg',                 price: '$25' },
]

/* ─── Portfolio — different images, no overlap with hero ─── */
const portfolioItems = [
  { id: 1, label: 'Bunny',                   category: 'Plushies',              bg: '#F0E0E8', src: '/images/bunny.jpg',                price: '$25' },
  { id: 2, label: 'Spring Pals Teal',        category: 'Keychains & Lanyards',  bg: '#CDE0DA', src: '/images/IMG_1764.jpeg',            price: '$8'  },
  { id: 3, label: 'Teddy Bear',              category: 'Plushies',              bg: '#EDE0D4', src: '/images/teddy.jpg',               price: '$25' },
  { id: 4, label: 'Watermelon Keychain',     category: 'Keychains & Lanyards',  bg: '#F0E0DC', src: '/images/IMG_1788.jpeg',            price: '$8'  },
  { id: 5, label: 'Drink Plushie',           category: 'Plushies',              bg: '#D4EAF0', src: '/images/drink-plushie.jpg',        price: '$25' },
  { id: 6, label: 'Bikini Bag Blue Cyan',    category: 'Bags',                  bg: '#C8E8EE', src: '/images/bikini-bag-blue-cyan.jpg',  price: '$20', contain: true  },
  { id: 7, label: 'Cherry Berry',            category: 'Keychains & Lanyards',  bg: '#ECD8D4', src: '/images/IMG_1747.jpeg',            price: '$8'  },
  { id: 8, label: 'Spring Pals Purple',      category: 'Keychains & Lanyards',  bg: '#D8D0E8', src: '/images/IMG_1728.jpeg',            price: '$8'  },
]

/* ─── SVG Placeholder per category ─── */
function PlaceholderIcon({ category }) {
  const icons = {
    Tops: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <path d="M20 20 L10 35 L25 38 L25 65 L55 65 L55 38 L70 35 L60 20 L50 28 Q40 22 30 28 Z"
              stroke="#7D2E46" strokeWidth="2" strokeLinejoin="round" fill="rgba(125,46,70,0.08)"/>
        <path d="M30 28 Q40 35 50 28" stroke="#7D2E46" strokeWidth="1.5" strokeDasharray="4 3"/>
      </svg>
    ),
    Bags: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <rect x="15" y="32" width="50" height="38" rx="4" stroke="#7D2E46" strokeWidth="2" fill="rgba(125,46,70,0.08)"/>
        <path d="M28 32 Q28 18 40 18 Q52 18 52 32" stroke="#7D2E46" strokeWidth="2" fill="none"/>
        <line x1="15" y1="48" x2="65" y2="48" stroke="#7D2E46" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
      </svg>
    ),
    Plushies: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <circle cx="40" cy="44" r="24" stroke="#7D2E46" strokeWidth="2" fill="rgba(125,46,70,0.08)"/>
        <circle cx="30" cy="38" r="4" stroke="#7D2E46" strokeWidth="1.5" fill="rgba(125,46,70,0.15)"/>
        <circle cx="50" cy="38" r="4" stroke="#7D2E46" strokeWidth="1.5" fill="rgba(125,46,70,0.15)"/>
        <path d="M33 52 Q40 58 47 52" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="28" cy="22" r="8" stroke="#7D2E46" strokeWidth="1.5" fill="rgba(125,46,70,0.06)"/>
        <circle cx="52" cy="22" r="8" stroke="#7D2E46" strokeWidth="1.5" fill="rgba(125,46,70,0.06)"/>
      </svg>
    ),
    Keychains: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <circle cx="40" cy="28" r="10" stroke="#7D2E46" strokeWidth="2" fill="rgba(125,46,70,0.08)"/>
        <line x1="40" y1="38" x2="40" y2="52" stroke="#7D2E46" strokeWidth="2"/>
        <ellipse cx="40" cy="60" rx="12" ry="8" stroke="#7D2E46" strokeWidth="2" fill="rgba(125,46,70,0.08)"/>
        <path d="M34 60 Q40 55 46 60 Q40 65 34 60" stroke="#7D2E46" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"/>
      </svg>
    ),
    Custom: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <path d="M40 15 L43.6 27.6 L56.6 27.6 L46.5 35.2 L50.1 47.8 L40 40.2 L29.9 47.8 L33.5 35.2 L23.4 27.6 L36.4 27.6 Z"
              stroke="#7D2E46" strokeWidth="2" strokeLinejoin="round" fill="rgba(125,46,70,0.08)"/>
        <circle cx="40" cy="40" r="30" stroke="#7D2E46" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"/>
      </svg>
    ),
  }
  return icons[category] || null
}

/* ─── Background stitching SVG ─── */
function StitchBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main flowing thread — top right, sweeps down-left */}
        <path
          d="M 1380 -20 C 1300 80, 1100 60, 980 160 S 780 320, 700 380 S 560 480, 480 560 S 340 660, 280 740 S 180 820, 100 900"
          stroke="#C4788A" strokeWidth="2.5" strokeDasharray="14 9" fill="none"
          strokeLinecap="round" opacity="0.22"
          className="stitch-path" style={{ animationDelay: '0.2s' }}
        />
        {/* Secondary thread — bottom left area */}
        <path
          d="M -40 600 C 60 540, 180 580, 260 520 S 400 440, 480 460 S 620 500, 700 460"
          stroke="#7D2E46" strokeWidth="2" strokeDasharray="10 7" fill="none"
          strokeLinecap="round" opacity="0.18"
          className="stitch-path-short" style={{ animationDelay: '0.8s' }}
        />
        {/* Looping yarn — top left decorative */}
        <path
          d="M 80 120 C 120 60, 200 80, 220 140 S 180 220, 240 240 S 340 200, 360 260"
          stroke="#C4788A" strokeWidth="1.8" strokeDasharray="8 6" fill="none"
          strokeLinecap="round" opacity="0.2"
          className="stitch-path-short" style={{ animationDelay: '1.2s' }}
        />
        {/* Horizontal running stitch — section divider feel */}
        <path
          d="M 0 470 L 1440 470"
          stroke="#C4788A" strokeWidth="1.5" strokeDasharray="12 8" fill="none"
          opacity="0.12"
          className="stitch-path" style={{ animationDelay: '1s' }}
        />
        {/* Bottom decorative loop */}
        <path
          d="M 800 820 C 880 760, 1000 800, 1060 740 S 1140 660, 1200 680 S 1320 720, 1380 700 L 1460 690"
          stroke="#7D2E46" strokeWidth="2" strokeDasharray="11 7" fill="none"
          strokeLinecap="round" opacity="0.16"
          className="stitch-path-short" style={{ animationDelay: '0.6s' }}
        />

        {/* Cross-stitch X marks */}
        {[
          [120, 60], [1320, 140], [60, 440], [1400, 380], [680, 860],
          [340, 780], [1100, 520], [220, 300], [1060, 240], [860, 140],
        ].map(([cx, cy], i) => (
          <g key={i} opacity="0.2" transform={`translate(${cx},${cy})`}>
            <line x1="-7" y1="-7" x2="7" y2="7" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="-7" x2="-7" y2="7" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}

        {/* French knot dots */}
        {[
          [480, 200], [760, 340], [1180, 680], [300, 560], [1000, 420], [140, 720],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#C4788A" opacity="0.18"/>
        ))}

        {/* Yarn ball decoration — top right */}
        <g transform="translate(1340, 80)" opacity="0.14">
          <circle cx="0" cy="0" r="48" stroke="#7D2E46" strokeWidth="2" fill="none"/>
          <path d="M -38 -20 Q 0 -48 38 -20" stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -44 4 Q 0 -28 44 4"   stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -44 18 Q 0 -10 44 18" stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -38 34 Q 0 10 38 34"  stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <line x1="40" y1="-30" x2="80" y2="-80" stroke="#7D2E46" strokeWidth="1.5" strokeDasharray="6 4"/>
        </g>

        {/* Mini yarn ball — bottom left */}
        <g transform="translate(100, 820)" opacity="0.12">
          <circle cx="0" cy="0" r="30" stroke="#C4788A" strokeWidth="1.5" fill="none"/>
          <path d="M -22 -12 Q 0 -30 22 -12" stroke="#7D2E46" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
          <path d="M -28 4 Q 0 -18 28 4"    stroke="#7D2E46" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
          <path d="M -24 18 Q 0 2 24 18"   stroke="#7D2E46" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
        </g>
      </svg>
    </div>
  )
}

/* ─── Navigation ─── */
function Nav({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          menuOpen ? 'z-[101] py-6' : `z-50 ${scrolled ? 'nav-glass py-4' : 'py-6'}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <img src="/logo.png" alt="Stitch It with Tomi" className="h-11 w-auto" />
            <span className="font-display italic text-2xl text-chocolate leading-none hidden sm:block" style={{ letterSpacing: '-0.01em' }}>
              Stitch-It
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            <a href="#portfolio" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Portfolio</a>
            <Link href="/shop" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Shop</Link>
            <button onClick={onCartOpen} className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200" aria-label="View cart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span>Cart{cartCount > 0 ? ` (${cartCount})` : ''}</span>
            </button>
            <Link href="/order" className="btn-primary">Order Now</Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden flex flex-col justify-center gap-[5px] p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-[1.5px] bg-chocolate transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}/>
            <span className={`block w-6 h-[1.5px] bg-chocolate transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-6 h-[1.5px] bg-chocolate transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="mobile-nav fixed inset-0 z-[99] flex flex-col lg:hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex-1 flex flex-col justify-center px-10">
            <div style={{ borderTop: '1px solid rgba(196,120,138,0.2)' }}>
              <a href="#portfolio" onClick={close}
                 className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-chocolate hover:text-rose transition-colors leading-none"
                 style={{ animationDelay: '0.08s', borderBottom: '1px solid rgba(196,120,138,0.2)' }}>
                Portfolio
              </a>
            </div>
            <div>
              <Link href="/shop" onClick={close}
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-chocolate hover:text-rose transition-colors leading-none"
                    style={{ animationDelay: '0.16s', borderBottom: '1px solid rgba(196,120,138,0.2)' }}>
                Shop
              </Link>
            </div>
            <div>
              <button onClick={() => { close(); onCartOpen() }}
                      className="mobile-nav-link w-full text-left py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-chocolate hover:text-rose transition-colors leading-none flex items-baseline gap-4"
                      style={{ animationDelay: '0.24s', borderBottom: '1px solid rgba(196,120,138,0.2)' }}>
                Cart
                {cartCount > 0 && <span className="font-body text-xl text-rose not-italic">({cartCount})</span>}
              </button>
            </div>
            <div>
              <Link href="/order" onClick={close}
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-rose hover:text-burgundy transition-colors leading-none"
                    style={{ animationDelay: '0.32s' }}>
                Order Now
              </Link>
            </div>
          </div>

          <div className="px-10 pb-10">
            <a href="https://instagram.com/stitch_it_with_tomi" target="_blank" rel="noopener noreferrer"
               className="font-body text-xs uppercase tracking-widest text-chocolate/35 hover:text-rose transition-colors">
              @stitch_it_with_tomi
            </a>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Modal ─── */
function Modal({ item, onClose, onAddToCart }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(28,43,69,0.72)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="modal-card relative w-full max-w-sm sm:max-w-md rounded-sm overflow-hidden shadow-2xl"
        style={{ background: '#FFFFFF' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="w-full aspect-[4/3]" style={{ backgroundColor: item.bg }}>
          {item.src && (
            <img src={item.src} alt={item.label} className={`w-full h-full ${item.contain ? 'object-contain p-6' : 'object-cover'}`} />
          )}
        </div>

        {/* Info */}
        <div className="px-6 py-5">
          <p className="font-body text-xs uppercase tracking-[0.22em] text-rose mb-2">{item.category}</p>
          <h3 className="font-display italic text-[clamp(1.6rem,4vw,2.2rem)] text-chocolate leading-tight">
            {item.label}
          </h3>
          {item.price && (
            <p className="font-body text-base text-chocolate/60 mt-1">{item.price} each</p>
          )}
          {item.price && (
            <button
              onClick={() => { onAddToCart(item); onClose() }}
              className="btn-primary mt-5 block w-full text-center"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Close */}
        <button onClick={onClose} className="modal-close absolute top-3 right-3" aria-label="Close">
          &#215;
        </button>
      </div>
    </div>
  )
}

/* ─── Cart Drawer ─── */
function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => {
    const n = item.price ? parseInt(item.price.replace(/\D/g, ''), 10) : 0
    return sum + n
  }, 0)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <>
      <div
        className="fixed inset-0 z-[90]"
        style={{ background: 'rgba(28,43,69,0.5)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />
      <div className="cart-drawer fixed top-0 right-0 bottom-0 z-[95] w-full max-w-xs sm:max-w-sm bg-white flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose/15">
          <div className="flex items-center gap-3">
            <h2 className="font-display italic text-2xl text-chocolate leading-none">Cart</h2>
            {cart.length > 0 && (
              <span className="font-body text-xs text-chocolate/45 uppercase tracking-widest">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button onClick={onClose} className="modal-close" aria-label="Close cart">&#215;</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-16">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C4788A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-40">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="font-display italic text-xl text-chocolate/40">Nothing here yet</p>
              <p className="font-body text-xs text-chocolate/30 uppercase tracking-widest mt-2">Click on any piece to add it</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-rose/10">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-center gap-4 py-4">
                  <div
                    className="w-14 h-14 rounded-sm overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: item.bg }}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className={`w-full h-full ${item.contain ? 'object-contain p-1' : 'object-cover'}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-chocolate truncate">{item.label}</p>
                    <p className="font-body text-[10px] uppercase tracking-widest text-chocolate/45 mt-0.5">{item.category}</p>
                    {item.price && (
                      <p className="font-body text-sm text-burgundy mt-1">{item.price}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemove(item.cartId)}
                    className="text-chocolate/25 hover:text-burgundy transition-colors duration-200 text-xl leading-none flex-shrink-0 ml-1"
                    aria-label="Remove item"
                  >
                    &#215;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-rose/15">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-body text-xs uppercase tracking-widest text-chocolate/55">Total</span>
              <span className="font-display italic text-3xl text-chocolate">${total}</span>
            </div>
            <Link href="/order" onClick={onClose} className="btn-primary block text-center w-full">
              Place Order
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

/* ─── Portfolio Card ─── */
function PortfolioCard({ item, className, style, onOpen }) {
  return (
    <div
      className={`portfolio-card relative overflow-hidden ${className}`}
      style={{ backgroundColor: item.bg, ...style }}
      onClick={() => onOpen && onOpen(item)}
    >
      {item.src ? (
        <img src={item.src} alt={item.label} className={`w-full h-full ${item.contain ? 'object-contain p-4' : 'object-cover'}`} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
          <PlaceholderIcon category={item.category} />
          <div className="text-center">
            <p className="font-display text-lg font-500 text-chocolate italic">{item.label}</p>
            <p className="font-body text-xs uppercase tracking-widest text-chocolate/65 mt-1">{item.category}</p>
          </div>
        </div>
      )}

      {/* Slide-up info panel */}
      <div className="card-slide">
        <p className="font-display italic text-cream text-xl leading-tight">{item.label}</p>
        <div className="flex items-center gap-3 mt-1">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-rose">{item.category}</p>
          {item.price && <p className="font-body text-xs font-500 text-cream/80">{item.price}</p>}
        </div>
      </div>
    </div>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stitchit-cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('stitchit-cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartId: `${item.id}-${Date.now()}` }])
  }

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId))
  }

  return (
    <main className="relative min-h-screen">
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} />
      )}
      {cartOpen && (
        <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
      )}
      <StitchBackground />
      <Nav cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left — text */}
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="anim-fade-up delay-100 font-body text-xs uppercase tracking-[0.25em] text-rose mb-6">
                Handcrafted in Winnipeg
              </p>

              <h1 className="anim-fade-up delay-200 font-display font-300 leading-[0.9] mb-8">
                <span className="block text-[clamp(4rem,9vw,8rem)] italic text-chocolate">Stitch It</span>
                <span className="block text-[clamp(3rem,7vw,6.5rem)] text-rose ml-[0.1em]">with Tomi</span>
              </h1>

              <div className="anim-fade-up delay-300 stitch-divider mb-8" />

              <p className="anim-fade-up delay-400 font-body text-base text-chocolate/70 leading-relaxed mb-10 max-w-sm">
                Handmade with heart. Keychains, bags, tops, flowers and custom orders, each piece crocheted by hand in Winnipeg.
              </p>

              <div className="anim-fade-up delay-500 flex flex-wrap gap-4">
                <a href="#portfolio" className="btn-primary">See My Work</a>
                <Link href="/order" className="btn-outline">Order Something</Link>
              </div>

              {/* Tags */}
              <div className="anim-fade-up delay-600 flex flex-wrap gap-2 mt-10">
                {['Keychains', 'Bags', 'Tops', 'Flowers', 'Custom'].map((tag) => (
                  <span key={tag} className="font-body text-xs uppercase tracking-widest px-3 py-1 border border-rose/30 text-rose rounded-none">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — hero preview (different photos from portfolio below) */}
            <div className="lg:col-span-6 xl:col-span-7 anim-scale-in delay-400">
              <div className="grid grid-cols-3 grid-rows-3 gap-3" style={{ height: 'clamp(360px, 55vh, 580px)' }}>
                <PortfolioCard item={heroItems[0]} className="col-span-2 row-span-2 rounded-sm" onOpen={setSelectedItem} />
                <PortfolioCard item={heroItems[1]} className="col-span-1 row-span-1 rounded-sm" onOpen={setSelectedItem} />
                <PortfolioCard item={heroItems[2]} className="col-span-1 row-span-2 rounded-sm" onOpen={setSelectedItem} />
                <PortfolioCard item={heroItems[3]} className="col-span-1 row-span-1 rounded-sm" onOpen={setSelectedItem} />
                <PortfolioCard item={heroItems[4]} className="col-span-1 row-span-1 rounded-sm" onOpen={setSelectedItem} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-8">

          <div className="flex items-baseline gap-6 mb-16">
            <h2 className="font-display font-300 text-[clamp(3rem,6vw,5rem)] italic text-chocolate leading-none">
              What I Make
            </h2>
            <div className="flex-1 stitch-divider" />
          </div>

          {/* Mobile: clean 2-column grid with consistent proportions */}
          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {portfolioItems.slice(0, 5).map(item => (
              <div key={item.id} className="aspect-[4/3]">
                <PortfolioCard item={item} className="w-full h-full rounded-sm" onOpen={setSelectedItem} />
              </div>
            ))}
          </div>

          {/* Desktop: 2-row asymmetric grid */}
          <div
            className="hidden lg:grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'repeat(2, 260px)',
            }}
          >
            <PortfolioCard item={portfolioItems[0]} className="rounded-sm" style={{ gridColumn: '1 / span 5', gridRow: '1 / span 2' }} onOpen={setSelectedItem} />
            <PortfolioCard item={portfolioItems[1]} className="rounded-sm" style={{ gridColumn: '6 / span 4', gridRow: '1 / span 1' }} onOpen={setSelectedItem} />
            <PortfolioCard item={portfolioItems[2]} className="rounded-sm" style={{ gridColumn: '10 / span 3', gridRow: '1 / span 2' }} onOpen={setSelectedItem} />
            <PortfolioCard item={portfolioItems[3]} className="rounded-sm" style={{ gridColumn: '6 / span 2', gridRow: '2 / span 1' }} onOpen={setSelectedItem} />
            <PortfolioCard item={portfolioItems[4]} className="rounded-sm" style={{ gridColumn: '8 / span 2', gridRow: '2 / span 1' }} onOpen={setSelectedItem} />
          </div>

          <p className="font-body text-xs uppercase tracking-widest text-chocolate/55 text-center mt-8">
            Look at my Instagram to see more — <a href="https://instagram.com/stitch_it_with_tomi" target="_blank" rel="noopener noreferrer" className="text-rose underline underline-offset-4 hover:text-burgundy transition-colors">@stitch_it_with_tomi</a>
          </p>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="relative px-16 py-20 text-center overflow-hidden"
            style={{ backgroundColor: '#1C2B45' }}
          >
            {/* Stitching inside the banner */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M -20 280 C 80 220, 200 260, 300 200 S 480 120, 600 160 S 760 220, 920 180"
                    stroke="#C4788A" strokeWidth="2" strokeDasharray="12 8" fill="none" opacity="0.25"/>
              <path d="M -20 60 C 100 20, 240 80, 360 40 S 560 -20, 700 40 S 840 80, 920 60"
                    stroke="#C4788A" strokeWidth="1.5" strokeDasharray="8 6" fill="none" opacity="0.18"/>
              {[[60,80],[820,220],[440,140],[200,200],[680,60]].map(([cx,cy],i) => (
                <g key={i} transform={`translate(${cx},${cy})`} opacity="0.3">
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#E8BAC4" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6" y1="-6" x2="-6" y2="6" stroke="#E8BAC4" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
              ))}
            </svg>

            <p className="relative font-body text-xs uppercase tracking-[0.3em] text-rose mb-6">
              Ready for something made just for you?
            </p>
            <h2 className="relative font-display font-300 text-[clamp(2.5rem,5vw,4.5rem)] italic text-cream leading-none mb-10">
              Let&apos;s make something<br />
              <span className="text-rose">together.</span>
            </h2>
            <Link href="/order" className="btn-cta-fill">
              <span>Place an Order</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-12 border-t border-rose/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Stitch It with Tomi" className="h-10 w-auto" />
            <span className="font-display italic text-xl text-chocolate leading-none" style={{ letterSpacing: '-0.01em' }}>
              Stitch-It
            </span>
          </Link>
          <a
            href="https://instagram.com/stitch_it_with_tomi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs uppercase tracking-widest text-rose hover:text-burgundy transition-colors"
          >
            @stitch_it_with_tomi
          </a>
        </div>
      </footer>
    </main>
  )
}
