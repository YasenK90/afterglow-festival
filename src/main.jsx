import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, X, Minus, Plus, Ticket, Menu, MoveUpRight, Sun, Clock3, MapPin, Check, ChevronDown } from 'lucide-react';
import './styles.css';

const artists = [
  { name: 'NOUR', genre: 'LIVE / ELECTRONIC', day: 'FRIDAY', time: '21:40', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1100&q=85', className: 'portrait' },
  { name: 'KAIRO', genre: 'DJ SET / LEFTFIELD', day: 'SATURDAY', time: '23:10', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1100&q=85', className: 'wide' },
  { name: 'MIRA SOL', genre: 'LIVE / ALT POP', day: 'FRIDAY', time: '20:20', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1100&q=85', className: 'portrait' },
  { name: 'THE STATIC', genre: 'LIVE / INDIE ROCK', day: 'SATURDAY', time: '21:00', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1100&q=85', className: 'wide' },
  { name: 'YALLA CLUB', genre: 'DJ SET / GLOBAL CLUB', day: 'FRIDAY', time: '00:10', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1100&q=85', className: 'portrait' },
  { name: 'SOFT SIGNAL', genre: 'LIVE / AMBIENT', day: 'SATURDAY', time: '19:30', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85', className: 'wide' },
];

const schedule = {
  FRIDAY: [
    { time: '18:00', stage: 'DUST STAGE', artist: 'Doors open / warm-up selectors', type: 'DJ' },
    { time: '19:15', stage: 'GARDEN STAGE', artist: 'Soft Signal', type: 'LIVE' },
    { time: '20:20', stage: 'DUST STAGE', artist: 'Mira Sol', type: 'LIVE' },
    { time: '21:40', stage: 'DUST STAGE', artist: 'Nour', type: 'LIVE' },
    { time: '23:10', stage: 'GARDEN STAGE', artist: 'Yalla Club', type: 'DJ' },
    { time: '00:10', stage: 'DUST STAGE', artist: 'Open decks / after-hours', type: 'DJ' },
  ],
  SATURDAY: [
    { time: '18:30', stage: 'GARDEN STAGE', artist: 'Sunset sound system', type: 'DJ' },
    { time: '19:30', stage: 'DUST STAGE', artist: 'Soft Signal', type: 'LIVE' },
    { time: '21:00', stage: 'DUST STAGE', artist: 'The Static', type: 'LIVE' },
    { time: '22:20', stage: 'GARDEN STAGE', artist: 'Nour (after-dark set)', type: 'LIVE' },
    { time: '23:10', stage: 'DUST STAGE', artist: 'Kairo', type: 'DJ' },
    { time: '00:30', stage: 'GARDEN STAGE', artist: 'One last dance', type: 'DJ' },
  ],
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [day, setDay] = useState('FRIDAY');
  const [filterDay, setFilterDay] = useState('ALL');
  const [ticketType, setTicketType] = useState('weekend');
  const [quantity, setQuantity] = useState(2);
  const [reserved, setReserved] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  const total = useMemo(() => (ticketType === 'weekend' ? 1450 : 850) * quantity, [ticketType, quantity]);

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ticketOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [ticketOpen]);

  const openTickets = () => { setReserved(false); setTicketOpen(true); };
  const closeMenu = () => setMenuOpen(false);
  const shownArtists = artists.filter((artist) => filterDay === 'ALL' || artist.day === filterDay);

  return (
    <div className="site-shell">
      <div className="cursor-orb" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Afterglow home">AFTER<span>GLOW</span><i>®</i></a>
        <div className="topbar-meta"><span>CAIRO, EGYPT</span><span className="meta-dot" /><span>23—24 OCT 2027</span></div>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
          <a href="#lineup" onClick={closeMenu}>LINEUP</a>
          <a href="#experience" onClick={closeMenu}>THE FEELING</a>
          <a href="#info" onClick={closeMenu}>INFO</a>
          <button className="nav-ticket" onClick={() => { closeMenu(); openTickets(); }}>GET TICKETS <ArrowUpRight size={14} /></button>
        </nav>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-topline"><span><span className="live-pulse" /> TWO NIGHTS. ONE SHARED FREQUENCY.</span><span>EST. FOR THE FEELING</span></div>
          <div className="hero-title-wrap">
            <h1 className="hero-title"><span className="title-line title-line-one">STAY OUT</span><span className="title-line title-line-two"><span className="title-of">OF</span> <em>LINE.</em></span></h1>
            <div className="hero-stamp"><span>AN OPEN-AIR<br />MUSIC + ARTS<br />GATHERING</span><span className="stamp-sun"><Sun strokeWidth={1} /></span><small>30°02' N<br />31°14' E</small></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image" />
            <div className="hero-image-shade" />
            <div className="hero-image-copy"><span className="image-copy-small">NOT A FESTIVAL.</span><span className="image-copy-big">A FREQUENCY.</span></div>
            <div className="hero-counter"><span>01 / 02</span><span className="counter-line" /><span>CAIRO, AFTER DARK</span></div>
            <a className="hero-scroll" href="#lineup"><span>SCROLL TO FEEL IT</span><ArrowDownRight size={19} /></a>
            <button className="play-orbit" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Explore the experience"><span className="orbit-text">FEEL THE FREQUENCY · FEEL THE FREQUENCY · </span><span className="orbit-arrow"><ArrowDownRight size={22} /></span></button>
          </div>
          <div className="hero-bottomline"><span>NO RULES FOR THE DANCEFLOOR.</span><span>JUST SHOW UP AS YOU ARE ↗</span></div>
        </section>

        <div className="ticker" aria-label="Good sound good people no rush"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>GOOD SOUND <b>✳</b> GOOD PEOPLE <b>✳</b> NO RUSH <b>✳</b> STAY A LITTLE LONGER <b>✳</b></span>)}</div></div>

        <section className="lineup section-pad" id="lineup">
          <div className="section-heading" data-reveal>
            <div><span className="eyebrow">01 / THE PEOPLE WHO GET IT</span><h2>GOOD THINGS<br /><em>COME IN WAVES.</em></h2></div>
            <p>Different sounds. Same feeling.<br />A lineup built to take you somewhere<br />you didn't know you needed to go.</p>
          </div>
          <div className="lineup-toolbar" data-reveal>
            <span className="mono-label">THE LINEUP — 2027</span>
            <div className="filter-tabs" role="group" aria-label="Filter artists by day">
              {['ALL', 'FRIDAY', 'SATURDAY'].map((item) => <button key={item} className={filterDay === item ? 'filter-active' : ''} onClick={() => setFilterDay(item)}>{item}</button>)}
            </div>
          </div>
          <div className="artist-grid">
            {shownArtists.map((artist, i) => <article className={`artist-card ${i % 2 ? 'artist-card-offset' : ''}`} key={artist.name} data-reveal>
              <div className="artist-image-wrap"><img src={artist.image} alt={`${artist.name} performing`} loading="lazy" /><span className="artist-index">0{artists.findIndex((a) => a.name === artist.name) + 1}</span><span className="artist-day">{artist.day}</span><a href="#schedule" className="artist-arrow" aria-label={`View ${artist.name} schedule`} onClick={() => setDay(artist.day)}><ArrowUpRight size={20} /></a></div>
              <div className="artist-meta"><div><h3>{artist.name}</h3><span>{artist.genre}</span></div><span className="artist-time">{artist.time}</span></div>
            </article>)}
          </div>
          <div className="lineup-end" data-reveal><span>AND MORE NAMES STILL IN THE AIR...</span><span className="small-cross">✳</span></div>
        </section>

        <section className="manifesto" id="experience">
          <div className="manifesto-image" data-reveal><img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=90" alt="Crowd moving together under festival lights" loading="lazy" /><span className="manifesto-image-label">FIG. 01 — A SHARED MOMENT</span></div>
          <div className="manifesto-content" data-reveal><span className="eyebrow">02 / LEAVE THE EVERYDAY BEHIND</span><p className="manifesto-big">THE BEST PART<br />IS <em>LOSING</em><br />TRACK OF TIME.</p><div className="manifesto-foot"><p>Somewhere between the first bass note and the last ride home, something shifts. Phones go away. Strangers become your people. The night becomes a story you won't tell properly.</p><span className="scribble">YOU HAD<br />TO BE THERE ↗</span></div></div>
          <div className="manifesto-sideword">OUTSIDE THE ORDINARY / OUTSIDE THE ORDINARY /</div>
        </section>

        <section className="schedule section-pad" id="schedule">
          <div className="section-heading schedule-heading" data-reveal><div><span className="eyebrow">03 / PACE YOURSELF</span><h2>MAKE A NIGHT<br /><em>OF IT.</em></h2></div><p>No two trips through the night are the same. Here's the shape of things. Follow the sound, not the clock.</p></div>
          <div className="schedule-top" data-reveal><div className="day-switch"><button className={day === 'FRIDAY' ? 'day-active' : ''} onClick={() => setDay('FRIDAY')}>FRIDAY <span>23 OCT</span></button><button className={day === 'SATURDAY' ? 'day-active' : ''} onClick={() => setDay('SATURDAY')}>SATURDAY <span>24 OCT</span></button></div><span className="mono-label">TIMES ARE A LOOSE PROMISE.</span></div>
          <div className="schedule-list" data-reveal>{schedule[day].map((item, i) => <div className="schedule-row" key={`${day}-${item.time}`}><span className="schedule-time">{item.time}</span><span className={`schedule-type ${item.type === 'LIVE' ? 'type-live' : 'type-dj'}`}>{item.type}</span><div className="schedule-act"><h3>{item.artist}</h3><span>{item.stage}</span></div><span className="schedule-row-index">{String(i + 1).padStart(2, '0')}</span><ChevronDown size={15} className="schedule-chevron" /></div>)}</div>
          <div className="schedule-note" data-reveal><span><Clock3 size={14} /> DOORS OPEN AT 18:00</span><span><MapPin size={14} /> A SECRET SPOT, CAIRO</span><span>GOOD THINGS TAKE THEIR TIME.</span></div>
        </section>

        <section className="place" id="info">
          <div className="place-left" data-reveal><span className="eyebrow">04 / FIND YOUR WAY HERE</span><h2>NOT QUITE<br />THE MIDDLE<br />OF <em>NOWHERE.</em></h2><p>A little outside the everyday. Easy to get to, difficult to leave. The exact location lands in your inbox with your ticket.</p><button className="text-link" onClick={openTickets}>FIND YOUR WAY IN <ArrowUpRight size={16} /></button></div>
          <div className="place-right" data-reveal><div className="map-art"><div className="map-grid"/><svg className="map-path" viewBox="0 0 600 500" fill="none" aria-hidden="true"><path d="M-20 380 C 70 340 90 430 160 350 S 250 300 280 240 S 390 180 430 220 S 520 250 630 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7"/><path d="M60 10 C100 80 60 150 140 180 S200 230 170 290 S250 420 300 500" stroke="currentColor" strokeWidth="1" opacity=".35"/><path d="M350 -20 C315 65 370 95 340 145 S440 290 400 340 S460 420 490 520" stroke="currentColor" strokeWidth="1" opacity=".35"/></svg><div className="map-pin"><span className="pin-pulse"/><span className="pin-center"/></div><span className="map-label map-label-one">CAIRO / EGYPT</span><span className="map-label map-label-two">THE OUTSKIRTS</span><span className="map-coords">30°02' N<br />31°14' E</span><span className="map-compass">N <ArrowUpRight size={15} /></span><div className="map-tag">THE<br />PLACE<br />TO BE<span>↗</span></div></div><div className="place-image-caption"><span>THE CITY FADES. THE SOUND STAYS.</span><span>NO. 30 / 31</span></div></div>
        </section>

        <section className="practical section-pad">
          <div className="practical-title" data-reveal><span className="eyebrow">THE SMALL PRINT (NOT REALLY)</span><h2>COME READY.<br /><em>LEAVE DIFFERENT.</em></h2></div>
          <div className="practical-grid" data-reveal>
            <article><span className="practical-number">01</span><h3>GETTING THERE</h3><p>Shuttle details and arrival windows are sent out before the gates open. Leave the car keys at home if you plan to stay for the final track.</p><ArrowUpRight size={17}/></article>
            <article><span className="practical-number">02</span><h3>WHAT TO BRING</h3><p>Comfortable shoes, a light layer for later, ID, and the kind of friend who says “one more song” and means it.</p><ArrowUpRight size={17}/></article>
            <article><span className="practical-number">03</span><h3>GOOD TO EACH OTHER</h3><p>Be kind. Look out for your people and the people around you. If someone needs help, help them find it.</p><ArrowUpRight size={17}/></article>
          </div>
        </section>

        <section className="final-cta"><div className="cta-spark">✳</div><span className="eyebrow">THE NIGHT IS CALLING</span><h2>DON'T HEAR<br />ABOUT IT <em>LATER.</em></h2><button className="cta-button" onClick={openTickets}><span>GET IN WHILE YOU CAN</span><ArrowUpRight size={18}/></button><div className="cta-foot"><span>23—24 OCT 2027 / CAIRO, EGYPT</span><span>YOU'LL KNOW WHEN YOU'RE THERE.</span></div></section>
      </main>

      <footer className="footer"><a className="footer-mark" href="#top">AFTER<span>GLOW</span><i>®</i></a><span>INDEPENDENT BY NATURE.<br />TOGETHER BY SOUND.</span><div className="footer-links"><a href="#lineup">INSTAGRAM ↗</a><a href="#info">CONTACT ↗</a></div><span className="footer-copy">© 2027 AFTERGLOW<br />BUILT FOR THE MOMENT.</span></footer>

      {ticketOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setTicketOpen(false); }}><div className="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-title"><button className="modal-close" onClick={() => setTicketOpen(false)} aria-label="Close ticket dialog"><X size={20}/></button>{reserved ? <div className="reserved-state"><div className="reserved-check"><Check size={25}/></div><span className="eyebrow">YOU'RE ON THE LIST (DEMO)</span><h2>THAT'S THE<br /><em>SPIRIT.</em></h2><p>Your demo request is confirmed on this page. No payment was taken and no real ticket has been issued.</p><button className="cta-button modal-main-cta" onClick={() => setTicketOpen(false)}>BACK TO THE NIGHT <ArrowRight size={17}/></button></div> : <><div className="modal-top"><span className="eyebrow">AFTERGLOW / ENTRY PASS</span><span className="modal-edition">2027 · CAIRO</span></div><h2 id="ticket-title">SAVE YOUR<br /><em>PLACE.</em></h2><p className="modal-intro">Two nights that move at their own pace. Pick your pass, bring your people.</p><div className="ticket-options"><button className={ticketType === 'weekend' ? 'ticket-option option-active' : 'ticket-option'} onClick={() => setTicketType('weekend')}><span className="option-radio"/><span className="option-copy"><strong>THE FULL FREQUENCY</strong><small>Both nights · 23 + 24 October</small></span><span className="option-price">1,450 <small>EGP</small></span></button><button className={ticketType === 'day' ? 'ticket-option option-active' : 'ticket-option'} onClick={() => setTicketType('day')}><span className="option-radio"/><span className="option-copy"><strong>ONE NIGHT ONLY</strong><small>Choose your night at checkout</small></span><span className="option-price">850 <small>EGP</small></span></button></div><div className="modal-quantity"><span>HOW MANY OF YOU?</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15}/></button><strong>{String(quantity).padStart(2, '0')}</strong><button onClick={() => setQuantity(Math.min(8, quantity + 1))} aria-label="Increase quantity"><Plus size={15}/></button></div></div><div className="modal-total"><span>TOTAL · DEMO PRICE</span><strong>{total.toLocaleString('en-US')} <small>EGP</small></strong></div><button className="modal-checkout" onClick={() => setReserved(true)}>RESERVE YOUR SPOT <ArrowUpRight size={17}/></button><p className="modal-disclaimer">Portfolio demo only. No payment or real booking is processed.</p></>}</div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
