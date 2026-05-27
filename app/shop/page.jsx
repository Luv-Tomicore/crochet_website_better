'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['All', 'Keychains & Lanyards', 'Bags', 'Clothing', 'Accessories & Flowers', 'Plushies']

const shopItems = [
  // Keychains & Lanyards
  { id: 's1',  label: 'Watermelon Keychain', category: 'Keychains & Lanyards', bg: '#F0E0DC', src: '/images/IMG_1788.jpeg', price: '$8'  },
  { id: 's2',  label: 'Blue Buddy',          category: 'Keychains & Lanyards', bg: '#CDD5E8', src: '/images/IMG_1695.jpeg', price: '$8'  },
  { id: 's3',  label: 'Cherry Berry',        category: 'Keychains & Lanyards', bg: '#ECD8D4', src: '/images/IMG_1747.jpeg', price: '$8'  },
  { id: 's4',  label: 'Spring Pals Pink',    category: 'Keychains & Lanyards', bg: '#EDD8DC', src: '/images/IMG_1762.jpeg', price: '$8'  },
  { id: 's5',  label: 'Spring Pals Teal',    category: 'Keychains & Lanyards', bg: '#CDE0DA', src: '/images/IMG_1764.jpeg', price: '$8'  },
  { id: 's7',  label: 'Spring Pals Purple',  category: 'Keychains & Lanyards', bg: '#D8D0E8', src: '/images/IMG_1728.jpeg', price: '$8'  },
  // Bags
  { id: 'b1',  label: 'Black Tote Bag',        category: 'Bags', bg: '#2C2C2C', src: '/images/black-tote-bag.jpg',       price: '$20', contain: true },
  { id: 'b2',  label: 'Bikini Bag Blue White',  category: 'Bags', bg: '#D8E4F0', src: '/images/bikini-bag-blue-white.jpg', price: '$20', contain: true },
  { id: 'b3',  label: 'Bikini Bag Blue Cyan',   category: 'Bags', bg: '#C8E8EE', src: '/images/bikini-bag-blue-cyan.jpg',  price: '$20', contain: true },
  { id: 'b4',  label: 'Bikini Bag Pink',        category: 'Bags', bg: '#F0D8E4', src: '/images/bikini-bag-pink.jpg',       price: '$20', contain: true },
  // Accessories & Flowers
  { id: 'f1',  label: 'Crochet Flower',   category: 'Accessories & Flowers', bg: '#F0E8D0', src: '/images/flower.jpg', price: '$25', contain: true },
  // Plushies
  { id: 'p1',  label: 'Bee',              category: 'Plushies', bg: '#FFF3C4', src: '/images/bee.png',           price: '$8'  },
  { id: 'p2',  label: 'Bunny',            category: 'Plushies', bg: '#F0E0E8', src: '/images/bunny.jpg',         price: '$25' },
  { id: 'p3',  label: 'Teddy Bear',       category: 'Plushies', bg: '#EDE0D4', src: '/images/teddy.jpg',         price: '$25' },
  { id: 'p4',  label: 'Drink Plushie',    category: 'Plushies', bg: '#D4EAF0', src: '/images/drink-plushie.jpg', price: '$25' },
  { id: 'p5',  label: 'Dino',             category: 'Plushies', bg: '#D4EDD8', src: '/images/dino.jpg',          price: '$25' },
]

function StitchBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
           className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M 1380 -20 C 1300 80, 1100 60, 980 160 S 780 320, 700 380 S 560 480, 480 560 S 340 660, 280 740 S 180 820, 100 900"
              stroke="#C4788A" strokeWidth="2.5" strokeDasharray="14 9" fill="none"
              strokeLinecap="round" opacity="0.18" className="stitch-path" style={{ animationDelay: '0.2s' }}/>
        <path d="M -40 600 C 60 540, 180 580, 260 520 S 400 440, 480 460 S 620 500, 700 460"
              stroke="#7D2E46" strokeWidth="2" strokeDasharray="10 7" fill="none"
              strokeLinecap="round" opacity="0.14" className="stitch-path-short" style={{ animationDelay: '0.8s' }}/>
        <path d="M 0 470 L 1440 470"
              stroke="#C4788A" strokeWidth="1.5" strokeDasharray="12 8" fill="none"
              opacity="0.1" className="stitch-path" style={{ animationDelay: '1s' }}/>
        {[
          [120, 60], [1320, 140], [60, 440], [1400, 380], [680, 860],
          [340, 780], [1100, 520], [220, 300], [1060, 240], [860, 140],
        ].map(([cx, cy], i) => (
          <g key={i} opacity="0.16" transform={`translate(${cx},${cy})`}>
            <line x1="-7" y1="-7" x2="7" y2="7" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="-7" x2="-7" y2="7" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}
        {[[480, 200], [760, 340], [1180, 680], [300, 560], [1000, 420], [140, 720]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#C4788A" opacity="0.15"/>
        ))}
        <g transform="translate(1340, 80)" opacity="0.1">
          <circle cx="0" cy="0" r="48" stroke="#7D2E46" strokeWidth="2" fill="none"/>
          <path d="M -38 -20 Q 0 -48 38 -20" stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -44 4 Q 0 -28 44 4"   stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -44 18 Q 0 -10 44 18" stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
          <path d="M -38 34 Q 0 10 38 34"  stroke="#C4788A" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
        </g>
      </svg>
    </div>
  )
}

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

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-16">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C4788A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-40">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="font-display italic text-xl text-chocolate/40">Nothing here yet</p>
              <p className="font-body text-xs text-chocolate/30 uppercase tracking-widest mt-2">Add something below</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-rose/10">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-center gap-4 py-4">
                  <div className="w-14 h-14 rounded-sm overflow-hidden flex-shrink-0" style={{ backgroundColor: item.bg }}>
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-chocolate truncate">{item.label}</p>
                    <p className="font-body text-[10px] uppercase tracking-widest text-chocolate/45 mt-0.5">{item.category}</p>
                    {item.price && <p className="font-body text-sm text-burgundy mt-1">{item.price}</p>}
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
      <nav className={`fixed top-0 left-0 right-0 transition-all duration-500 ${menuOpen ? 'z-[101] py-6' : `z-50 ${scrolled ? 'nav-glass py-4' : 'py-6'}`}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <img src="/logo.png" alt="Stitch It with Tomi" className="h-11 w-auto" />
            <span className="font-display italic text-2xl text-chocolate leading-none hidden sm:block" style={{ letterSpacing: '-0.01em' }}>
              Stitch-It
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            <Link href="/#portfolio" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Portfolio</Link>
            <Link href="/shop" className="font-body text-xs uppercase tracking-widest text-burgundy border-b border-rose/40 pb-0.5">Shop</Link>
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

      {menuOpen && (
        <div className="mobile-nav fixed inset-0 z-[99] flex flex-col lg:hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex-1 flex flex-col justify-center px-10">
            <div style={{ borderTop: '1px solid rgba(196,120,138,0.2)' }}>
              <Link href="/#portfolio" onClick={close}
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-chocolate hover:text-rose transition-colors leading-none"
                    style={{ animationDelay: '0.08s', borderBottom: '1px solid rgba(196,120,138,0.2)' }}>
                Portfolio
              </Link>
            </div>
            <div>
              <Link href="/shop" onClick={close}
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-rose leading-none"
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

function ShopCard({ item, onAddToCart }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="group">
      <div
        className="relative overflow-hidden rounded-sm mb-4"
        style={{ backgroundColor: item.bg, aspectRatio: '1 / 1' }}
      >
        <img
          src={item.src}
          alt={item.label}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${item.contain ? 'object-contain p-4' : 'object-cover'}`}
        />
      </div>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-body text-sm text-chocolate truncate">{item.label}</h3>
          <p className="font-body text-[10px] uppercase tracking-widest text-chocolate/45 mt-0.5">{item.category}</p>
        </div>
        <span className="font-display italic text-xl text-burgundy flex-shrink-0">{item.price}</span>
      </div>
      <button
        onClick={handleAdd}
        className={`w-full py-2.5 font-body text-xs uppercase tracking-widest border transition-all duration-300 ${
          added
            ? 'bg-burgundy text-white border-burgundy'
            : 'bg-transparent text-chocolate/65 border-rose/30 hover:border-burgundy hover:text-burgundy'
        }`}
      >
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default function ShopPage() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

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

  const visibleItems = shopItems.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter
    return matchesSearch && matchesFilter
  })

  const clearFilters = () => { setSearch(''); setActiveFilter('All') }
  const isFiltered = search || activeFilter !== 'All'

  return (
    <main className="relative min-h-screen">
      {cartOpen && (
        <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
      )}
      <StitchBg />
      <Nav cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-36 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="anim-fade-up delay-100 font-body text-xs uppercase tracking-[0.25em] text-rose mb-4">
            Ready to Order
          </p>
          <div className="flex items-baseline gap-6">
            <h1 className="anim-fade-up delay-200 font-display font-300 text-[clamp(3.5rem,7vw,6rem)] italic text-chocolate leading-none">
              Shop
            </h1>
            <div className="anim-fade-up delay-300 flex-1 stitch-divider" />
          </div>
          <p className="anim-fade-up delay-400 font-body text-sm text-chocolate/60 mt-5 max-w-md leading-relaxed">
            Everything is made to order and crocheted by hand. Add items to your cart then place an order and I'll be in touch to confirm details.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="anim-fade-up delay-500 mb-10 flex flex-col sm:flex-row gap-5 sm:items-end">
          {/* Search */}
          <div className="relative sm:w-64">
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 text-chocolate/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items..."
              className="form-field w-full pl-6 pr-6 py-2.5 text-chocolate font-body text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-chocolate/30 hover:text-rose transition-colors text-lg leading-none"
              >
                &#215;
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="font-body text-xs uppercase tracking-widest px-4 py-2.5 border transition-all duration-200"
                style={{
                  borderColor: activeFilter === cat ? 'var(--burgundy)' : 'rgba(196,120,138,0.3)',
                  backgroundColor: activeFilter === cat ? 'var(--burgundy)' : 'transparent',
                  color: activeFilter === cat ? '#FFFFFF' : 'var(--muted)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {isFiltered && (
          <div className="flex items-center gap-4 mb-6">
            <p className="font-body text-xs text-chocolate/45 uppercase tracking-widest">
              {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'} found
            </p>
            <button onClick={clearFilters} className="font-body text-xs text-rose hover:text-burgundy transition-colors uppercase tracking-widest underline underline-offset-4">
              Clear
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {visibleItems.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="font-display italic text-3xl text-chocolate/25 mb-4">Nothing found</p>
              <button onClick={clearFilters} className="font-body text-xs uppercase tracking-widest text-rose hover:text-burgundy transition-colors underline underline-offset-4">
                Clear filters
              </button>
            </div>
          ) : visibleItems.map((item, i) => (
            <div
              key={item.id}
              className="anim-fade-up"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <ShopCard item={item} onAddToCart={addToCart} />
            </div>
          ))}
        </div>

        {/* Custom order callout */}
        <div className="mt-20 pt-12 border-t border-rose/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-chocolate/50 mb-1">Don't see what you're looking for?</p>
            <p className="font-display italic text-2xl text-chocolate">I take custom orders too.</p>
          </div>
          <Link href="/order" className="btn-outline flex-shrink-0">Place a Custom Order</Link>
        </div>
      </div>

      <footer className="relative z-10 py-10 border-t border-rose/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Stitch It with Tomi" className="h-8 w-auto" />
            <span className="font-display italic text-lg text-chocolate leading-none" style={{ letterSpacing: '-0.01em' }}>Stitch-It</span>
          </Link>
          <a href="https://instagram.com/stitch_it_with_tomi" target="_blank" rel="noopener noreferrer"
             className="font-body text-xs uppercase tracking-widest text-rose hover:text-burgundy transition-colors">
            @stitch_it_with_tomi
          </a>
        </div>
      </footer>
    </main>
  )
}
