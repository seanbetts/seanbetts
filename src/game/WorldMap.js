import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowCounterClockwise, GearSix, Newspaper, Microphone, User, Plus, Minus } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import SceneArt from './SceneArt';
import styles from './WorldMap.module.css';

const destinations = [
  { id: 'building', name: 'Building', title: 'The workshop', description: 'Independent products, prototypes and experiments. Step inside and see what I’m building.', icon: GearSix, x: 25, y: 25, route: 'M600 405 L552 354 L430 311 L344 305 L326 239 L300 190' },
  { id: 'writing', name: 'Writing', title: 'The newsroom', description: 'Ideas, research and perspectives on AI, creativity and the things that come next.', icon: Newspaper, x: 63, y: 22, route: 'M600 405 L552 354 L604 321 L657 309 L716 242 L756 167' },
  { id: 'speaking', name: 'Speaking', title: 'The stage', description: 'Conversations about AI and its impact. Talks, panels and appearances out in the world.', icon: Microphone, x: 79, y: 47, route: 'M600 405 L686 443 L793 467 L863 429 L889 388 L948 357' },
  { id: 'about', name: 'About', title: 'The story', description: 'The person behind the projects. My background, experience and what drives the work.', icon: User, x: 65, y: 76, route: 'M600 405 L686 443 L699 487 L753 527 L780 578' },
];

const roads = [
  'M-50 215 L230 102 L493 -35', 'M-40 295 L259 185 L611 52 L804 -30',
  'M-30 372 L211 282 L428 217 L669 116 L930 -20',
  'M116 -30 L204 103 L265 243 L305 331 L340 450 L399 620 L462 800',
  'M295 -40 L364 85 L427 217 L463 298 L552 354 L600 405 L699 487 L799 548 L908 629 L1034 800',
  'M527 -30 L555 73 L600 213 L657 309 L746 365 L889 388 L1041 365 L1230 301',
  'M784 -30 L772 100 L756 167 L716 242 L657 309 L604 321 L552 354 L480 447 L446 579 L476 792',
  'M1010 -20 L920 148 L881 251 L863 429 L819 500 L780 578 L736 680 L698 790',
  'M1190 17 L1031 160 L956 258 L948 357 L985 467 L1093 590 L1220 620',
  'M-30 648 L147 628 L306 579 L446 579 L590 604 L736 680 L898 733 L1206 682',
  'M-40 760 L244 680 L410 656 L537 686 L665 778',
  'M403 800 L485 704 L590 604 L699 487 L793 467 L960 502 L1219 424',
  'M610 802 L632 708 L639 617 L667 544 L686 443 L746 365 L835 289 L956 258 L1230 203',
  'M853 798 L908 629 L971 569 L1057 531 L1220 532',
];

