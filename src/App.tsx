import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { copy, type Locale } from './i18n'
import { dishes, gallery, images, times, type Category } from './data'

const cats: Category[] = ['starters', 'salads', 'mains', 'grill', 'desserts', 'drinks']
const MAP =
  'https://www.google.com/maps?q=Diplomatic+Quarter+Riyadh&hl=ar&z=14&output=embed'
const DIR =
  'https://www.google.com/maps/dir/?api=1&destination=Diplomatic+Quarter,+Riyadh'
const WA = 'https://wa.me/966500000000'

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M11 3H3v8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function IconCal() {
  return (
    <svg className="lux-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10h17" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="8.5" cy="14.5" r="0.9" fill="currentColor" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg className="lux-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconGuests() {
  return (
    <svg className="lux-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="15.5" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.5 18.2c.7-2.6 2.7-4 4.6-4s3.9 1.4 4.6 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M13.2 14.6c1.5-.4 3.3.4 4.3 2.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg className="lux-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8.4" r="2.8" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6.2 18.5c.8-3 2.9-4.6 5.8-4.6s5 1.6 5.8 4.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="lux-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="3.5" width="10" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 17.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('reveal')
        })
      },
      { threshold: 0.22 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

function useCount(active: boolean, to: number) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setN(to)
      return
    }
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to])
  return n
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = copy[locale]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cat, setCat] = useState<Category>('mains')
  const [cursor, setCursor] = useState({ x: 0, y: 0, label: '' })
  const [fine, setFine] = useState(false)
  const [confirmed, setConfirmed] = useState<null | {
    date: string
    time: string
    guests: string
    name: string
  }>(null)
  const [statsOn, setStatsOn] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const sigRef = useRef<HTMLDivElement>(null)
  const reserveRef = useRef<HTMLElement>(null)
  const [reserveIn, setReserveIn] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [guestOpen, setGuestOpen] = useState(false)
  const [booking, setBooking] = useState({
    date: '',
    time: times[4],
    guests: '2',
    name: '',
    phone: '',
  })

  useReveal()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setFine(mq.matches)
    const fn = () => setFine(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStatsOn(true)
      },
      { threshold: 0.4 },
    )
    io.observe(statsRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const figs = document.querySelectorAll('.masonry figure')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.15 },
    )
    figs.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const wrap = sigRef.current
    if (!wrap) return
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 900) return
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      wrap.scrollLeft += e.deltaY * (document.documentElement.dir === 'rtl' ? -1 : 1)
    }
    wrap.addEventListener('wheel', onWheel, { passive: true })
    return () => wrap.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const el = reserveRef.current
    if (!el) return
    const reveal = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.9 && r.bottom > 90) setReserveIn(true)
    }
    reveal()
    const raf = requestAnimationFrame(reveal)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReserveIn(true)
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    window.addEventListener('scroll', reveal, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', reveal)
    }
  }, [])

  useEffect(() => {
    const el = reserveRef.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height)
      el.style.setProperty('--py', `${((p || 0) - 0.5) * 36}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('.lux-select')) {
        setTimeOpen(false)
        setGuestOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTimeOpen(false)
        setGuestOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const guests = useCount(statsOn, 12000)
  const plates = useCount(statsOn, 18)
  const years = useCount(statsOn, 7)

  const signature = useMemo(() => dishes.filter((d) => d.signature), [])
  const menuItems = useMemo(() => dishes.filter((d) => d.category === cat), [cat])

  const setLabel = (label: string) => setCursor((c) => ({ ...c, label }))

  const onReserve = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTimeOpen(false)
    setGuestOpen(false)
    setConfirmed({
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      name: booking.name,
    })
  }

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const dateLabel = booking.date
    ? new Date(`${booking.date}T00:00:00`).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : t.reserve.dateHint
  const guestLabel = `${booking.guests} ${booking.guests === '1' ? t.reserve.guest : t.reserve.party}`
  const headingWords = t.reserve.heading.split(' ')

  const nav = [
    { href: '#top', label: t.nav.home },
    { href: '#story', label: t.nav.story },
    { href: '#menu', label: t.nav.menu },
    { href: '#experience', label: t.nav.experience },
    { href: '#dining', label: t.nav.dining },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <div
      onMouseMove={(e) => {
        if (!fine) return
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
      }}
    >
      {fine && (
        <div
          className={`cursor${cursor.label ? ' label' : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        >
          {cursor.label}
        </div>
      )}

      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-start">
          <a className="logo" href="#top">
            {t.brand}
          </a>
          <ul className="nav-links">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-end">
          <div className="lang-switch" aria-label="language">
            <button className={locale === 'ar' ? 'active' : ''} onClick={() => setLocale('ar')}>
              AR
            </button>
            <span>/</span>
            <button className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>
              EN
            </button>
          </div>
          <a
            className="btn"
            href="#reserve"
            data-cursor="book"
            onMouseEnter={() => setLabel(t.cursor.book)}
            onMouseLeave={() => setLabel('')}
          >
            <span>{t.nav.reserve}</span>
            <Arrow />
          </a>
          <a className="btn mobile-cta" href="#reserve">
            {t.nav.reserve}
          </a>
          <button className="btn mobile-toggle" onClick={() => setMenuOpen(true)} aria-label="menu">
            ☰
          </button>
        </div>
      </header>

      <div className={`drawer${menuOpen ? ' open' : ''}`}>
        <button className="btn" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
            {n.label}
          </a>
        ))}
      </div>

      <section className="hero" id="top">
        <div className="pattern" aria-hidden />
        <div className="hero-media" />
        <div className="hero-logo-intro">{t.brand}</div>
        <div className="hero-copy">
          <div className="hero-kicker">{t.hero.location}</div>
          <h1 className="display">{t.hero.headline}</h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-ctas">
            <a className="btn" href="#reserve" onMouseEnter={() => setLabel(t.cursor.book)} onMouseLeave={() => setLabel('')}>
              <span>{t.hero.cta}</span>
              <Arrow />
            </a>
            <a className="btn btn-ghost" href="#menu" onMouseEnter={() => setLabel(t.cursor.explore)} onMouseLeave={() => setLabel('')}>
              <span>{t.hero.cta2}</span>
            </a>
          </div>
        </div>
        <div className="scroll-cue">
          <span>{t.hero.scroll}</span>
          <i />
        </div>
      </section>

      <section className="split js-reveal" id="story">
        <div className="split-photo">
          <img src={images.intro} alt="" loading="lazy" />
        </div>
        <div className="split-copy">
          <div className="gold-line" />
          <h2 className="display lines">
            <span>
              <em>{t.intro.heading}</em>
            </span>
          </h2>
          <p className="lines">
            <span>
              <em>{t.intro.text}</em>
            </span>
          </p>
          <a className="btn" href="#heritage">
            <span>{t.intro.cta}</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="section sig" id="signature">
        <h2 className="display">{t.signature.title}</h2>
        <div className="sig-track-wrap" ref={sigRef}>
          <div className="sig-track">
            {signature.map((d) => (
              <article
                className="dish-card"
                key={d.id}
                onMouseEnter={() => setLabel(t.cursor.view)}
                onMouseLeave={() => setLabel('')}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  const x = (e.clientX - r.left) / r.width - 0.5
                  const y = (e.clientY - r.top) / r.height - 0.5
                  e.currentTarget.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = ''
                }}
              >
                <img src={d.image} alt={locale === 'ar' ? d.nameAr : d.nameEn} loading="lazy" />
                <div className="dish-meta">
                  <h3 className="display">{locale === 'ar' ? d.nameAr : d.nameEn}</h3>
                  <p>{locale === 'ar' ? d.descAr : d.descEn}</p>
                  <div className="price">{d.price} {locale === 'ar' ? 'ر.س' : 'SAR'}</div>
                  <div className="hairline" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section menu" id="menu">
        <h2 className="display">{t.menu.title}</h2>
        <div className="cats">
          {cats.map((c) => (
            <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>
              {t.menu.categories[c]}
            </button>
          ))}
        </div>
        <div className="menu-grid" key={cat}>
          {menuItems.map((d) => (
            <article className="menu-card" key={d.id} onMouseEnter={() => setLabel(t.cursor.explore)} onMouseLeave={() => setLabel('')}>
              <img src={d.image} alt="" loading="lazy" />
              <div className="pad">
                <h3>{locale === 'ar' ? d.nameAr : d.nameEn}</h3>
                <p>{locale === 'ar' ? d.descAr : d.descEn}</p>
                <div className="price">{d.price} {locale === 'ar' ? 'ر.س' : 'SAR'}</div>
                <div className="badges">
                  {d.veg && <span className="badge">{locale === 'ar' ? 'نباتي' : 'Veg'}</span>}
                  {d.spicy && <span className="badge">{locale === 'ar' ? 'حار' : 'Spicy'}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p style={{ marginTop: '2rem' }}>
          <a className="btn" href="#reserve">
            <span>{t.menu.full}</span>
            <Arrow />
          </a>
        </p>
      </section>

      <section id="experience">
        <div className="section" style={{ paddingBottom: '1.5rem' }}>
          <h2 className="display">{t.experience.title}</h2>
        </div>
        <div className="exp-grid">
          {t.experience.items.map((item, i) => {
            const src = [images.expHospitality, images.expFlavor, images.expAmbience][i]
            return (
              <article className="exp-panel" key={item.id} onMouseEnter={() => setLabel(t.cursor.view)} onMouseLeave={() => setLabel('')}>
                <img src={src} alt="" loading="lazy" />
                <div className="exp-copy">
                  <h3 className="display">{item.title}</h3>
                  <div className="exp-deco" />
                  <p>{item.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="heritage" id="heritage">
        <div className="veil" />
        <div className="heritage-inner js-reveal">
          <div className="gold-line" />
          <h2 className="display">{t.heritage.heading}</h2>
          <p>{t.heritage.text}</p>
        </div>
      </section>

      <section className="section" id="dining">
        <h2 className="display">{t.gallery.title}</h2>
        <div className="masonry">
          {gallery.map((g) => (
            <figure key={g.id} onMouseEnter={() => setLabel(t.cursor.view)} onMouseLeave={() => setLabel('')}>
              <img src={g.src} alt={locale === 'ar' ? g.ar : g.en} loading="lazy" />
              <figcaption>{locale === 'ar' ? g.ar : g.en}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section chef js-reveal" id="chef">
        <div className="chef-portrait">
          <img src={images.chef} alt={t.chef.name} loading="lazy" />
        </div>
        <div>
          <p className="role">{t.chef.role}</p>
          <h2 className="display">{t.chef.heading}</h2>
          <h3 className="display">{t.chef.name}</h3>
          <p style={{ color: 'var(--sand)', maxWidth: '36rem' }}>{t.chef.bio}</p>
        </div>
      </section>

      <section
        className={`reserve${reserveIn ? ' in' : ''}${confirmed ? ' is-confirmed' : ''}`}
        id="reserve"
        ref={reserveRef}
        onMouseMove={(e) => {
          if (!fine) return
          const r = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          e.currentTarget.style.setProperty('--mx', `${x * 18}px`)
          e.currentTarget.style.setProperty('--my', `${y * 12}px`)
        }}
      >
        <div className="reserve-media" aria-hidden />
        <div className="reserve-veil" aria-hidden />
        <div className="reserve-grain" aria-hidden />
        <div className="reserve-frame" aria-hidden>
          <i className="c c-tl" />
          <i className="c c-tr" />
          <i className="c c-bl" />
          <i className="c c-br" />
        </div>

        <div className="reserve-shell">
          <div className="reserve-copy">
            <p className="reserve-kicker">
              <span className="dot" />
              {t.reserve.kicker}
            </p>
            <h2 className="display reserve-title">
              {headingWords.map((word, i) => (
                <span className="reserve-word" key={`${word}-${i}`}>
                  <em style={{ animationDelay: `${0.18 + i * 0.12}s` }}>{word}</em>
                </span>
              ))}
            </h2>
            <p className="reserve-sub">{t.reserve.sub}</p>
            <div className="reserve-rule" aria-hidden>
              <span />
            </div>
          </div>

          {confirmed ? (
            <div className="confirm lux-confirm">
              <div className="check">✓</div>
              <p className="reserve-kicker">{t.reserve.kicker}</p>
              <h3 className="display">{t.reserve.confirmed}</h3>
              <p className="confirm-sub">{t.reserve.confirmedSub}</p>
              <ul className="confirm-meta">
                <li>{confirmed.name}</li>
                <li>{confirmed.date}</li>
                <li>{confirmed.time}</li>
                <li>
                  {confirmed.guests} {confirmed.guests === '1' ? t.reserve.guest : t.reserve.party}
                </li>
              </ul>
              <p className="confirm-loc">{t.reserve.locationNote}</p>
              <a
                className="wa"
                href={`${WA}?text=${encodeURIComponent(`${t.brand} · ${confirmed.date} · ${confirmed.time}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.reserve.whatsapp}
              </a>
              <div>
                <button
                  className="btn btn-reserve"
                  type="button"
                  style={{ marginTop: '1.6rem' }}
                  onClick={() => {
                    setConfirmed(null)
                    setBooking({ date: '', time: times[4], guests: '2', name: '', phone: '' })
                  }}
                >
                  <span>{t.reserve.another}</span>
                  <Arrow />
                </button>
              </div>
            </div>
          ) : (
            <form className="form lux-form" onSubmit={onReserve}>
              <label className="lux-field" style={{ '--i': 1 } as CSSProperties}>
                <span className="lux-label">{t.reserve.date}</span>
                <span className="lux-control">
                  <IconCal />
                  <span className={booking.date ? '' : 'ph'}>{dateLabel}</span>
                  <input
                    name="date"
                    type="date"
                    required
                    min={today}
                    value={booking.date}
                    onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))}
                    aria-label={t.reserve.date}
                  />
                </span>
              </label>

              <div className={`lux-field lux-select${timeOpen ? ' open' : ''}`} style={{ '--i': 2 } as CSSProperties}>
                <span className="lux-label" id="time-label">
                  {t.reserve.time}
                </span>
                <button
                  type="button"
                  className="lux-control"
                  aria-haspopup="listbox"
                  aria-expanded={timeOpen}
                  aria-label={`${t.reserve.time}: ${booking.time}`}
                  onClick={() => {
                    setGuestOpen(false)
                    setTimeOpen((v) => !v)
                  }}
                >
                  <IconClock />
                  <span>{booking.time || t.reserve.timeHint}</span>
                </button>
                {timeOpen && (
                  <ul className="lux-menu" role="listbox">
                    {times.map((tm) => (
                      <li key={tm}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={booking.time === tm}
                          className={booking.time === tm ? 'on' : ''}
                          onClick={() => {
                            setBooking((b) => ({ ...b, time: tm }))
                            setTimeOpen(false)
                          }}
                        >
                          {tm}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <input type="hidden" name="time" value={booking.time} />
              </div>

              <div className={`lux-field lux-select${guestOpen ? ' open' : ''}`} style={{ '--i': 3 } as CSSProperties}>
                <span className="lux-label" id="guests-label">
                  {t.reserve.guests}
                </span>
                <button
                  type="button"
                  className="lux-control"
                  aria-haspopup="listbox"
                  aria-expanded={guestOpen}
                  aria-label={`${t.reserve.guests}: ${guestLabel}`}
                  onClick={() => {
                    setTimeOpen(false)
                    setGuestOpen((v) => !v)
                  }}
                >
                  <IconGuests />
                  <span>{guestLabel}</span>
                </button>
                {guestOpen && (
                  <ul className="lux-menu guests" role="listbox">
                    {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                      <li key={n}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={booking.guests === String(n)}
                          className={booking.guests === String(n) ? 'on' : ''}
                          onClick={() => {
                            setBooking((b) => ({ ...b, guests: String(n) }))
                            setGuestOpen(false)
                          }}
                        >
                          {n} {n === 1 ? t.reserve.guest : t.reserve.party}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <input type="hidden" name="guests" value={booking.guests} />
              </div>

              <label className="lux-field" style={{ '--i': 4 } as CSSProperties}>
                <span className="lux-label">{t.reserve.name}</span>
                <span className="lux-control">
                  <IconUser />
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder=" "
                    value={booking.name}
                    onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))}
                  />
                </span>
              </label>

              <label className="lux-field full" style={{ '--i': 5 } as CSSProperties}>
                <span className="lux-label">{t.reserve.phone}</span>
                <span className="lux-control">
                  <IconPhone />
                  <input
                    name="phone"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder=" "
                    value={booking.phone}
                    onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))}
                  />
                </span>
              </label>

              <p className="lux-note full">{t.reserve.note}</p>

              <div className="full reserve-cta">
                <button
                  className="btn btn-reserve"
                  type="submit"
                  onMouseEnter={() => setLabel(t.cursor.book)}
                  onMouseLeave={() => setLabel('')}
                >
                  <span>{t.reserve.submit}</span>
                  <Arrow />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="location" id="contact">
        <div className="loc-copy">
          <h2 className="display">{t.location.heading}</h2>
          <p>
            <strong>{t.location.addressLabel}</strong>
            <br />
            {t.location.address}
          </p>
          <p>
            <strong>{t.location.hoursLabel}</strong>
            <br />
            {t.location.hours} — {t.location.hoursTime}
            <br />
            {t.location.friday}
          </p>
          <p>
            <strong>{t.location.phoneLabel}</strong>
            <br />
            {t.location.phone}
          </p>
          <div className="stats" ref={statsRef}>
            <div className="stat">
              <b>{guests.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en')}</b>
              <span>{t.stats.guests}</span>
            </div>
            <div className="stat">
              <b>{plates}</b>
              <span>{t.stats.dishes}</span>
            </div>
            <div className="stat">
              <b>{years}</b>
              <span>{t.stats.years}</span>
            </div>
          </div>
          <a className="btn" href={DIR} target="_blank" rel="noreferrer">
            <span>{t.location.directions}</span>
            <Arrow />
          </a>
        </div>
        <div className="loc-map">
          <iframe title="map" src={MAP} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <footer className="footer">
        <div>
          <div className="logo">{t.brand}</div>
          <p style={{ color: 'var(--sand)', maxWidth: '16rem' }}>{t.hero.sub}</p>
        </div>
        <div>
          <strong>{t.nav.home}</strong>
          <ul>
            <li>
              <a href="#top">{t.footer.home}</a>
            </li>
            <li>
              <a href="#story">{t.footer.story}</a>
            </li>
            <li>
              <a href="#menu">{t.footer.menu}</a>
            </li>
            <li>
              <a href="#reserve">{t.footer.reserve}</a>
            </li>
            <li>
              <a href="#contact">{t.footer.contact}</a>
            </li>
          </ul>
        </div>
        <div>
          <strong>{t.footer.contact}</strong>
          <ul>
            <li>
              {t.footer.phone}: {t.location.phone}
            </li>
            <li>
              <a href={WA}>{t.footer.whatsapp}</a>
            </li>
            <li>
              <a href={`mailto:${t.footer.emailValue}`}>{t.footer.email}</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                {t.footer.instagram}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <strong>{t.footer.hours}</strong>
          <ul>
            <li>{t.footer.hoursDays}</li>
            <li>{t.footer.hoursTime}</li>
          </ul>
        </div>
        <div className="legal">{t.footer.copy}</div>
      </footer>
    </div>
  )
}
