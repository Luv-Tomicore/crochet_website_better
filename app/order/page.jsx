'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ITEM_TYPES = ['Keychain', 'Bags', 'Clothing ', 'Flowers', 'Other / Custom']
const BUDGETS   = ['Under $20', '$20 – $50', '$50 – $100', '$100+', 'Not sure yet']
const TIMELINES = ['ASAP', '1 – 2 weeks', '2 – 4 weeks', 'No rush (1–2 months)', 'Special occasion (tell me!)']

function StitchBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
           className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M 1460 200 C 1340 160, 1200 240, 1080 200 S 840 100, 700 180 S 520 300, 380 260 S 160 180, -20 220"
              stroke="#C4788A" strokeWidth="2" strokeDasharray="12 8" fill="none" opacity="0.18"
              strokeLinecap="round" className="stitch-path" style={{ animationDelay: '0.3s' }}/>
        <path d="M -20 680 C 120 640, 280 700, 420 660 S 620 580, 760 620 S 960 680, 1100 640 S 1320 560, 1460 600"
              stroke="#7D2E46" strokeWidth="1.5" strokeDasharray="10 7" fill="none" opacity="0.15"
              strokeLinecap="round" className="stitch-path" style={{ animationDelay: '0.8s' }}/>
        <path d="M 200 -20 C 180 100, 240 220, 200 340 S 120 500, 180 620 S 260 740, 220 860"
              stroke="#C4788A" strokeWidth="1.5" strokeDasharray="8 6" fill="none" opacity="0.14"
              strokeLinecap="round" className="stitch-path-short" style={{ animationDelay: '0.5s' }}/>
        {[
          [80,  140], [1360, 120], [1380, 760], [60,  740], [740, 440],
          [460, 200], [980,  680], [280,  480], [1160, 340], [540, 860],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`} opacity="0.18">
            <line x1="-6" y1="-6" x2="6" y2="6" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6" y1="-6" x2="-6" y2="6" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}
        {[[380,80],[1080,280],[660,740],[160,400],[1260,520]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#C4788A" opacity="0.2"/>
        ))}
        <g transform="translate(1360, 820)" opacity="0.12">
          <circle cx="0" cy="0" r="36" stroke="#7D2E46" strokeWidth="1.5" fill="none"/>
          <path d="M -28 -10 Q 0 -36 28 -10" stroke="#C4788A" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
          <path d="M -34 6 Q 0 -22 34 6"    stroke="#C4788A" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
          <path d="M -30 22 Q 0 -4 30 22"   stroke="#C4788A" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
        </g>
      </svg>
    </div>
  )
}

function Nav() {
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
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <img src="/logo.png" alt="Stitch It with Tomi" className="h-11 w-auto" />
            <span className="font-display italic text-2xl text-chocolate leading-none hidden sm:block" style={{ letterSpacing: '-0.01em' }}>
              Stitch-It
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            <Link href="/#portfolio" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Portfolio</Link>
            <Link href="/shop" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Shop</Link>
            <Link href="/" className="font-body text-xs uppercase tracking-widest text-chocolate/70 hover:text-burgundy transition-colors duration-200">Back Home</Link>
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
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-chocolate hover:text-rose transition-colors leading-none"
                    style={{ animationDelay: '0.16s', borderBottom: '1px solid rgba(196,120,138,0.2)' }}>
                Shop
              </Link>
            </div>
            <div>
              <Link href="/" onClick={close}
                    className="mobile-nav-link block py-7 font-display italic text-[clamp(2.8rem,9vw,4.5rem)] text-rose hover:text-burgundy transition-colors leading-none"
                    style={{ animationDelay: '0.24s' }}>
                Back Home
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

function SuccessState() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
      <StitchBg />
      <div className="relative z-10 text-center max-w-lg px-8 anim-scale-in">
        <svg viewBox="0 0 160 160" className="w-32 h-32 mx-auto mb-8" aria-hidden="true">
          <circle cx="80" cy="80" r="64" stroke="#7D2E46" strokeWidth="2"
                  strokeDasharray="402" strokeDashoffset="402" fill="none"
                  className="stitch-path" style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}/>
          <path d="M 50 82 L 70 102 L 110 58" stroke="#C4788A" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                strokeDasharray="80" strokeDashoffset="80"
                className="stitch-path-short" style={{ animationDelay: '1s', animationDuration: '0.6s' }}/>
          {[[40,40],[120,40],[120,120],[40,120]].map(([cx,cy],i) => (
            <g key={i} transform={`translate(${cx},${cy})`} opacity="0.3">
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="5" y1="-5" x2="-5" y2="5" stroke="#7D2E46" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          ))}
        </svg>
        <p className="font-body text-xs uppercase tracking-[0.25em] text-rose mb-4">Order Received</p>
        <h2 className="font-display font-300 text-5xl italic text-chocolate mb-4 leading-none">
          It&apos;s in the<br /><span className="text-rose">works!</span>
        </h2>
        <p className="font-body text-base text-chocolate/70 leading-relaxed mb-10">
          I'll be in touch soon to chat about your order.
          Keep an eye on your inbox!
        </p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  )
}

export default function OrderPage() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', itemType: '', description: '', budget: '', timeline: '', notes: '' })
  const [cartItems, setCartItems] = useState([])
  const [status, setStatus]     = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stitchit-cart')
      if (saved) {
        const items = JSON.parse(saved)
        setCartItems(items)
      }
    } catch {}
  }, [])

  const clearCart = () => {
    setCartItems([])
    try { localStorage.removeItem('stitchit-cart') } catch {}
  }

  const removeCartItem = (cartId) => {
    const updated = cartItems.filter(i => i.cartId !== cartId)
    setCartItems(updated)
    try { localStorage.setItem('stitchit-cart', JSON.stringify(updated)) } catch {}
  }

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const selectedItems = cartItems.map(i => `${i.label} (${i.price})`).join(', ')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          cartItems: selectedItems || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      clearCart()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') return <SuccessState />

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + (item.price ? parseInt(item.price.replace(/\D/g, ''), 10) : 0)
  }, 0)

  return (
    <main className="relative min-h-screen">
      <StitchBg />
      <Nav />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="anim-fade-up delay-100 font-body text-xs uppercase tracking-[0.25em] text-rose mb-5">
              Custom Orders
            </p>
            <h1 className="anim-fade-up delay-200 font-display font-300 leading-[0.9] mb-8">
              <span className="block text-[clamp(3rem,6vw,5.5rem)] italic text-chocolate">Let&apos;s make</span>
              <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-rose">something.</span>
            </h1>
            <div className="anim-fade-up delay-300 stitch-divider mb-8" />
            <p className="anim-fade-up delay-400 font-body text-base text-chocolate/70 leading-relaxed">
              Fill in the form and I&apos;ll get back to you to discuss details,
              colour options, and timeline. Every piece is made to order, nothing
              sits in a warehouse.
            </p>

            <div className="anim-fade-up delay-500 mt-10 space-y-5">
              {[
                ['01', 'Submit your order details below'],
                ['02', 'I reach out to confirm & discuss'],
                ['03', "Crafting begins — updates as it's made"],
                ['04', 'Your piece arrives, handmade with love'],
              ].map(([n, text]) => (
                <div key={n} className="flex items-start gap-4">
                  <span className="font-display italic text-2xl text-rose/70 leading-none">{n}</span>
                  <p className="font-body text-sm text-chocolate/65 pt-0.5 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 anim-fade-up delay-300">

            {/* Cart items section */}
            {cartItems.length > 0 && (
              <div className="mb-10 border border-rose/20 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-rose/15" style={{ backgroundColor: 'rgba(240,213,217,0.15)' }}>
                  <div className="flex items-center gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4788A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    <p className="font-body text-xs uppercase tracking-widest text-chocolate/70">
                      Your Cart — {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="font-body text-xs text-chocolate/35 hover:text-rose transition-colors uppercase tracking-widest"
                  >
                    Clear all
                  </button>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {cartItems.map(item => (
                    <div key={item.cartId} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0" style={{ backgroundColor: item.bg }}>
                        <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-chocolate truncate">{item.label}</p>
                        <p className="font-body text-xs text-chocolate/45 uppercase tracking-widest mt-0.5">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="font-display italic text-lg text-burgundy">{item.price}</span>
                        <button
                          type="button"
                          onClick={() => removeCartItem(item.cartId)}
                          className="text-chocolate/25 hover:text-rose transition-colors text-lg leading-none"
                          aria-label="Remove"
                        >
                          &#215;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between px-5 py-4 border-t border-rose/15" style={{ backgroundColor: 'rgba(240,213,217,0.1)' }}>
                  <span className="font-body text-xs uppercase tracking-widest text-chocolate/50">Total</span>
                  <span className="font-display italic text-2xl text-chocolate">${cartTotal}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="First & last"
                    className="form-field w-full py-3 text-chocolate font-body text-base"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                    Your Email *
                  </label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="form-field w-full py-3 text-chocolate font-body text-base"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="sm:w-1/2">
                <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                  Phone <span className="normal-case tracking-normal text-chocolate/40">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  placeholder="+1 (204) 555-0000"
                  className="form-field w-full py-3 text-chocolate font-body text-base"
                />
              </div>

              {/* Item type */}
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                  What are you looking for? {cartItems.length === 0 && '*'}
                  {cartItems.length > 0 && (
                    <span className="normal-case tracking-normal text-chocolate/40 ml-1">(optional if ordering from cart)</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ITEM_TYPES.map(type => (
                    <button
                      key={type} type="button"
                      onClick={() => update('itemType', form.itemType === type ? '' : type)}
                      className="font-body text-sm px-4 py-2 border transition-all duration-200"
                      style={{
                        borderColor: form.itemType === type ? 'var(--burgundy)' : 'rgba(196,120,138,0.3)',
                        backgroundColor: form.itemType === type ? 'var(--burgundy)' : 'transparent',
                        color: form.itemType === type ? 'var(--cream)' : 'var(--muted)',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                  {cartItems.length > 0 ? 'Anything extra or custom details?' : 'Describe what you\'re envisioning *'}
                  {cartItems.length > 0 && (
                    <span className="normal-case tracking-normal text-chocolate/40 ml-1">(optional)</span>
                  )}
                </label>
                <textarea
                  required={cartItems.length === 0}
                  rows={5}
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder={cartItems.length > 0
                    ? "Colours, customizations, anything specific you want for your cart items..."
                    : "Colours, size, style references, anything that comes to mind..."}
                  className="form-field w-full py-3 text-chocolate font-body text-base resize-none"
                />
              </div>

              {/* Budget + Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                    Budget range
                  </label>
                  <select
                    value={form.budget}
                    onChange={e => update('budget', e.target.value)}
                    className="form-field w-full py-3 text-chocolate font-body text-base bg-cream appearance-none cursor-pointer"
                  >
                    <option value="">Select a range</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                    Timeline
                  </label>
                  <select
                    value={form.timeline}
                    onChange={e => update('timeline', e.target.value)}
                    className="form-field w-full py-3 text-chocolate font-body text-base bg-cream appearance-none cursor-pointer"
                  >
                    <option value="">When do you need it?</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Inspiration image */}
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                  Inspiration Image <span className="normal-case tracking-normal text-chocolate/45">(optional)</span>
                </label>
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.gif"
                  onChange={e => update('image', e.target.files[0] || null)}
                  className="font-body text-sm text-chocolate/70 file:mr-4 file:py-2 file:px-4 file:border file:border-rose/30 file:bg-transparent file:text-xs file:uppercase file:tracking-widest file:text-rose file:cursor-pointer hover:file:border-burgundy hover:file:text-burgundy file:transition-colors"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-chocolate/60 mb-3">
                  Anything else? <span className="normal-case tracking-normal text-chocolate/45">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => update('notes', e.target.value)}
                  placeholder="Special requests, questions, colour preferences..."
                  className="form-field w-full py-3 text-chocolate font-body text-base resize-none"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="font-body text-sm text-rose border border-rose/30 px-4 py-3">
                  {errorMsg || 'Something went wrong — please try again or DM on Instagram.'}
                </p>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : cartItems.length > 0 ? `Send Order (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})` : 'Send My Order'}
                </button>
                <p className="font-body text-xs text-chocolate/55 mt-4">
                  I&apos;ll reply within 1–2 days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-10 border-t border-rose/10">
        <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
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