function CityGeometry({ destination }) {
  return (
    <svg className={styles.geometry} viewBox="0 0 1200 760" preserveAspectRatio="none" role="img" aria-label="Illustrative navigation map of Sean’s work: a fictional city with four destinations, streets, parks and a river.">
      <defs>
        <pattern id="city-blocks" width="94" height="76" patternUnits="userSpaceOnUse" patternTransform="rotate(-19)">
          <rect width="94" height="76" fill="#271f32" />
          <path d="M0 0H94V76H0Z M48 0V76 M0 40H94" stroke="#55495f" strokeWidth="3" fill="none" />
          <path d="M7 7H40V31H7Z M56 7H85V31H56Z M7 47H40V68H7Z M56 47H85V68H56Z" stroke="#403349" strokeWidth="2" fill="#32273c" />
          <path d="M13 12H34V25H13Z M61 11H80V28H61Z M11 51H35V62H11Z M61 52H80V63H61Z" fill="#3a2e43" />
        </pattern>
        <pattern id="city-grid" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M120 0H0V120" fill="none" stroke="#fffaf4" strokeWidth=".5" opacity=".07" /></pattern>
        <pattern id="park-trees" width="22" height="20" patternUnits="userSpaceOnUse"><rect width="22" height="20" fill="#3e4b40" /><circle cx="7" cy="8" r="5" fill="#303d35" /><circle cx="18" cy="17" r="4" fill="#53604a" /></pattern>
      </defs>
      <rect width="1200" height="760" fill="url(#city-blocks)" />
      <g stroke="#211a2a" strokeWidth="5" fill="url(#park-trees)">
        <path d="M74 68L180 22L218 82L143 129L93 139Z" />
        <path d="M486 79L539 62L580 193L517 213L489 177Z" />
        <path d="M945 66L998 86L946 169L923 153Z" />
        <path d="M1007 211L1086 168L1149 219L1051 272L1000 266Z" />
        <path d="M1020 603L1077 562L1162 652L1078 688L1001 656Z" />
        <path d="M534 496L594 511L620 581L576 610L519 571Z" />
        <path d="M816 677L860 628L894 651L872 712Z" />
      </g>
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M-90 510C107 565 165 419 263 371S459 340 555 371S691 485 827 494S1085 401 1280 464" stroke="#655970" strokeWidth="82" />
        <path d="M-90 510C107 565 165 419 263 371S459 340 555 371S691 485 827 494S1085 401 1280 464" stroke="#192b3d" strokeWidth="66" />
        <path d="M-90 510C107 565 165 419 263 371S459 340 555 371S691 485 827 494S1085 401 1280 464" stroke="#223c50" strokeWidth="48" />
        <path d="M-90 510C107 565 165 419 263 371S459 340 555 371S691 485 827 494S1085 401 1280 464" stroke="#3f6274" strokeWidth="1" opacity=".5" />
        <g stroke="#201627" strokeWidth="12">{roads.map((d) => <path key={d} d={d} />)}</g>
        <g stroke="#77697e" strokeWidth="6">{roads.map((d) => <path key={d} d={d} />)}</g>
        <g stroke="#9d8c9d" strokeWidth="1" opacity=".5">{roads.map((d) => <path key={d} d={d} />)}</g>
        <path d="M-40 133L155 194L291 209L466 163L645 157L802 212L952 197L1230 69 M38 790L99 648L226 549L276 464" stroke="#242030" strokeWidth="7" />
        <path d="M-40 133L155 194L291 209L466 163L645 157L802 212L952 197L1230 69 M38 790L99 648L226 549L276 464" stroke="#8a7d91" strokeWidth="2" strokeDasharray="3 5" />
        <g stroke="#c1acb8" strokeWidth="4"><path d="M322 393L302 327 M575 432L618 374 M827 518L848 450 M998 482L973 414" /></g>
        <path d={destination.route} stroke="#301921" strokeWidth="12" />
        <path d={destination.route} stroke="#ff777f" strokeWidth="5" />
        <path d={destination.route} stroke="#ffb6aa" strokeWidth="1" />
      </g>
      <g fill="#d0c0d1" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="5" opacity=".7">
        <text x="52" y="233" transform="rotate(-20 52 233)">WEST QUARTER</text>
        <text x="814" y="112" transform="rotate(16 814 112)">NORTH BANK</text>
        <text x="935" y="699" transform="rotate(-15 935 699)">SOUTH BANK</text>
      </g>
      <circle cx="600" cy="405" r="13" fill="#16051f" stroke="#fffaf4" strokeWidth="2" />
      <path d="M600 396L607 412L600 408L593 412Z" fill="#fffaf4" />
      <rect width="1200" height="760" fill="url(#city-grid)" pointerEvents="none" />
    </svg>
  );
}

export default function WorldMap() {
  const [selected, setSelected] = useState('building');
  const [zoom, setZoom] = useState(1);
  const viewport = useRef(null);
  const destination = destinations.find((item) => item.id === selected);
  const selectDestination = (item) => {
    setSelected(item.id);
    const map = viewport.current;
    if (map) {
      map.scrollLeft = (map.firstElementChild.offsetWidth * item.x / 100) - map.clientWidth / 2;
      map.scrollTop = (map.firstElementChild.offsetHeight * item.y / 100) - map.clientHeight / 2;
    }
  };
  const resetZoom = () => {
    setZoom(1);
    if (viewport.current) {
      viewport.current.scrollLeft = 0;
      viewport.current.scrollTop = 0;
    }
  };

  return (
    <section className={styles.world}>
      <Seo title="Explore the map | Sean Betts" description="Find your way around Sean Betts’s projects, writing, speaking and story." canonicalPath="/map" />
      <header className={styles.heading}>
        <div><p className={styles.eyebrow}>02 / Explore the map</p><h1>Choose your next stop.</h1></div>
        <p className={styles.intro}>A few different worlds.<br />One curious mind.</p>
      </header>
      <div className={`${styles.mapFrame} game-art`}>
        <div className={styles.mapTop}><span>Sean’s world</span><span>4 destinations / London inspired</span></div>
        <div className={styles.destinationChoices} role="group" aria-label="Destination choices">
          {destinations.map((item) => <button type="button" key={item.id} aria-label={`Select ${item.name}`} aria-pressed={selected === item.id} aria-controls="map-destination-detail" onClick={() => selectDestination(item)}>{item.name}</button>)}
        </div>
        <div className={styles.mapViewport} ref={viewport}>
          <div className={styles.mapPlane} style={{ width: `max(${zoom * 100}%, ${zoom * 680}px)`, height: `${zoom * 100}%` }}>
            <CityGeometry destination={destination} />
            {destinations.map((item, index) => {
              const Icon = item.icon;
              return <button type="button" key={item.id} className={`${styles.pin} ${selected === item.id ? styles.selectedPin : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={`Select ${item.name} on map`} aria-pressed={selected === item.id} aria-controls="map-destination-detail" onClick={() => selectDestination(item)}>
                <span className={styles.pinCircle}><Icon size={24} weight="bold" /></span>
                <span className={styles.pinLabel}><strong>{item.title}</strong><span>{String(index + 1).padStart(2, '0')} / {item.name}</span></span>
              </button>;
            })}
          </div>
        </div>
        <div className={styles.zoomControls} aria-label="Map zoom controls">
          <button type="button" aria-label="Zoom in" disabled={zoom >= 2} onClick={() => setZoom((value) => Math.min(2, value + .25))}><Plus size={20} /></button>
          <button type="button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((value) => Math.max(1, value - .25))}><Minus size={20} /></button>
          <button type="button" aria-label="Reset map zoom" onClick={resetZoom}><ArrowCounterClockwise size={18} /></button>
          <span role="status" aria-live="polite">{Math.round(zoom * 100)}%</span>
        </div>
        <aside className={styles.detail} id="map-destination-detail" aria-label="Selected destination" aria-live="polite" aria-atomic="true">
          <div className={styles.detailArt}><SceneArt scene={destination.id} /><span>{String(destinations.indexOf(destination) + 1).padStart(2, '0')}</span></div>
          <div className={styles.detailCopy}><p className={styles.eyebrow}>Destination / {destination.name}</p><h2>{destination.title}</h2><p>{destination.description}</p><Link to={`/${destination.id}`} aria-label={`Explore ${destination.name}`}>Explore {destination.name}<ArrowRight size={20} weight="bold" /></Link></div>
        </aside>
        <div className={styles.compass} aria-hidden="true"><span>▲</span>N</div>
        <div className={styles.mapBottom}><span><i />Selected route</span><span>Choose a marker to explore<span className={styles.scrollHint}> · Scroll to move when zoomed</span></span></div>
      </div>
      <p className={styles.caption}>An illustrative map of the work, the ideas and the person behind them.</p>
    </section>
  );
}
